export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="font-serif text-base text-muted-fg no-underline">
            On<em className="italic text-accent">board</em>
          </a>
          <div className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-muted-fg text-center md:text-right">
            Enterprise SaaS Orchestration — Tokyo, 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
