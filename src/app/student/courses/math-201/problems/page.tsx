"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Eye,
  FileText,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function MathProblemsPage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<number[]>([]);

  const problems = [
    {
      id: 1,
      title: "The Great Depression and New Deal",
      problem: "Analyze the causes and consequences of the Great Depression in the United States. In your response, you should:\n\na) Identify and explain at least THREE major causes of the Great Depression\nb) Describe how the economic crisis affected different groups in American society\nc) Evaluate the effectiveness of Franklin D. Roosevelt's New Deal programs in addressing the economic crisis\n\nUse specific historical evidence to support your analysis.",
      difficulty: "Hard",
      topic: "American History",
      hint: "Consider both immediate triggers (like the stock market crash) and underlying structural problems. Think about how different social and economic groups experienced the Depression differently.",
      solution: {
        steps: [
          "a) Major causes: Stock market speculation and crash (1929), bank failures and lack of regulation, overproduction in agriculture and industry, unequal distribution of wealth, international economic problems",
          "b) Effects on different groups: Farmers faced foreclosures and Dust Bowl conditions, industrial workers experienced massive unemployment, African Americans faced 'last hired, first fired' discrimination, middle class lost savings and homes",
          "c) New Deal evaluation: Relief programs (CCC, WPA) provided immediate employment, Recovery programs (AAA, NIRA) had mixed success, Reform programs (Social Security, FDIC) created lasting safety nets, but full recovery didn't occur until WWII",
          "Conclusion: While New Deal programs provided crucial relief and implemented important reforms, they did not fully end the Depression but established precedent for federal government intervention in the economy."
        ],
        answer: "A comprehensive analysis addressing all three parts with specific historical evidence showing understanding of causation, impact on different groups, and evaluation of New Deal effectiveness."
      }
    },
    {
      id: 2,
      title: "World War II and American Society",
      problem: "Examine the impact of World War II on American society and civil rights. Your essay should address:\n\na) How did the war effort change the role of women in American society?\nb) What were the experiences of minority groups during the war, including both discrimination and opportunities?\nc) Analyze the long-term consequences of wartime changes for post-war American society.\n\nProvide specific examples and evidence to support your arguments.",
      difficulty: "Medium",
      topic: "American History",
      hint: "Think about 'Rosie the Riveter,' the Double V Campaign, Japanese internment, and how wartime needs created both opportunities and continued discrimination.",
      solution: {
        steps: [
          "a) Women's roles: Entered industrial workforce in unprecedented numbers ('Rosie the Riveter'), served in military auxiliaries (WAVES, WACs), challenged traditional gender roles, but faced pressure to return to domestic roles post-war",
          "b) Minority experiences: African Americans faced continued segregation but gained industrial jobs and military service (Tuskegee Airmen), Mexican Americans experienced both Bracero Program opportunities and Zoot Suit Riots discrimination, Japanese Americans faced internment camps",
          "c) Long-term consequences: Foundation for 1950s-60s civil rights movement, women's workforce participation remained higher than pre-war, suburban growth and GI Bill benefits (though unequally distributed), Cold War mentality emerged",
          "Overall assessment: War created unprecedented opportunities for marginalized groups while simultaneously reinforcing existing inequalities, setting stage for post-war social movements."
        ],
        answer: "A well-structured response demonstrating understanding of how WWII transformed American society while acknowledging the complex and often contradictory nature of wartime social changes."
      }
    },
    {
      id: 3,
      title: "Cold War Origins and Containment",
      problem: "Analyze the origins of the Cold War and evaluate the effectiveness of the containment policy from 1945-1960. Your response should:\n\na) Explain the major factors that led to the breakdown of the wartime alliance between the United States and Soviet Union\nb) Describe the key components of the containment strategy\nc) Assess the successes and failures of containment policy during this period, using specific examples\n\nSupport your analysis with relevant historical evidence.",
      difficulty: "Hard",
      topic: "American History",
      hint: "Consider ideological differences, competing post-war visions, specific conflicts like Berlin and Korea, and both military and economic aspects of containment.",
      solution: {
        steps: [
          "a) Origins: Ideological conflict between capitalism and communism, disagreements over post-war Europe (Poland, Germany), Stalin's expansion in Eastern Europe, Truman's more confrontational approach than FDR",
          "b) Containment components: Truman Doctrine (military aid to resist communism), Marshall Plan (economic reconstruction), NATO (military alliance), nuclear deterrence strategy",
          "c) Successes and failures: Successes - Western Europe remained non-communist, NATO alliance formed, South Korea preserved; Failures - Eastern Europe became Soviet sphere, China 'fell' to communism, costly arms race began",
          "Evaluation: Containment achieved primary goal of preventing further Soviet expansion in Western Europe but came at enormous economic and social costs, and led to prolonged global confrontation."
        ],
        answer: "A nuanced analysis that recognizes both the strategic logic of containment and its limitations, supported by specific historical examples from the early Cold War period."
      }
    },
    {
      id: 4,
      title: "Civil Rights Movement Strategies",
      problem: "Compare and contrast the different strategies used by civil rights activists in the 1950s and 1960s. In your essay:\n\na) Analyze the approach and effectiveness of nonviolent direct action as exemplified by Martin Luther King Jr. and the Southern Christian Leadership Conference\nb) Examine the more militant approaches advocated by leaders like Malcolm X and the Black Panther Party\nc) Evaluate which strategies were most effective in achieving civil rights goals and explain your reasoning\n\nUse specific historical examples to illustrate your points.",
      difficulty: "Medium",
      topic: "American History",
      hint: "Consider different goals, target audiences, methods used, and both immediate and long-term impacts of various approaches to civil rights activism.",
      solution: {
        steps: [
          "a) Nonviolent direct action: Used moral persuasion and media attention (Montgomery Bus Boycott, Birmingham Campaign), appealed to white liberal conscience, achieved major legislative victories (Civil Rights Act 1964, Voting Rights Act 1965)",
          "b) Militant approaches: Malcolm X emphasized black pride and self-determination, Black Panthers focused on community self-defense and social programs, rejected integration in favor of black empowerment",
          "c) Effectiveness evaluation: Nonviolent protest achieved concrete legislative changes and broad public support, militant approaches raised consciousness and addressed urban issues neglected by mainstream movement, both were necessary for comprehensive change",
          "Synthesis: Different strategies served different purposes and constituencies, with nonviolent methods more effective for changing laws while militant approaches better addressed psychological and community empowerment needs."
        ],
        answer: "A balanced analysis that recognizes the complementary nature of different civil rights strategies and avoids oversimplifying complex social movement dynamics."
      }
    },
    {
      id: 5,
      title: "Immigration and American Identity",
      problem: "Examine the changing patterns of immigration to the United States from 1880-1920 and analyze their impact on American society. Your response should address:\n\na) Describe the 'New Immigration' and how it differed from earlier waves of immigration\nb) Analyze the nativist response to immigration during this period, including specific legislation and social movements\nc) Evaluate the long-term effects of this immigration wave on American culture, economy, and politics\n\nProvide specific examples and evidence throughout your analysis.",
      difficulty: "Medium",
      topic: "American History",
      hint: "Think about Southern and Eastern European immigrants, urban settlement patterns, the role of political machines, and how World War I affected attitudes toward immigrants.",
      solution: {
        steps: [
          "a) New Immigration characteristics: Primarily from Southern/Eastern Europe (Italians, Poles, Jews, etc.), more likely to be Catholic/Jewish rather than Protestant, settled in urban industrial centers, often viewed as less 'assimilable'",
          "b) Nativist responses: Chinese Exclusion Act (1882), Immigration Act of 1924 (quota system), rise of KKK, 'Americanization' programs, Red Scare linking immigrants to radicalism",
          "c) Long-term effects: Created diverse urban neighborhoods and cultural institutions, provided labor for industrial expansion, contributed to political machine politics, enriched American culture while also generating ongoing debates about national identity",
          "Assessment: Immigration transformed America into a more diverse, urban, industrial society while simultaneously generating tensions about American identity that persist today."
        ],
        answer: "A comprehensive analysis that demonstrates understanding of immigration patterns, social responses, and long-term historical significance with specific supporting evidence."
      }
    }
  ];

  const currentProblemData = problems[currentProblem];

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (!completedProblems.includes(currentProblemData.id)) {
      setCompletedProblems([...completedProblems, currentProblemData.id]);
    }
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      resetForm();
    }
  };

  const handlePrevious = () => {
    if (currentProblem > 0) {
      setCurrentProblem(currentProblem - 1);
      resetForm();
    }
  };

  const resetForm = () => {
    setUserAnswer("");
    setIsSubmitted(false);
    setShowSolution(false);
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
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
                  <Link href="/student/courses/math-201" className="flex items-center hover:text-foreground">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Advanced Mathematics
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground font-medium">FRQ Essays</span>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-transparent px-2 mx-64">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {currentProblem + 1} of {problems.length} problems
                  </span>
                </div>
                <Progress value={((currentProblem + 1) / problems.length) * 100} className="h-2" />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">Completed: {completedProblems.length}</span>
                  <span className="text-xs text-muted-foreground">{Math.round((completedProblems.length / problems.length) * 100)}%</span>
                </div>
              </div>

              {/* Problem */}
              <div className="max-w-4xl mx-auto w-full space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{currentProblemData.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{currentProblemData.topic}</Badge>
                          <Badge 
                            variant={currentProblemData.difficulty === 'Easy' ? 'secondary' : 
                                    currentProblemData.difficulty === 'Medium' ? 'default' : 'destructive'}
                          >
                            {currentProblemData.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-lg font-medium mb-2">Problem:</p>
                      <p className="text-base leading-relaxed">{currentProblemData.problem}</p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Hint:</span>
                      </div>
                      <p className="text-blue-700">{currentProblemData.hint}</p>
                    </div>

                    {/* Answer Input */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="answer" className="text-base font-medium">Your Response:</Label>
                        <Textarea
                          id="answer"
                          placeholder="Write your complete essay response here..."
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="mt-2 min-h-[200px]"
                          disabled={isSubmitted}
                        />
                      </div>

                      {!isSubmitted ? (
                        <Button 
                          onClick={handleSubmit} 
                          disabled={!userAnswer.trim()}
                          className="w-full"
                        >
                          Submit Answer
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-2 text-green-600">
                              <Check className="h-5 w-5" />
                              <span className="font-medium">Answer Submitted</span>
                            </div>
                            <Button variant="outline" onClick={toggleSolution}>
                              <Eye className="h-4 w-4 mr-2" />
                              {showSolution ? "Hide Solution" : "View Solution"}
                            </Button>
                          </div>

                          {showSolution && (
                            <Card className="border-green-200 bg-green-50">
                              <CardHeader>
                                <CardTitle className="text-green-800">Step-by-Step Solution</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {currentProblemData.solution.steps.map((step, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                      <div className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {index + 1}
                                      </div>
                                      <p className="text-green-700">{step}</p>
                                    </div>
                                  ))}
                                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                    <p className="font-semibold text-green-800">
                                      Final Answer: {currentProblemData.solution.answer}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    disabled={currentProblem === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Problem {currentProblem + 1} of {problems.length}
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={handleNext}
                    disabled={currentProblem === problems.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Summary */}
                {completedProblems.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Session Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{completedProblems.length}</p>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{problems.length - completedProblems.length}</p>
                          <p className="text-sm text-muted-foreground">Remaining</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            {Math.round((completedProblems.length / problems.length) * 100)}%
                          </p>
                          <p className="text-sm text-muted-foreground">Progress</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">
                            {problems.filter(p => completedProblems.includes(p.id)).reduce((acc, p) => {
                              const points = p.difficulty === 'Easy' ? 1 : p.difficulty === 'Medium' ? 2 : 3;
                              return acc + points;
                            }, 0)}
                          </p>
                          <p className="text-sm text-muted-foreground">XP Earned</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 