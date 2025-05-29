import React from "react";
import Markdown from "react-markdown";

const MESSARI_API_KEY = process.env.MESSARI_API_KEY;
const API_URL = "https://api.messari.io/ai/openai/chat/completions";

async function fetchInsights() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "X-MESSARI-API-KEY": MESSARI_API_KEY,
      accept: "application/json",
      "content-type": "application/json",
    },
    cache: "force-cache",
    body: JSON.stringify({
      verbosity: "balanced",
      response_format: "markdown",
      inline_citations: true,
      stream: false,
      generate_related_questions: 0,
      messages: [
        {
          role: "user",
          content:
            "Provide insights about security, hacks, attacks, exploits that would be on the most impactful events happening in crypto in the recent month. Order the events in the answer by their importance",
        },
      ],
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
}

export default async function SecurityInsights() {
  let insights = null;
  let citations = [];
  try {
    const data = await fetchInsights();
    insights = data.choices?.[0]?.message?.content || "No insights available.";
    citations = data.choices?.[0]?.message?.citations || [];
  } catch (e) {
    insights = "Failed to load insights.";
  }

  return (
    <div className="flex flex-col h-full p-6 md:p-10 overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide text-gray-100">
        Security AI Insights
      </h2>
      <div className="flex-1 bg-gray-900 rounded-xl shadow-lg p-6 mb-8 overflow-y-auto prose prose-invert max-w-none text-gray-100 prose-headings:text-gray-100 prose-p:text-gray-100 prose-strong:text-gray-100 prose-a:text-blue-400">
        <Markdown>{insights}</Markdown>
      </div>
      {citations && citations.length > 0 && (
        <div className="mt-8 bg-gray-800 rounded-lg p-4 text-xs text-gray-200">
          <h3 className="font-semibold mb-2 text-gray-100">Citations</h3>
          <ul className="list-disc pl-5 space-y-1">
            {citations.map((c: any, i: number) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
