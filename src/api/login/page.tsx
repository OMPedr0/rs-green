"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SiGmail } from "react-icons/si";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";

import { auth, provider, db } from "../firebaseConfig";
import {
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserDetails {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const LoginUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isAnsweringInfo, setIsAnsweringInfo] = useState(false);
  const [userDocumentExists, setUserDocumentExists] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const userCredential: UserCredential = await signInWithPopup(auth, provider);
      const user: User | null = userCredential.user;

      if (user && user.email) {
        const userDocRef = doc(db, 'users', user.email);
        const docSnap = await getDoc(userDocRef);

        setUserDocumentExists(docSnap.exists());

        if (docSnap.exists()) {
          router.push("/feed");
        } else {
          setUserDetails({
            username: "",
            firstName: "",
            lastName: "",
            email:  user.email,
          });

          setIsAnsweringInfo(true);
        }
      } else {
        toast.error("Usuário não autenticado ou email inválido");
      }
    } catch (error) {
      console.error("Erro de autenticação:", error);
    }
  };


  const handleLoginWithCredentials = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/feed");
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionnaireSubmit = async () => {
    const user = auth.currentUser;

    if (user && user.email) {

      setUserDetails({ ...userDetails, email: user.email });

      const userDocRef = doc(db, 'users', user.email);
      await setDoc(userDocRef, userDetails);
    }

    router.push("/feed");
  };

  return (
    <div>
      <ToastContainer />
      {isAnsweringInfo ? null : (
        <div className="relative flex flex-col justify-center min-h-screen">
          <div className="w-full mx-auto p-4 bg-text bg-opacity-5 bg-custom-opacity rounded-lg shadow-lg lg:max-w-xl">
            <h1 className="text-4xl text-center mb-4 font-inria text-white">Login</h1>
            <div className="mt-8 mb-6 text-center">
              <button
                type="button"
                className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md flex items-center justify-center"
                onClick={handleGoogleLogin}
              >
                <SiGmail className="mr-2 text-xl" />
                Login with Google
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <hr className="flex-1 border-t border-white" />
              <span className="text-white text-xl">or</span>
              <hr className="flex-1 border-t border-white" />
            </div>
            <div className="mt-4 p-4 rounded-lg">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full p-3 bg-blue-500 hover-bg-blue-600 text-white font-bold rounded-md shadow-md"
                  onClick={handleLoginWithCredentials}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAnsweringInfo && !userDocumentExists && (
        <div className="relative flex flex-col justify-center min-h-screen">
        <div className="w-full mx-auto p-4 bg-text bg-opacity-5 bg-custom-opacity rounded-lg shadow-lg lg:max-w-xl">
            <h1 className="text-4xl text-center mb-4 font-inria text-white">User Details</h1>
            <div className="mt-4 p-4 rounded-lg">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none"
                  value={userDetails.firstName}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, firstName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none"
                  value={userDetails.lastName}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, lastName: e.target.value })
                  }
                />
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full p-3 bg-blue-500 hover-bg-blue-600 text-white font-bold rounded-md shadow-md"
                  onClick={handleQuestionnaireSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default LoginUser;
