"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/client-analytics";

type CostKey = "intercity" | "room" | "food" | "admission" | "local";
type Costs = Record<CostKey, string>;

const fields: { key: CostKey; name: string; help: string }[] = [
  { key: "intercity", name: "Return travel fare per person", help: "Transport to and from the destination" },
  { key: "room", name: "Accommodation per night (group total)", help: "Total price of all rooms per night" },
  { key: "food", name: "Meals per person per day", help: "Your own daily food allowance" },
  { key: "admission", name: "Attractions per person (trip total)", help: "Tickets and paid activities for the whole trip" },
  { key: "local", name: "Local transport per day (group total)", help: "Taxis, buses or other local travel" },
];
const emptyCosts: Costs = { intercity: "", room: "", food: "", admission: "", local: "" };
const money = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);
const cost = (value: string) => Math.max(0, Math.min(100000000, Number(value) || 0));

export function TripBudgetPlanner() {
  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);
  const [buffer, setBuffer] = useState(10);
  const [destination, setDestination] = useState("");
  const [values, setValues] = useState<Costs>(emptyCosts);
  const [message, setMessage] = useState("");
  const nights = Math.max(0, days - 1);
  const parts = [
    { name: "Return travel", value: cost(values.intercity) * people },
    { name: "Accommodation", value: cost(values.room) * nights },
    { name: "Meals", value: cost(values.food) * people * days },
    { name: "Attractions", value: cost(values.admission) * people },
    { name: "Local travel", value: cost(values.local) * days },
  ];
  const subtotal = parts.reduce((sum, item) => sum + item.value, 0);
  const contingency = Math.round(subtotal * buffer / 100);
  const total = subtotal + contingency;
  const entered = Object.values(values).some((value) => value !== "" && cost(value) > 0);
  const title = destination.trim().slice(0, 80) || "My Nigeria trip";
  const summary = [
    title + " — travel budget (my estimates)",
    String(days) + " days / " + String(nights) + " nights · " + String(people) + " travellers",
    ...parts.map((item) => item.name + ": " + money(item.value)),
    "Contingency (" + buffer + "%): " + money(contingency),
    "Estimated total: " + money(total),
    "Estimate only; confirm actual fares, opening days and costs before booking.",
    "Plan with MyNigeriaGuide: https://mynigeriaguide.com/explore/trip-planner",
  ].join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setMessage("Budget copied");
      trackEvent("trip_plan_share", { method: "copy", days_band: days <= 3 ? "1-3" : "4+" });
    } catch { setMessage("Copy unavailable. Use WhatsApp instead."); }
  }

  return <div className="trip-budget-layout">
    <form className="trip-budget-form" onSubmit={(event) => event.preventDefault()}>
      <h2>Your trip details</h2>
      <label>Destination or trip name
        <input value={destination} maxLength={80} onChange={(event) => setDestination(event.target.value)} placeholder="e.g. Weekend in Calabar" />
      </label>
      <div className="trip-budget-pair">
        <label>Days
          <input type="number" min="1" max="30" value={days} onChange={(event) => setDays(Math.max(1, Math.min(30, Number(event.target.value) || 1)))} />
        </label>
        <label>Travellers
          <input type="number" min="1" max="20" value={people} onChange={(event) => setPeople(Math.max(1, Math.min(20, Number(event.target.value) || 1)))} />
        </label>
      </div>
      <p className="feature-guide-note">All costs below are in naira (₦). Leave unused items blank.</p>
      {fields.map((field) => (
        <label key={field.key}>{field.name}
          <span className="trip-budget-help">{field.help}</span>
          <input type="number" min="0" max="100000000" inputMode="numeric" value={values[field.key]}
            placeholder="₦ Enter your estimate" onChange={(event) => setValues((previous) => ({ ...previous, [field.key]: event.target.value }))} />
        </label>
      ))}
      <label>Extra allowance (%)
        <select value={buffer} onChange={(event) => setBuffer(Number(event.target.value))}>
          {[0, 5, 10, 15, 20].map((value) => <option value={value} key={value}>{value}%</option>)}
        </select>
      </label>
      <button type="button" className="trip-budget-reset" onClick={() => { setValues(emptyCosts); setMessage(""); }}>Clear costs</button>
    </form>
    <aside className="trip-budget-results" aria-label="Trip cost estimate">
      <span className="eyebrow">Your estimate</span>
      <h2>{entered ? money(total) : "Add your costs"}</h2>
      <p>{days} days · {people} travellers · {nights} nights</p>
      <dl>
        {parts.map((part) => <div key={part.name}><dt>{part.name}</dt><dd>{money(part.value)}</dd></div>)}
        <div><dt>Allowance ({buffer}%)</dt><dd>{money(contingency)}</dd></div>
        <div className="trip-budget-total"><dt>Estimated total</dt><dd>{entered ? money(total) : "—"}</dd></div>
      </dl>
      <p className="feature-guide-note">This is your personal calculation, not a live quote. Prices may change and some destinations need advance permission or booking.</p>
      <div className="trip-budget-actions">
        <button type="button" onClick={copy} disabled={!entered}>Copy plan</button>
        <a href={"https://wa.me/?text=" + encodeURIComponent(summary)} target="_blank" rel="noopener noreferrer" aria-disabled={!entered} onClick={(event) => {
          if (!entered) { event.preventDefault(); return; }
          trackEvent("trip_plan_share", { method: "whatsapp", days_band: days <= 3 ? "1-3" : "4+" });
        }}>Share on WhatsApp ↗</a>
      </div>
      {message ? <p role="status">{message}</p> : null}
    </aside>
  </div>;
}
