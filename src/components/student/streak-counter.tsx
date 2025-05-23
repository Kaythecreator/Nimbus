"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame } from "lucide-react";

export function StreakCounter() {
  const currentStreak = 7;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Flame className="h-5 w-5 text-orange-500 mr-2" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-orange-500 mb-1">
            {currentStreak}
          </div>
          <p className="text-sm text-muted-foreground">Days in a row</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to next milestone</span>
            <span className="text-muted-foreground">7/10 days</span>
          </div>
          <Progress value={70} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            🎯 3 more days to earn the &quot;10-Day Achiever&quot; badge!
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 