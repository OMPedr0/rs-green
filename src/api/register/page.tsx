"use client"

import React, { useState } from "react";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, doc, setDoc } from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = async () => {
    if (password === confirmPassword) {
      try {
        if (!username || !email || !password || !confirmPassword) {
          toast.error("All fields are required.");
          return;
        }

        const signInMethods = await fetchSignInMethodsForEmail(auth, email);

        if (signInMethods.length > 0) {
          toast.error("This email address is already registered with another account.");
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);


        const userRef = doc(db, 'users', email);

        // Set the user information inside the user document
        await setDoc(userRef, {
          username,
          email,
          firstName,
          lastName,
        });

        toast.success("Registration successful!");
      } catch (error: any) {

        if (error.code === "auth/email-already-in-use") {
          toast.error("This email address is already in use. Please use a different email or sign in with your existing account.");
        } else {
          console.error(error);
        }
      }
    } else {

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green1 to-green2 relative">
      <div className="fixed top-5 right-5">
        <ToastContainer
          position="top-right" // Position at the top-right corner
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className="w-full mx-auto p-4 bg-gray1 bg-opacity-5 bg-custom-opacity rounded-lg shadow-lg lg:max-w-xl">
        <h1 className="text-4xl text-center mb-4 font-inria text-white">Registration</h1>
        <div className="mt-4 p-4 rounded-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className={`w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none ${!username ? 'border-red-500' : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-invalid={!username}
            />
            {!username && <p className="text-red-500">Username is required</p>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none ${!email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!email}
            />
            {!email && <p className="text-red-500">Email is required</p>}
          </div>
          <div className="md:flex md:space-x-4">
            <div className="mb-4 md:w-1/2">
              <input
                type="text"
                placeholder="First Name"
                className={`w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none ${!firstName ? 'border-red-500' : ''}`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={!firstName}
              />
              {!firstName && <p className="text-red-500">First Name is required</p>}
            </div>
            <div className="mb-4 md:w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                className={`w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none ${!lastName ? 'border-red-500' : ''}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={!lastName}
              />
              {!lastName && <p className="text-red-500">Last Name is required</p>}
            </div>
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className={`w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none ${!password ? 'border-red-500' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={!password}
            />
            {!password && <p className="text-red-500">Password is required</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className={`w-full p-3 bg-blue1 text-xl rounded-md focus:bg-blue1 focus:outline-none ${!confirmPassword ? 'border-red-500' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-invalid={!confirmPassword}
            />
            {!confirmPassword && <p className="text-red-500">Confirm Password is required</p>}
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="w-full p-3 bg-blue-500 hover-bg-blue-600 text-white text-xl rounded-md shadow-md"
              onClick={handleRegistration}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Registration;
