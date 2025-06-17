import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Check, 
  X, 
  Lightbulb, 
  MessageCircle, 
  Clock,
  Star,
  RefreshCw
} from 'lucide-react';

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
}

const CodingChallenge: React.FC = () => {
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<boolean[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  const challenge: Challenge = {
    id: '1',
    title: 'Two Sum Problem',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    starterCode: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        
    }
}`,
    testCases: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        description: 'Because nums[0] + nums[1] == 9, we return [0, 1]'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        description: 'Because nums[1] + nums[2] == 6, we return [1, 2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        description: 'Because nums[0] + nums[1] == 6, we return [0, 1]'
      }
    ],
    hints: [
      'Think about using a HashMap to store the numbers you\'ve seen and their indices.',
      'For each number, calculate what its complement would need to be to reach the target.',
      'Check if the complement exists in your HashMap before adding the current number.'
    ]
  };

  useEffect(() => {
    setCode(challenge.starterCode);
  }, [challenge.starterCode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution and testing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock test results - in a real app, this would send code to a backend for execution
    const mockResults = [true, true, false]; // First two pass, third fails
    setTestResults(mockResults);
    setIsRunning(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    setTestResults([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-screen max-h-[calc(100vh-6rem)]">
        {/* Problem Description */}
        <div className="space-y-6 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{challenge.title}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6">{challenge.description}</p>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Test Cases</h3>
              {challenge.testCases.map((testCase, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-700">Example {index + 1}</span>
                    {testResults.length > 0 && (
                      testResults[index] ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Input:</span> {testCase.input}</p>
                    <p><span className="font-medium">Output:</span> {testCase.expectedOutput}</p>
                    <p className="text-gray-600">{testCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hints Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Hints
              </h3>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {showHints ? 'Hide' : 'Show'} Hints
              </button>
            </div>
            
            {showHints && (
              <div className="space-y-3">
                {challenge.hints.slice(0, currentHint + 1).map((hint, index) => (
                  <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-yellow-800">💡 {hint}</p>
                  </div>
                ))}
                {currentHint < challenge.hints.length - 1 && (
                  <button
                    onClick={() => setCurrentHint(prev => prev + 1)}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    Show next hint →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Code Editor and Results */}
        <div className="space-y-4 flex flex-col">
          {/* Editor Header */}
          <div className="bg-white rounded-t-2xl p-4 shadow-sm border border-gray-100 border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Solution.java</span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {formatTime(timeSpent)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetCode}
                  className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors"
                  title="Reset code"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50"
                >
                  {isRunning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Run Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 bg-gray-900 rounded-b-2xl rounded-t-none shadow-sm border border-gray-100 border-t-0 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
              style={{ minHeight: '300px' }}
              placeholder="Write your solution here..."
              spellCheck={false}
            />
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Test Results</h3>
              <div className="space-y-2">
                {testResults.map((passed, index) => (
                  <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${
                    passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {passed ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">
                      Test Case {index + 1}: {passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                ))}
              </div>
              
              {testResults.every(result => result) && (
                <div className="mt-4 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">Congratulations! All tests passed!</span>
                  </div>
                  <p className="text-green-100 text-sm mt-1">+150 XP earned</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;