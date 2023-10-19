import React from 'react';

interface BackgroundProps {
  imageURL: string;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ imageURL, children }) => {
  return (
    <div className="bg-gradient-to-b from-bgpage to-bgpage2 h-screen relative">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/rs-green.appspot.com/o/bglogin.png?alt=media&token=cc802fac-aebc-4bf1-90f4-2e7e87ef2983&_gl=1*1fk2obq*_ga*MjAzOTQzNDExMi4xNjkyNzA2OTI5*_ga_CW55HF8NVT*MTY5NzcwNTM0MC4yOC4xLjE2OTc3MDU0MzYuNDEuMC4w"
        alt="Background Image"
        className="w-screen h-screen object-cover"
      />
      {children}
    </div>
  );
};

export default Background;
