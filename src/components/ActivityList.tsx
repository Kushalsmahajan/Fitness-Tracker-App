import React from 'react';
import { Activity } from '../types';
import { Flame, Clock, CalendarDays, Trash2, Activity as ActivityIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ActivityListProps {
  activities: Activity[];
  onDelete: (id: string) => void;
}

export function ActivityList({ activities, onDelete }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <ActivityIcon className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No activities yet</h3>
        <p className="text-slate-500">Log your first workout to see it here.</p>
      </div>
    );
  }

  // Sort by date descending
  const sortedActivities = [...activities].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedActivities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6 transition-all hover:shadow-md group flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
                {activity.type}
              </span>
              <span className="text-sm text-slate-500 flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                {format(parseISO(activity.date), 'MMM d, yyyy')}
              </span>
            </div>
            {activity.notes && (
              <p className="text-slate-600 text-sm mt-2">{activity.notes}</p>
            )}
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">{activity.durationMinutes}</span>
                <span className="text-sm text-slate-500">min</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-medium">{activity.caloriesBurned}</span>
                <span className="text-sm text-slate-500">kcal</span>
              </div>
            </div>

            <button
              onClick={() => onDelete(activity.id)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 ml-auto"
              title="Delete activity"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
