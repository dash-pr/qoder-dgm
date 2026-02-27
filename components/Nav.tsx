export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/88 backdrop-blur-xl border-b border-border">
      <div className="max-w-[64rem] mx-auto px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-xl tracking-tight text-fg no-underline">
          On<em className="italic text-accent">board</em>
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <a
              href="#how"
              className="text-sm font-medium tracking-wider text-muted-fg no-underline hover:text-fg transition-colors duration-200"
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="#security"
              className="text-sm font-medium tracking-wider text-muted-fg no-underline hover:text-fg transition-colors duration-200"
            >
              Security
            </a>
          </li>
          <li>
            <a
              href="#demo"
              className="text-sm font-medium tracking-wider text-muted-fg no-underline hover:text-fg transition-colors duration-200"
            >
              Demo
            </a>
          </li>
        </ul>

        <button className="bg-accent text-white border-none rounded-md px-5 py-2 font-sans text-sm font-medium tracking-wider cursor-pointer min-h-[44px] transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)]">
          Request Demo
        </button>
      </div>
    </nav>
  );
}
