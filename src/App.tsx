/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useActivities } from './hooks/useActivities';
import { Dashboard } from './components/Dashboard';
import { ActivityForm } from './components/ActivityForm';
import { ActivityList } from './components/ActivityList';
import { Activity as ActivityIcon, LayoutDashboard, ListPlus } from 'lucide-react';
import { cn } from './lib/utils';

type Tab = 'dashboard' | 'log';

export default function App() {
  const { activities, addActivity, deleteActivity, isLoaded } = useActivities();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20 md:pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-sm">
              <ActivityIcon className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Pulse
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                activeTab === 'dashboard' 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                activeTab === 'log' 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <ListPlus className="w-4 h-4" />
              Log Activity
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Dashboard activities={activities} />
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activities</h2>
              <ActivityList activities={activities.slice(0, 5)} onDelete={deleteActivity} />
            </div>
          </div>
        )}

        {activeTab === 'log' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ActivityForm onSubmit={(data) => {
              addActivity(data);
              setActiveTab('dashboard');
            }} />
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">All Activities</h2>
              <ActivityList activities={activities} onDelete={deleteActivity} />
            </div>
          </div>
        )}
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around z-20 pb-safe">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 min-w-[80px] transition-colors rounded-xl",
            activeTab === 'dashboard' ? "text-indigo-600" : "text-slate-500"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('log')}
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 min-w-[80px] transition-colors rounded-xl",
            activeTab === 'log' ? "text-indigo-600" : "text-slate-500"
          )}
        >
          <ListPlus className="w-5 h-5" />
          <span className="text-[10px] font-medium">Log</span>
        </button>
      </nav>
    </div>
  );
}
