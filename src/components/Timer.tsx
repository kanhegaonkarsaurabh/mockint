import React, { useState, useEffect } from 'react';
import { Text, Flex, Button } from '@chakra-ui/core';

type TimerProps = {
  timeInSeconds: number;
};

const formatTime = (timeInSec: number): string => {
  const getSeconds: string = `0${timeInSec % 60}`.slice(-2);
  const minutes: number = Math.floor(timeInSec / 60);
  const getMinutes: string = `0${minutes}`.slice(-2);

  return `${getMinutes} : ${getSeconds}`;
};

const Timer = ({ timeInSeconds }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasSessionEnded, setHasSessionEnded] = useState(false);
  const [
    timerInterval,
    setTimerInterval,
  ] = useState<NodeJS.Timeout | null>(null);

  function toggle() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    const timerCleanupFn = (): void => {
      if (timerInterval == null) {
        return;
      }
      clearInterval(timerInterval);
      setTimerInterval(null);
    };

    // if time limit recahed, end the session
    if (hasSessionEnded) {
      if (timerInterval == null) {
        return;
      }

      clearInterval(timerInterval);
      setTimerInterval(null);
      setHasSessionEnded(true);
      setIsActive(false);
      return timerCleanupFn;
    }

    if (isActive) {
      // set the interval and update seconds state regularly
      let interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      setTimerInterval(interval);
    } else {
      // end session btn has been clicked
      if (timerInterval == null) {
        return;
      }

      clearInterval(timerInterval);
      setTimerInterval(null);
      setHasSessionEnded(true);
      setIsActive(false);
      return timerCleanupFn;
    }

    // cleanup fn to avoid memory leak once the component unmounts
    return timerCleanupFn;
  }, [isActive, hasSessionEnded]);

  // session is now over
  if (!hasSessionEnded && timeInSeconds === seconds) {
    setHasSessionEnded(true);
  }

  return (
    <Flex direction="row">
      <Text fontSize="2xl" mr={3} verticalAlign="center">
        {formatTime(timeInSeconds - seconds)}
      </Text>
      <Button
        variantColor={isActive ? 'red' : 'green'}
        onClick={toggle}
        isDisabled={hasSessionEnded}
      >
        {hasSessionEnded
          ? 'Session Ended'
          : isActive
          ? 'End Session'
          : 'Start Session'}
      </Button>
    </Flex>
  );
};

export default Timer;
