import React, { useState } from 'react';
import LessonViewer from './LessonViewer';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  ChevronRight, 
  Star,
  Zap,
  Brain,
  Clock,
  Award,
  CheckCircle
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  recommended: boolean;
  description: string;
  completed?: boolean;
}
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

const Dashboard: React.FC = () => {
  const [userLevel] = useState(7);
  const [totalXP, setTotalXP] = useState(2840);
  const [streak] = useState(12);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: '1',
      title: 'Object-Oriented Programming',
      difficulty: 'Intermediate',
      progress: 65,
      recommended: true,
      description: 'Master classes, objects, inheritance, and polymorphism',
      completed: false
    },
    {
      id: '2',
      title: 'Exception Handling',
      difficulty: 'Intermediate',
      progress: 30,
      recommended: true,
      description: 'Learn to handle errors gracefully with try-catch blocks',
      completed: false
    },
    {
      id: '3',
      title: 'Collections Framework',
      difficulty: 'Advanced',
      progress: 0,
      recommended: true,
      description: 'Explore ArrayList, HashMap, and other data structures',
      completed: false
    },
    {
      id: '4',
      title: 'Multithreading',
      difficulty: 'Advanced',
      progress: 10,
      recommended: false,
      description: 'Concurrent programming with threads and synchronization',
      completed: false
    }
  ]);

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      name: 'Code Warrior',
      description: 'Completed 50 coding challenges',
      icon: '⚔️',
      earned: true,
      date: '2 days ago'
    },
    {
      id: '2',
      name: 'Streak Master',
      description: 'Maintained 10-day learning streak',
      icon: '🔥',
      earned: true,
      date: '1 week ago'
    },
    {
      id: '3',
      name: 'OOP Expert',
      description: 'Mastered Object-Oriented Programming',
      icon: '🎯',
      earned: false
    }
  ];

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const handleBackToDashboard = () => {
    setSelectedTopic(null);
  };

  const handleLessonComplete = (topicId: string) => {
    setTopics(prev => prev.map(topic => 
      topic.id === topicId 
        ? { ...topic, progress: 100, completed: true }
        : topic
    ));
    setTotalXP(prev => prev + 500); // Award XP for completion
    setSelectedTopic(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // If a topic is selected, show the lesson viewer
  if (selectedTopic) {
    return (
      <LessonViewer 
        topicId={selectedTopic} 
        onBack={handleBackToDashboard}
        onComplete={handleLessonComplete}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Level</p>
              <p className="text-3xl font-bold">{userLevel}</p>
            </div>
            <Trophy className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total XP</p>
              <p className="text-3xl font-bold">{totalXP.toLocaleString()}</p>
            </div>
            <Star className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Streak</p>
              <p className="text-3xl font-bold">{streak} days</p>
            </div>
            <Zap className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Completed</p>
              <p className="text-3xl font-bold">
                {Math.round((topics.filter(t => t.completed).length / topics.length) * 100)}%
              </p>
            </div>
            <Target className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Topics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Brain className="w-6 h-6 text-orange-500" />
              AI Recommendations
            </h2>
          </div>
          
          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => handleTopicClick(topic.id)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                        {topic.title}
                      </h3>
                      {topic.recommended && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                          Recommended
                        </span>
                      )}
                      {topic.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-800">{topic.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        topic.completed 
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : 'bg-gradient-to-r from-orange-500 to-orange-600'
                      }`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Achievements
            </h3>
            
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{achievement.name}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      {achievement.date && (
                        <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              This Week
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Spent</span>
                <span className="font-semibold text-gray-800">8.5 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Challenges Solved</span>
                <span className="font-semibold text-gray-800">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Topics Completed</span>
                <span className="font-semibold text-gray-800">{topics.filter(t => t.completed).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">XP Earned</span>
                <span className="font-semibold text-orange-600">+340 XP</span>
              </div>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Getting Started
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Click on any topic above to start learning! Each lesson includes detailed explanations, code examples, and hands-on practice.
            </p>
            <div className="text-xs text-gray-500">
              💡 Tip: Start with recommended topics for the best learning experience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;