import React from "react";
import SecurityInsights from "./security-insights";
import SecurityEvents from "./security-events";

export default async function HomePage() {
  return (
    <main className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-950 text-gray-100">
      {/* Security AI Insights (left) */}
      <section className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col border-r border-gray-800 overflow-hidden bg-gray-950">
        <SecurityInsights />
      </section>
      {/* Security Events (right) */}
      <section className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col overflow-hidden bg-gray-950">
        <SecurityEvents />
      </section>
    </main>
  );
}
