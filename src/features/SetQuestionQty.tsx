import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  defaultValue: number;
  max: number;
  min: number;
  step: number;
  onClickNext: (amount: number) => void;
}

const SetQuestionQty = (p: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(p.defaultValue);

  const renderSliderMarks = (): JSX.Element[] => {
    let marks = [];
    for (let i = p.min; i <= p.max; i += p.step) {
      marks.push(
        <SliderMark key={i} value={i} ml={-2} pt={4}>
          {i}
        </SliderMark>
      );
    }
    return marks;
  };

  return (
    <>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading as='h1' fontSize='3xl' mb={20}>
          How many questions?
        </Heading>
        <Slider
          maxW={400}
          max={p.max}
          min={p.min}
          step={p.step}
          value={sliderValue}
          aria-label='slider-ex-6'
          colorScheme='yellow'
          onChange={(val) => setSliderValue(val)}
        >
          {renderSliderMarks()}

          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      <Button
        onClick={() => p.onClickNext(sliderValue)}
        position={'absolute'}
        bottom={'8%'}
        right={'10%'}
        rightIcon={<ArrowForwardIcon />}
      >
        Set Category
      </Button>
    </>
  );
};

export default SetQuestionQty;
