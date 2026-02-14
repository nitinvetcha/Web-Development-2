export type AppStage = 'setup' | 'proposal' | 'gallery';

export interface AppState {
  stage: AppStage;
  musicFile: File | null;
  imageFiles: File[];
  audioUrl: string | null;
  imageUrls: string[];
}
