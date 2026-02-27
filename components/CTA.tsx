export default function CTA() {
  return (
    <section id="cta" className="bg-muted py-32 px-8 text-center">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl mb-8">
          Ready to cut 4 months down to 2 weeks?
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
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
