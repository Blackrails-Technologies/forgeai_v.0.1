import Link from "next/link";
import Image from "next/image";

const tools: Record<
  string,
  {
    id: string;
    name: string;
    tagline: string;
    description: string;
    category: string;
    version: string;
    size_mb: number;
    gpu_required: boolean;
    tags: string[];
    pip_package: string;
    launch_cmd: string;
    min_python: string;
    steps: string[];
    requirements: string[];
  }
> = {
  "open-interpreter": {
    id: "open-interpreter",
    name: "Open Interpreter",
    tagline: "Run code. Control your computer. No terminal needed.",
    description:
      "Open Interpreter lets an AI coding agent run Python, JavaScript, and shell commands locally on your machine. Ask it to build files, browse the web, edit code, analyse data, or automate anything — all through plain English.",
    category: "Automation",
    version: "0.3.5",
    size_mb: 45,
    gpu_required: false,
    tags: ["coding", "automation", "local", "agent"],
    pip_package: "open-interpreter",
    launch_cmd: "interpreter",
    min_python: "3.9",
    steps: [
      "Download the installer for your operating system",
      "Double-click the downloaded file — no terminal required",
      "forgeai detects your OS and sets up a virtual environment",
      "Dependencies install automatically in the background",
      "Open Interpreter launches and is ready to use",
    ],
    requirements: [
      "Windows 10+ / macOS 11+ / Ubuntu 20.04+",
      "4 GB RAM minimum (8 GB recommended)",
      "2 GB free disk space",
      "Internet connection for first-time setup",
      "No GPU required",
    ],
  },
};

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = tools[id];

  if (!tool) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex items-center justify-center">
        <div className="text-center">
          <p className="text-orange-500 font-black text-2xl mb-4">404</p>
          <p className="text-gray-600 mb-8">Tool not found.</p>
          <Link
            href="/tools"
            className="border border-orange-500/40 text-orange-500 px-6 py-3 rounded text-sm tracking-widest hover:bg-orange-500/10 transition-colors"
          >
            ← BACK TO TOOLS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      {/* scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 4px)",
        }}
      />

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-orange-500/20 sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ForgeAI Logo"
            width={32}
            height={32}
            className="object-contain invert"
          />
          <span className="text-orange-500 font-black text-lg tracking-[0.25em]">
            FORGEAI
          </span>
          <span className="text-[10px] text-orange-500/50 border border-orange-500/30 px-1.5 py-0.5 rounded tracking-widest">
            v0.1
          </span>
        </Link>
        <Link
          href="/tools"
          className="text-gray-600 hover:text-orange-500 transition-colors text-sm tracking-wider"
        >
          ← ALL TOOLS
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-16">
        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-gray-700 mb-10 tracking-widest uppercase">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/tools"
            className="hover:text-orange-500 transition-colors"
          >
            Tools
          </Link>
          <span>/</span>
          <span className="text-orange-500">{tool.name}</span>
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-10">
          {/* LEFT */}
          <div>
            {/* badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-[10px] tracking-widest text-orange-500 border border-orange-500/40 px-2 py-1 rounded uppercase">
                {tool.category}
              </span>
              <span className="text-[10px] tracking-widest text-gray-600 border border-gray-800 px-2 py-1 rounded uppercase">
                v{tool.version}
              </span>
              {!tool.gpu_required && (
                <span className="text-[10px] tracking-widest text-green-500/80 border border-green-500/30 px-2 py-1 rounded uppercase">
                  No GPU
                </span>
              )}
              <span className="text-[10px] tracking-widest text-green-500/70 border border-green-500/30 px-2 py-1 rounded uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                Live
              </span>
            </div>

            <h1 className="text-5xl font-black mb-3">{tool.name}</h1>
            <p className="text-orange-500/70 text-base mb-6 tracking-wide">
              {tool.tagline}
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              {tool.description}
            </p>

            {/* tags */}
            <div className="flex gap-2 flex-wrap mb-12">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-gray-600 bg-gray-900 border border-gray-800 px-2 py-1 rounded uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* HOW IT WORKS */}
            <div className="mb-12">
              <div className="text-xs tracking-[0.3em] text-orange-500/50 uppercase mb-6">
                How It Works
              </div>
              <div className="space-y-4">
                {tool.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border border-orange-500/10 rounded-lg p-4 bg-orange-500/[0.02]"
                  >
                    <span className="text-orange-500 font-black text-sm w-6 shrink-0 mt-0.5">
                      {i + 1}.
                    </span>
                    <span className="text-gray-400 text-sm leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* REQUIREMENTS */}
            <div>
              <div className="text-xs tracking-[0.3em] text-orange-500/50 uppercase mb-6">
                System Requirements
              </div>
              <div className="border border-orange-500/10 rounded-lg p-6 bg-black/40">
                <ul className="space-y-3">
                  {tool.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-500"
                    >
                      <span className="text-orange-500/60 mt-0.5">—</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT — DOWNLOAD */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="border border-orange-500/30 rounded-xl p-6 bg-black/60">
              <div className="text-[10px] tracking-widest text-orange-500/50 uppercase mb-5">
                Download Installer
              </div>

              {/* main CTA */}
              <a
                href={`/api/download/${tool.id}?os=windows`}
                className="w-full bg-orange-500 text-black py-4 rounded-lg font-black text-sm tracking-widest hover:bg-orange-400 transition-all hover:scale-[1.02] active:scale-95 mb-3 inline-block text-center"
              >
                WINDOWS (.bat) ↓
              </a>

              <div className="grid grid-cols-2 gap-2 mb-6">
                <a
                  href={`/api/download/${tool.id}?os=macos`}
                  className="border border-orange-500/30 text-orange-500/70 py-3 rounded-lg text-[11px] tracking-widest hover:border-orange-500 hover:text-orange-500 transition-colors font-bold text-center"
                >
                  macOS (.command)
                </a>
                <a
                  href={`/api/download/${tool.id}?os=linux`}
                  className="border border-orange-500/30 text-orange-500/70 py-3 rounded-lg text-[11px] tracking-widest hover:border-orange-500 hover:text-orange-500 transition-colors font-bold text-center"
                >
                  Linux (.sh)
                </a>
              </div>

              {/* stats */}
              <div className="border-t border-orange-500/10 pt-5 space-y-3">
                {[
                  ["Size", `${tool.size_mb} MB`],
                  ["Version", tool.version],
                  ["Python", "Auto-managed"],
                  ["GPU", "Not required"],
                  ["License", "MIT · Open Source"],
                  ["Data", "Stays on your machine"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-[11px]">
                    <span className="text-gray-700">{label}</span>
                    <span
                      className={
                        label === "GPU" || label === "Data"
                          ? "text-green-500/70"
                          : "text-gray-400"
                      }
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* source link */}
            <a
              href="https://github.com/OpenInterpreter/open-interpreter"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-700 hover:text-orange-500 transition-colors tracking-widest"
            >
              View Source on GitHub →
            </a>

            <p className="text-[10px] text-gray-800 text-center mt-3 leading-relaxed">
              No account required · Runs 100% locally · Your data never leaves
              your machine
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-orange-500/10 px-8 py-6 flex justify-between items-center text-xs text-gray-700 max-w-5xl mx-auto">
        <span>
          <span className="text-orange-500/60 font-bold">ForgeAI</span> ·
          BlackRails Technology
        </span>
        <span className="tracking-widest uppercase text-[10px]">
          Build it. Forge it. Free it.
        </span>
      </footer>
    </main>
  );
}
