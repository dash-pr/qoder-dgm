export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg/95 backdrop-blur-md border-b border-border z-50 px-8 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="text-2xl font-serif font-semibold">
          On<span className="italic text-accent">board</span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#how-it-works"
            className="hidden md:block font-medium text-fg hover:text-accent transition-colors duration-200"
          >
            How It Works
          </a>
          <a
            href="#security"
            className="hidden md:block font-medium text-fg hover:text-accent transition-colors duration-200"
          >
            Security
          </a>
          <a
            href="#demo"
            className="hidden md:block font-medium text-fg hover:text-accent transition-colors duration-200"
          >
            Demo
          </a>
          <a
            href="#cta"
            className="inline-block px-6 py-3 bg-accent text-white font-medium rounded hover:-translate-y-px hover:shadow-lg hover:shadow-accent/30 transition-all duration-200"
          >
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
