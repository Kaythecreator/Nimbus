"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Clock,
  Coffee,
  Timer,
  Zap,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function PomodoroTimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'work' | 'break' | 'longBreak'>('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [totalSessionsToday, setTotalSessionsToday] = useState(3);
  
  // Settings
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [showSettings, setShowSettings] = useState(false);

  const sessionDurations = {
    work: workDuration * 60,
    break: shortBreakDuration * 60,
    longBreak: longBreakDuration * 60,
  };

  const sessionLabels = {
    work: "Focus Time",
    break: "Short Break",
    longBreak: "Long Break",
  };

  const sessionColors = {
    work: "text-red-500 bg-red-50 dark:bg-red-950",
    break: "text-green-500 bg-green-50 dark:bg-green-950",
    longBreak: "text-blue-500 bg-blue-50 dark:bg-blue-950",
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      setIsRunning(false);
      
      if (currentSession === 'work') {
        setCompletedPomodoros(prev => prev + 1);
        setTotalSessionsToday(prev => prev + 1);
        
        // After 4 work sessions, take a long break
        if ((completedPomodoros + 1) % 4 === 0) {
          setCurrentSession('longBreak');
          setTimeLeft(sessionDurations.longBreak);
        } else {
          setCurrentSession('break');
          setTimeLeft(sessionDurations.break);
        }
      } else {
        setCurrentSession('work');
        setTimeLeft(sessionDurations.work);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentSession, completedPomodoros, sessionDurations]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionDurations[currentSession]);
  };

  const skipSession = () => {
    setIsRunning(false);
    setTimeLeft(0); // This will trigger the session completion logic
  };

  const getProgressPercentage = () => {
    const totalTime = sessionDurations[currentSession];
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--header-height": "4rem",
      } as React.CSSProperties}
    >
      <StudentSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8 px-6 lg:px-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link href="/student" className="flex items-center hover:text-foreground">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                  <span className="text-foreground font-medium">Pomodoro Timer</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="h-6 w-6 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{completedPomodoros}</p>
                    <p className="text-sm text-muted-foreground">Completed Today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="h-6 w-6 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{totalSessionsToday}</p>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{Math.floor(totalSessionsToday * workDuration / 60)}h {(totalSessionsToday * workDuration) % 60}m</p>
                    <p className="text-sm text-muted-foreground">Study Time</p>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <Card>
                  <CardHeader>
                    <CardTitle>Timer Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Work Duration (minutes)</label>
                        <Select value={workDuration.toString()} onValueChange={(value) => setWorkDuration(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="20">20 minutes</SelectItem>
                            <SelectItem value="25">25 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Short Break (minutes)</label>
                        <Select value={shortBreakDuration.toString()} onValueChange={(value) => setShortBreakDuration(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 minutes</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="10">10 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Long Break (minutes)</label>
                        <Select value={longBreakDuration.toString()} onValueChange={(value) => setLongBreakDuration(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="20">20 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Main Timer */}
              <div className="max-w-2xl mx-auto w-full">
                <Card className={`min-h-[500px] ${sessionColors[currentSession]}`}>
                  <CardContent className="flex flex-col items-center justify-center p-8 h-full">
                    {/* Session Type */}
                    <Badge variant="outline" className="mb-6 text-lg px-4 py-2">
                      {currentSession === 'work' && <Timer className="h-4 w-4 mr-2" />}
                      {currentSession === 'break' && <Coffee className="h-4 w-4 mr-2" />}
                      {currentSession === 'longBreak' && <Coffee className="h-4 w-4 mr-2" />}
                      {sessionLabels[currentSession]}
                    </Badge>

                    {/* Timer Display */}
                    <div className="text-8xl font-mono font-bold mb-8 text-center">
                      {formatTime(timeLeft)}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md mb-8">
                      <Progress value={getProgressPercentage()} className="h-3" />
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4 mb-6">
                      <Button
                        size="lg"
                        onClick={toggleTimer}
                        className="px-8 py-4 text-lg"
                      >
                        {isRunning ? (
                          <>
                            <Pause className="h-5 w-5 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5 mr-2" />
                            Start
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={resetTimer}
                        className="px-6 py-4"
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Reset
                      </Button>
                    </div>

                    {/* Skip Session */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={skipSession}
                      className="text-muted-foreground"
                    >
                      Skip Session
                    </Button>

                    {/* Session Progress */}
                    <div className="mt-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        Session {completedPomodoros + 1} • {completedPomodoros % 4 + 1}/4 until long break
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tips */}
              <Card className="max-w-2xl mx-auto w-full">
                <CardHeader>
                  <CardTitle className="text-lg">Pomodoro Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Focus completely on one task during work sessions</li>
                    <li>• Take your breaks seriously - step away from your workspace</li>
                    <li>• After 4 pomodoros, take a longer 15-30 minute break</li>
                    <li>• Turn off notifications during focus time</li>
                    <li>• Track what you accomplish in each session</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 