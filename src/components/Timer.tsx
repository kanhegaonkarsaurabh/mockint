import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Button,
  CircularProgress,
} from '@chakra-ui/core';
import MockIntYj from './MockIntSession/MockIntYjs';
import {
  createTimerinSessionInDb,
  updateEndAtInSessionTimeInDb,
} from '../data/firebase';
import { useParams } from 'react-router-dom';
import useSyncedSessionTimer from './MockIntSession/useSyncedSessionTimer';

type TimerProps = {
  onTimerEnd: () => void;
};

const formatTime = (timeInSec: number): string => {
  const getSeconds: string = `0${timeInSec % 60}`.slice(-2);
  const minutes: number = Math.floor(timeInSec / 60);
  const getMinutes: string = `0${minutes}`.slice(-2);

  return `${getMinutes} : ${getSeconds}`;
};

const Timer: React.FC<TimerProps> = ({ onTimerEnd }: TimerProps) => {
  const { sessionName } = useParams<{ sessionName: string }>();

  // initialize custom in-sync timer hook
  const { timeInSeconds, status } = useSyncedSessionTimer(
    sessionName,
  );
  const [seconds, setSeconds] = useState(0);

  const [
    timerInterval,
    setTimerInterval,
  ] = useState<NodeJS.Timeout | null>(null);

  async function toggle() {
    // starting a session
    if (status === 'initial') {
      const createdTimer = await createTimerinSessionInDb(
        sessionName,
      );
      if (!createdTimer) {
        console.error(
          'Failed to create timer in db and start session',
        );
      }
    } else if (status === 'started') {
      // ending a session
      const endedSession = await updateEndAtInSessionTimeInDb(
        sessionName,
        Date.now(),
      );
    }
  }

  useEffect(() => {
    const timerCleanupFn = (): void => {
      if (timerInterval == null) {
        return;
      }
      clearInterval(timerInterval);
      setTimerInterval(null);
    };

    if (status === 'started') {
      // set the interval and update seconds state regularly
      const interval = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);

      setTimerInterval(interval);
    } else if (status === 'ended') {
      if (timerInterval != null) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
    return timerCleanupFn;
  }, [status]);

  if (status === 'fetching') {
    return (
      <CircularProgress
        isIndeterminate
        color="teal"
        thickness={0.1}
        size="50px"
      />
    );
  }

  let timerBtnStatus = '';
  if (status === 'initial') {
    timerBtnStatus = 'Start Session';
  } else if (status === 'started') {
    timerBtnStatus = 'End Session';
  } else if (status === 'ended') {
    timerBtnStatus = 'Session Ended';
  }

  return (
    <Flex direction="row">
      <Text fontSize="2xl" mr={3} verticalAlign="center">
        {formatTime(timeInSeconds - seconds)}
      </Text>
      <Button
        variantColor={status === 'started' ? 'red' : 'teal'}
        onClick={toggle}
        isDisabled={status === 'ended'}
      >
        {timerBtnStatus}
      </Button>
    </Flex>
  );
};

export default Timer;
