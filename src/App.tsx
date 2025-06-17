import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CodingChallenge from './components/CodingChallenge';
import Mentor from './components/Mentor';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'challenges':
        return <CodingChallenge />;
      case 'mentor':
        return <Mentor />;
      case 'progress':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Progress Tracking</h2>
              <p className="text-gray-600">Detailed progress analytics and learning insights coming soon!</p>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Resources</h2>
              <p className="text-gray-600">Curated Java tutorials, documentation, and reference materials coming soon!</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-20 lg:pb-0">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;