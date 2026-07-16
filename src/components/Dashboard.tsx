import React, { useMemo } from 'react';
import { Activity } from '../types';
import { format, subDays, startOfDay, parseISO, isSameDay } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Clock, Target, TrendingUp } from 'lucide-react';

interface DashboardProps {
  activities: Activity[];
}

export function Dashboard({ activities }: DashboardProps) {
  const stats = useMemo(() => {
    const totalMinutes = activities.reduce((sum, act) => sum + act.durationMinutes, 0);
    const totalCalories = activities.reduce((sum, act) => sum + act.caloriesBurned, 0);
    const totalWorkouts = activities.length;

    // Generate chart data for the last 7 days
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      
      const dayActivities = activities.filter((act) => 
        isSameDay(parseISO(act.date), dayStart)
      );
      
      const calories = dayActivities.reduce((sum, act) => sum + act.caloriesBurned, 0);
      const duration = dayActivities.reduce((sum, act) => sum + act.durationMinutes, 0);

      chartData.push({
        name: format(date, 'EEE'),
        fullDate: format(date, 'MMM d'),
        calories,
        duration,
      });
    }

    return { totalMinutes, totalCalories, totalWorkouts, chartData };
  }, [activities]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Workouts</p>
            <p className="text-2xl font-bold text-slate-900">{stats.totalWorkouts}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Calories Burned</p>
            <p className="text-2xl font-bold text-slate-900">
              {stats.totalCalories.toLocaleString()} <span className="text-sm font-normal text-slate-500">kcal</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Time</p>
            <p className="text-2xl font-bold text-slate-900">
              {Math.floor(stats.totalMinutes / 60)}<span className="text-sm font-normal text-slate-500">h</span>{' '}
              {stats.totalMinutes % 60}<span className="text-sm font-normal text-slate-500">m</span>
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-slate-900">7-Day Activity</h2>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}
                itemStyle={{ fontSize: '14px' }}
              />
              <Bar 
                dataKey="calories" 
                name="Calories (kcal)" 
                fill="#818cf8" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
