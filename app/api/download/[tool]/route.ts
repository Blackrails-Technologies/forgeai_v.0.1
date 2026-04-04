import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

// Maps tool id → OS → the actual installer script filename in /public/installers/
const TOOL_INSTALLERS: Record<string, Record<string, string>> = {
  "open-interpreter": {
    windows: "install_open_interpreter.bat",
    macos: "install_open_interpreter.command",
    linux: "install_open_interpreter.sh",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tool: string }> },
) {
  const { tool } = await params;
  const os = request.nextUrl.searchParams.get("os") ?? "linux";

  const scriptName = TOOL_INSTALLERS[tool]?.[os];
  if (!scriptName) {
    return NextResponse.json(
      { error: "Tool or OS not supported" },
      { status: 404 },
    );
  }

  // Read the installer script from /public/installers/
  const filePath = join(
    process.cwd(),
    "public",
    "installers",
    tool.replace("-", "_"),
    scriptName,
  );
  let fileContent: Buffer;

  try {
    fileContent = readFileSync(filePath);
  } catch {
    return NextResponse.json(
      { error: "Installer file not found on server" },
      { status: 404 },
    );
  }

  // Per-OS filename shown in the browser's Save dialog
  const fileNames: Record<string, string> = {
    windows: `forgeai_install_${tool}.bat`, // Windows: user needs Python, opens terminal on double-click
    macos: `forgeai_install_${tool}.command`,
    linux: `forgeai_install_${tool}.sh`,
  };

  const fileName = fileNames[os] ?? `forgeai_install_${tool}.py`;

  return new Response(fileContent as any, {
    status: 200,
    headers: {
      // Force browser to download rather than display
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "application/octet-stream",
      "Content-Length": fileContent.length.toString(),
      // Prevent caching so a re-download always gets the latest version
      "Cache-Control": "no-store",
    },
  });
}
