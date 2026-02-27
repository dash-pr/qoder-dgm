"use client";

import { useState } from "react";

type FormStep = "request" | "security" | "approval";

export default function DemoForms() {
  const [activeForm, setActiveForm] = useState<FormStep>("request");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartDemo = async () => {
    setIsAnimating(true);
    setActiveForm("request");

    // Simulate form progression
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setActiveForm("security");

    await new Promise((resolve) => setTimeout(resolve, 2500));
    setActiveForm("approval");

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsAnimating(false);
  };

  return (
    <section className="py-32 bg-muted border-t border-border">
      <div className="container">
        <div className="section-label">
          <span className="rule"></span>
          <span className="text">Live Agent Demo</span>
          <span className="rule"></span>
        </div>

        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.2] tracking-tight text-center max-w-[44rem] mx-auto mb-4">
          Watch the agent <em className="italic text-accent">coordinate</em> your
          entire rollout
        </h2>
        <p className="text-center text-muted-fg max-w-[40rem] mx-auto mb-16">
          From IT request to security review to stakeholder approvals — one input,
          fully orchestrated governance workflow.
        </p>

        {/* Form Tabs */}
        <div className="max-w-[56rem] mx-auto mb-8">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveForm("request")}
              className={`flex-1 py-4 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-200 border-b-2 ${
                activeForm === "request"
                  ? "border-accent text-accent font-medium"
                  : "border-transparent text-muted-fg hover:text-fg"
              }`}
            >
              <span className="block mb-1">Step 1</span>
              <span className="block text-[0.65rem] opacity-60">
                Implementation Request
              </span>
            </button>
            <button
              onClick={() => setActiveForm("security")}
              className={`flex-1 py-4 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-200 border-b-2 ${
                activeForm === "security"
                  ? "border-accent text-accent font-medium"
                  : "border-transparent text-muted-fg hover:text-fg"
              }`}
            >
              <span className="block mb-1">Step 2</span>
              <span className="block text-[0.65rem] opacity-60">
                Security Review
              </span>
            </button>
            <button
              onClick={() => setActiveForm("approval")}
              className={`flex-1 py-4 font-mono text-[0.7rem] tracking-[0.12em] uppercase transition-all duration-200 border-b-2 ${
                activeForm === "approval"
                  ? "border-accent text-accent font-medium"
                  : "border-transparent text-muted-fg hover:text-fg"
              }`}
            >
              <span className="block mb-1">Step 3</span>
              <span className="block text-[0.65rem] opacity-60">
                Go-Live Approval
              </span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-[56rem] mx-auto bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          {/* Form 1: Implementation Request */}
          {activeForm === "request" && (
            <div className="p-8">
              <div className="mb-6">
                <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-accent mb-2">
                  Who fills this
                </div>
                <div className="font-serif text-2xl">IT Manager (2 minutes)</div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What are you implementing?
                  </label>
                  <input
                    type="text"
                    value="Salesforce Sales Cloud for 500 users"
                    readOnly
                    className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business reason
                  </label>
                  <textarea
                    value="Replacing 3 legacy CRMs, need unified pipeline visibility"
                    readOnly
                    rows={2}
                    className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Who needs access?
                  </label>
                  <input
                    type="text"
                    value="350 sales reps, 100 managers, 50 ops team"
                    readOnly
                    className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    What systems must it connect to?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Azure AD", "Office 365", "NetSuite ERP", "Marketing tools"].map(
                      (system) => (
                        <label
                          key={system}
                          className="flex items-center gap-2 p-3 border border-border rounded bg-muted cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked
                            readOnly
                            className="w-4 h-4 accent-accent"
                          />
                          <span className="text-sm">{system}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Any compliance requirements?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "GDPR", checked: true },
                      { label: "CCPA", checked: true },
                      { label: "SOC 2", checked: false },
                      { label: "None", checked: false },
                    ].map((item) => (
                      <label
                        key={item.label}
                        className="flex items-center gap-2 p-3 border border-border rounded bg-muted cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          readOnly
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Target go-live date
                    </label>
                    <input
                      type="date"
                      value="2025-04-15"
                      readOnly
                      className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your email
                    </label>
                    <input
                      type="email"
                      value="it-manager@company.com"
                      readOnly
                      className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-fg">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>
                    Agent auto-generates security review checklist from this
                    request
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form 2: Security Review */}
          {activeForm === "security" && (
            <div className="p-8">
              <div className="mb-6">
                <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-accent mb-2">
                  Auto-generated by agent
                </div>
                <div className="font-serif text-2xl">Security Review</div>
              </div>

              {/* Context Box */}
              <div className="mb-6 p-4 bg-accent/5 border-l-2 border-accent rounded">
                <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-accent mb-2">
                  📋 Request Summary
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Salesforce Sales Cloud</strong> | 500 users | Sales Ops
                    team
                  </div>
                  <div>
                    <strong>Compliance:</strong> GDPR, CCPA
                  </div>
                  <div>
                    <strong>Integrations:</strong> Azure AD, Office 365, NetSuite
                    ERP, Marketing tools
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    SSO configured?
                  </label>
                  <select className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans">
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Blocked</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Multi-factor auth enabled?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mfa"
                          checked
                          readOnly
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mfa"
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Data encryption verified?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="encryption"
                          checked
                          readOnly
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="encryption"
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    All integrations tested?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Azure AD",
                      "Office 365",
                      "NetSuite",
                      "Marketing tools",
                    ].map((integration) => (
                      <label
                        key={integration}
                        className="flex items-center gap-2 p-3 border border-border rounded bg-muted"
                      >
                        <input
                          type="checkbox"
                          checked
                          readOnly
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-sm">{integration}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Overall security risk
                  </label>
                  <select className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Security reviewer
                  </label>
                  <input
                    type="text"
                    value="Sarah Chen, CISO"
                    readOnly
                    className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Approval status
                  </label>
                  <select className="w-full px-4 py-3 border border-accent/50 rounded-md bg-accent/5 text-accent font-sans font-medium">
                    <option>✅ Approved</option>
                    <option>⚠️ Conditional</option>
                    <option>❌ Rejected</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-fg">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Agent routes to Procurement, Legal, IT Ops for parallel
                    approvals
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form 3: Go-Live Approval */}
          {activeForm === "approval" && (
            <div className="p-8">
              <div className="mb-6">
                <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-accent mb-2">
                  All stakeholders
                </div>
                <div className="font-serif text-2xl">Go-Live Approval</div>
              </div>

              {/* Status Dashboard */}
              <div className="mb-8 p-6 bg-muted border border-border rounded-lg">
                <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-accent mb-4">
                  📊 Implementation Status
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-fg mb-1">Days since request</div>
                    <div className="font-serif text-2xl text-accent">12</div>
                  </div>
                  <div>
                    <div className="text-muted-fg mb-1">Security review</div>
                    <div className="font-serif text-lg text-accent">
                      ✅ Approved
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-fg mb-1">Awaiting</div>
                    <div className="font-serif text-sm">
                      Procurement, Legal, IT Ops, Sponsor
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Sections */}
              <div className="space-y-6">
                {[
                  {
                    name: "Procurement",
                    questions: ["Contract signed?", "PO number"],
                    approver: "Finance Controller",
                    status: "approved",
                  },
                  {
                    name: "Legal",
                    questions: ["Terms reviewed?", "DPA signed?"],
                    approver: "Legal Counsel",
                    status: "approved",
                  },
                  {
                    name: "IT Operations",
                    questions: [
                      "Production tested?",
                      "Rollback plan ready?",
                      "Monitoring configured?",
                    ],
                    approver: "IT Ops Lead",
                    status: "pending",
                  },
                  {
                    name: "Business Sponsor",
                    questions: [
                      "User training done?",
                      "Success metrics defined?",
                    ],
                    approver: "VP Sales",
                    status: "pending",
                  },
                ].map((section) => (
                  <div
                    key={section.name}
                    className="p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase font-medium">
                        {section.name}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          section.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {section.status === "approved" ? "✅ Approved" : "⏳ Pending"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-fg">
                      {section.questions.map((q) => (
                        <div key={q} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={section.status === "approved"}
                            readOnly
                            className="w-4 h-4 accent-accent"
                          />
                          <span>{q}</span>
                        </div>
                      ))}
                      <div className="pt-2 text-xs">
                        Approver: <strong>{section.approver}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-4">
                <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-accent"
                    disabled
                  />
                  <span className="text-sm">All stakeholders approved</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Go-live date & time
                    </label>
                    <input
                      type="datetime-local"
                      value="2025-04-15T09:00"
                      readOnly
                      className="w-full px-4 py-3 border border-border rounded-md bg-muted text-fg font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Final authorization
                    </label>
                    <input
                      type="text"
                      placeholder="Type your name to approve"
                      className="w-full px-4 py-3 border border-border rounded-md bg-card text-fg font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-fg">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>
                    Full audit trail generated: who approved what, when, and why
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            onClick={handleStartDemo}
            disabled={isAnimating}
            className="bg-accent text-white border-none rounded-md px-8 py-3.5 font-sans text-base font-medium tracking-wider cursor-pointer min-h-[44px] transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnimating ? "▶ Running Demo..." : "▶ Watch Agent Coordinate Forms"}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-serif text-3xl text-accent mb-2">4.2 months</div>
              <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted-fg">
                Average SaaS implementation time
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl text-accent mb-2">2 weeks</div>
              <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted-fg">
                With Onboard agent orchestration
              </div>
            </div>
            <div>
              <div className="font-serif text-3xl text-accent mb-2">$47K</div>
              <div className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted-fg">
                Labor cost savings per implementation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
