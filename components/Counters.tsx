import React, { useEffect, useState, useMemo, useCallback } from "react";
import { 
  Target, 
  Newspaper, 
  Trophy, 
  Calendar 
} from "lucide-react";
import "../index.css";

interface CounterData {
  id: string;
  icon: React.ReactNode;
  target: number;
  label: string;
}

export const Counters = ({ ...props }) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const counterData: CounterData[] = useMemo(() => [
    { 
      id: "campaigns", 
      icon: <Target className="w-16 h-16 text-blue-600 stroke-1" />, 
      target: 125, 
      label: "Campaigns Executed" 
    },
    { 
      id: "mediahits", 
      icon: <Newspaper className="w-16 h-16 text-green-600 stroke-1" />, 
      target: 1201, 
      label: "Media Hits Published" 
    },
    { 
      id: "topmedia", 
      icon: <Trophy className="w-16 h-16 text-yellow-600 stroke-1" />, 
      target: 20, 
      label: "Top-tier Media Reached" 
    },
    { 
      id: "years", 
      icon: <Calendar className="w-16 h-16 text-purple-600 stroke-1" />, 
      target: 15, 
      label: "Years in PR" 
    }
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
    <div className="flex items-center justify-center py-8 font-mono overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">
        {counterData.map((counter) => (
          <article key={counter.id} className="flex flex-col justify-center text-center">
            <div className="flex justify-center mb-4">{counter.icon}</div>
            <div className="text-5xl font-bold mt-2 min-w-[5ch] text-gray-800">
              {counts[counter.id] || 0}
            </div>
            <span className="text-lg text-gray-600 mt-2">{counter.label}</span>
          </article>
        ))}
      </div>
    </div>
  );
};
