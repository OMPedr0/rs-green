"use client"

import React, { useEffect } from "react";
import BackgroundFeed from "../components/bgtodos/bgfeed/bgfeed";
import { NavBar } from "../components/navbar/navbar";


import { auth, db } from "@/api/firebaseConfig";

import { onAuthStateChanged } from 'firebase/auth';
import { collection, where, query, getDocs, updateDoc } from 'firebase/firestore';


export default function Feed() {

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, you can access the user's email.
        const userEmail = user.email;
  
        // Access the Firestore collection and query for the document with matching email.
        const userCollection = collection(db, 'users');
        const q = query(userCollection, where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // Retrieve the first document (there should be only one with the same email).
          const userData = querySnapshot.docs[0].data();
  
          // Store userData in localStorage.
          localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          // Handle the case where no matching user was found.
        }
      } else {
        // Handle the case where no user is signed in.
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  


  return (
    <BackgroundFeed >
      <div className="relative">
        <NavBar />

      </div>
    </BackgroundFeed>
  );
}
