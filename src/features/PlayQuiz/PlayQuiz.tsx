import {
  Flex,
  Heading,
  RadioGroup,
  Radio,
  Text,
  SimpleGrid,
  Box,
  HStack,
} from '@chakra-ui/react';
import { QuestionStatus, QuizItem } from '../../types/quiz-type';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import validAnimation from '../../assets/lottie/valid.json';
import invalidAnimation from '../../assets/lottie/invalid.json';
import Timer from './Timer';

const PlayQuiz = (p: { quiz: QuizItem[], onQuizFinished: (history: boolean[]) => void }) => {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>();
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);
  const [history, setHistory] = useState<boolean[]>([]);
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>(
    QuestionStatus.Unanswered
  );

  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  const answerList = availableAnswers.map((availableAnswer: string) => {
    return (
      <Radio key={availableAnswer} value={availableAnswer}>
        <Text
          color={
            questionStatus === QuestionStatus.Unanswered
              ? 'black'
              : isValidAnswer(availableAnswer)
              ? 'green'
              : 'red'
          }
          dangerouslySetInnerHTML={{ __html: availableAnswer }}
        ></Text>
      </Radio>
    );
  });

  useEffect(() => {
    setAvailableAnswers(
      [
        currentQuizItem.correct_answer,
        ...currentQuizItem.incorrect_answers,
      ].sort(() => Math.random() - 0.5)
    );
  }, [currentQuizItemIndex]);

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      if (isValid) {
        setQuestionStatus(QuestionStatus.Valid);
      } else {
        setQuestionStatus(QuestionStatus.Invalid);
      }

      setHistory([...history, isValid]);
    }
  }, [answer]);

  const renderProgressBar = () => {
    return (
      <HStack>
        {p.quiz.map((quizItem, i) => {
          return (
            <Box
              key={i}
              h={3}
              w={25}
              backgroundColor={
                i >= currentQuizItemIndex
                  ? 'grey'
                  : history[i]
                  ? 'green'
                  : 'red'
              }
            ></Box>
          );
        })}
      </HStack>
    );
  };

  const onFinishTimer = () => {
    setHistory([...history, false]);
    setQuestionStatus(QuestionStatus.Invalid)
  }

  return (
    <Flex direction={'column'} alignItems={'center'} justify={'center'}>
      {renderProgressBar()}
      {questionStatus === QuestionStatus.Unanswered && (
        <Box position={'absolute'} top={50} right={50}>
          <Timer max={10} onFinished={onFinishTimer}/>
        </Box>
      )}
      <Heading
        fontSize={'3xl'}
        mt={100}
        mb={20}
        dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
      />

      <RadioGroup
        value={answer}
        onChange={
          questionStatus === QuestionStatus.Unanswered ? setAnswer : undefined
        }
      >
        <SimpleGrid spacing={4}>{answerList}</SimpleGrid>
      </RadioGroup>
      <Lottie
        loop={false}
        style={{ marginTop: 80, height: 150 }}
        animationData={
          questionStatus === QuestionStatus.Unanswered
            ? null
            : questionStatus === QuestionStatus.Valid
            ? validAnimation
            : invalidAnimation
        }
        onComplete={() => {
          if(currentQuizItemIndex < p.quiz.length - 1) {
          setQuestionStatus(QuestionStatus.Unanswered);
          setCurrentQuizItemIndex(currentQuizItemIndex + 1);
          } else {
            p.onQuizFinished(history)
          }
        }}
      ></Lottie>
    </Flex>
  );
};

export default PlayQuiz;
