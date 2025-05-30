
import { Test } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface TestSelectorProps {
  tests: Test[];
  onSelectTest: (testId: number) => void;
}

export function TestSelector({ tests, onSelectTest }: TestSelectorProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Snowflake Advanced Data Engineering Certificate</h1>
      <p className="text-center mb-8 text-lg">Select a practice test to begin</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{test.title}</CardTitle>
              <CardDescription>65 questions covering all exam domains</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">This practice test follows the official exam domain weightings:</p>
              <ul className="list-disc pl-5 mt-2 text-sm">
                {test.domains.map((domain) => (
                  <li key={domain.id}>{domain.name}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => onSelectTest(test.id)}
              >
                Start Test
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
