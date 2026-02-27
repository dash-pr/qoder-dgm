export default function CTA() {
  return (
    <section className="py-32 text-center border-t border-border">
      <div className="container">
        <div className="section-label">
          <span className="rule"></span>
          <span className="text">Get Started</span>
          <span className="rule"></span>
        </div>

        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.2] tracking-tight mb-4">
          Ready to cut 4 months
          <br />
          down to <em className="italic text-accent">2 weeks?</em>
        </h2>
        <p className="text-muted-fg max-w-[32rem] mx-auto mb-10">
          Schedule a 30-minute demo and watch the agent plan a full enterprise
          rollout for your specific SaaS stack — live.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="bg-accent text-white border-none rounded-md px-8 py-3.5 font-sans text-base font-medium tracking-wider cursor-pointer min-h-[44px] transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)]">
            Schedule a Demo
          </button>
          <button className="bg-transparent text-fg border border-fg rounded-md px-8 py-3.5 font-sans text-base font-medium tracking-wider cursor-pointer min-h-[44px] transition-all duration-200 hover:border-accent hover:text-accent hover:bg-muted">
            Read the Architecture
          </button>
        </div>
      </div>
    </section>
  );
}
