"use client"

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/api/firebaseConfig";
import Feed from "./feed/page";
import { PublicPage } from "./components/publicPage/PublicPage";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe();
  }, []);

  const handleAuthStateChanged = (user: any) => {
    if (user) {
      router.push("/feed"); 
    }
  };

  return (
    <div className="">
      <div className="">
        {auth.currentUser ? <Feed /> : <PublicPage />}
      </div>
    </div>
  );
};


