
export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATIONS = 'OPERATIONS'
}

export interface Mentor {
  id: string;
  name: string;
  industry: string;
  expertise: string[];
  bio: string;
  yearsExperience: number;
  currentTitle: string;
}

export interface Learner {
  id: string;
  name: string;
  currentRole: string;
  careerGoals: string;
  challenges: string;
  assignedMentorId?: string;
}

export interface MatchResult {
  mentorId: string;
  score: number;
  reason: string;
}

export interface AppState {
  mentors: Mentor[];
  learners: Learner[];
}
