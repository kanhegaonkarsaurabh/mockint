import * as React from 'react';
import { subscribeToSessionTimer } from '../../data/firebase';

function sessionTimerReducer(state: any, action: any) {
  switch (action.type) {
    case 'started': {
      return {
        ...state,
        status: 'started',
        timeInSeconds: action.timeInSeconds,
      };
    }
    case 'ended': {
      return {
        ...state,
        status: 'ended',
        timeInSeconds: action.timeInSeconds,
      };
    }
    case 'initial': {
      return {
        ...state,
        status: 'initial',
        timeInSeconds: action.timeInSeconds,
      };
    }
    default: {
      throw new Error(
        `Unhandled action type ${action.type} in sessionTimeReducer`,
      );
    }
  }
}

function useSyncedSessionTimer(sessionName: string) {
  const [state, dispatch] = React.useReducer(sessionTimerReducer, {
    status: 'fetching',
    timeInSeconds: 0,
  });

  // effect to run on the first mount to fetch initial time
  React.useEffect(() => {
    const unsubscribeToTimer = subscribeToSessionTimer(
      sessionName,
      (timerData, sessionTime) => {
        // timer has already started
        if (timerData) {
          const { startedAt, endAt } = timerData;
          const timeNow = Date.now();
          // session has ended and dispatch that the session has ended
          if (timeNow > endAt) {
            console.log(sessionTime);
            const dispatchTime = sessionTime
              ? Math.floor(sessionTime / 1000)
              : 0;
            dispatch({
              type: 'ended',
              timeInSeconds: dispatchTime,
            });
            return;
          }
          const updatedTimeLeft = Math.floor(
            (endAt - timeNow) / 1000,
          );
          dispatch({
            type: 'started',
            timeInSeconds: updatedTimeLeft,
          });
        } else if (sessionTime) {
          // timer has not yet started
          dispatch({
            type: 'initial',
            timeInSeconds: Math.floor(sessionTime / 1000),
          });
        }
      },
    );
    return () => {
      unsubscribeToTimer();
    };
  }, [sessionName]);

  // effect to run to subscribe to timer changes

  return state;
}

export default useSyncedSessionTimer;
