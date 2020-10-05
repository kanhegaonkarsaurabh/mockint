import * as React from 'react';
import { useParams } from 'react-router-dom';
import { subscribeToSessionTimer } from '../data/firebase';
import Timer from './Timer';

type FirebaseDataTimerWrapperProps = {};
const FirebaseDataTimerWrapper: React.FC<FirebaseDataTimerWrapperProps> = () => {
  const { sessionName } = useParams<{ sessionName: string }>();
  const [timeLeft, setTimeLeft] = React.useState<number>(0);

  const onMockIntSessionEnd = (): void => {};
  React.useEffect(() => {
    const unsubscribeToTimer = subscribeToSessionTimer(
      sessionName,
      (timerData, sessionTime) => {
        if (timerData) {
          const { startedAt, endAt } = timerData;
          const updatedTimeLeft = Math.floor(
            (endAt - Date.now()) / 1000,
          );
          setTimeLeft(updatedTimeLeft);
        } else if (sessionTime) {
          setTimeLeft(Math.floor(sessionTime / 1000));
        }
      },
    );
    return () => {
      unsubscribeToTimer();
    };
  }, [sessionName]);

  return <div>sa</div>;
};

export default FirebaseDataTimerWrapper;
