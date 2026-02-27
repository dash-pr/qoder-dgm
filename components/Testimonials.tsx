export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "We used to spend 3 months coordinating between Okta, Salesforce, and our security team. Onboard had the entire plan generated with conflict analysis before our first vendor call.",
      author: "Head of IT Infrastructure",
      company: "Financial Services, Tokyo — 2,400 employees",
    },
    {
      quote:
        "The governance routing alone saved us 6 weeks. Instead of chasing CISO and Legal over email, approvals were queued and documented automatically. That's the part that impresses auditors.",
      author: "CISO",
      company: "Manufacturing Enterprise, Osaka — 8,000 employees",
    },
    {
      quote:
        "Our IT manager left mid-implementation. With the old process, we would have lost everything. With Onboard, the full runbook and audit trail meant the next person picked up exactly where we left off.",
      author: "VP of Operations",
      company: "SaaS company, Tokyo — 650 employees",
    },
  ];

  return (
    <section className="py-32 border-t border-border">
      <div className="container">
        <div className="section-label">
          <span className="rule"></span>
          <span className="text">From the Field</span>
          <span className="rule"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-8 shadow-sm transition-all duration-200 hover:shadow-[0_4px_12px_rgba(26,26,26,0.06)]"
            >
              <div className="font-serif text-6xl leading-none text-accent opacity-40 mb-2">
                "
              </div>
              <p className="font-serif italic text-base leading-[1.7] text-fg mb-6">
                {testimonial.quote}
              </p>
              <div className="h-px bg-border mb-4"></div>
              <div className="font-mono text-[0.65rem] font-medium tracking-[0.12em] uppercase text-muted-fg">
                <span className="block text-fg mb-1">{testimonial.author}</span>
                {testimonial.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
