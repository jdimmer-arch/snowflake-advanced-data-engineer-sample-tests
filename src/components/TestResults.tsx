import { useState, useMemo } from 'react';
import { Test, UserAnswer } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';

interface TestResultsProps {
  test: Test;
  userAnswers: UserAnswer[];
  onRetakeTest: () => void;
  onSelectNewTest: () => void;
}

export function TestResults({ test, userAnswers, onRetakeTest, onSelectNewTest }: TestResultsProps) {
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  
  const results = useMemo(() => {
    const correctAnswers = userAnswers.filter(a => a.isCorrect);
    const score = correctAnswers.length;
    const totalQuestions = userAnswers.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Calculate domain scores
    const domainScores: Record<string, { correct: number; total: number; percentage: number }> = {};
    
    test.questions.forEach((question) => {
      const domain = question.domain;
      const answer = userAnswers.find(a => a.questionId === question.id);
      
      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0, percentage: 0 };
      }
      
      domainScores[domain].total += 1;
      if (answer?.isCorrect) {
        domainScores[domain].correct += 1;
      }
    });
    
    // Calculate percentages for each domain
    Object.keys(domainScores).forEach(domain => {
      const { correct, total } = domainScores[domain];
      domainScores[domain].percentage = Math.round((correct / total) * 100);
    });
    
    return {
      score,
      totalQuestions,
      percentage,
      domainScores
    };
  }, [test, userAnswers]);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent! You are well-prepared for the exam.';
    if (percentage >= 70) return 'Good job! With a bit more study, you will be ready.';
    return 'More study needed. Focus on the domains with lower scores.';
  };
  
  const passingScore = 70; // Assuming 70% is passing
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-2">{test.title} Results</h1>
      <p className="text-center mb-8 text-lg">Snowflake Advanced Data Engineering Certificate</p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(results.percentage)}`}>
              {results.percentage}%
            </div>
            <div className="text-xl mb-4">
              {results.score} correct out of {results.totalQuestions} questions
            </div>
            <Progress 
              value={results.percentage} 
              className={`w-full h-4 mb-4 ${results.percentage >= passingScore ? 'bg-green-600' : 'bg-red-600'}`}
            />
            <div className="text-center mt-2">
              {getScoreMessage(results.percentage)}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Domain Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(results.domainScores).map(([domain, score]) => (
              <div key={domain}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{domain}</span>
                  <span className={getScoreColor(score.percentage)}>
                    {score.correct}/{score.total} ({score.percentage}%)
                  </span>
                </div>
                <Progress value={score.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center space-x-4 mb-8">
        <Button onClick={onRetakeTest}>Retake Test</Button>
        <Button variant="outline" onClick={onSelectNewTest}>Select Different Test</Button>
        <Button 
          variant="outline" 
          onClick={() => setShowAllQuestions(!showAllQuestions)}
        >
          {showAllQuestions ? 'Hide Questions' : 'Review All Questions'}
        </Button>
      </div>
      
      {showAllQuestions && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Question Review</h2>
          
          {test.questions.map((question) => {
            const userAnswer = userAnswers.find(a => a.questionId === question.id);
            const isCorrect = userAnswer?.isCorrect;
            
            return (
              <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start">
                    <span className="mr-2">Question {question.id}:</span>
                    <span className="flex-1">{question.text}</span>
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {question.options.map(option => (
                      <div 
                        key={option.id}
                        className={`p-3 rounded-md ${
                          option.id === question.correctAnswer
                            ? 'bg-green-50 border border-green-200'
                            : option.id === userAnswer?.selectedOption && !isCorrect
                              ? 'bg-red-50 border border-red-200'
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="font-medium mr-2">{option.id}.</span>
                          <span className="flex-1">{option.text}</span>
                          {option.id === question.correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                          )}
                          {option.id === userAnswer?.selectedOption && !isCorrect && option.id !== question.correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                      <h3 className="font-bold mb-2">Explanation:</h3>
                      <p className="whitespace-pre-line">{question.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
