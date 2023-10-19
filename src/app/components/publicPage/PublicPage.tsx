"use client"

import React from 'react';
import { useRouter } from 'next/navigation'; // Corrija o import se necessário

export function PublicPage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bgpage to-bgpage1 flex flex-col text-white">
      <div className="p-4 text-center">
        <h1 className="text-4xl font-extrabold">Rs Green</h1>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 space-y-6 lg:space-y-0">
        <div className="lg:w-1/2 p-6">
          <h2 className="text-3xl font-semibold text-text4 mb-4">Projeto Rs Green</h2>
          <p className="text-lg text-text3">
            Rs Green é uma plataforma que oferece uma solução para os desafios na área da agricultura, permitindo a partilha de conhecimento e a resolução de problemas.
          </p>
          <ul className="mt-4 text-text1 list-disc list-inside">
            <li>Partilhe técnicas agrícolas e conhecimento.</li>
            <li>Obtenha soluções para problemas de doenças nas plantas.</li>
            <li>Descubra informações sobre plantas e ervas medicinais.</li>
          </ul>
          <button
        onClick={handleLoginClick}
        className="bg-blue hover:bg-blue1 text-white font-bold mt-4 py-2 px-4 rounded self-start"
      >
        Go to Login
      </button>
        </div>
        <div className="lg:w-1/2 p-6">
          <img
            src="https://cdn3.iconfinder.com/data/icons/business-1377/512/Discussion.png"
            alt="Imagem 1"
          />
        </div>
      </div>
    </div>
  );
}
