export default function HowItWorks() {
  const steps = [
    {
      num: "I",
      title: "You provide the intent",
      description:
        "One sentence: which SaaS, how many users, which region. The agent handles the rest.",
    },
    {
      num: "II",
      title: "Agent orchestrates discovery",
      description:
        "Scans your existing IT environment, maps dependencies, identifies integration points and conflicts automatically.",
    },
    {
      num: "III",
      title: "You approve at decision gates",
      description:
        "Human-in-the-loop at every governance checkpoint. CISO, procurement, legal — routed automatically, not manually chased.",
    },
    {
      num: "IV",
      title: "Full audit trail on completion",
      description:
        "Who approved what, when, and why. Runbook and incident response playbook generated automatically — no institutional knowledge lost.",
    },
  ];

  return (
    <section id="how" className="py-32 border-t border-border">
      <div className="container">
        <div className="section-label">
          <span className="rule"></span>
          <span className="text">The Process</span>
          <span className="rule"></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-20 items-start mt-16">
          {/* Left: Steps */}
          <div>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.2] tracking-tight mb-6">
              One input.
              <br />
              <em className="italic text-accent">
                Structured, governed,
                <br />
                repeatable
              </em>{" "}
              output.
            </h2>
            <p className="text-muted-fg max-w-[28rem] mb-12 mt-6">
              Enterprise IT onboarding isn't just complicated — it's the same
              checklist done manually, every time, with accountability gaps that
              create risk.
            </p>

            <div className="flex flex-col gap-0">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex gap-6 p-6 transition-all duration-200 hover:pl-8 ${
                    index === 0 ? "border-t border-border" : ""
                  } border-b border-border`}
                >
                  <div className="font-serif text-2xl text-accent opacity-50 flex-shrink-0 w-8 leading-none">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[0.9rem] text-muted-fg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Comparison Card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-card border border-border border-t-2 border-t-accent rounded-lg p-8 shadow-[0_4px_12px_rgba(26,26,26,0.06)]">
              <div className="font-mono text-[0.65rem] font-medium tracking-[0.15em] uppercase text-accent mb-4">
                Before & After
              </div>
              <h3 className="font-serif text-2xl font-normal leading-tight mb-4">
                Time to go-live
              </h3>
              <p className="text-[0.875rem] text-muted-fg mb-6">
                Mid-size enterprise, 500-user SaaS rollout with SSO + security
                review
              </p>

              {/* Timeline bars */}
              <div>
                <div className="flex items-center gap-3 py-3 border-b border-border">
                  <div className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted-fg w-16 flex-shrink-0">
                    Before
                  </div>
                  <div className="flex-1 h-1 bg-muted rounded overflow-hidden">
                    <div className="h-full bg-border rounded w-full"></div>
                  </div>
                  <div className="font-mono text-[0.7rem] font-medium w-10 text-right flex-shrink-0 text-muted-fg">
                    4 mo.
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <div className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted-fg w-16 flex-shrink-0">
                    After
                  </div>
                  <div className="flex-1 h-1 bg-muted rounded overflow-hidden">
                    <div className="h-full bg-accent rounded w-[12%]"></div>
                  </div>
                  <div className="font-mono text-[0.7rem] font-medium w-10 text-right flex-shrink-0 text-accent">
                    2 wk.
                  </div>
                </div>
              </div>

              {/* Cost */}
              <div className="h-px bg-border my-6"></div>
              <div className="font-mono text-[0.65rem] font-medium tracking-[0.15em] uppercase text-accent mb-3">
                Cost
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[0.875rem] text-muted-fg">
                  Consulting fees
                </span>
                <span className="font-serif text-xl line-through text-muted-fg">
                  $300K
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[0.875rem] text-muted-fg">
                  With Onboard
                </span>
                <span className="font-serif text-2xl text-accent">Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
