import axios from 'axios';
import { FetchQuizCategoryResponse, FetchQuizParams, QuizCategory, FetchQuizResponse, QuizItem } from '../types/quiz-type';

const BASE_URL = 'https://opentdb.com';

export class QuizAPI {
  static async FetchQuizCategory(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoryResponse>(`${BASE_URL}/api_category.php`);
		return data.trivia_categories
  }

  static async FetchQuiz(params: FetchQuizParams): Promise<QuizItem[]> {
    const { data } = await axios.get<FetchQuizResponse>(`${BASE_URL}/api.php`, { params: params})
    return data.results
  }
}
