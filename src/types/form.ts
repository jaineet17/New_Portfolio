export interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormStatus {
  type: 'success' | 'error' | 'info';
  messages: string[];
} 