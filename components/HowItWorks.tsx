export default function HowItWorks() {
  const steps = [
    {
      number: "I",
      title: "Discovery & Analysis",
      description:
        "The agent scans your existing IT environment, identifies integrations, and maps dependencies automatically.",
    },
    {
      number: "II",
      title: "Intelligent Planning",
      description:
        "Generates an optimized sequence with conflict detection, compliance checks, and security review routing.",
    },
    {
      number: "III",
      title: "Human-in-the-Loop Gates",
      description:
        "Critical steps require stakeholder approval (CISO, Legal, Procurement) before execution proceeds.",
    },
    {
      number: "IV",
      title: "Execution & Handoff",
      description:
        "Automated provisioning, testing, and documentation. Complete audit trail and runbooks delivered.",
    },
  ];

  return (
    <section id="how-it-works" className="py-40 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">
          <span>Architecture</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16 items-start">
          {/* Left: Steps */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-12">
              Four steps. Zero manual intervention.
            </h2>

            <div className="space-y-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-6 pl-0 hover:pl-4 transition-all duration-200"
                >
                  <div className="font-serif text-4xl text-accent font-semibold min-w-[50px]">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-fg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Comparison Card */}
          <div className="lg:sticky lg:top-32">
            <div className="bg-card border border-border border-t-[3px] border-t-accent rounded-lg p-8 shadow-sm">
              <h4 className="font-serif text-2xl mb-8">Before & After</h4>

              {/* Timeline bars */}
              <div className="mb-8">
                <div className="mb-4">
                  <span className="block font-semibold mb-2">Traditional</span>
                  <div className="h-10 bg-gradient-to-r from-muted to-border rounded flex items-center px-4 font-mono text-sm">
                    4 months
                  </div>
                </div>
                <div>
                  <span className="block font-semibold mb-2">
                    With Onboard
                  </span>
                  <div className="h-10 bg-gradient-to-r from-accent-2 to-accent rounded flex items-center px-4 font-mono text-sm text-white max-w-[40%]">
                    2 weeks
                  </div>
                </div>
              </div>

              {/* Cost comparison */}
              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center mb-3">
                  <span>External Consultants</span>
                  <span className="line-through text-muted-fg">$300K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Onboard Agent</span>
                  <span className="text-accent font-semibold">Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
