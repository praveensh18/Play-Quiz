import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Timer = (p: {max: number, onFinished: () => void}) => {
	let timer: NodeJS.Timeout;

	const [progress, setProgress] = useState<number>(p.max)

	useEffect(() => {
		if(progress <=0) {
			p.onFinished();
			clearInterval(timer)
		}
	}, [progress]);

	useEffect(() => {
		timer = setInterval(() => {
			setProgress((previousProgress) => previousProgress -1)
		}, 1000);
		return () => {
			clearInterval(timer)
		}
	}, []);

  return (
    <CircularProgress max={p.max} value={progress}>
      <CircularProgressLabel>{progress}'</CircularProgressLabel>
    </CircularProgress>
  );
};

export default Timer;
