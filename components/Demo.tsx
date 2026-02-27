"use client";

import { useState } from "react";

const steps = [
  { name: "Discovery — scan IT environment", isHumanGate: false },
  { name: "Planning — generate sequence, flag conflicts", isHumanGate: false },
  {
    name: "Security Review — SAML/SSO, APPI compliance, firewall rules",
    isHumanGate: false,
  },
  {
    name: "⚑ Human Gate — CISO/Procurement/Legal approval",
    isHumanGate: true,
  },
  { name: "Execution — API configs, user provisioning", isHumanGate: false },
  { name: "Integration Testing — 47 tests, documented", isHumanGate: false },
  {
    name: "Handoff — audit trail, runbook, incident playbook",
    isHumanGate: false,
  },
];

type StepStatus = "queued" | "running" | "complete" | "approval";

export default function Demo() {
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    new Array(steps.length).fill("queued")
  );
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState("0.0s");

  const runDemo = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setStepStatuses(new Array(steps.length).fill("queued"));

    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      setElapsed(`${elapsedSeconds}s`);
    }, 100);

    for (let i = 0; i < steps.length; i++) {
      // Set to running
      setStepStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[i] = "running";
        return newStatuses;
      });

      // Wait
      const duration = i === 3 ? 1500 : 800;
      await new Promise((resolve) => setTimeout(resolve, duration));

      // Set to complete
      setStepStatuses((prev) => {
        const newStatuses = [...prev];
        newStatuses[i] = i === 3 ? "approval" : "complete";
        return newStatuses;
      });
    }

    clearInterval(timerInterval);
    const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    setElapsed(`${totalElapsed}s — Complete`);

    setTimeout(() => {
      setIsRunning(false);
    }, 1000);
  };

  const getStatusIcon = (status: StepStatus, isHumanGate: boolean) => {
    if (status === "complete" || status === "approval") {
      return "✓";
    }
    return "";
  };

  const getStatusClass = (status: StepStatus) => {
    switch (status) {
      case "queued":
        return "bg-[#333]";
      case "running":
        return "bg-accent animate-pulse";
      case "complete":
        return "bg-[#28C840]";
      case "approval":
        return "bg-[#3B82F6]";
      default:
        return "bg-[#333]";
    }
  };

  return (
    <section id="demo" className="bg-[#1A1A1A] text-white py-32 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="section-label text-accent-2">
          <span>Live Demo</span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-center mb-12">
          Watch the agent orchestrate a full enterprise rollout
        </h2>

        <div className="max-w-[900px] mx-auto bg-[#0D0D0D] border border-[#333] rounded-lg overflow-hidden">
          {/* Terminal header */}
          <div className="bg-[#1F1F1F] px-4 py-3 flex items-center gap-2 border-b border-[#333]">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm min-h-[400px]">
            <div className="mb-6 p-4 bg-accent/10 border-l-[3px] border-accent text-[#888]">
              → Trigger: &quot;We need to implement Salesforce for 500 users in
              our Japan region&quot;
            </div>

            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded transition-colors"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${getStatusClass(
                      stepStatuses[index]
                    )}`}
                  >
                    {getStatusIcon(stepStatuses[index], step.isHumanGate)}
                  </div>
                  <div
                    className={`flex-1 ${
                      step.isHumanGate ? "text-[#60A5FA]" : "text-[#CCC]"
                    }`}
                  >
                    {step.name}
                  </div>
                  {step.isHumanGate && (
                    <span className="bg-[#3B82F6] text-white px-2 py-1 rounded text-[0.7rem]">
                      Requires Approval
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-[#333] text-[#888] text-[0.85rem]">
              Elapsed: {elapsed}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="px-6 py-3 bg-accent text-white font-medium rounded hover:-translate-y-px hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? "⏸ Running..." : "▶ Run Demo"}
          </button>
        </div>
      </div>
    </section>
  );
}
