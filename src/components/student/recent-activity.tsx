"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy, Target, Award } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      icon: Trophy,
      iconBg: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      title: 'Completed "Calculus Quiz 3"',
      description: "Scored 85% • 2 hours ago"
    },
    {
      icon: Target,
      iconBg: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      title: 'Started "Data Structures Review"',
      description: "Progress: 3/10 topics • Yesterday"
    },
    {
      icon: Award,
      iconBg: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
      title: 'Earned "7-Day Streak" badge',
      description: "Keep it up! • 3 days ago"
    }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index}>
              <div className="flex items-center space-x-3">
                <div className={`${activity.iconBg} p-2 rounded-full`}>
                  <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
              </div>
              {index < activities.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 