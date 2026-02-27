"use client";

import { useState } from "react";

const steps = [
  {
    num: "01",
    name: "Discovery",
    desc: "Scanning existing IT environment — Active Directory, SSO provider, firewall rules, network topology",
    time: 1800,
    completeText: "Complete",
  },
  {
    num: "02",
    name: "Planning",
    desc: "Generating implementation sequence, mapping dependencies, flagging conflicts with legacy systems",
    time: 2200,
    completeText: "Complete",
  },
  {
    num: "03",
    name: "Security Review",
    desc: "Checking ISMS compliance, SAML/SSO config, data residency (Japan), generating firewall rules",
    time: 2800,
    completeText: "Complete",
  },
  {
    num: "04",
    name: "⚑ Human Gate — CISO Approval",
    desc: "Security config submitted for CISO, Procurement, and Legal sign-off. Awaiting governance approval.",
    time: 1500,
    completeText: "Approved ✓",
    isGate: true,
  },
  {
    num: "05",
    name: "Execution",
    desc: "Automating API configs, SSO integration, user provisioning for 500 accounts, role assignment",
    time: 3200,
    completeText: "Complete",
  },
  {
    num: "06",
    name: "Integration Testing",
    desc: "Running 47 integration tests across auth, data flows, and permission models. Documenting results.",
    time: 2000,
    completeText: "Complete",
  },
  {
    num: "07",
    name: "Handoff",
    desc: "Generating full audit trail, runbook, incident response playbook, and knowledge base for IT team",
    time: 1400,
    completeText: "Delivered",
  },
];

type StepStatus = "pending" | "active" | "complete";

export default function Demo() {
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    new Array(steps.length).fill("pending")
  );
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerText, setTimerText] = useState(
    'Press "Watch the Agent Work" above to start'
  );

  const runDemo = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setStepStatuses(new Array(steps.length).fill("pending"));
    setTotalSeconds(0);
    setTimerText("Running…");

    // Smooth scroll to demo
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Start timer
    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTotalSeconds(elapsed);
      setTimerText(`Elapsed: ${elapsed}s`);
    }, 1000);

    // Run steps
    for (let i = 0; i < steps.length; i++) {
      // Set to active
      setStepStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[i] = "active";
        return newStatuses;
      });

      // Wait
      await new Promise((resolve) => setTimeout(resolve, steps[i].time));

      // Set to complete
      setStepStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[i] = "complete";
        return newStatuses;
      });

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    clearInterval(timerInterval);
    const finalElapsed = Math.floor((Date.now() - startTime) / 1000);
    setTimerText(
      `Complete in ${finalElapsed}s — Full audit trail & runbook generated`
    );
    setIsRunning(false);
  };

  return (
    <section id="demo" className="relative py-32 bg-fg text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(184,134,11,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="container relative z-10">
        <div className="section-label">
          <span className="rule opacity-10"></span>
          <span className="text text-accent-2">Live Agent Demo</span>
          <span className="rule opacity-10"></span>
        </div>

        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.2] tracking-tight text-center max-w-[44rem] mx-auto mb-4">
          Watch the agent <em className="italic text-accent-2">orchestrate</em> a
          full enterprise rollout
        </h2>
        <p className="text-center text-white/55 max-w-[32rem] mx-auto mb-16">
          Trigger: "We need to implement Salesforce for 500 users." This is what
          happens next.
        </p>

        {/* Terminal */}
        <div className="bg-white/[0.04] border border-white/10 rounded-lg overflow-hidden max-w-[52rem] mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
          {/* Terminal bar */}
          <div className="bg-white/[0.06] border-b border-white/[0.08] px-4 py-3 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <div className="flex-1 text-center font-mono text-[0.7rem] tracking-[0.1em] uppercase text-white/30">
              Onboard Agent — Salesforce Enterprise Rollout
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-6">
            {/* Trigger line */}
            <div className="font-mono text-[0.8rem] text-white/35 mb-6 pb-4 border-b border-white/[0.06]">
              <span className="text-accent-2 mr-2">›</span>
              <span className="text-white/75">
                "We need to implement Salesforce for 500 users in our Japan region"
              </span>
            </div>

            {/* Pipeline */}
            <div className="flex flex-col gap-2.5">
              {steps.map((step, index) => {
                const status = stepStatuses[index];
                const isActive = status === "active";
                const isComplete = status === "complete";

                return (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-3.5 px-4 bg-white/[0.03] border rounded-md transition-all duration-200 cursor-default relative overflow-hidden ${
                      isActive
                        ? "bg-[rgba(184,134,11,0.08)] border-[rgba(184,134,11,0.3)]"
                        : isComplete
                        ? "bg-[rgba(40,200,64,0.04)] border-[rgba(40,200,64,0.15)]"
                        : "border-white/[0.06]"
                    } ${isActive ? "opacity-100" : isComplete ? "opacity-85" : "opacity-60"}`}
                  >
                    {/* Indicator */}
                    <div
                      className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center font-mono text-[0.65rem] font-medium ${
                        status === "pending"
                          ? "bg-white/[0.05] border border-white/[0.12] text-white/30"
                          : isActive
                          ? "bg-[rgba(184,134,11,0.2)] border border-accent text-accent-2 animate-pulse"
                          : "bg-[rgba(40,200,64,0.15)] border border-[rgba(40,200,64,0.4)] text-[#28C840]"
                      }`}
                    >
                      {isComplete ? "✓" : step.num}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div
                        className={`font-mono text-[0.75rem] font-medium tracking-[0.08em] uppercase mb-1 ${
                          isActive
                            ? "text-accent-2"
                            : isComplete
                            ? "text-white/50"
                            : "text-white/75"
                        }`}
                      >
                        {step.name}
                      </div>
                      <div className="text-[0.8rem] text-white/35 leading-[1.4]">
                        {step.desc}
                      </div>
                    </div>

                    {/* Badge */}
                    <span
                      className={`font-mono text-[0.65rem] tracking-wider uppercase px-2 py-1 rounded flex-shrink-0 self-center ${
                        step.isGate
                          ? "bg-[rgba(100,149,237,0.1)] border border-[rgba(100,149,237,0.25)] text-[#6495ED]"
                          : status === "pending"
                          ? "text-white/20"
                          : isActive
                          ? "bg-[rgba(184,134,11,0.15)] border border-[rgba(184,134,11,0.3)] text-accent-2"
                          : "bg-[rgba(40,200,64,0.1)] border border-[rgba(40,200,64,0.2)] text-[#28C840]"
                      }`}
                    >
                      {step.isGate
                        ? isComplete
                          ? "Approved ✓"
                          : "Requires Approval"
                        : status === "pending"
                        ? "Queued"
                        : isActive
                        ? "Running…"
                        : step.completeText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Timer */}
            <div className="text-center mt-8 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-white/20">
              {timerText.includes("Press") ? (
                timerText
              ) : (
                <>
                  {timerText.split("—")[0]}
                  {timerText.includes("—") && (
                    <span className="text-accent-2">
                      — {timerText.split("—")[1]}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="bg-accent text-white border-none rounded-md px-8 py-3.5 font-sans text-base font-medium tracking-wider cursor-pointer min-h-[44px] transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? "⏸ Running..." : "▶ Run Demo"}
          </button>
        </div>
      </div>
    </section>
  );
}
