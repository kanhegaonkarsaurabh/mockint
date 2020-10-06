import * as React from 'react';

function useReadFirebase(
  firebaseQuery: Function,
  firebaseQueryArgs: Array<any>,
) {
  const [status, setStatus] = React.useState<string>('initial');
  const [error, setError] = React.useState(null);
  const [firebaseData, setFirebaseData] = React.useState<any>(null);

  React.useEffect(() => {
    setStatus('fetching');
    // make the api call and fetch the data
    firebaseQuery
      .apply(null, firebaseQueryArgs)
      .then((data: any) => {
        // set the data and set loading to false
        setFirebaseData(data);
        setStatus('fetched');
      })
      .catch((err: any) => {
        setStatus('fetched');
        setError(err);
      });
  }, []);

  return [status, error, firebaseData];
}

export default useReadFirebase;
