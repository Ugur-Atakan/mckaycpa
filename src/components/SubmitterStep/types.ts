export interface Person {
  name: string;
  role: 'officer' | 'director';
  title?: string;
}

export interface SubmitterStepProps {
  officers: Person[];
  directors: Person[];
  onNext: () => void;
}