"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Stage = "request" | "security" | "approval";
type TaskStatus = "queued" | "running" | "done";
type ApprovalStatus = "pending" | "approved";

interface ParallelTask {
  id: string;
  title: string;
  agent: string;
  status: TaskStatus;
  timestamp: string;
}

interface AgentMessage {
  agent: string;
  message: string;
  timestamp: string;
}

interface StakeholderApproval {
  name: string;
  checklist: string[];
  approver: string;
  status: ApprovalStatus;
}

export default function ImplementationDashboard() {
  const [activeStage, setActiveStage] = useState<Stage>("security");
  const [daysElapsed] = useState(12);
  const [stage2Complete, setStage2Complete] = useState(false);
  const [feedExpanded, setFeedExpanded] = useState(false);

  // Stage 2 form state
  const [ssoStatus, setSsoStatus] = useState("Completed");
  const [approvalStatus, setApprovalStatus] = useState("pending");

  // Parallel tasks
  const [parallelTasks, setParallelTasks] = useState<ParallelTask[]>([
    {
      id: "1",
      title: "Drafting SSO configuration for Azure AD",
      agent: "Security Agent",
      status: "done",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      title: "Generating GDPR data processing addendum template",
      agent: "Compliance Agent",
      status: "done",
      timestamp: "5 min ago",
    },
    {
      id: "3",
      title: "Creating test user accounts (sandbox)",
      agent: "IT Agent",
      status: "running",
      timestamp: "Now",
    },
    {
      id: "4",
      title: "Scheduling integration test window",
      agent: "IT Agent",
      status: "running",
      timestamp: "Now",
    },
    {
      id: "5",
      title: "Pre-building Slack notification for go-live",
      agent: "Comms Agent",
      status: "queued",
      timestamp: "Queued",
    },
    {
      id: "6",
      title: "Drafting runbook skeleton",
      agent: "Documentation Agent",
      status: "queued",
      timestamp: "Queued",
    },
  ]);

  // Agent feed
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([
    {
      agent: "Security Agent",
      message:
        "SSO config draft generated for Azure AD — awaiting security team review",
      timestamp: "12:34 PM",
    },
    {
      agent: "IT Agent",
      message: "3 sandbox users provisioned in Salesforce",
      timestamp: "12:35 PM",
    },
    {
      agent: "Compliance Agent",
      message: "GDPR DPA template populated with vendor details",
      timestamp: "12:36 PM",
    },
  ]);

  // Stakeholder approvals
  const [stakeholders, setStakeholders] = useState<StakeholderApproval[]>([
    {
      name: "Procurement",
      checklist: ["Contract signed", "PO number verified"],
      approver: "Finance Controller",
      status: "pending",
    },
    {
      name: "Legal",
      checklist: ["Terms reviewed", "DPA signed"],
      approver: "Legal Counsel",
      status: "pending",
    },
    {
      name: "IT Operations",
      checklist: [
        "Production tested",
        "Rollback plan ready",
        "Monitoring configured",
      ],
      approver: "IT Ops Lead",
      status: "pending",
    },
    {
      name: "Business Sponsor",
      checklist: ["User training done", "Success metrics defined"],
      approver: "VP Sales",
      status: "pending",
    },
  ]);

  // Simulate parallel tasks progressing
  useEffect(() => {
    const interval = setInterval(() => {
      setParallelTasks((prev) =>
        prev.map((task) => {
          if (task.status === "queued" && Math.random() > 0.7) {
            return { ...task, status: "running" as TaskStatus, timestamp: "Now" };
          }
          if (task.status === "running" && Math.random() > 0.8) {
            return {
              ...task,
              status: "done" as TaskStatus,
              timestamp: "Just now",
            };
          }
          return task;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate agent feed messages
  useEffect(() => {
    const messages = [
      {
        agent: "Orchestrator",
        message: "Stage 2 unblocked — notifying security reviewer via email",
      },
      {
        agent: "IT Agent",
        message: "Integration test window scheduled for Apr 12, 2:00 PM JST",
      },
      {
        agent: "Security Agent",
        message: "MFA enforcement rules validated against ISMS policy",
      },
      {
        agent: "Documentation Agent",
        message: "Runbook draft created with 23 operational procedures",
      },
      {
        agent: "Comms Agent",
        message: "Slack notification template created for #it-announcements",
      },
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < messages.length) {
        const newMessage = {
          ...messages[messageIndex],
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setAgentMessages((prev) => [...prev, newMessage]);
        messageIndex++;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitReview = () => {
    setStage2Complete(true);
    setApprovalStatus("approved");
    setActiveStage("approval");

    setAgentMessages((prev) => [
      ...prev,
      {
        agent: "Orchestrator",
        message:
          "Security review approved — routing to stakeholders for go-live approval",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleStakeholderApproval = (index: number) => {
    setStakeholders((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, status: "approved" as ApprovalStatus } : s
      )
    );
  };

  const allStakeholdersApproved = stakeholders.every(
    (s) => s.status === "approved"
  );

  const getStageStatus = (stage: Stage) => {
    if (stage === "request") return "complete";
    if (stage === "security")
      return stage2Complete ? "complete" : "in-progress";
    if (stage === "approval")
      return stage2Complete
        ? allStakeholdersApproved
          ? "complete"
          : "in-progress"
        : "locked";
    return "locked";
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      complete: "bg-green-100 text-green-700 border-green-200",
      "in-progress": "bg-accent/10 text-accent border-accent/20",
      locked: "bg-muted text-muted-fg border-border",
      running: "bg-accent/10 text-accent border-accent/20",
      done: "bg-green-100 text-green-700 border-green-200",
      queued: "bg-muted text-muted-fg border-border",
    };
    return styles[status as keyof typeof styles] || styles.locked;
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-fg hover:text-accent transition-colors duration-200 mb-2 no-underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="font-mono text-xs tracking-wider uppercase">
                  Back to Home
                </span>
              </Link>
              <h1 className="font-serif text-2xl font-normal mb-1">
                Salesforce Sales Cloud — 500 users
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-fg">
                <span className="font-mono text-xs tracking-wider uppercase">
                  Current Stage:{" "}
                  <span className="text-accent font-medium">
                    {activeStage === "request"
                      ? "Implementation Request"
                      : activeStage === "security"
                      ? "Security Review"
                      : "Go-Live Approval"}
                  </span>
                </span>
                <span className="w-px h-4 bg-border"></span>
                <span className="font-mono text-xs tracking-wider uppercase">
                  Days Elapsed: <span className="text-accent font-medium">{daysElapsed}</span>
                </span>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-mono text-xs tracking-wider uppercase text-muted-fg">
                  Overall Progress
                </div>
                <div className="font-serif text-3xl text-accent">
                  {stage2Complete
                    ? allStakeholdersApproved
                      ? "100%"
                      : "75%"
                    : "50%"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar - Stage Navigation */}
          <aside>
            <div className="sticky top-24">
              <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">
                Implementation Stages
              </div>
              <nav className="space-y-2">
                {[
                  { id: "request", label: "Implementation Request", num: "01" },
                  { id: "security", label: "Security Review", num: "02" },
                  { id: "approval", label: "Go-Live Approval", num: "03" },
                ].map((stage) => {
                  const status = getStageStatus(stage.id as Stage);
                  return (
                    <button
                      key={stage.id}
                      onClick={() =>
                        status !== "locked" && setActiveStage(stage.id as Stage)
                      }
                      disabled={status === "locked"}
                      className={`w-full text-left p-4 border rounded-lg transition-all duration-200 ${
                        activeStage === stage.id
                          ? "border-accent bg-accent/5"
                          : status === "locked"
                          ? "border-border bg-muted opacity-50 cursor-not-allowed"
                          : "border-border hover:border-accent/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-2xl text-accent opacity-50">
                          {stage.num}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">
                            {stage.label}
                          </div>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-mono tracking-wider uppercase border ${getStatusBadge(
                              status
                            )}`}
                          >
                            {status === "in-progress"
                              ? "In Progress"
                              : status === "complete"
                              ? "Complete"
                              : "Locked"}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Parallel Work Summary */}
              <div className="mt-8 p-4 border border-border rounded-lg bg-card">
                <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-3">
                  Running in Parallel
                </div>
                <div className="space-y-2 text-sm">
                  {parallelTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          task.status === "done"
                            ? "bg-green-500"
                            : task.status === "running"
                            ? "bg-accent animate-pulse"
                            : "bg-muted-fg"
                        }`}
                      ></span>
                      <span className="flex-1 text-xs text-muted-fg truncate">
                        {task.title.length > 30
                          ? task.title.substring(0, 30) + "..."
                          : task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Area */}
          <main>
            {/* Stage 1: Implementation Request */}
            {activeStage === "request" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-3xl font-normal">
                    Implementation Request
                  </h2>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
                    ✓ Complete
                  </span>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">
                        What
                      </div>
                      <div className="text-base">
                        Salesforce Sales Cloud for 500 users
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">
                        Business Reason
                      </div>
                      <div className="text-base">
                        Replacing 3 legacy CRMs, need unified pipeline visibility
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">
                        Who Needs Access
                      </div>
                      <div className="text-base">
                        350 sales reps, 100 managers, 50 ops team
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">
                        Target Go-Live
                      </div>
                      <div className="text-base">April 15, 2025</div>
                    </div>
                  </div>

                  <div className="h-px bg-border my-4"></div>

                  <div>
                    <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-3">
                      System Integrations
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Azure AD", "Office 365", "NetSuite ERP", "Marketing tools"].map(
                        (system) => (
                          <span
                            key={system}
                            className="px-3 py-1 bg-muted border border-border rounded text-sm"
                          >
                            {system}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-3">
                      Compliance Requirements
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["GDPR", "CCPA"].map((req) => (
                        <span
                          key={req}
                          className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded text-sm font-medium"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border my-4"></div>

                  <div className="text-sm text-muted-fg">
                    <span className="font-medium">Requested by:</span>{" "}
                    it-manager@company.com
                  </div>
                </div>
              </div>
            )}

            {/* Stage 2: Security Review */}
            {activeStage === "security" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-3xl font-normal">
                    Security Review
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                      stage2Complete ? "complete" : "in-progress"
                    )}`}
                  >
                    {stage2Complete ? "✓ Complete" : "⚡ Agent Working"}
                  </span>
                </div>

                {/* Context Banner */}
                <div className="mb-6 p-4 bg-accent/5 border-l-2 border-accent rounded">
                  <div className="font-mono text-xs tracking-wider uppercase text-accent mb-2">
                    📋 Request Summary (Auto-generated)
                  </div>
                  <div className="text-sm space-y-1">
                    <div>
                      <strong>Salesforce Sales Cloud</strong> | 500 users | Sales
                      Ops team
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

                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        SSO configured?
                      </label>
                      <select
                        value={ssoStatus}
                        onChange={(e) => setSsoStatus(e.target.value)}
                        className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent"
                      >
                        <option>Completed</option>
                        <option>In Progress</option>
                        <option>Blocked</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Overall security risk
                      </label>
                      <select className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
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
                            defaultChecked
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
                            defaultChecked
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
                            defaultChecked
                            className="w-4 h-4 accent-accent"
                          />
                          <span className="text-sm">{integration}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Security reviewer
                    </label>
                    <input
                      type="text"
                      defaultValue="Sarah Chen, CISO"
                      className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent"
                    />
                  </div>

                  {!stage2Complete && (
                    <button
                      onClick={handleSubmitReview}
                      className="w-full h-12 bg-accent text-white border-none rounded-md font-medium tracking-wider cursor-pointer transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)]"
                    >
                      Submit Security Review
                    </button>
                  )}

                  {stage2Complete && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded text-green-700 text-center font-medium">
                      ✓ Security review approved — routing to stakeholders
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stage 3: Go-Live Approval */}
            {activeStage === "approval" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-3xl font-normal">
                    Go-Live Approval
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                      !stage2Complete
                        ? "locked"
                        : allStakeholdersApproved
                        ? "complete"
                        : "in-progress"
                    )}`}
                  >
                    {!stage2Complete
                      ? "🔒 Locked"
                      : allStakeholdersApproved
                      ? "✓ Complete"
                      : "In Progress"}
                  </span>
                </div>

                {!stage2Complete ? (
                  <div className="p-8 bg-muted border border-border rounded-lg text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <div className="font-serif text-xl mb-2">
                      Awaiting Security Review
                    </div>
                    <div className="text-muted-fg">
                      Complete Stage 2 to unlock stakeholder approvals
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Status Dashboard */}
                    <div className="p-6 bg-muted border border-border rounded-lg">
                      <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">
                        📊 Implementation Status
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-sm">
                        <div>
                          <div className="text-muted-fg mb-1">
                            Days since request
                          </div>
                          <div className="font-serif text-2xl text-accent">
                            {daysElapsed}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-fg mb-1">Security review</div>
                          <div className="font-serif text-lg text-accent">
                            ✅ Approved
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-fg mb-1">
                            Stakeholders approved
                          </div>
                          <div className="font-serif text-2xl text-accent">
                            {stakeholders.filter((s) => s.status === "approved").length}
                            /4
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stakeholder Approvals Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {stakeholders.map((stakeholder, index) => (
                        <div
                          key={stakeholder.name}
                          className="bg-card border border-border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-mono text-xs tracking-[0.12em] uppercase font-medium">
                              {stakeholder.name}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                stakeholder.status === "approved"
                                  ? "done"
                                  : "queued"
                              )}`}
                            >
                              {stakeholder.status === "approved"
                                ? "✅ Approved"
                                : "⏳ Pending"}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-muted-fg mb-4">
                            {stakeholder.checklist.map((item) => (
                              <div key={item} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={stakeholder.status === "approved"}
                                  readOnly
                                  className="w-4 h-4 accent-accent"
                                />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-muted-fg mb-3">
                            Approver: <strong>{stakeholder.approver}</strong>
                          </div>
                          {stakeholder.status === "pending" && (
                            <button
                              onClick={() => handleStakeholderApproval(index)}
                              className="w-full h-10 bg-accent text-white border-none rounded-md text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-px"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Final Authorization */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">
                        Final Authorization
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Go-live date & time
                          </label>
                          <input
                            type="datetime-local"
                            defaultValue="2025-04-15T09:00"
                            disabled={!allStakeholdersApproved}
                            className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent disabled:opacity-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Type your name to approve
                          </label>
                          <input
                            type="text"
                            placeholder="Full name"
                            disabled={!allStakeholdersApproved}
                            className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent disabled:opacity-50"
                          />
                        </div>
                      </div>
                      <button
                        disabled={!allStakeholdersApproved}
                        className="w-full h-12 bg-accent text-white border-none rounded-md font-medium tracking-wider cursor-pointer transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {allStakeholdersApproved
                          ? "Authorize Go-Live Deployment"
                          : "Awaiting All Stakeholder Approvals"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Parallel Tasks Panel */}
            <div className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">
                  Running in Parallel
                </div>
                <div className="space-y-3">
                  {parallelTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-4 p-3 bg-muted rounded-lg"
                    >
                      <div
                        className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-mono ${
                          task.status === "done"
                            ? "bg-green-100 text-green-700"
                            : task.status === "running"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted-fg/10 text-muted-fg"
                        }`}
                      >
                        {task.status === "done"
                          ? "✓"
                          : task.status === "running"
                          ? "⚡"
                          : "—"}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-1">{task.title}</div>
                        <div className="flex items-center gap-3 text-xs text-muted-fg">
                          <span className="font-mono">{task.agent}</span>
                          <span className="w-px h-3 bg-border"></span>
                          <span>{task.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Agent Activity Feed */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] text-white border-t border-white/10 transition-all duration-300 ${
          feedExpanded ? "h-64" : "h-12"
        }`}
      >
        <button
          onClick={() => setFeedExpanded(!feedExpanded)}
          className="w-full h-12 flex items-center justify-between px-6 hover:bg-white/5 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <span className="font-mono text-xs tracking-wider uppercase">
              Agent Activity Feed
            </span>
            <span className="text-xs text-white/50">
              ({agentMessages.length} messages)
            </span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              feedExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>

        {feedExpanded && (
          <div className="h-52 overflow-y-auto px-6 pb-4">
            <div className="space-y-2 font-mono text-xs">
              {agentMessages.map((msg, index) => (
                <div
                  key={index}
                  className="py-2 border-b border-white/10 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-accent-2 flex-shrink-0">
                      [{msg.agent}]
                    </span>
                    <span className="flex-1 text-white/75">{msg.message}</span>
                    <span className="text-white/30 flex-shrink-0">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacer for fixed feed */}
      <div className={feedExpanded ? "h-64" : "h-12"}></div>
    </div>
  );
}
