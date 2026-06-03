#!/usr/bin/env node
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const packageRoot = findPackageRoot();
const pythonPath = process.env.PYTHONPATH
  ? `${packageRoot}${path.delimiter}${process.env.PYTHONPATH}`
  : packageRoot;
const bundledBinary = findBundledBinary();

const result = bundledBinary ? runBundledBinary(bundledBinary) : runPythonPrototypeIfAvailable();

if (result.error) {
  console.error(`chart-kit: failed to start: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);

function findBundledBinary() {
  const platformBinary = findPlatformPackageBinary();
  if (platformBinary) {
    return platformBinary;
  }

  const candidates = [
    path.join(packageRoot, "dist", process.platform === "win32" ? "chart-kit.exe" : "chart-kit"),
    path.join(packageRoot, "dist", "chart-kit"),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function findPackageRoot() {
  const candidates = [
    path.resolve(__dirname, ".."),
    path.resolve(__dirname, "node_modules", "@dztabel", "chartkit"),
    path.resolve(__dirname, "..", "node_modules", "@dztabel", "chartkit"),
  ];

  for (const candidate of candidates) {
    if (isChartKitPackageRoot(candidate)) {
      return candidate;
    }
  }

  try {
    const packageJson = require.resolve("@dztabel/chartkit/package.json", {
      paths: [__dirname, process.cwd()],
    });
    return path.dirname(packageJson);
  } catch (_) {
    return path.resolve(__dirname, "..");
  }
}

function isChartKitPackageRoot(candidate) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(candidate, "package.json"), "utf8"));
    return packageJson.name === "@dztabel/chartkit" && fs.existsSync(path.join(candidate, "npm", "chart-kit.cjs"));
  } catch (_) {
    return false;
  }
}

function findPlatformPackageBinary() {
  const packageName = platformPackageName();
  if (!packageName) {
    return null;
  }
  try {
    const packageJson = require.resolve(`${packageName}/package.json`, { paths: [packageRoot] });
    const platformRoot = path.dirname(packageJson);
    const binary = path.join(platformRoot, process.platform === "win32" ? "chart-kit.exe" : "chart-kit");
    return fs.existsSync(binary) ? binary : null;
  } catch (_) {
    return null;
  }
}

function platformPackageName() {
  const arch = process.arch === "x64" ? "x64" : process.arch === "arm64" ? "arm64" : null;
  if (!arch) {
    return null;
  }
  if (process.platform === "darwin") {
    return `@dztabel/chartkit-darwin-${arch}`;
  }
  if (process.platform === "linux") {
    return `@dztabel/chartkit-linux-${arch}`;
  }
  if (process.platform === "win32") {
    return `@dztabel/chartkit-win32-${arch}`;
  }
  return null;
}

function runBundledBinary(binary) {
  return spawnSync(binary, process.argv.slice(2), {
    cwd: process.cwd(),
    env: utf8Env(),
    stdio: "inherit",
  });
}

function runPythonPrototypeIfAvailable() {
  if (!fs.existsSync(path.join(packageRoot, "chart_kit", "cli.py"))) {
    const packageName = platformPackageName();
    const version = packageVersion();
    console.error("chart-kit: platform package is missing.");
    console.error(
      packageName
        ? `chart-kit: expected optional dependency ${packageName} to provide the binary.`
        : `chart-kit: unsupported platform ${process.platform}/${process.arch}.`,
    );
    if (packageName) {
      console.error(`chart-kit: run "npm install -g @dztabel/chartkit@${version} ${packageName}@${version}".`);
    } else {
      console.error("chart-kit: install a package built for this platform.");
    }
    process.exit(1);
  }
  const python = selectPython();
  return spawnSync(python, ["-m", "chart_kit.cli", ...process.argv.slice(2)], {
    cwd: process.cwd(),
    env: {
      ...utf8Env(),
      PYTHONPATH: pythonPath,
    },
    stdio: "inherit",
  });
}

function packageVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
    return packageJson.version || "latest";
  } catch (_) {
    return "latest";
  }
}

function utf8Env() {
  return {
    ...process.env,
    PYTHONUTF8: process.env.PYTHONUTF8 || "1",
    PYTHONIOENCODING: process.env.PYTHONIOENCODING || "utf-8",
  };
}

function selectPython() {
  const explicit = [process.env.CHART_KIT_PYTHON, process.env.PYTHON].filter(Boolean);
  const localVenvPython = process.platform === "win32"
    ? path.join(packageRoot, ".venv", "Scripts", "python.exe")
    : path.join(packageRoot, ".venv", "bin", "python");
  const candidates = explicit.length
    ? explicit
    : [localVenvPython, "python3.14", "python3.13", "python3.12", "python3.11", "python3.10", "python3", "python"];

  for (const candidate of candidates) {
    if (path.isAbsolute(candidate) && !fs.existsSync(candidate)) {
      continue;
    }
    const probe = spawnSync(
      candidate,
      ["-c", "import sys; raise SystemExit(0 if sys.version_info >= (3, 12) else 1)"],
      { stdio: "ignore" },
    );
    if (probe.status === 0) {
      return candidate;
    }
  }

  console.error("chart-kit: Python 3.12+ is required for local source checkout fallback.");
  console.error("chart-kit: set CHART_KIT_PYTHON to a compatible Python interpreter.");
  process.exit(1);
}
