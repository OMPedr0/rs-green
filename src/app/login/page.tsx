import { AuthProvider } from "@/api/auth";
import LoginUser from "@/api/login/page";
import React from "react";
import Background from "../components/bgtodos/bg/page";

export default function Login() {
  return (
    <Background imageURL="https://firebasestorage.googleapis.com/v0/b/rs-green.appspot.com/o/bglogin.png?alt=media&token=cc802fac-aebc-4bf1-90f4-2e7e87ef2983&_gl=1*1fk2obq*_ga*MjAzOTQzNDExMi4xNjkyNzA2OTI1*_ga_CW55HF8NVT*MTY5NzcwNTM0MC4yOC4xLjE2OTc3MDU0MzYuNDEuMC4w">
      <AuthProvider>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoginUser />
        </div>
      </AuthProvider>
    </Background>
  );
}
