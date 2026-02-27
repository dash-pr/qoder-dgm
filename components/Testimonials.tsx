export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "We rolled out Microsoft 365 across 12 regional offices in Japan in under two weeks. Our previous vendor quoted us 6 months and ¥40M.",
      author: "Head of IT — Tokyo Manufacturing Co.",
    },
    {
      quote:
        "The audit trail alone saved us during our ISO 27001 certification. Every configuration change was documented with approval chains intact.",
      author: "CISO — Osaka Financial Services",
    },
    {
      quote:
        "Onboard discovered integration conflicts our team missed three times. The agent prevented what would have been a catastrophic rollout failure.",
      author: "VP Engineering — Tokyo Tech Startup",
    },
  ];

  return (
    <section id="testimonials" className="py-40 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">
          <span>Customer Stories</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">
          Trusted by leading enterprises
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-8"
            >
              <div className="font-serif text-6xl text-accent leading-none mb-4">
                &quot;
              </div>
              <p className="font-serif italic text-lg leading-relaxed mb-6">
                {testimonial.quote}
              </p>
              <div className="h-px bg-border mb-4" />
              <div className="font-mono text-sm text-muted-fg">
                {testimonial.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
