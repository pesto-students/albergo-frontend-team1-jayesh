import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes
} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD2JdxZweTlpRQeqBo6uCPHa9SyNE2QNlw',
  authDomain: 'albergo-bbbb4.firebaseapp.com',
  projectId: 'albergo-bbbb4',
  storageBucket: 'albergo-bbbb4.appspot.com',
  messagingSenderId: '901719599115',
  appId: '1:901719599115:web:691e60886645edcf79bf0e',
  measurementId: 'G-N6WGYPE5YV'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const createRef = (path: string) => {
  return ref(storage, path);
};

export const uploadFile = async (ref: StorageReference, file: File) => {
  const fileMetadata = {
    contentType: file.type
  };
  try {
    const uploadTask = await uploadBytes(ref, file, fileMetadata);
    return await getDownloadURL(uploadTask.ref);
  } catch (error) {
    throw error;
  }
};
