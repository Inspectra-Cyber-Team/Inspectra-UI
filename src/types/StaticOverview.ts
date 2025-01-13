export type StaticOverview = {
    name: string;
    issue: string;
    grade: string;
    border: string;
    description?: string;
    level?: LevelDetail[];
}

type LevelDetail = {
    background: string; 
    color: string;      
    total: string;      
  };