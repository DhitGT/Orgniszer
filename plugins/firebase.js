import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

export default ({ app }, inject) => {
  const config = {
    apiKey: "AIzaSyAmZSXEWCRoKBgt9bnGIkUYncBndSxXUl4",
    authDomain: "orgniszer.firebaseapp.com",
    projectId: "orgniszer",
    storageBucket: "orgniszer.appspot.com",
    messagingSenderId: "509438492494",
    appId: "1:509438492494:web:96837af76e7767da86a81f",
    measurementId: "G-MQ00J88JBR"
  }

  const firebaseApp = initializeApp(config)
  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const analytics = getAnalytics(firebaseApp)
  const googleProvider = new GoogleAuthProvider()

  const firestore = {
    collection: (name) => collection(db, name),
    getCollection: async (name) => {
      const collectionRef = collection(db, name)
      const querySnapshot = await getDocs(collectionRef)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    addDoc: async (name, data) => {
      const collectionRef = collection(db, name)
      return await addDoc(collectionRef, data)
    },
    updateDoc: async (name, id, data) => {
      const docRef = doc(db, name, id)
      return await updateDoc(docRef, data)
    },
    deleteDoc: async (name, id) => {
      const docRef = doc(db, name, id)
      return await deleteDoc(docRef)
    }
  }

// asdkjahskjhajshcjahcjahcjhacsajsbc

  inject('firebase', { auth, firestore, analytics, googleProvider, signInWithPopup, signInWithEmailAndPassword, signOut })
}


