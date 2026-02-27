"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = "chat" | "loading" | "result";
type Stage = "request" | "security" | "approval";
type TaskStatus = "queued" | "running" | "done";
type ApprovalStatus = "pending" | "approved";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
  typing?: boolean;
}

interface LoadingStep {
  label: string;
  agent: string;
  status: "pending" | "running" | "done";
}

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

// ─── AI Demo Script ──────────────────────────────────────────────────────────

const AI_RESPONSES: { trigger: string; response: string }[] = [
  {
    trigger: "",
    response:
      "Got it! Let me analyze your requirements. I'll need to understand a few things:\n\n1. **What SaaS tool** are you implementing?\n2. **How many users** will need access?\n3. **Any compliance requirements** (GDPR, CCPA, etc.)?\n\nWhat SaaS tool would you like to set up?",
  },
  {
    trigger: "salesforce",
    response:
      "Great choice — **Salesforce Sales Cloud** is perfect for unified pipeline visibility. Let me confirm the details:\n\n- **Tool:** Salesforce Sales Cloud\n- **Users:** I'll need a user count — how many people need access?\n- **Integrations:** Any existing systems to connect? (Azure AD, Office 365, ERP, etc.)",
  },
  {
    trigger: "500",
    response:
      "Understood. Here's what I've captured so far:\n\n- **Tool:** Salesforce Sales Cloud\n- **Users:** 500 (350 sales reps, 100 managers, 50 ops)\n- **Target Go-Live:** April 15, 2025\n\nI'm now ready to generate your full implementation plan. This will include:\n- Security review configuration\n- SSO & MFA setup\n- Integration mapping\n- Stakeholder approval workflow\n- Parallel task orchestration\n\nShall I proceed?",
  },
  {
    trigger: "yes",
    response:
      "Launching implementation orchestration now. I'll coordinate **6 specialized agents** to build your plan in parallel...",
  },
];

const LOADING_STEPS: LoadingStep[] = [
  { label: "Analyzing security requirements", agent: "Security Agent", status: "pending" },
  { label: "Drafting SSO configuration for Azure AD", agent: "Security Agent", status: "pending" },
  { label: "Generating GDPR data processing addendum", agent: "Compliance Agent", status: "pending" },
  { label: "Mapping integration endpoints", agent: "IT Agent", status: "pending" },
  { label: "Creating sandbox test accounts", agent: "IT Agent", status: "pending" },
  { label: "Building stakeholder approval workflow", agent: "Orchestrator", status: "pending" },
  { label: "Scheduling integration test window", agent: "IT Agent", status: "pending" },
  { label: "Drafting runbook skeleton", agent: "Documentation Agent", status: "pending" },
  { label: "Pre-building notification templates", agent: "Comms Agent", status: "pending" },
  { label: "Assembling implementation dashboard", agent: "Orchestrator", status: "pending" },
];

// ─── Chat Screen ─────────────────────────────────────────────────────────────

function ChatScreen({ onComplete }: { onComplete: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content:
        "Hello! I'm the Onboard orchestration agent. Tell me about the SaaS tool you'd like to implement, and I'll handle the entire setup — security review, compliance, integrations, and stakeholder approvals.\n\nWhat are you looking to implement?",
    },
  ]);
  const [input, setInput] = useState("");
  const [aiResponseIndex, setAiResponseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Check if this is the final message that triggers loading
    const currentIndex = aiResponseIndex;
    const isLastResponse = currentIndex >= AI_RESPONSES.length - 1;

    setTimeout(() => {
      const response = AI_RESPONSES[Math.min(currentIndex, AI_RESPONSES.length - 1)];
      setMessages((prev) => [...prev, { role: "ai", content: response.response }]);
      setAiResponseIndex((prev) => prev + 1);
      setIsTyping(false);

      if (isLastResponse) {
        setTimeout(() => onComplete(), 1500);
      }
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions =
    aiResponseIndex === 0
      ? ["We need to implement Salesforce for our sales team"]
      : aiResponseIndex === 1
      ? ["500 users — 350 sales reps, 100 managers, 50 ops. We need Azure AD, Office 365, and NetSuite integration. GDPR and CCPA compliance required."]
      : aiResponseIndex === 2
      ? ["Yes, proceed!"]
      : [];

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-fg hover:text-accent transition-colors duration-200 mb-2 no-underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-mono text-xs tracking-wider uppercase">Back to Home</span>
              </Link>
              <h1 className="font-serif text-2xl font-normal">New Implementation</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-xs tracking-wider uppercase text-muted-fg">Agent Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container py-8 max-w-3xl mx-auto">
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "bg-card border border-border rounded-bl-md"
                  }`}
                >
                  {msg.role === "ai" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="font-mono text-xs tracking-wider uppercase text-accent">Orchestrator</span>
                    </div>
                  )}
                  <div
                    className={`text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user" ? "text-white" : "text-fg"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="font-mono text-xs tracking-wider uppercase text-accent">Orchestrator</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Suggestion Chips */}
      {suggestions.length > 0 && !isTyping && (
        <div className="container max-w-3xl mx-auto px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(s);
                  setTimeout(() => {
                    setInput(s);
                    setMessages((prev) => [...prev, { role: "user", content: s }]);
                    setIsTyping(true);
                    setInput("");

                    const currentIndex = aiResponseIndex;
                    const isLastResponse = currentIndex >= AI_RESPONSES.length - 1;

                    setTimeout(() => {
                      const response = AI_RESPONSES[Math.min(currentIndex, AI_RESPONSES.length - 1)];
                      setMessages((prev) => [...prev, { role: "ai", content: response.response }]);
                      setAiResponseIndex((prev) => prev + 1);
                      setIsTyping(false);

                      if (isLastResponse) {
                        setTimeout(() => onComplete(), 1500);
                      }
                    }, 1200 + Math.random() * 800);
                  }, 50);
                }}
                className="px-4 py-2 text-sm border border-accent/30 text-accent rounded-full bg-accent/5 hover:bg-accent/10 hover:border-accent/50 transition-all duration-200 cursor-pointer text-left"
              >
                {s.length > 60 ? s.substring(0, 60) + "..." : s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="sticky bottom-0 bg-card border-t border-border">
        <div className="container max-w-3xl mx-auto py-4">
          <div className="flex gap-3 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to implement..."
              disabled={isTyping}
              className="flex-1 h-12 px-5 border border-border rounded-full bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent disabled:opacity-50 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 rounded-full bg-accent text-white border-none flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-px disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Screen ──────────────────────────────────────────────────────────

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [steps, setSteps] = useState<LoadingStep[]>(LOADING_STEPS);
  const [progress, setProgress] = useState(0);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stepIndex = 0;
    let cancelled = false;

    function processNext() {
      if (cancelled || stepIndex >= LOADING_STEPS.length) {
        if (!cancelled && stepIndex >= LOADING_STEPS.length) {
          setTimeout(() => onComplete(), 1000);
        }
        return;
      }

      const current = stepIndex;
      const step = LOADING_STEPS[current];

      // Mark current step as running
      setSteps((prev) =>
        prev.map((s, i) =>
          i === current
            ? { ...s, status: "running" }
            : i < current
            ? { ...s, status: "done" }
            : s
        )
      );

      setLogMessages((prev) => [
        ...prev,
        `[${step.agent}] ${step.label}...`,
      ]);

      // Mark as done after a short delay, then schedule next
      setTimeout(() => {
        if (cancelled) return;
        setSteps((prev) =>
          prev.map((s, i) => (i === current ? { ...s, status: "done" } : s))
        );
        setLogMessages((prev) => [
          ...prev,
          `[${step.agent}] ✓ Complete`,
        ]);
        setProgress(((current + 1) / LOADING_STEPS.length) * 100);

        stepIndex++;
        setTimeout(processNext, 300 + Math.random() * 400);
      }, 400 + Math.random() * 300);
    }

    const startTimer = setTimeout(processNext, 500);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logMessages]);

  const completedCount = steps.filter((s) => s.status === "done").length;
  const runningCount = steps.filter((s) => s.status === "running").length;

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-fg hover:text-accent transition-colors duration-200 mb-2 no-underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-mono text-xs tracking-wider uppercase">Back to Home</span>
              </Link>
              <h1 className="font-serif text-2xl font-normal">Generating Implementation Plan</h1>
            </div>
            <div className="text-right">
              <div className="font-mono text-xs tracking-wider uppercase text-muted-fg">Progress</div>
              <div className="font-serif text-3xl text-accent">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-mono text-muted-fg">
              <span>{completedCount} of {steps.length} tasks complete</span>
              <span>{runningCount > 0 ? `${runningCount} running` : completedCount === steps.length ? "All done!" : "Starting..."}</span>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1fr] gap-8">
            {/* Steps List */}
            <div>
              <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">
                Agent Tasks
              </div>
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-300 ${
                      step.status === "done"
                        ? "bg-green-50 border-green-200"
                        : step.status === "running"
                        ? "bg-accent/5 border-accent/30"
                        : "bg-muted border-border opacity-50"
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {step.status === "done" ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : step.status === "running" ? (
                        <div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-border"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{step.label}</div>
                      <div className="text-xs text-muted-fg font-mono mt-0.5">{step.agent}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Log */}
            <div>
              <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">
                Live Agent Log
              </div>
              <div
                ref={logRef}
                className="h-[500px] bg-[#1A1A1A] rounded-lg p-4 overflow-y-auto font-mono text-xs"
              >
                <div className="text-green-400 mb-3">$ onboard orchestrate --plan salesforce-500</div>
                <div className="text-white/50 mb-3">Initializing 6 agents...</div>
                {logMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`py-1 ${
                      msg.includes("✓") ? "text-green-400" : "text-white/75"
                    }`}
                  >
                    {msg}
                  </div>
                ))}
                {completedCount < steps.length && (
                  <div className="text-accent animate-pulse mt-1">▊</div>
                )}
                {completedCount === steps.length && (
                  <div className="text-green-400 mt-3">
                    ✓ Implementation plan ready. Launching dashboard...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Result Screen (Original Dashboard) ──────────────────────────────────────

function ResultScreen() {
  const [activeStage, setActiveStage] = useState<Stage>("security");
  const [daysElapsed] = useState(12);
  const [stage2Complete, setStage2Complete] = useState(false);
  const [feedExpanded, setFeedExpanded] = useState(false);

  const [ssoStatus, setSsoStatus] = useState("Completed");
  const [, setApprovalStatus] = useState("pending");

  const [parallelTasks, setParallelTasks] = useState<ParallelTask[]>([
    { id: "1", title: "Drafting SSO configuration for Azure AD", agent: "Security Agent", status: "done", timestamp: "2 min ago" },
    { id: "2", title: "Generating GDPR data processing addendum template", agent: "Compliance Agent", status: "done", timestamp: "5 min ago" },
    { id: "3", title: "Creating test user accounts (sandbox)", agent: "IT Agent", status: "running", timestamp: "Now" },
    { id: "4", title: "Scheduling integration test window", agent: "IT Agent", status: "running", timestamp: "Now" },
    { id: "5", title: "Pre-building Slack notification for go-live", agent: "Comms Agent", status: "queued", timestamp: "Queued" },
    { id: "6", title: "Drafting runbook skeleton", agent: "Documentation Agent", status: "queued", timestamp: "Queued" },
  ]);

  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([
    { agent: "Security Agent", message: "SSO config draft generated for Azure AD — awaiting security team review", timestamp: "12:34 PM" },
    { agent: "IT Agent", message: "3 sandbox users provisioned in Salesforce", timestamp: "12:35 PM" },
    { agent: "Compliance Agent", message: "GDPR DPA template populated with vendor details", timestamp: "12:36 PM" },
  ]);

  const [stakeholders, setStakeholders] = useState<StakeholderApproval[]>([
    { name: "Procurement", checklist: ["Contract signed", "PO number verified"], approver: "Finance Controller", status: "pending" },
    { name: "Legal", checklist: ["Terms reviewed", "DPA signed"], approver: "Legal Counsel", status: "pending" },
    { name: "IT Operations", checklist: ["Production tested", "Rollback plan ready", "Monitoring configured"], approver: "IT Ops Lead", status: "pending" },
    { name: "Business Sponsor", checklist: ["User training done", "Success metrics defined"], approver: "VP Sales", status: "pending" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParallelTasks((prev) =>
        prev.map((task) => {
          if (task.status === "queued" && Math.random() > 0.7) return { ...task, status: "running" as TaskStatus, timestamp: "Now" };
          if (task.status === "running" && Math.random() > 0.8) return { ...task, status: "done" as TaskStatus, timestamp: "Just now" };
          return task;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messages = [
      { agent: "Orchestrator", message: "Stage 2 unblocked — notifying security reviewer via email" },
      { agent: "IT Agent", message: "Integration test window scheduled for Apr 12, 2:00 PM JST" },
      { agent: "Security Agent", message: "MFA enforcement rules validated against ISMS policy" },
      { agent: "Documentation Agent", message: "Runbook draft created with 23 operational procedures" },
      { agent: "Comms Agent", message: "Slack notification template created for #it-announcements" },
    ];
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < messages.length) {
        const newMessage = {
          ...messages[messageIndex],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
        message: "Security review approved — routing to stakeholders for go-live approval",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleStakeholderApproval = (index: number) => {
    setStakeholders((prev) => prev.map((s, i) => (i === index ? { ...s, status: "approved" as ApprovalStatus } : s)));
  };

  const allStakeholdersApproved = stakeholders.every((s) => s.status === "approved");

  const getStageStatus = (stage: Stage) => {
    if (stage === "request") return "complete";
    if (stage === "security") return stage2Complete ? "complete" : "in-progress";
    if (stage === "approval") return stage2Complete ? (allStakeholdersApproved ? "complete" : "in-progress") : "locked";
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-mono text-xs tracking-wider uppercase">Back to Home</span>
              </Link>
              <h1 className="font-serif text-2xl font-normal mb-1">Salesforce Sales Cloud — 500 users</h1>
              <div className="flex items-center gap-4 text-sm text-muted-fg">
                <span className="font-mono text-xs tracking-wider uppercase">
                  Current Stage:{" "}
                  <span className="text-accent font-medium">
                    {activeStage === "request" ? "Implementation Request" : activeStage === "security" ? "Security Review" : "Go-Live Approval"}
                  </span>
                </span>
                <span className="w-px h-4 bg-border"></span>
                <span className="font-mono text-xs tracking-wider uppercase">
                  Days Elapsed: <span className="text-accent font-medium">{daysElapsed}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-mono text-xs tracking-wider uppercase text-muted-fg">Overall Progress</div>
                <div className="font-serif text-3xl text-accent">
                  {stage2Complete ? (allStakeholdersApproved ? "100%" : "75%") : "50%"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar */}
          <aside>
            <div className="sticky top-24">
              <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">Implementation Stages</div>
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
                      onClick={() => status !== "locked" && setActiveStage(stage.id as Stage)}
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
                        <span className="font-serif text-2xl text-accent opacity-50">{stage.num}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">{stage.label}</div>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono tracking-wider uppercase border ${getStatusBadge(status)}`}>
                            {status === "in-progress" ? "In Progress" : status === "complete" ? "Complete" : "Locked"}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 p-4 border border-border rounded-lg bg-card">
                <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-3">Running in Parallel</div>
                <div className="space-y-2 text-sm">
                  {parallelTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.status === "done" ? "bg-green-500" : task.status === "running" ? "bg-accent animate-pulse" : "bg-muted-fg"}`}></span>
                      <span className="flex-1 text-xs text-muted-fg truncate">{task.title.length > 30 ? task.title.substring(0, 30) + "..." : task.title}</span>
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
                  <h2 className="font-serif text-3xl font-normal">Implementation Request</h2>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">✓ Complete</span>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">What</div>
                      <div className="text-base">Salesforce Sales Cloud for 500 users</div>
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">Business Reason</div>
                      <div className="text-base">Replacing 3 legacy CRMs, need unified pipeline visibility</div>
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">Who Needs Access</div>
                      <div className="text-base">350 sales reps, 100 managers, 50 ops team</div>
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-2">Target Go-Live</div>
                      <div className="text-base">April 15, 2025</div>
                    </div>
                  </div>
                  <div className="h-px bg-border my-4"></div>
                  <div>
                    <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-3">System Integrations</div>
                    <div className="flex flex-wrap gap-2">
                      {["Azure AD", "Office 365", "NetSuite ERP", "Marketing tools"].map((system) => (
                        <span key={system} className="px-3 py-1 bg-muted border border-border rounded text-sm">{system}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-wider uppercase text-muted-fg mb-3">Compliance Requirements</div>
                    <div className="flex flex-wrap gap-2">
                      {["GDPR", "CCPA"].map((req) => (
                        <span key={req} className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded text-sm font-medium">{req}</span>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-border my-4"></div>
                  <div className="text-sm text-muted-fg">
                    <span className="font-medium">Requested by:</span> it-manager@company.com
                  </div>
                </div>
              </div>
            )}

            {/* Stage 2: Security Review */}
            {activeStage === "security" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-3xl font-normal">Security Review</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(stage2Complete ? "complete" : "in-progress")}`}>
                    {stage2Complete ? "✓ Complete" : "⚡ Agent Working"}
                  </span>
                </div>
                <div className="mb-6 p-4 bg-accent/5 border-l-2 border-accent rounded">
                  <div className="font-mono text-xs tracking-wider uppercase text-accent mb-2">Request Summary (Auto-generated)</div>
                  <div className="text-sm space-y-1">
                    <div><strong>Salesforce Sales Cloud</strong> | 500 users | Sales Ops team</div>
                    <div><strong>Compliance:</strong> GDPR, CCPA</div>
                    <div><strong>Integrations:</strong> Azure AD, Office 365, NetSuite ERP, Marketing tools</div>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">SSO configured?</label>
                      <select value={ssoStatus} onChange={(e) => setSsoStatus(e.target.value)} className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent">
                        <option>Completed</option>
                        <option>In Progress</option>
                        <option>Blocked</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Overall security risk</label>
                      <select className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Multi-factor auth enabled?</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2"><input type="radio" name="mfa" defaultChecked className="w-4 h-4 accent-accent" /><span className="text-sm">Yes</span></label>
                        <label className="flex items-center gap-2"><input type="radio" name="mfa" className="w-4 h-4 accent-accent" /><span className="text-sm">No</span></label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Data encryption verified?</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2"><input type="radio" name="encryption" defaultChecked className="w-4 h-4 accent-accent" /><span className="text-sm">Yes</span></label>
                        <label className="flex items-center gap-2"><input type="radio" name="encryption" className="w-4 h-4 accent-accent" /><span className="text-sm">No</span></label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3">All integrations tested?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Azure AD", "Office 365", "NetSuite", "Marketing tools"].map((integration) => (
                        <label key={integration} className="flex items-center gap-2 p-3 border border-border rounded bg-muted">
                          <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
                          <span className="text-sm">{integration}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Security reviewer</label>
                    <input type="text" defaultValue="Sarah Chen, CISO" className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent" />
                  </div>
                  {!stage2Complete && (
                    <button onClick={handleSubmitReview} className="w-full h-12 bg-accent text-white border-none rounded-md font-medium tracking-wider cursor-pointer transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)]">
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
                  <h2 className="font-serif text-3xl font-normal">Go-Live Approval</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(!stage2Complete ? "locked" : allStakeholdersApproved ? "complete" : "in-progress")}`}>
                    {!stage2Complete ? "Locked" : allStakeholdersApproved ? "✓ Complete" : "In Progress"}
                  </span>
                </div>
                {!stage2Complete ? (
                  <div className="p-8 bg-muted border border-border rounded-lg text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <div className="font-serif text-xl mb-2">Awaiting Security Review</div>
                    <div className="text-muted-fg">Complete Stage 2 to unlock stakeholder approvals</div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-muted border border-border rounded-lg">
                      <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">Implementation Status</div>
                      <div className="grid grid-cols-3 gap-6 text-sm">
                        <div>
                          <div className="text-muted-fg mb-1">Days since request</div>
                          <div className="font-serif text-2xl text-accent">{daysElapsed}</div>
                        </div>
                        <div>
                          <div className="text-muted-fg mb-1">Security review</div>
                          <div className="font-serif text-lg text-accent">Approved</div>
                        </div>
                        <div>
                          <div className="text-muted-fg mb-1">Stakeholders approved</div>
                          <div className="font-serif text-2xl text-accent">{stakeholders.filter((s) => s.status === "approved").length}/4</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {stakeholders.map((stakeholder, index) => (
                        <div key={stakeholder.name} className="bg-card border border-border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-mono text-xs tracking-[0.12em] uppercase font-medium">{stakeholder.name}</div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(stakeholder.status === "approved" ? "done" : "queued")}`}>
                              {stakeholder.status === "approved" ? "Approved" : "Pending"}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-muted-fg mb-4">
                            {stakeholder.checklist.map((item) => (
                              <div key={item} className="flex items-center gap-2">
                                <input type="checkbox" checked={stakeholder.status === "approved"} readOnly className="w-4 h-4 accent-accent" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-muted-fg mb-3">Approver: <strong>{stakeholder.approver}</strong></div>
                          {stakeholder.status === "pending" && (
                            <button onClick={() => handleStakeholderApproval(index)} className="w-full h-10 bg-accent text-white border-none rounded-md text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-accent-2 hover:-translate-y-px">Approve</button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">Final Authorization</div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Go-live date & time</label>
                          <input type="datetime-local" defaultValue="2025-04-15T09:00" disabled={!allStakeholdersApproved} className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent disabled:opacity-50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Type your name to approve</label>
                          <input type="text" placeholder="Full name" disabled={!allStakeholdersApproved} className="w-full h-12 px-4 border border-border rounded-md bg-transparent transition-all duration-150 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-accent disabled:opacity-50" />
                        </div>
                      </div>
                      <button disabled={!allStakeholdersApproved} className="w-full h-12 bg-accent text-white border-none rounded-md font-medium tracking-wider cursor-pointer transition-all duration-200 shadow-sm hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(184,134,11,0.25)] disabled:opacity-50 disabled:cursor-not-allowed">
                        {allStakeholdersApproved ? "Authorize Go-Live Deployment" : "Awaiting All Stakeholder Approvals"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Parallel Tasks Panel */}
            <div className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="font-mono text-xs tracking-[0.15em] uppercase text-accent mb-4">Running in Parallel</div>
                <div className="space-y-3">
                  {parallelTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-4 p-3 bg-muted rounded-lg">
                      <div className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-mono ${task.status === "done" ? "bg-green-100 text-green-700" : task.status === "running" ? "bg-accent/10 text-accent" : "bg-muted-fg/10 text-muted-fg"}`}>
                        {task.status === "done" ? "✓" : task.status === "running" ? "⚡" : "—"}
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
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] text-white border-t border-white/10 transition-all duration-300 ${feedExpanded ? "h-64" : "h-12"}`}>
        <button onClick={() => setFeedExpanded(!feedExpanded)} className="w-full h-12 flex items-center justify-between px-6 hover:bg-white/5 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <span className="font-mono text-xs tracking-wider uppercase">Agent Activity Feed</span>
            <span className="text-xs text-white/50">({agentMessages.length} messages)</span>
          </div>
          <svg className={`w-4 h-4 transition-transform duration-200 ${feedExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {feedExpanded && (
          <div className="h-52 overflow-y-auto px-6 pb-4">
            <div className="space-y-2 font-mono text-xs">
              {agentMessages.map((msg, index) => (
                <div key={index} className="py-2 border-b border-white/10 last:border-0">
                  <div className="flex items-start gap-3">
                    <span className="text-accent-2 flex-shrink-0">[{msg.agent}]</span>
                    <span className="flex-1 text-white/75">{msg.message}</span>
                    <span className="text-white/30 flex-shrink-0">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={feedExpanded ? "h-64" : "h-12"}></div>
    </div>
  );
}

// ─── Main Page (Screen Router) ───────────────────────────────────────────────

export default function ImplementationPage() {
  const [screen, setScreen] = useState<Screen>("chat");

  return (
    <>
      {screen === "chat" && <ChatScreen onComplete={() => setScreen("loading")} />}
      {screen === "loading" && <LoadingScreen onComplete={() => setScreen("result")} />}
      {screen === "result" && <ResultScreen />}
    </>
  );
}
