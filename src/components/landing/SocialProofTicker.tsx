"use client";

const items = [
  "247 students planned trips this week",
  "1,892 trips booked",
  "12 destinations across India",
  "₹0 hidden fees — ever",
];

function TickerContent() {
  return (
    <div className="flex items-center gap-12 whitespace-nowrap">
      {items.map((item, i) => (
        <span key={i} className="font-mono text-sm text-ink-muted tracking-tight">
          ◆ {item}
        </span>
      ))}
    </div>
  );
}

export function SocialProofTicker() {
  return (
    <div className="w-full border-t-2 border-ink py-4 overflow-hidden bg-surface-alt">
      <div className="flex animate-ticker" style={{ width: "fit-content" }}>
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
