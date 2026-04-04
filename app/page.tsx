"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  },
];

const categories = [
  { icon: "⚙️", label: "Automation" },
  { icon: "🌐", label: "Language & Voice" },
  { icon: "📁", label: "Productivity" },
  { icon: "🎬", label: "Creative" },
  { icon: "📚", label: "Education" },
  { icon: "🏠", label: "IoT & Smart Home" },
  { icon: "🎮", label: "Gaming" },
  { icon: "🚁", label: "Drones" },
];

export default function Home() {
  const [glitching, setGlitching] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 120);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let start = 0;
    const target = 1;
    const step = () => {
      start++;
      setCount(start);
      if (start < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono overflow-x-hidden">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 4px)",
        }}
      />

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-orange-500/20 sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ForgeAI Logo"
            width={36}
            height={36}
            className="object-contain invert"
          />
          <span
            className={`text-orange-500 font-black text-lg tracking-[0.25em] transition-all duration-75 ${
              glitching ? "translate-x-[2px] opacity-80" : ""
            }`}
          >
            FORGEAI
          </span>
          <span className="text-[10px] text-orange-500/50 border border-orange-500/30 px-1.5 py-0.5 rounded tracking-widest">
            v0.1
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="#tools"
            className="text-gray-500 hover:text-orange-500 transition-colors tracking-wider"
          >
            TOOLS
          </a>
          <a
            href="#about"
            className="text-gray-500 hover:text-orange-500 transition-colors tracking-wider"
          >
            ABOUT
          </a>
          <a
            href="https://github.com/Blackrails-Technologies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-orange-500 transition-colors tracking-wider"
          >
            GITHUB
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-8 py-28 overflow-hidden">
        {/* bg grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(234,88,12,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="ForgeAI"
            width={120}
            height={120}
            className="object-contain mb-8"
            style={{ filter: "invert(1) drop-shadow(0 0 40px rgba(234,88,12,0.6))" }}
          />

          <div className="text-xs tracking-[0.4em] text-orange-500/60 mb-4 uppercase">
            BlackRails Technology
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-none">
            <span className="text-orange-500">FORGE</span>
            <span className="text-white">AI</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl mb-3 leading-relaxed">
            The open-source Play Store for AI tools.
          </p>
          <p className="text-gray-600 text-sm max-w-md mb-12 leading-relaxed">
            Download and run powerful AI tools without ever touching a terminal,
            typing a command, or managing dependencies.
          </p>

          {/* stat strip */}
          <div className="flex gap-12 mb-12 text-center">
            <div>
              <div className="text-2xl font-black text-orange-500">{count}</div>
              <div className="text-[10px] text-gray-600 tracking-widest uppercase mt-1">
                Tools Live
              </div>
            </div>
            <div className="w-px bg-orange-500/20" />
            <div>
              <div className="text-2xl font-black text-white">0</div>
              <div className="text-[10px] text-gray-600 tracking-widest uppercase mt-1">
                GPU Required
              </div>
            </div>
            <div className="w-px bg-orange-500/20" />
            <div>
              <div className="text-2xl font-black text-white">Free</div>
              <div className="text-[10px] text-gray-600 tracking-widest uppercase mt-1">
                Always & Forever
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#tools"
              className="bg-orange-500 text-black px-8 py-4 rounded font-black text-sm tracking-widest hover:bg-orange-400 transition-all hover:scale-105 active:scale-95"
            >
              GET A TOOL →
            </a>
            <a
              href="#about"
              className="border border-orange-500/40 text-orange-500/80 px-8 py-4 rounded font-bold text-sm tracking-widest hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              THE MISSION
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED TOOL — Open Interpreter */}
      <section id="tools" className="px-8 py-24 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-orange-500/20" />
          <span className="text-xs tracking-[0.4em] text-orange-500 uppercase">
            Featured Tool — v0.1
          </span>
          <div className="h-px flex-1 bg-orange-500/20" />
        </div>

        {tools.map((tool) => (
          <div
            key={tool.id}
            className="group border border-orange-500/30 rounded-xl p-8 hover:border-orange-500/70 transition-all bg-orange-500/[0.02] hover:bg-orange-500/[0.04] relative overflow-hidden"
          >
            {/* corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-orange-500/20 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-orange-500/10 rounded-bl-xl" />

            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* left */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
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
                </div>

                <h3 className="text-3xl font-black mb-2 text-white group-hover:text-orange-500 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-orange-500/70 text-sm mb-4 tracking-wide">
                  {tool.tagline}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-gray-600 bg-gray-900 border border-gray-800 px-2 py-1 rounded tracking-widest uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* install steps */}
                <div className="border border-orange-500/10 rounded-lg p-5 bg-black/40 mb-6">
                  <div className="text-[10px] tracking-widest text-orange-500/50 uppercase mb-4">
                    How it works
                  </div>
                  <div className="space-y-3">
                    {[
                      "Download the installer below",
                      "Double-click the file — no terminal needed",
                      "forgeai sets up everything automatically",
                      "Open Interpreter launches and is ready to use",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-orange-500 font-black text-xs mt-0.5 w-4 shrink-0">
                          {i + 1}.
                        </span>
                        <span className="text-gray-400 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* right — download card */}
              <div className="md:w-64 shrink-0">
                <div className="border border-orange-500/30 rounded-xl p-6 bg-black/60">
                  <div className="text-[10px] tracking-widest text-gray-600 uppercase mb-4">
                    Download
                  </div>

                  <div className="space-y-3 mb-6">
                    <Link
                      href="/tools/open-interpreter"
                      className="flex items-center justify-between w-full border border-orange-500/30 rounded-lg px-4 py-3 text-sm hover:border-orange-500 hover:bg-orange-500/5 transition-all group/btn"
                    >
                      <span className="text-gray-400 group-hover/btn:text-white transition-colors">
                        Windows
                      </span>
                      <span className="text-orange-500 text-xs">↓ .exe</span>
                    </Link>
                    <Link
                      href="/tools/open-interpreter"
                      className="flex items-center justify-between w-full border border-orange-500/30 rounded-lg px-4 py-3 text-sm hover:border-orange-500 hover:bg-orange-500/5 transition-all group/btn"
                    >
                      <span className="text-gray-400 group-hover/btn:text-white transition-colors">
                        macOS
                      </span>
                      <span className="text-orange-500 text-xs">↓ .sh</span>
                    </Link>
                    <Link
                      href="/tools/open-interpreter"
                      className="flex items-center justify-between w-full border border-orange-500/30 rounded-lg px-4 py-3 text-sm hover:border-orange-500 hover:bg-orange-500/5 transition-all group/btn"
                    >
                      <span className="text-gray-400 group-hover/btn:text-white transition-colors">
                        Linux
                      </span>
                      <span className="text-orange-500 text-xs">↓ .sh</span>
                    </Link>
                  </div>

                  <div className="border-t border-orange-500/10 pt-4 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-600">Size</span>
                      <span className="text-gray-400">{tool.size_mb} MB</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-600">Python</span>
                      <span className="text-gray-400">Auto-managed</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-600">GPU</span>
                      <span className="text-green-500/80">Not required</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-600">License</span>
                      <span className="text-gray-400">MIT</span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-gray-700 text-center mt-3 leading-relaxed">
                  Open source · No account needed · Runs locally
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* COMING SOON CATEGORIES */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-orange-500/10" />
          <span className="text-xs tracking-[0.4em] text-gray-700 uppercase">
            Coming Soon
          </span>
          <div className="h-px flex-1 bg-orange-500/10" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="border border-gray-900 rounded-lg p-5 text-center hover:border-orange-500/20 transition-all cursor-default opacity-50 hover:opacity-70"
            >
              <div className="text-2xl mb-2 grayscale">{cat.icon}</div>
              <p className="text-xs text-gray-600 tracking-wider uppercase">
                {cat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs tracking-widest mt-8 uppercase">
          More tools shipping soon — build something and list it here
        </p>
      </section>

      {/* PHILOSOPHY */}
      <section
        id="about"
        className="px-8 py-24 border-t border-orange-500/10 max-w-3xl mx-auto text-center"
      >
        <div className="text-xs tracking-[0.4em] text-orange-500/50 uppercase mb-6">
          The Philosophy
        </div>
        <h2 className="text-3xl font-black mb-10">
          The <span className="text-orange-500">Blacksmith</span> Principle
        </h2>

        <div className="space-y-5 text-gray-500 leading-relaxed">
          <p>A blacksmith takes raw material. Heats it. Shapes it. Strengthens it.</p>
          <p>Creates tools that last generations. Built by skilled hands — not factories.</p>
          <div className="border border-orange-500/20 rounded-lg p-6 my-8">
            <p className="text-white font-bold text-lg leading-relaxed">
              forgeai does the same with AI.
            </p>
            <p className="text-orange-500/60 text-sm mt-2">
              No paywalls. No cloud lock-in. No command line.
            </p>
          </div>
          <p>
            Every tool on this platform runs locally on your machine. Your data
            never leaves. You own the process.
          </p>
          <p className="text-orange-500/70 font-bold">
            Built by the people. For the people. Forever.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 border-t border-orange-500/10 text-center">
        <h2 className="text-4xl font-black mb-4">
          Ready to <span className="text-orange-500">Forge?</span>
        </h2>
        <p className="text-gray-600 mb-10 text-sm tracking-wide">
          Start with Open Interpreter. More tools shipping soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#tools"
            className="bg-orange-500 text-black px-10 py-4 rounded font-black text-sm tracking-widest hover:bg-orange-400 transition-all hover:scale-105 active:scale-95"
          >
            GET OPEN INTERPRETER →
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-orange-500/30 text-gray-500 px-10 py-4 rounded font-bold text-sm tracking-widest hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            LIST YOUR TOOL
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-orange-500/10 px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="ForgeAI"
            width={20}
            height={20}
            className="object-contain invert opacity-40"
          />
          <span>
            <span className="text-orange-500/60 font-bold">ForgeAI</span> · A
            BlackRails Technology Project
          </span>
        </div>
        <p className="tracking-widest uppercase text-[10px]">
          Build it. Forge it. Free it.
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-orange-500 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            Discord
          </a>
          <a href="#" className="hover:text-orange-500 transition-colors">
            MIT License
          </a>
        </div>
      </footer>
    </main>
  );
}