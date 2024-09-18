export interface FetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

export interface FetchQuizCategoryResponse {
  trivia_categories: QuizCategory[];
}

export interface QuizCategory {
  id: number;
  name: string;
}

export interface FetchQuizResponse {
  response_code: number;
  results: QuizItem[];
}

export interface QuizItem {
  type: QuizType;
  difficulty: QuizDifficulty;
  category: QuizCategory;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export enum QuizDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
  Mixed = '',
}

export enum QuizType {
  Multiple = 'multiple',
  Boolean = 'boolean',
  Mixed = 'mixed',
}

export enum Step {
  Loading,
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

export enum QuestionStatus {
  Valid = 'valid',
  Invalid = 'invalid',
  Unanswered = 'unanswered',
}
