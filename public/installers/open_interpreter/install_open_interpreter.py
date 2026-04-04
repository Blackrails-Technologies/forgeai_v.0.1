"""
forgeai installer — v0.1
Tool: Open Interpreter
BlackRails Technology

Double-click this file. That's it.
No terminal. No commands. No dependencies to manage.
"""

import sys
import os
import subprocess
import platform
import json
import shutil
import urllib.request
import tempfile
from pathlib import Path


# ── config ────────────────────────────────────────────────────────────────────

TOOL_ID        = "open-interpreter"
TOOL_NAME      = "Open Interpreter"
PIP_PACKAGE    = "open-interpreter"
LAUNCH_CMD     = "interpreter"
MIN_PYTHON     = (3, 9)
REQUIRED_MB    = 500  # disk space check (installer + deps)

FORGEAI_DIR    = Path.home() / ".forgeai"
VENV_DIR       = FORGEAI_DIR / "envs" / TOOL_ID
LOG_FILE       = FORGEAI_DIR / "logs" / f"{TOOL_ID}_install.log"


# ── colour helpers (graceful fallback on Windows without ANSI) ────────────────

def supports_color():
    if platform.system() == "Windows":
        try:
            import ctypes
            kernel = ctypes.windll.kernel32
            kernel.SetConsoleMode(kernel.GetStdHandle(-11), 7)
            return True
        except Exception:
            return False
    return True

USE_COLOR = supports_color()

def c(text, code):
    return f"\033[{code}m{text}\033[0m" if USE_COLOR else text

def orange(t):  return c(t, "38;5;214")
def green(t):   return c(t, "32")
def red(t):     return c(t, "31")
def gray(t):    return c(t, "90")
def bold(t):    return c(t, "1")
def white(t):   return c(t, "97")


# ── logging ───────────────────────────────────────────────────────────────────

LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
_log_handle = open(LOG_FILE, "a", encoding="utf-8")

def log(msg: str):
    _log_handle.write(msg + "\n")
    _log_handle.flush()

def log_section(title: str):
    log(f"\n{'='*60}\n{title}\n{'='*60}")


# ── ui helpers ────────────────────────────────────────────────────────────────

def header():
    print()
    print(orange("  ███████╗ ██████╗ ██████╗  ██████╗ ███████╗ █████╗ ██╗"))
    print(orange("  ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝██╔══██╗██║"))
    print(orange("  █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  ███████║██║"))
    print(orange("  ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  ██╔══██║██║"))
    print(orange("  ██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗██║  ██║██║"))
    print(orange("  ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝"))
    print()
    print(gray("  " + "─" * 54))
    print(f"  {white('Installing:')}  {orange(TOOL_NAME)}")
    print(f"  {white('Platform:')}    {orange(platform.system())} {platform.machine()}")
    print(f"  {white('Install dir:')} {gray(str(VENV_DIR))}")
    print(gray("  " + "─" * 54))
    print()


def step(n: int, total: int, msg: str):
    bar = orange(f"[{n}/{total}]")
    print(f"  {bar} {msg}")
    log(f"[{n}/{total}] {msg}")


def ok(msg: str):
    print(f"        {green('✓')} {gray(msg)}")
    log(f"  OK: {msg}")


def warn(msg: str):
    print(f"        {orange('!')} {msg}")
    log(f"  WARN: {msg}")


def fail(msg: str, hint: str = ""):
    print()
    print(f"  {red('✗ Error:')} {msg}")
    if hint:
        print(f"  {gray('→')} {hint}")
    print()
    print(gray(f"  Full log: {LOG_FILE}"))
    log(f"  FAIL: {msg}")
    _log_handle.close()
    input("\n  Press Enter to close...")
    sys.exit(1)


def progress_bar(label: str, done: int, total: int, width: int = 30):
    filled = int(width * done / total) if total else 0
    bar = orange("█" * filled) + gray("░" * (width - filled))
    pct = int(100 * done / total) if total else 0
    print(f"\r  {gray(label)} [{bar}] {pct}%", end="", flush=True)


def done_banner():
    print()
    print()
    print(gray("  " + "─" * 54))
    print(f"  {green('✓')} {bold(white(TOOL_NAME + ' is ready!'))}")
    print(gray("  " + "─" * 54))
    print()
    print(f"  {gray('To run again anytime:')}")
    print(f"  {orange('  launch.py')} {gray('— double-click it, same folder')}")
    print()
    print(f"  {gray('Installed to:')} {gray(str(VENV_DIR))}")
    print(f"  {gray('Log file:')}     {gray(str(LOG_FILE))}")
    print()


# ── checks ────────────────────────────────────────────────────────────────────

def check_python_version():
    v = sys.version_info
    if (v.major, v.minor) < MIN_PYTHON:
        fail(
            f"Python {MIN_PYTHON[0]}.{MIN_PYTHON[1]}+ required, found {v.major}.{v.minor}",
            hint=f"Download Python from https://python.org/downloads"
        )
    ok(f"Python {v.major}.{v.minor}.{v.micro}")


def check_disk_space():
    try:
        usage = shutil.disk_usage(Path.home())
        free_mb = usage.free // (1024 * 1024)
        if free_mb < REQUIRED_MB:
            fail(
                f"Not enough disk space — need {REQUIRED_MB} MB, have {free_mb} MB",
                hint="Free up some space and try again."
            )
        ok(f"{free_mb:,} MB free")
    except Exception as e:
        warn(f"Could not check disk space: {e}")


def check_internet():
    try:
        urllib.request.urlopen("https://pypi.org", timeout=8)
        ok("Internet connection reachable")
    except Exception:
        fail(
            "No internet connection detected",
            hint="forgeai needs internet for first-time install. Connect and retry."
        )


def check_pip():
    try:
        subprocess.run(
            [sys.executable, "-m", "pip", "--version"],
            check=True, capture_output=True
        )
        ok("pip available")
    except subprocess.CalledProcessError:
        fail(
            "pip not found",
            hint="Run: python -m ensurepip --upgrade"
        )


# ── already installed? ─────────────────────────────────────────────────────────

def already_installed() -> bool:
    marker = VENV_DIR / ".forgeai_installed"
    return marker.exists()


def mark_installed():
    marker = VENV_DIR / ".forgeai_installed"
    marker.write_text(json.dumps({
        "tool": TOOL_ID,
        "version": "0.3.5",
        "installed_by": "forgeai",
        "platform": platform.system(),
    }))


# ── venv ──────────────────────────────────────────────────────────────────────

def create_venv():
    if VENV_DIR.exists():
        ok("Virtual environment already exists — reusing")
        return

    VENV_DIR.parent.mkdir(parents=True, exist_ok=True)
    log(f"Creating venv at {VENV_DIR}")

    result = subprocess.run(
        [sys.executable, "-m", "venv", str(VENV_DIR)],
        capture_output=True, text=True
    )
    log(result.stdout)
    log(result.stderr)

    if result.returncode != 0:
        fail(
            "Failed to create virtual environment",
            hint=result.stderr.strip() or "Check permissions on your home directory."
        )
    ok(f"Virtual environment created at {VENV_DIR}")


def get_venv_python() -> str:
    system = platform.system()
    if system == "Windows":
        python = VENV_DIR / "Scripts" / "python.exe"
    else:
        python = VENV_DIR / "bin" / "python"

    if not python.exists():
        fail(
            "Virtual environment Python not found",
            hint=f"Expected at: {python}"
        )
    return str(python)


def get_venv_pip() -> str:
    system = platform.system()
    if system == "Windows":
        return str(VENV_DIR / "Scripts" / "pip.exe")
    return str(VENV_DIR / "bin" / "pip")


# ── install ───────────────────────────────────────────────────────────────────

def upgrade_pip(venv_python: str):
    log("Upgrading pip inside venv...")
    result = subprocess.run(
        [venv_python, "-m", "pip", "install", "--upgrade", "pip"],
        capture_output=True, text=True
    )
    log(result.stdout)
    log(result.stderr)
    if result.returncode != 0:
        warn("pip upgrade failed — continuing anyway")
    else:
        ok("pip upgraded")


def install_package(venv_python: str):
    log(f"Installing {PIP_PACKAGE}...")
    print(f"\n  {gray('Installing dependencies — this may take a few minutes...')}\n")

    process = subprocess.Popen(
        [venv_python, "-m", "pip", "install", PIP_PACKAGE,
         "--no-warn-script-location"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
    )

    lines_seen = 0
    spinner = ["⠋", "⠙", "⠸", "⠴", "⠦", "⠇"]

    for line in process.stdout:
        log(line.rstrip())
        lines_seen += 1
        spin = orange(spinner[lines_seen % len(spinner)])
        clean = line.strip()
        if clean:
            # truncate long lines for display
            display = clean[:60] + "…" if len(clean) > 60 else clean
            print(f"\r  {spin} {gray(display):<65}", end="", flush=True)

    process.wait()
    print()  # newline after spinner

    if process.returncode != 0:
        fail(
            f"Failed to install {TOOL_NAME}",
            hint=f"Check log at {LOG_FILE} for details."
        )
    ok(f"{TOOL_NAME} installed successfully")


# ── write launch script ────────────────────────────────────────────────────────

def write_launch_script():
    """Write a launch.py next to install.py so the user can reopen the tool easily."""
    launch_path = Path(__file__).parent / "launch.py"

    script = f'''"""
forgeai launcher — {TOOL_NAME}
Double-click this file to run {TOOL_NAME} anytime.
"""
import subprocess
import platform
import sys
from pathlib import Path

VENV_DIR = Path.home() / ".forgeai" / "envs" / "{TOOL_ID}"

def get_exec():
    if platform.system() == "Windows":
        return VENV_DIR / "Scripts" / "{LAUNCH_CMD}.exe"
    return VENV_DIR / "bin" / "{LAUNCH_CMD}"

def main():
    exe = get_exec()
    if not exe.exists():
        print(f"[forgeai] Tool not found at {{exe}}")
        print("[forgeai] Please run install.py first.")
        input("Press Enter to close...")
        sys.exit(1)

    print("[forgeai] Launching {TOOL_NAME}...")
    print("[forgeai] Type 'exit' or Ctrl+C to stop.\\n")

    try:
        subprocess.run([str(exe)], check=True)
    except KeyboardInterrupt:
        print("\\n[forgeai] Exited.")
    except subprocess.CalledProcessError as e:
        print(f"[forgeai] {TOOL_NAME} exited with code {{e.returncode}}")
        input("Press Enter to close...")

if __name__ == "__main__":
    main()
'''
    launch_path.write_text(script, encoding="utf-8")
    ok(f"launch.py written → {launch_path}")


# ── verify ────────────────────────────────────────────────────────────────────

def verify_install(venv_python: str):
    result = subprocess.run(
        [venv_python, "-c", f"import importlib; importlib.import_module('interpreter')"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        warn("Could not verify install — but it may still work. Try launch.py.")
        log(f"Verify stderr: {result.stderr}")
    else:
        ok("Installation verified")


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    log_section("forgeai install started")
    log(f"Platform: {platform.system()} {platform.release()} {platform.machine()}")
    log(f"Python:   {sys.version}")
    log(f"Tool:     {TOOL_ID}")

    header()

    TOTAL_STEPS = 8

    # ── already installed? ───────────────────────────────────────────────────
    if already_installed():
        print(f"  {orange('!')} {TOOL_NAME} is already installed.")
        print()
        choice = input(f"  Reinstall? {gray('(y/N)')} ").strip().lower()
        if choice != "y":
            print()
            print(f"  {green('→')} Run {orange('launch.py')} to open {TOOL_NAME}.")
            print()
            input("  Press Enter to close...")
            sys.exit(0)
        # wipe and reinstall
        shutil.rmtree(VENV_DIR, ignore_errors=True)
        ok("Previous installation removed")
        print()

    # ── step 1: python ───────────────────────────────────────────────────────
    step(1, TOTAL_STEPS, "Checking Python version")
    check_python_version()

    # ── step 2: disk ─────────────────────────────────────────────────────────
    step(2, TOTAL_STEPS, "Checking disk space")
    check_disk_space()

    # ── step 3: internet ─────────────────────────────────────────────────────
    step(3, TOTAL_STEPS, "Checking internet connection")
    check_internet()

    # ── step 4: pip ──────────────────────────────────────────────────────────
    step(4, TOTAL_STEPS, "Checking pip")
    check_pip()

    # ── step 5: venv ─────────────────────────────────────────────────────────
    step(5, TOTAL_STEPS, "Creating isolated environment")
    create_venv()
    venv_python = get_venv_python()

    # ── step 6: upgrade pip ──────────────────────────────────────────────────
    step(6, TOTAL_STEPS, "Upgrading pip inside environment")
    upgrade_pip(venv_python)

    # ── step 7: install ──────────────────────────────────────────────────────
    step(7, TOTAL_STEPS, f"Installing {TOOL_NAME}")
    install_package(venv_python)

    # ── step 8: finish ───────────────────────────────────────────────────────
    step(8, TOTAL_STEPS, "Finalising")
    verify_install(venv_python)
    write_launch_script()
    mark_installed()

    done_banner()

    # offer to launch immediately
    print(f"  {orange('→')} Launch {TOOL_NAME} now? ", end="")
    choice = input(gray("(Y/n) ")).strip().lower()
    if choice != "n":
        print()
        log("User chose to launch immediately")
        exe_path = (
            VENV_DIR / "Scripts" / f"{LAUNCH_CMD}.exe"
            if platform.system() == "Windows"
            else VENV_DIR / "bin" / LAUNCH_CMD
        )
        try:
            subprocess.run([str(exe_path)])
        except KeyboardInterrupt:
            print("\n  Exited.")
        except Exception as e:
            warn(f"Could not launch: {e}")
            print(f"  {gray('Try running launch.py instead.')}")
    else:
        print()
        print(f"  {gray('Run')} {orange('launch.py')} {gray('anytime to open')} {TOOL_NAME}.")
        print()
        input("  Press Enter to close...")

    _log_handle.close()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n\n  {orange('Cancelled.')} No changes were made.")
        _log_handle.close()
        sys.exit(0)
    except Exception as e:
        log(f"Unhandled exception: {e}")
        fail(
            f"Unexpected error: {e}",
            hint=f"Check the log at {LOG_FILE}"
        )