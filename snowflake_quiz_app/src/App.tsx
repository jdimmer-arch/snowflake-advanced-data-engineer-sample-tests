import { useState, useEffect } from 'react';
import { Test, UserAnswer } from './types';
import { TestSelector } from './components/TestSelector';
import { Quiz } from './components/Quiz';
import { TestResults } from './components/TestResults';
import tests from './data';
import './App.css';

function App() {
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  
  useEffect(() => {
    if (selectedTestId) {
      const test = tests.find(t => t.id === selectedTestId);
      if (test) {
        setCurrentTest(test);
        setTestCompleted(false);
      }
    } else {
      setCurrentTest(null);
    }
  }, [selectedTestId]);
  
  const handleSelectTest = (testId: number) => {
    setSelectedTestId(testId);
  };
  
  const handleCompleteTest = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setTestCompleted(true);
  };
  
  const handleRetakeTest = () => {
    setTestCompleted(false);
  };
  
  const handleSelectNewTest = () => {
    setSelectedTestId(null);
    setCurrentTest(null);
    setTestCompleted(false);
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      {!currentTest && (
        <TestSelector tests={tests} onSelectTest={handleSelectTest} />
      )}
      
      {currentTest && !testCompleted && (
        <Quiz 
          questions={currentTest.questions}
          testId={currentTest.id}
          onComplete={handleCompleteTest}
          onExit={handleSelectNewTest}
        />
      )}
      
      {currentTest && testCompleted && (
        <TestResults 
          test={currentTest}
          userAnswers={userAnswers}
          onRetakeTest={handleRetakeTest}
          onSelectNewTest={handleSelectNewTest}
        />
      )}
    </div>
  );
}

export default App;
