"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickStats() {
  const stats = [
    { label: "Quizzes Taken", value: "23", color: "text-blue-500" },
    { label: "Avg Score", value: "78%", color: "text-green-500" },
    { label: "Study Time", value: "45h", color: "text-purple-500" },
    { label: "Badges", value: "12", color: "text-orange-500" }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 