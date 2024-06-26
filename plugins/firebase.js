import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { collection, getDocs } from 'firebase/firestore'


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
  const firestore = {
    collection: (name) => collection(db, name),
    getCollection: async (name) => {
      const collectionRef = firestore.collection(name)
      const querySnapshot = await getDocs(collectionRef)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
  }

  inject('firebase', { auth, firestore, analytics })
}
