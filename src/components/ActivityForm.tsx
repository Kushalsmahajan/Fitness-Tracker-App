import React, { useState } from 'react';
import { ActivityType } from '../types';
import { PlusCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ActivityFormProps {
  onSubmit: (activity: {
    type: ActivityType;
    durationMinutes: number;
    caloriesBurned: number;
    date: string;
    notes: string;
  }) => void;
}

const ACTIVITY_TYPES: ActivityType[] = [
  'Running',
  'Walking',
  'Cycling',
  'Weightlifting',
  'Yoga',
  'Swimming',
  'Other',
];

export function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [type, setType] = useState<ActivityType>('Running');
  const [duration, setDuration] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duration || !calories || !date) return;

    onSubmit({
      type,
      durationMinutes: parseInt(duration, 10),
      caloriesBurned: parseInt(calories, 10),
      date: new Date(date).toISOString(),
      notes,
    });

    // Reset form
    setDuration('');
    setCalories('');
    setNotes('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-500" />
        Log New Activity
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Activity Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ActivityType)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Duration (minutes)</label>
            <input
              type="number"
              min="1"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 45"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Calories */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Calories Burned</label>
            <input
              type="number"
              min="1"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="e.g. 300"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did it feel?"
            rows={3}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Save Activity
          </button>
        </div>
      </form>
    </div>
  );
}
