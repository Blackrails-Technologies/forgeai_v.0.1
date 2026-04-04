import Link from "next/link";
import Image from "next/image";

const tools = [
  {
    id: "open-interpreter",
    name: "Open Interpreter",
    tagline: "Run code. Control your computer. No terminal needed.",
    description:
      "An AI coding agent that runs Python, JS, and shell commands locally. Automate anything through plain English.",
    category: "Automation",
    version: "0.3.5",
    size_mb: 45,
    gpu_required: false,
    tags: ["coding", "automation", "local", "agent"],
    status: "live",
  },
];

export default function ToolsPage() {
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
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/tools"
            className="text-orange-500 tracking-wider border-b border-orange-500/40 pb-0.5"
          >
            TOOLS
          </Link>
          <Link
            href="/#about"
            className="text-gray-500 hover:text-orange-500 transition-colors tracking-wider"
          >
            ABOUT
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <div className="px-8 py-16 max-w-5xl mx-auto">
        <div className="text-xs tracking-[0.4em] text-orange-500/50 uppercase mb-4">
          Tool Registry
        </div>
        <h1 className="text-4xl font-black mb-3">
          All <span className="text-orange-500">Tools</span>
        </h1>
        <p className="text-gray-600 text-sm tracking-wide">
          {tools.length} tool live · More shipping soon
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="px-8 pb-8 max-w-5xl mx-auto">
        <div className="flex gap-3 flex-wrap">
          {["All", "Automation", "Language & Voice", "Productivity", "Creative"].map(
            (f, i) => (
              <button
                key={f}
                className={`text-[10px] tracking-widest uppercase px-3 py-2 rounded border transition-colors ${
                  i === 0
                    ? "border-orange-500 text-orange-500 bg-orange-500/5"
                    : "border-gray-800 text-gray-600 hover:border-orange-500/40 hover:text-gray-400"
                }`}
              >
                {f}
              </button>
            )
          )}
        </div>
      </div>

      {/* TOOL GRID */}
      <div className="px-8 pb-24 max-w-5xl mx-auto">
        <div className="grid gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/60 transition-all bg-orange-500/[0.02] hover:bg-orange-500/[0.04] flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] tracking-widest text-orange-500 border border-orange-500/40 px-2 py-0.5 rounded uppercase">
                    {tool.category}
                  </span>
                  {tool.status === "live" && (
                    <span className="text-[10px] tracking-widest text-green-500/70 border border-green-500/30 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />
                      Live
                    </span>
                  )}
                  {!tool.gpu_required && (
                    <span className="text-[10px] text-gray-600 border border-gray-800 px-2 py-0.5 rounded uppercase tracking-widest">
                      No GPU
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-black mb-1 group-hover:text-orange-500 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-gray-700 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 md:items-end shrink-0">
                <div className="text-[11px] text-gray-600">
                  v{tool.version} · {tool.size_mb} MB
                </div>
                <div className="bg-orange-500 text-black px-5 py-2.5 rounded font-black text-xs tracking-widest group-hover:bg-orange-400 transition-colors">
                  GET TOOL →
                </div>
              </div>
            </Link>
          ))}

          {/* coming soon placeholder */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border border-gray-900 rounded-xl p-6 opacity-30 flex items-center gap-6"
            >
              <div className="flex-1">
                <div className="w-24 h-3 bg-gray-800 rounded mb-3" />
                <div className="w-48 h-5 bg-gray-800 rounded mb-2" />
                <div className="w-64 h-3 bg-gray-800 rounded" />
              </div>
              <div className="text-xs text-gray-700 tracking-widest uppercase border border-gray-800 px-4 py-2 rounded">
                Coming Soon
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-orange-500/10 px-8 py-6 flex justify-between items-center text-xs text-gray-700">
        <span>
          <span className="text-orange-500/60 font-bold">ForgeAI</span> · BlackRails Technology
        </span>
        <span className="tracking-widest uppercase text-[10px]">
          Build it. Forge it. Free it.
        </span>
      </footer>
    </main>
  );
}