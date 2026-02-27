export default function Footer() {
  return (
    <footer className="bg-fg text-muted py-12 px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl font-serif font-semibold">
          On<span className="italic text-accent">board</span>
        </div>
        <div className="font-mono text-sm text-muted-fg text-center md:text-right">
          Enterprise SaaS onboarding, orchestrated by AI
        </div>
      </div>
    </footer>
  );
}
