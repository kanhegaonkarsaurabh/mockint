import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { SessionData } from '../components/MockIntSession/MockIntSessionTypes';

console.log(process.env.REACT_APP_FIREBASE_CONFIG as string);
const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG as string,
);

firebase.initializeApp(firebaseConfig);

type FirebaseStoredSession = {
  sessionLanguage: string;
  sessionTime: number;
  sessionQuestion: string;
  createdAt: number;
  sessionWhiteboardBase: string;
};

export async function createSessionInDb(
  sessionData: any,
): Promise<boolean> {
  const { sessionName, ...sessionValue } = sessionData;
  const db = firebase.firestore();
  const docRef = db.collection('sessions').doc(sessionName);
  const didUpdate = await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(docRef);
    if (!doc.exists) {
      const storeData: FirebaseStoredSession = {
        ...sessionValue,
        createdAt: Date.now(),
      };
      transaction.set(docRef, storeData);
      return true;
    }

    return false; // session already exists
  });

  return didUpdate;
}
