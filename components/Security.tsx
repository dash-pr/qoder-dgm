export default function Security() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M12 2L4 6v6c0 5 3.5 9.74 8 11 4.5-1.26 8-6 8-11V6L12 2z" />
        </svg>
      ),
      title: "SSO & SAML Automation",
      description:
        "Generates and validates SAML configurations, Okta/Azure AD integration, and user provisioning rules — automatically, without back-and-forth with vendor teams.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Compliance Checks",
      description:
        "Validates against your existing ISMS policies, checks data residency requirements by region (including Japan's APPI), and flags non-compliant configurations before they reach your CISO.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Governance Routing",
      description:
        "Every approval is routed to the right stakeholder — CISO, procurement, legal — with context. Decisions are logged. No more chasing approvals over email.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Firewall Rule Generation",
      description:
        "Scans your existing network topology and generates minimal-privilege firewall rules for each new SaaS integration — reviewed by your team before execution.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Data Flow Mapping",
      description:
        "Automatically documents what data flows where, enabling data lineage tracking required for compliance audits and vendor security questionnaires.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Immutable Audit Trail",
      description:
        "Every action, approval, configuration change, and test result is logged with timestamp and owner. The institutional knowledge never lives in one person's head again.",
    },
  ];

  return (
    <section id="security" className="py-32 bg-muted border-t border-border">
      <div className="container">
        <div className="section-label">
          <span className="rule"></span>
          <span className="text">Security First</span>
          <span className="rule"></span>
        </div>

        <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.2] tracking-tight text-center max-w-[36rem] mx-auto mb-4">
          Built for enterprises with <em className="italic text-accent">strong security</em> requirements
        </h2>
        <p className="text-center text-muted-fg max-w-[32rem] mx-auto mb-16">
          Security review is the biggest bottleneck in enterprise SaaS adoption.
          The agent eliminates the wait without cutting corners.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-8 shadow-sm transition-all duration-200 hover:shadow-[0_4px_12px_rgba(26,26,26,0.06)] hover:border-[rgba(184,134,11,0.3)] hover:bg-[rgba(250,250,248,0.8)]"
            >
              <div className="w-10 h-10 mb-5 flex items-center justify-center border border-border rounded-md text-accent">
                {feature.icon}
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-[0.875rem] text-muted-fg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
