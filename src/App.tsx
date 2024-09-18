import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import logoImg from './assets/logo.png';
import bubbleImg from './assets/bubble.png';
import '../global.css';
import { useEffect, useState } from 'react';
import SetQuestionQty from './features/SetQuestionQty';
import SetQuestionCategory from './features/SetQuestionCategory';
import SetQuestionDifficulty from './features/SetQuestionDifficulty';
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizItem,
  QuizType,
  Step,
} from './types/quiz-type';
import { QuizAPI } from './api/quiz-api';
import PlayQuiz from './features/PlayQuiz/PlayQuiz';
import QuizScore from './features/QuizScore';

export function App() {
  const [step, setStep] = useState<Step>(Step.Loading);
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [history, setHistory] = useState<boolean[]>([]);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: '',
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });

  const header = (
    <Flex justify='center'>
      <Image src={logoImg} h='24' />
    </Flex>
  );

  const fetchCategories = async () => {
    setCategories([
      { id: -1, name: 'Mixed' },
      ...(await QuizAPI.FetchQuizCategory()),
    ]);
    setStep(Step.SetQuestionQty);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderScreenByStep = () => {
    switch (step) {
      case Step.Loading: 
        return (
          <Flex position={'absolute'} justify={'center'} alignItems={'center'} minHeight={'100vh'} width={'100%'}>
          <Spinner />
          </Flex>
        )
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCategory);
            }}
            defaultValue={10}
            max={30}
            min={5}
            step={5}
          />
        );

      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            categories={categories}
            onClickNext={(category: string) => {
              setQuizParams({
                ...quizParams,
                category: category === '-1' ? '' : category,
              });
              setStep(Step.SetQuestionDifficulty);
            }}
          />
        );

      case Step.SetQuestionDifficulty:
        return (
          <SetQuestionDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = { ...quizParams, difficulty }
              setQuizParams(params);
              const quizResp = await QuizAPI.FetchQuiz(params)
              if(quizResp.length > 0) {
                setQuiz(quizResp);
                setStep(Step.Play);
              } else {
                alert(`This category does not have ${params.amount} questions.. Starting again..`);
                setStep(Step.SetQuestionQty)
              }
            }}
          />
        );

      case Step.Play:
        return <PlayQuiz quiz={quiz} onQuizFinished={(history_: boolean[]) => {
          setHistory(history_)
          setStep(Step.Score)
        }}/>;

      case Step.Score:
        return <QuizScore onPlayAgainClick={() => {
          setStep(Step.SetQuestionQty)
        }} history={history}/>;

      default:
        return null;
    }
  };

  return (
    <Box py={10} h='100%'>
      {header}
      <Image
        src={bubbleImg}
        position='absolute'
        right='-120'
        top='100'
        zIndex='-1'
      />
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
}
