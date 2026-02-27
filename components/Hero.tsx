export default function Hero() {
  return (
    <section className="relative pt-40 pb-32 text-center">
      <div className="container">
        <div className="inline-flex items-center gap-3 mb-8 animate-[fadeUp_0.7s_ease-out]">
          <span className="w-8 h-px bg-accent"></span>
          <span className="font-mono text-[0.7rem] font-medium tracking-[0.15em] uppercase text-accent">
            Enterprise SaaS Orchestration
          </span>
          <span className="w-8 h-px bg-accent"></span>
        </div>

        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.1] tracking-tight text-fg max-w-[52rem] mx-auto mb-6 animate-[fadeUp_0.7s_ease-out]">
          3 months of IT integration.
          <br />
          <em className="italic text-accent">Done in 3 minutes.</em>
        </h1>

        <p className="text-lg text-muted-fg max-w-[36rem] mx-auto mb-12 leading-[1.75] animate-[fadeUp_0.7s_0.15s_ease-out_backwards]">
          Your AI agent that orchestrates enterprise SaaS onboarding — discovery,
          security, configuration, and compliance — with your team in control at
          every decision gate.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap animate-[fadeUp_0.7s_0.25s_ease-out_backwards]">
          <button className="bg-accent text-white border-none rounded-md px-8 py-3.5 font-sans text-base font-medium tracking-wider cursor-pointer min-h-[44px] transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)]">
            Watch the Agent Work
          </button>
          <button className="bg-transparent text-fg border border-fg rounded-md px-8 py-3.5 font-sans text-base font-medium tracking-wider cursor-pointer min-h-[44px] transition-all duration-200 hover:border-accent hover:text-accent hover:bg-muted">
            See the Architecture
          </button>
        </div>

        <div className="w-16 h-px bg-border mx-auto mt-16"></div>
      </div>
    </section>
  );
}
