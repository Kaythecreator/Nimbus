"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Play, ChevronRight } from "lucide-react";

const mockRecommendedTopics = [
  { topic: "Calculus Integration", difficulty: "Medium", course: "Advanced Mathematics" },
  { topic: "Binary Trees", difficulty: "Hard", course: "Computer Science" },
  { topic: "Kinetic Energy", difficulty: "Easy", course: "Physics" },
  { topic: "Matrix Operations", difficulty: "Medium", course: "Advanced Mathematics" }
];

export function RecommendedTopics() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          Recommended Topics
        </CardTitle>
        <CardDescription>
          Based on your performance areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockRecommendedTopics.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.topic}</p>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={item.difficulty === "Easy" ? "secondary" : 
                           item.difficulty === "Medium" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {item.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.course}
                  </span>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Play className="h-3 w-3 mr-1" />
                Start
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-3" size="sm">
          View All Recommendations
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
} 