"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from "@/api/firebaseConfig";

import { FaHome, FaHashtag, FaBell, FaEnvelope, FaUser, FaSignOutAlt,FaPlusCircle } from 'react-icons/fa';

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  userLogo: string;
  username: string;
}

interface NavBarProps {
  handleShowPostCreate: () => void;
}


export function NavBar({ handleShowPostCreate }: NavBarProps) {
  const [showLogout, setShowLogout] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showAccountsCard, setShowAccountsCard] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Carregar dados do usuário atual a partir do localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userDataObj: UserData = JSON.parse(userDataString);
      setUserData(userDataObj);
    }
  }, []);

  const handleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleShowAccountsCard = () => {
    setShowAccountsCard(!showAccountsCard);
  };


  const handleLogout = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <div className="w-1/4 h-3/4 mt-4 fixed top-0 left-0 flex flex-col items-center justify-start bg-text2 bg-opacity-25 text-white py-4 rounded-r-xl">
      <div className="my-6">
        <button className="flex items-center text-3xl mb-1 w-full" onClick={() => alert("Home button clicked")}>
          <FaHome size={30} className="mr-2" />
          <span className="text-2xl">Página Principal</span>
        </button>
      </div>
      <div className="my-6">
        <button className="flex items-center text-3xl mb-1 w-full" onClick={() => alert("Explore button clicked")}>
          <FaHashtag size={30} className="mr-2" />
          <span className="text-2xl">Explorar</span>
        </button>
      </div>
      <div className="my-6">
        <button className="flex items-center text-3xl mb-1 w-full" onClick={() => alert("Notifications button clicked")}>
          <FaBell size={30} className="mr-2" />
          <span className="text-2xl">Notificações</span>
        </button>
      </div>
      <div className="my-6">
        <button className="flex items-center text-3xl mb-1 w-full" onClick={() => alert("Messages button clicked")}>
          <FaEnvelope size={30} className="mr-2" />
          <span className="text-2xl">Mensagens</span>
        </button>
      </div>
      <div className="my-6">
        <button className="flex items-center text-3xl mb-1 w-full" onClick={handleShowAccountsCard}>
          <FaUser size={30} className="mr-2" />
          <span className="text-2xl">Perfil</span>
        </button>
      </div>
      <div className="my-6">
        <button className="flex items-center text-3xl mb-1 w-full" onClick={handleShowPostCreate}>
          <FaPlusCircle size={30} className="mr-2" />
          <span className="text-2xl">Create Post</span>
        </button>
      </div>
      <div className="my-6">
        <button className="flex items-center text-3xl bg-text2 p-4 rounded gap-2" onClick={handleShowLogout}>
          <img src={userData?.userLogo} alt="User Logo" className="w-12 h-12 rounded-full mr-4" />
          <div className="flex flex-col">
            <span className="text-xl">{`${userData?.firstName} ${userData?.lastName}`}</span>
            <span className="text-lg">@{userData?.username}</span>
          </div>
        </button>
      </div>
      {showLogout && (
        <div className="my-4">
          <div className="bg-text2 rounded-lg shadow-lg p-4">
            <div className="flex items-center mb-4">
              <img src={userData?.userLogo} alt="User Logo" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex flex-col">
                <span className="text-lg">@{userData?.username}</span>
              </div>
            </div>
            <div className="text-center relative">
              <hr className="border-gray-300 h-1 w-40 my-0" style={{ top: '8px' }} />
            </div>
            <div className="text-center mt-2">
              <button className="bg-red-500 text-white px-2 py-1 rounded text-lg flex items-center justify-center" onClick={handleLogout}>
                <FaSignOutAlt size={20} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
}
