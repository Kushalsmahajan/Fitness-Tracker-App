export type ActivityType =
  | 'Running'
  | 'Walking'
  | 'Cycling'
  | 'Weightlifting'
  | 'Yoga'
  | 'Swimming'
  | 'Other';

export interface Activity {
  id: string;
  type: ActivityType;
  durationMinutes: number;
  caloriesBurned: number;
  date: string; // ISO format string
  notes?: string;
  createdAt: number; // timestamp
}
