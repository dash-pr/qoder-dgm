export default function Security() {
  const features = [
    {
      icon: "🔐",
      title: "SSO & SAML Automation",
      description:
        "Automatically configures single sign-on with your identity provider, enforcing MFA and conditional access policies.",
    },
    {
      icon: "✓",
      title: "Compliance Checks (APPI/Japan)",
      description:
        "Built-in validation for Japanese data protection regulations, ensuring cross-border data handling compliance.",
    },
    {
      icon: "🔄",
      title: "Governance Routing",
      description:
        "Intelligent approval workflows route security-critical decisions to the right stakeholders automatically.",
    },
    {
      icon: "🛡️",
      title: "Firewall Rule Generation",
      description:
        "Generates least-privilege network rules based on discovered integrations and traffic patterns.",
    },
    {
      icon: "📊",
      title: "Data Flow Mapping",
      description:
        "Visualizes and documents how data moves between systems for security audits and compliance reviews.",
    },
    {
      icon: "📝",
      title: "Immutable Audit Trail",
      description:
        "Every action, decision, and configuration change is logged with cryptographic verification for complete traceability.",
    },
  ];

  return (
    <section id="security" className="bg-muted py-40 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label">
          <span>Security & Compliance</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">
          Enterprise-grade security built in
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border border-t-[3px] rounded-lg p-8 hover:border-t-accent hover:border-accent/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 border border-border rounded-lg flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-fg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
