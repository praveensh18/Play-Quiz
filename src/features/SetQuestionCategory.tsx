import { useState } from 'react';
import { QuizCategory } from '../types/quiz-type';
import {
  Flex,
  Heading,
  Button,
  RadioGroup,
  Radio,
  SimpleGrid,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const SetQuestionCategory = (p: { categories: QuizCategory[], onClickNext: (selectedCategoryId: string) => void }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  const categoryItems = p.categories.map((category) => {
    return (
      <Radio key={category.id} value={category.id.toString()}>
        {category.name}
      </Radio>
    );
  });

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as='h1' fontSize='3xl' mb={20}>
          Which Topic?
        </Heading>
      </Flex>
      <RadioGroup
        display={'flex'}
        justifyContent={'center'}
        value={selectedCategoryId}
        onChange={setSelectedCategoryId}
      >
        <SimpleGrid columns={[1, 2, 3]} spacing={'4'}>
          {categoryItems}
        </SimpleGrid>
      </RadioGroup>
      <Button
        onClick={() => p.onClickNext(selectedCategoryId)}
        position={'absolute'}
        bottom={'8%'}
        right={'10%'}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Difficulty
      </Button>
    </>
  );
};

export default SetQuestionCategory;
