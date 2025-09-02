import React, { useEffect, useState, useMemo, useCallback } from "react";
import "../index.css";

interface CounterData {
  id: string;
  icon: string;
  target: number;
  label: string;
}

export const Counters = ({ ...props }) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const counterData: CounterData[] = useMemo(() => [
    { id: "instagram", icon: "📷", target: 12000, label: "Instagram Followers" },
    { id: "youtube", icon: "📺", target: 5000, label: "YouTube Subscribers" },
    { id: "facebook", icon: "👥", target: 7500, label: "Facebook Fans" }
  ], []);

  const animateCounter = useCallback((id: string, target: number) => {
    const increment = target / 200;
    let currentCount = 0;

    const updateCounter = () => {
      if (currentCount < target) {
        currentCount = Math.ceil(currentCount + increment);
        setCounts(prev => ({ ...prev, [id]: currentCount }));
        setTimeout(updateCounter, 30);
      } else {
        setCounts(prev => ({ ...prev, [id]: target }));
      }
    };

    updateCounter();
  }, []);

  useEffect(() => {
    // Initialize all counters to 0
    const initialCounts: Record<string, number> = {};
    counterData.forEach(counter => {
      initialCounts[counter.id] = 0;
    });
    setCounts(initialCounts);

    // Start animations after a short delay
    const timer = setTimeout(() => {
      counterData.forEach(counter => {
        animateCounter(counter.id, counter.target);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [counterData, animateCounter]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-600 text-white font-mono overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-center">
        {counterData.map((counter) => (
          <article key={counter.id} className="flex flex-col justify-center text-center mx-8 my-8">
            <div className="text-6xl mb-2">{counter.icon}</div>
            <div className="text-6xl mt-2 min-w-[5ch]">
              {counts[counter.id] || 0}
            </div>
            <span className="text-lg">{counter.label}</span>
          </article>
        ))}
      </div>
    </div>
  );
};
