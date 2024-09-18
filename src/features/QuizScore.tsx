import { Button, Flex, Heading, Text } from '@chakra-ui/react';

const QuizScore = (p: { history: boolean[]; onPlayAgainClick: () => void }) => {
  const rightAnswers = p.history.filter(
    (isRightAnswer: boolean) => isRightAnswer === true).length;

  const renderMessage = () => {
    const rightAnswerPercentage = (rightAnswers * 100) / p.history.length;
    if (rightAnswerPercentage < 30) {
      return 'You need more practice!';
    } else if (rightAnswerPercentage < 50) {
      return 'Not bad! Keep training..';
    } else if (rightAnswerPercentage < 75) {
      return 'Good job!';
    } else {
      return 'Woah! you did amazing!';
    }
  };

  return (
    <Flex direction={'column'} alignItems={'center'}>
      <Heading fontSize={'3xl'}>Your Score</Heading>
      <Heading fontSize={'xl'} mt={'5'}>
        {rightAnswers}/{p.history.length}
      </Heading>
      <Text fontWeight={'bold'} mt={'20'}>
        {renderMessage()}
      </Text>
      <Button position={'absolute'} bottom={'8%'} right={'10%'} onClick={p.onPlayAgainClick}>Play Again</Button>
    </Flex>
  );
};

export default QuizScore;
