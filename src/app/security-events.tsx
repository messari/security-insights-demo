import React from "react";
import Markdown from "react-markdown";

const MESSARI_API_KEY = process.env.MESSARI_API_KEY;
const API_URL =
  "https://api.messari.io/intel/v1/events?category=Security%20and%20Hacks";

async function fetchEvents() {
  const res = await fetch(API_URL, {
    headers: {
      accept: "application/json",
      "x-messari-api-key": MESSARI_API_KEY,
    },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

function Chip({
  children,
  color = "bg-gray-700",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 ${color} ${className} text-gray-100`}
    >
      {children}
    </span>
  );
}

export default async function SecurityEvents() {
  let events = [];
  try {
    const data = await fetchEvents();
    events = data.data || [];
  } catch (e) {
    return <div className="p-6">Failed to load events.</div>;
  }

  return (
    <div className="flex flex-col h-full p-6 md:p-10 overflow-y-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide text-gray-100">
        Security Events
      </h2>
      <div className="flex-1 space-y-6 overflow-y-auto">
        {events.map((event: any) => (
          <div
            key={event.id}
            className="bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col gap-3 text-gray-100"
          >
            <div className="flex flex-wrap gap-2 mb-2">
              {event.primaryAssets?.map((asset: any) => (
                <Chip key={asset.id} color="bg-blue-800 text-blue-100">
                  {asset.name} ({asset.symbol})
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {event.importance && (
                <Chip color="bg-red-800 text-red-100">{event.importance}</Chip>
              )}
              {event.status && (
                <Chip color="bg-green-800 text-green-100">{event.status}</Chip>
              )}
              {event.category && (
                <Chip color="bg-purple-800 text-purple-100">
                  {event.category}
                </Chip>
              )}
              {event.subcategory && (
                <Chip color="bg-yellow-700 text-yellow-100">
                  {event.subcategory}
                </Chip>
              )}
            </div>
            <div className="prose prose-invert max-w-none text-sm text-gray-100 prose-headings:text-gray-100 prose-p:text-gray-100 prose-strong:text-gray-100 prose-a:text-blue-400">
              <Markdown>{event.eventDetails}</Markdown>
            </div>
            {event.resources && event.resources.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 text-xs opacity-80 text-gray-300">
                {event.resources.map((r: any, i: number) => (
                  <a
                    key={i}
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-400"
                  >
                    {r.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
