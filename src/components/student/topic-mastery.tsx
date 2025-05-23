"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, ChevronRight } from "lucide-react";

const mockTopicMastery = [
  { topic: "Algebra", mastery: 95, color: "text-green-500" },
  { topic: "Calculus", mastery: 78, color: "text-blue-500" },
  { topic: "Physics", mastery: 82, color: "text-purple-500" },
  { topic: "Programming", mastery: 65, color: "text-orange-500" }
];

export function TopicMastery() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <BarChart3 className="h-5 w-5 text-green-500 mr-2" />
          Topic Mastery
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTopicMastery.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{item.topic}</span>
                <span className={`text-sm font-semibold ${item.color}`}>
                  {item.mastery}%
                </span>
              </div>
              <Progress value={item.mastery} className="h-2" />
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4" size="sm">
          View Detailed Analytics
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
} 