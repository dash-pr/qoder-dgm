export default function Stats() {
  const stats = [
    { number: "$300K", label: "Avg. consulting cost saved" },
    { number: "94%", label: "Reduction in setup time" },
    { number: "100%", label: "Audit trail coverage" },
    { number: "0", label: "Single points of failure" },
  ];

  return (
    <section id="stats" className="bg-muted py-16 px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-8 ${
              index < stats.length - 1 ? "md:border-r border-border" : ""
            } ${index < stats.length - 1 ? "border-b md:border-b-0 border-border" : ""}`}
          >
            <span className="block font-serif text-5xl font-semibold text-accent mb-2">
              {stat.number}
            </span>
            <span className="text-muted-fg text-[0.95rem]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
