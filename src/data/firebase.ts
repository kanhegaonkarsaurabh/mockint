import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { SessionData } from '../components/MockIntSession/MockIntSessionTypes';

export type FirebaseStoredSession = {
  sessionLanguage: string;
  sessionTime: number;
  sessionQuestion: string;
  createdAt: number;
  sessionWhiteboardBase: string;
};

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG as string,
);
firebase.initializeApp(firebaseConfig);
const SESSION_COLLECTION_DB = 'sessions';

export async function createSessionInDb(
  sessionData: any,
): Promise<boolean> {
  const { sessionName, ...sessionValue } = sessionData;
  const db = firebase.firestore();
  const docRef = db
    .collection(SESSION_COLLECTION_DB)
    .doc(sessionName);
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

export async function loadSessionFromDb(
  sessionName: string,
): Promise<FirebaseStoredSession | null> {
  const db = firebase.firestore();
  const docRef = db
    .collection(SESSION_COLLECTION_DB)
    .doc(sessionName);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  }
  return doc.data() as FirebaseStoredSession;
}

export async function updateSessionWithQuestionInDb(
  sessionName: string,
  sessionQuestion: string,
): Promise<boolean> {
  const db = firebase.firestore();
  const docRef = db
    .collection(SESSION_COLLECTION_DB)
    .doc(sessionName);
  const didUpdate = await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(docRef);
    if (!doc.exists) {
      return false;
    }

    transaction.update(docRef, { sessionQuestion }); // update the question of the session
    return true; // session already exists
  });

  return didUpdate;
}