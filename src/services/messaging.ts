import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const colection = collection(db, 'messagens');

type AddMessage = {
  userId: string;
  message: string;
  photoUrl: string;
};

type MessagesProps = [
  {
    id: string;
    data: {
      creatAt: {
        nanoseconds: number;
        seconds: number;
      };
      dateMessage: Date;
      message: string;
      photoUrl: string;
      userId: string;
    };
  }
];

export const MessagingService = {
  async addNewMessage({ userId, message, photoUrl }: AddMessage) {
    await setDoc(doc(colection), {
      userId,
      message,
      photoUrl,
      creatAt: serverTimestamp(),
    });
  },

  getMessage(setMessage: any) {
    const q = query(colection, orderBy('creatAt'));
    const getMessage = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((item: any) => ({
        id: item.id,
        data: item.data(),
      }));
      setMessage(items as MessagesProps);
    });
    return getMessage;
  },
};
