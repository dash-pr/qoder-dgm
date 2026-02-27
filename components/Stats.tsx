export default function Stats() {
  const stats = [
    { number: "$300K", label: "Avg. consulting cost saved" },
    { number: "94%", label: "Reduction in setup time" },
    { number: "100%", label: "Audit trail coverage" },
    { number: "0", label: "Single points of failure" },
  ];

  return (
    <section className="py-24 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 ${
                index < stats.length - 1 ? "md:border-r border-border" : ""
              } ${
                index < stats.length - 1 ? "border-b md:border-b-0 border-border" : ""
              }`}
            >
              <div className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-none text-accent mb-2">
                {stat.number}
              </div>
              <div className="font-mono text-[0.7rem] font-medium tracking-[0.15em] uppercase text-muted-fg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
