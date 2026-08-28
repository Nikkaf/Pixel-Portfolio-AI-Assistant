"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bird,
  ExternalLink,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AssistantReply = {
  text: string;
  links?: { label: string; href: string }[];
};

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  links?: AssistantReply["links"];
};

const suggestions = [
  "What roles is Nikka looking for?",
  "Show me her strongest projects",
  "What impact has her work had?",
  "Why is she a strong fit for big tech?",
  "How does she work with a team?",
];

const initialMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "Hi, I’m Nikka’s portfolio assistant. I can give you the quick version of her experience, walk through selected projects, or connect the dots between her work and the product teams she hopes to join. What would you like to know?",
};

const portfolioLinks = {
  work: { label: "View all work", href: "https://www.nikka.me/work" },
  about: { label: "About Nikka", href: "https://www.nikka.me/about" },
  resume: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikkaforoughi/",
  },
  myIcbc: {
    label: "My ICBC case study",
    href: "https://www.nikka.me/projects/my-icbc",
  },
  castofly: {
    label: "Castofly case study",
    href: "https://www.nikka.me/projects/castofly",
  },
  reablement: {
    label: "Reablement case study",
    href: "https://www.nikka.me/projects/reablement-at-vch",
  },
};

function getReply(question: string): AssistantReply {
  const q = question.toLowerCase();

  if (q.includes("role") || q.includes("looking for") || q.includes("target")) {
    return {
      text:
        "Nikka is focused on Product Designer, UX Designer, and Experience Designer roles where she can own meaningful work end to end. She is especially drawn to complex products, AI-enabled experiences, and teams that value research, visual craft, systems thinking, and strong storytelling. Her next role should let her keep doing what she does best: turn complexity into an experience that feels clear, human, and memorable.",
      links: [portfolioLinks.about, portfolioLinks.work],
    };
  }

  if (q.includes("google")) {
    return {
      text:
        "Nikka’s strongest connection to Google is her ability to make complex systems feel simple without flattening the real problem. At ICBC, she designs accessible services across policy, product, content, research, and engineering constraints. At Castofly, she helped shape an AI product from an early MVP into a guided experience with measurable growth. That mix of systems thinking, user evidence, craft, and responsible AI curiosity fits teams designing products for diverse people at global scale.",
      links: [portfolioLinks.myIcbc, portfolioLinks.castofly],
    };
  }

  if (q.includes("meta")) {
    return {
      text:
        "For Meta, Nikka’s creator-tool background is especially relevant. At Castofly, she designed AI-assisted video creation, recording, editing, templates, collaboration, sharing, and onboarding for non-technical users. She understands that powerful creative tools only work when people can quickly understand their possibilities, feel in control, and reach a rewarding result. She also brings strong visual storytelling and experience building a product identity alongside the interface.",
      links: [portfolioLinks.castofly],
    };
  }

  if (q.includes("amazon")) {
    return {
      text:
        "Nikka’s fit for Amazon comes through in ownership, customer focus, and comfort with operational complexity. She has led policy-heavy journeys at ICBC, balanced multiple stakeholder needs, tested with real users, and stayed involved through delivery. As Castofly’s sole designer, she moved between strategy, flows, interface design, brand, testing, and launch. Her work shows that she can make decisions independently, use evidence to iterate, and connect design quality to measurable outcomes.",
      links: [portfolioLinks.myIcbc, portfolioLinks.castofly],
    };
  }

  if (/\bea\b/.test(q) || q.includes("electronic arts") || q.includes("game")) {
    return {
      text:
        "Nikka would bring EA a blend of interaction design, visual storytelling, and end-to-end product thinking. She cares about rhythm and flow across a full experience, not only the polish of individual screens. Her work spans complex responsive products, motion and promotional storytelling, playful brand systems, and accessible experiences for diverse audiences. That range is valuable for teams shaping connected, emotionally engaging player experiences across platforms.",
      links: [portfolioLinks.work, portfolioLinks.about],
    };
  }

  if (
    q.includes("big tech") ||
    q.includes("large company") ||
    q.includes("strong fit") ||
    q.includes("good fit") ||
    q.includes("sets her apart")
  ) {
    return {
      text:
        "Nikka offers a useful combination for large product organizations: she can simplify complex systems, work closely with policy and engineering partners, design accessible experiences at scale, and still bring a strong visual and storytelling point of view. ICBC demonstrates rigour and cross-functional delivery; Castofly demonstrates ownership, speed, AI-product thinking, and growth; her portfolio itself demonstrates craft and originality. She is comfortable moving from ambiguity to a clear, testable experience without losing the human details.",
      links: [portfolioLinks.work, portfolioLinks.about],
    };
  }

  if (
    q.includes("impact") ||
    q.includes("metric") ||
    q.includes("result") ||
    q.includes("outcome") ||
    q.includes("number")
  ) {
    return {
      text:
        "Her work pairs design craft with measurable outcomes: Castofly conversion increased 72% in six months; ICBC online renewals increased 80%; and digital road-test bookings increased 68%. My ICBC also created a more consistent and trusted foundation for services used across the province. She cares about the numbers, but also about the quieter outcome behind them: people feeling confident about what to do next.",
      links: [portfolioLinks.myIcbc, portfolioLinks.castofly],
    };
  }

  if (q.includes("castofly") || q.includes("startup") || q.includes("creator")) {
    return {
      text:
        "At Castofly, Nikka was the sole product designer for an AI-powered video creation platform. She rebuilt an unclear early MVP into a guided product, designed the onboarding, editor, recording and collaboration experiences, and created the brand and design system alongside the product. The redesign increased conversion by 72% within six months, and Castofly ranked #10 Product of the Day on Product Hunt.",
      links: [portfolioLinks.castofly],
    };
  }

  if (q.includes("icbc") || q.includes("government") || q.includes("public service")) {
    return {
      text:
        "At ICBC, Nikka designs policy-heavy digital services used across British Columbia. On My ICBC, she contributed across a unified self-service platform and owned complex Billing & Payments experiences, including responsive states for payment plans, missed payments, debts, and account issues. Her broader ICBC work helped online renewals grow 80% and digital road-test bookings grow 68%, while strengthening accessibility and consistency across five breakpoints.",
      links: [portfolioLinks.myIcbc],
    };
  }

  if (
    q.includes("reablement") ||
    q.includes("health") ||
    q.includes("accessib") ||
    q.includes("older")
  ) {
    return {
      text:
        "For Vancouver Coastal Health, Nikka designed and helped install a reablement experience for older hospital patients. Through co-design workshops, observation, and iterative testing with patients, caregivers, and healthcare professionals, the project encouraged movement, independence, conversation, and cognitive activity. It shows her ability to design beyond screens and for people with real accessibility needs.",
      links: [portfolioLinks.reablement],
    };
  }

  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("strongest") ||
    q.includes("case study") ||
    q.includes("best work")
  ) {
    return {
      text:
        "Three projects tell Nikka’s story especially well. My ICBC shows how she handles public-service complexity and design at scale. Castofly shows end-to-end ownership, AI-product experience, visual craft, and measurable growth. Reablement at VCH shows inclusive, human-centred design beyond the screen. Together, they span enterprise scale, startup speed, and social impact.",
      links: [
        portfolioLinks.myIcbc,
        portfolioLinks.castofly,
        portfolioLinks.reablement,
      ],
    };
  }

  if (
    q.includes("skill") ||
    q.includes("tool") ||
    q.includes("experience") ||
    q.includes("process")
  ) {
    return {
      text:
        "Nikka brings 5+ years of product and UX design experience across public services, AI creator tools, healthcare, branding, and design systems. Her core skills include user research, service mapping, flows, journey mapping, wireframing, interactive prototyping, usability testing, responsive UI, visual design, WCAG accessibility, and cross-functional delivery. She works primarily in Figma, Axure RP, Miro, Webflow, and Adobe Creative Suite, with growing strength in AI-assisted design and prototyping.",
      links: [portfolioLinks.about, portfolioLinks.resume],
    };
  }


  if (
    q.includes("team") ||
    q.includes("collabor") ||
    q.includes("lead") ||
    q.includes("stakeholder") ||
    q.includes("work style")
  ) {
    return {
      text:
        "Nikka works as a thoughtful, hands-on partner. She listens closely, makes the problem and decisions visible, and brings product, content, research, policy, and engineering perspectives into the same flow. She is comfortable facilitating alignment, turning feedback into concrete iterations, and staying involved through implementation. She is also intentionally developing her leadership and assertiveness so she can make strong recommendations earlier and more clearly.",
      links: [portfolioLinks.about],
    };
  }

  if (
    q.includes("philosophy") ||
    q.includes("approach") ||
    q.includes("design thinking") ||
    q.includes("how does she design")
  ) {
    return {
      text:
        "Nikka’s design approach starts with deep listening and problem framing, then moves quickly into visible flows and testable prototypes. She uses evidence to reduce friction, designs responsively and accessibly, and treats content, interaction, and visual language as one experience. Her principle is simple: use AI for smart speed, never as a substitute for human intention.",
      links: [portfolioLinks.about, portfolioLinks.work],
    };
  }

  if (
    q.includes("education") ||
    q.includes("school") ||
    q.includes("award") ||
    q.includes("waterloo")
  ) {
    return {
      text:
        "Nikka holds a Bachelor of Design in Interaction Design from Emily Carr University and is beginning the part-time Master of Digital Experience Innovation at the University of Waterloo. Her previous Teal Bird portfolio received an Awwwards Honorable Mention and CSS Design Awards Special Kudos, recognition that reflects both her UX thinking and her visual craft.",
      links: [portfolioLinks.about],
    };
  }

  if (
    q.includes("personality") ||
    q.includes("outside") ||
    q.includes("hobby") ||
    q.includes("about")
  ) {
    return {
      text:
        "Nikka is curious, reflective, and quietly determined. She is a deep listener who loves finding the insight that changes a direction for the better. Outside design, she resets through TRX, piano, the Lakota flute, and meditation. That mix of energy and calm shows up in her work: she moves quickly, but stays intentional.",
      links: [portfolioLinks.about],
    };
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("connect") ||
    q.includes("hire")
  ) {
    return {
      text:
        "The easiest way to reach Nikka is at nikkaforoughi@gmail.com. You can also explore the full portfolio or connect through LinkedIn.",
      links: [portfolioLinks.work, portfolioLinks.resume],
    };
  }

  return {
    text:
      "I can help with Nikka’s target roles, skills, measurable impact, design approach, or projects like My ICBC, Castofly, and Reablement at VCH. Try asking about one of those, or choose a suggested question below.",
    links: [portfolioLinks.work, portfolioLinks.about],
  };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);
  const responseTimer = useRef<number | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (responseTimer.current !== null) {
        window.clearTimeout(responseTimer.current);
      }
    };
  }, []);

  function ask(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isTyping) return;

    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", content: cleanQuestion },
    ]);
    setInput("");
    setIsTyping(true);

    responseTimer.current = window.setTimeout(() => {
      const reply = getReply(cleanQuestion);
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          content: reply.text,
          links: reply.links,
        },
      ]);
      setIsTyping(false);
      responseTimer.current = null;
    }, 650);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  function resetConversation() {
    if (responseTimer.current !== null) {
      window.clearTimeout(responseTimer.current);
      responseTimer.current = null;
    }
    setMessages([initialMessage]);
    setInput("");
    setIsTyping(false);
    nextId.current = 2;
  }

  return (
    <main className="portfolio-shell">
      <aside className="profile-panel">
        <div className="pixel-field" aria-hidden="true" />
        <a className="brand-lockup" href="https://www.nikka.me" target="_blank" rel="noreferrer">
          <span className="brand-mark">
            <img
              src="https://cdn.prod.website-files.com/6977d88e92d804c0b2d1b67f/6977df41bff57fb3e9ce5719_Final%20logo.svg"
              alt=""
            />
          </span>
          <span>the teal bird</span>
        </a>

        <div className="profile-content">
          <div className="portrait-frame">
            <img
              src="/assets/nikka-portrait.jpeg"
              alt="Nikka Foroughi"
            />
            <span className="available-dot" aria-hidden="true" />
          </div>

          <div>
            <p className="eyebrow">Product & UX Designer</p>
            <h1>Nikka Foroughi</h1>
            <p className="profile-summary">
              I make complex products feel clear, human, and worth remembering.
            </p>
          </div>

          <div className="status-card">
            <Sparkles size={18} aria-hidden="true" />
            <div>
              <span>Currently exploring</span>
              <strong>AI + agent experiences</strong>
            </div>
          </div>

          <nav className="profile-links" aria-label="Portfolio links">
            <a href="https://www.nikka.me/work" target="_blank" rel="noreferrer">
              Selected work <ArrowUpRight size={16} />
            </a>
            <a href="https://www.nikka.me/about" target="_blank" rel="noreferrer">
              About me <ArrowUpRight size={16} />
            </a>
            <a href="mailto:nikkaforoughi@gmail.com">
              Let’s connect <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>

        <p className="panel-note">Designed pixel by pixel. Answered in a few seconds.</p>
      </aside>

      <section className="chat-panel" aria-label="Portfolio assistant chat">
        <header className="chat-header">
          <div className="assistant-identity">
            <span className="assistant-avatar">
              <img
                src="https://cdn.prod.website-files.com/6977d88e92d804c0b2d1b67f/6977d8aa9746a5efc8113c94_IMG_0034.png"
                alt=""
              />
            </span>
            <div>
              <strong>Portfolio AI Assistant</strong>
              <span><i /> Online · grounded in Nikka’s work</span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="reset-button"
            onClick={resetConversation}
            aria-label="Start a new conversation"
            title="Start a new conversation"
          >
            <RotateCcw size={17} />
          </Button>
        </header>

        <div className="chat-body">
          <div className="conversation" aria-live="polite">
            <div className="conversation-intro">
              <span>Candidate snapshot</span>
              <h2><span>Skip the scroll.</span><span>Ask what matters.</span></h2>
              <p>Explore Nikka’s work through a conversation.</p>
            </div>

            {messages.map((message) => (
              <article key={message.id} className={`message-row ${message.role}`}>
                {message.role === "assistant" && (
                  <span className="message-avatar" aria-hidden="true"><Bird size={16} strokeWidth={2.4} /></span>
                )}
                <div className="message-content">
                  <div className="message-bubble">{message.content}</div>
                  {message.links && message.links.length > 0 && (
                    <div className="answer-links">
                      {message.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label} <ExternalLink size={13} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}

            {isTyping && (
              <article className="message-row assistant">
                <span className="message-avatar" aria-hidden="true"><Bird size={16} strokeWidth={2.4} /></span>
                <div className="typing-bubble" role="status" aria-label="Assistant is typing">
                  <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
                </div>
              </article>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="composer-area">
          <div className="suggestion-scroll" aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => ask(suggestion)} disabled={isTyping}>
                {suggestion}
              </button>
            ))}
          </div>
          <form className="composer" onSubmit={submit}>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Nikka’s work, skills, or fit…"
              aria-label="Ask Nikka's portfolio assistant a question"
              autoComplete="off"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping} aria-label="Send question">
              <Send size={18} />
            </Button>
          </form>
          <p className="assistant-disclaimer">Answers are pre-programmed from Nikka’s resume and portfolio.</p>
        </div>
      </section>
    </main>
  );
}
