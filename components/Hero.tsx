export default function Hero() {
  return (
    <section id="hero" className="relative pt-48 pb-32 px-8 text-center">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(184,134,11,0.03),transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-normal leading-tight mb-6 animate-[fadeUp_0.8s_ease-out]">
          3 months of IT integration.
          <br />
          <span className="italic text-accent">Done in 3 minutes.</span>
        </h1>

        <p className="text-xl text-muted-fg max-w-[600px] mx-auto mb-10 animate-[fadeUp_0.8s_ease-out_0.2s_backwards]">
          An AI agent that orchestrates enterprise SaaS onboarding end-to-end —
          from discovery and security reviews to execution and handoff.
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-[fadeUp_0.8s_ease-out_0.4s_backwards]">
          <a
            href="#demo"
            className="px-6 py-3 bg-accent text-white font-medium rounded hover:-translate-y-px hover:shadow-lg hover:shadow-accent/30 transition-all duration-200"
          >
            Watch the Agent Work
          </a>
          <a
            href="#how-it-works"
            className="px-6 py-3 bg-transparent border border-border text-fg font-medium rounded hover:border-accent hover:-translate-y-px hover:shadow-lg hover:shadow-accent/15 transition-all duration-200"
          >
            See the Architecture
          </a>
        </div>
      </div>
    </section>
  );
}
