import React from 'react';

export function PublicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bgpage to-bgpage1 flex flex-col text-white items-center">
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
