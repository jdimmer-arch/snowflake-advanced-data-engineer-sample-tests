export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  domain: string;
  text: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

export interface Domain {
  id: number;
  name: string;
}

export interface Test {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  domains: Domain[];
}

export interface UserAnswer {
  questionId: number;
  selectedOption: string | null;
  isCorrect: boolean;
}

export interface TestResult {
  testId: number;
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
  domainScores: {
    [domain: string]: {
      correct: number;
      total: number;
      percentage: number;
    };
  };
  completed: boolean;
  startTime: number;
  endTime: number | null;
}
