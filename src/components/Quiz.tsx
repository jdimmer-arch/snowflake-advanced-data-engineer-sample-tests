import { useState, useEffect } from 'react';
import { Question, UserAnswer } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  testId: number;
  onComplete: (answers: UserAnswer[]) => void;
  onExit: () => void;
}

export function Quiz({ questions, onComplete, onExit }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  // Initialize user answers
  useEffect(() => {
    const initialAnswers = questions.map(q => ({
      questionId: q.id,
      selectedOption: null,
      isCorrect: false
    }));
    setUserAnswers(initialAnswers);
  }, [questions]);
  
  const handleOptionSelect = (optionId: string) => {
    if (showExplanation) return; // Prevent changing answer after revealing explanation
    
    const updatedAnswers = [...userAnswers];
    const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (answerIndex !== -1) {
      updatedAnswers[answerIndex] = {
        ...updatedAnswers[answerIndex],
        selectedOption: optionId,
        isCorrect: optionId === currentQuestion.correctAnswer
      };
      setUserAnswers(updatedAnswers);
    }
  };
  
  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    setShowExplanation(false);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(userAnswers);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowExplanation(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const currentAnswer = userAnswers.find(a => a.questionId === currentQuestion?.id);
  const hasSelectedOption = currentAnswer?.selectedOption !== null;
  
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={onExit}>Exit Test</Button>
        <div className="text-sm">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
      </div>
      
      <Progress value={progress} className="mb-6" />
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQuestion.domain} - Question {currentQuestion.id}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 whitespace-pre-line">{currentQuestion.text}</p>
          
          <RadioGroup 
            value={currentAnswer?.selectedOption || ""}
            className="space-y-4"
          >
            {currentQuestion.options.map((option) => (
              <div 
                key={option.id} 
                className={`flex items-start space-x-2 p-3 rounded-md border ${
                  showExplanation && option.id === currentQuestion.correctAnswer
                    ? 'bg-green-50 border-green-200'
                    : showExplanation && option.id === currentAnswer?.selectedOption
                      ? option.id !== currentQuestion.correctAnswer 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-green-50 border-green-200'
                      : option.id === currentAnswer?.selectedOption
                        ? 'bg-slate-100 border-slate-200'
                        : 'hover:bg-slate-50'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <RadioGroupItem 
                  value={option.id} 
                  id={`option-${option.id}`} 
                  disabled={showExplanation}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor={`option-${option.id}`}
                    className="flex items-start cursor-pointer"
                  >
                    <span className="font-medium mr-2">{option.id}.</span>
                    <span className="flex-1">{option.text}</span>
                    {showExplanation && option.id === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                    )}
                    {showExplanation && option.id === currentAnswer?.selectedOption && 
                     option.id !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                    )}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
          
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
              <h3 className="font-bold mb-2">Explanation:</h3>
              <p className="whitespace-pre-line">{currentQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <div>
            {!showExplanation ? (
              <Button 
                onClick={handleCheckAnswer}
                disabled={!hasSelectedOption}
              >
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Test'}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
