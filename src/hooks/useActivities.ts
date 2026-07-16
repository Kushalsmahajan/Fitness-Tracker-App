import { useState, useEffect } from 'react';
import { Activity } from '../types';

const STORAGE_KEY = 'fitness-tracker-activities';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setActivities(JSON.parse(stored));
      } else {
        // Seed some mock data if empty
        const mockData: Activity[] = [
          {
            id: '1',
            type: 'Running',
            durationMinutes: 30,
            caloriesBurned: 320,
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            createdAt: Date.now() - 86400000 * 2,
          },
          {
            id: '2',
            type: 'Weightlifting',
            durationMinutes: 45,
            caloriesBurned: 210,
            date: new Date(Date.now() - 86400000).toISOString(),
            createdAt: Date.now() - 86400000,
          },
          {
            id: '3',
            type: 'Cycling',
            durationMinutes: 60,
            caloriesBurned: 450,
            date: new Date().toISOString(),
            createdAt: Date.now(),
          },
        ];
        setActivities(mockData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
      }
    } catch (e) {
      console.error('Failed to load activities', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever activities change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    }
  }, [activities, isLoaded]);

  const addActivity = (activity: Omit<Activity, 'id' | 'createdAt'>) => {
    const newActivity: Activity = {
      ...activity,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  return {
    activities,
    addActivity,
    deleteActivity,
    isLoaded,
  };
}
