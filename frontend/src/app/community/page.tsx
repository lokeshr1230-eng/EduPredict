"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

interface Answer { id: string; content: string; author: { name: string }; }
interface Question { id: string; title: string; content: string; tags: string[]; author: { name: string }; answers: Answer[]; createdAt: string; }

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CommunityPage() {
  const { token, user } = useAuthStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answerText, setAnswerText] = useState<Record<string, string>>({});

  const fetchQuestions = useCallback(async () => {
    const res = await fetch(`${API}/questions`);
    setQuestions(await res.json());
  }, []);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchQuestions();
  }, [fetchQuestions]);

  // 👇 Redirect if not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-md">
        <h2 className="font-h2 text-h2 text-primary">Sign in to access Community Q&A</h2>
        <p className="font-body-md text-on-surface-variant">Join the discussion, ask questions and help others.</p>
        <Link href="/auth" className="bg-secondary text-on-secondary px-lg py-sm rounded font-label-md hover:opacity-90">
          Sign In
        </Link>
      </div>
    );
  }

  const submitQuestion = async () => {
    if (!title.trim()) return;
    await fetch(`${API}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content }),
    });
    setTitle(""); setContent(""); setShowForm(false);
    void fetchQuestions();
  };

  const submitAnswer = async (questionId: string) => {
    const text = answerText[questionId];
    if (!text?.trim()) return;
    await fetch(`${API}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content: text, questionId }),
    });
    setAnswerText((prev) => ({ ...prev, [questionId]: "" }));
    void fetchQuestions();
  };

  return (
    <main className="max-w-[800px] mx-auto px-gutter py-xl w-full">
      <div className="flex justify-between items-center mb-xl">
        <div>
          <h1 className="font-h1 text-h1 text-primary">Community Q&A</h1>
          <p className="font-body-sm text-on-surface-variant">Ask questions, share answers</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-secondary text-on-secondary px-lg py-sm rounded font-label-md hover:opacity-90">
          {showForm ? "Cancel" : "Ask Question"}
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg mb-xl flex flex-col gap-md">
          <input className="border border-outline-variant rounded px-md py-sm font-body-md text-on-surface bg-surface outline-none focus:border-primary"
            placeholder="Question title *" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="border border-outline-variant rounded px-md py-sm font-body-md text-on-surface bg-surface outline-none focus:border-primary resize-none h-24"
            placeholder="Describe your question (optional)" value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={submitQuestion}
            className="self-end bg-primary text-on-primary px-lg py-sm rounded font-label-md hover:opacity-90">
            Post Question
          </button>
        </div>
      )}

      <div className="flex flex-col gap-md">
        {questions.map((q) => (
          <div key={q.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <button className="w-full text-left p-lg flex justify-between items-start gap-md hover:bg-surface-container-low transition-colors"
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}>
              <div className="flex-1">
                <h3 className="font-h3 text-h3 text-primary mb-xs">{q.title}</h3>
                <p className="font-body-sm text-on-surface-variant">by {q.author.name} · {q.answers.length} answer{q.answers.length !== 1 ? "s" : ""}</p>
              </div>
              <span className="text-on-surface-variant">{expanded === q.id ? "▲" : "▼"}</span>
            </button>

            {expanded === q.id && (
              <div className="px-lg pb-lg border-t border-outline-variant flex flex-col gap-md pt-md">
                {q.content && <p className="font-body-md text-on-surface-variant">{q.content}</p>}
                {q.answers.map((a) => (
                  <div key={a.id} className="bg-surface-container-low rounded-lg p-md border border-outline-variant">
                    <p className="font-body-md text-on-surface mb-xs">{a.content}</p>
                    <p className="font-label-sm text-on-surface-variant">— {a.author.name}</p>
                  </div>
                ))}
                <div className="flex gap-sm mt-sm">
                  <input className="flex-1 border border-outline-variant rounded px-md py-sm font-body-md text-on-surface bg-surface outline-none focus:border-primary"
                    placeholder="Write an answer..."
                    value={answerText[q.id] || ""}
                    onChange={(e) => setAnswerText((prev) => ({ ...prev, [q.id]: e.target.value }))} />
                  <button onClick={() => submitAnswer(q.id)}
                    className="bg-secondary text-on-secondary px-md py-sm rounded font-label-md hover:opacity-90">
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {questions.length === 0 && (
          <p className="text-center py-xl text-on-surface-variant font-body-md">No questions yet. Be the first to ask!</p>
        )}
      </div>
    </main>
  );
}