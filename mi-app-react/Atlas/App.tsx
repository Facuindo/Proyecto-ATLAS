import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import HomePage from './components/HomePage';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [currentTab, setCurrentTab] = useState('inicio');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Initialize with dark theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Futuristic background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'} 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}
      ></div>

      <div className="relative z-10">
        <Header 
          isDark={isDark} 
          onThemeToggle={toggleTheme}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />
        
        <main>
          {currentTab === 'inicio' && (
            <div className="container mx-auto px-4 py-6">
              <HomePage onTabChange={setCurrentTab} />
            </div>
          )}
          
          {currentTab === 'asistente' && (
            <ChatInterface />
          )}
        </main>
      </div>
    </div>
  );
}