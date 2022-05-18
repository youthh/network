import { initializeApp } from "firebase/app";
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBsJ6yWGq7YPY7lDlOVRlbXitaRVysL48k",
    authDomain: "stogram-cd5a6.firebaseapp.com",
    databaseURL: "https://stogram-cd5a6-default-rtdb.firebaseio.com",
    projectId: "stogram-cd5a6",
    storageBucket: "stogram-cd5a6.appspot.com",
    messagingSenderId: "560065864353",
    appId: "1:560065864353:web:37571bf343b500a51046e0",
    measurementId: "G-T6SZYZQMHC"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const storage = getStorage(app);



const spaceRef = ref(storage, 'postPhoto/post.jpg');
console.log(spaceRef)
getDownloadURL(spaceRef).then(r => {
    console.log(r)
})