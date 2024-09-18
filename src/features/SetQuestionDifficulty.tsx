import { useState } from 'react';
import { QuizDifficulty } from '../types/quiz-type';
import {
  Flex,
  Heading,
  RadioGroup,
  Radio,
  VStack,
  Button,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const SetQuestionDifficulty = (p: {onClickNext: (difficulty: QuizDifficulty) => void}) => {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  );

  const difficultyItems = Object.values(QuizDifficulty).map(
    (diff: QuizDifficulty) => {
      return (
        <Radio key={diff} value={diff}>
          <span style={{ textTransform: 'capitalize' }}>
            {diff === QuizDifficulty.Mixed ? 'Mixed' : diff}
          </span>
        </Radio>
      );
    }
  );

  return (
    <div>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as='h1' fontSize='3xl' mb={20}>
          Which Difficulty?
        </Heading>
      </Flex>
      <RadioGroup
        display={'flex'}
        justifyContent={'center'}
        value={difficulty}
        onChange={setDifficulty as (d: string) => void}
      >
        <VStack alignItems={'flex-start'}>{difficultyItems}</VStack>
      </RadioGroup>
      <Button
        onClick={() => p.onClickNext(difficulty)}
        position={'absolute'}
        bottom={'8%'}
        right={'10%'}
        rightIcon={<ArrowForwardIcon />}
      >
        Play
      </Button>
    </div>
  );
};

export default SetQuestionDifficulty;
