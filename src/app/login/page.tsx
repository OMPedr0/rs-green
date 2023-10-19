import { AuthProvider } from "@/api/auth";
import LoginUser from "@/api/login/page";
import React from "react";
import Background from "../components/bgtodos/bg/bg";

export default function Login() {
  return (
    <Background >
      <AuthProvider>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoginUser />
        </div>
      </AuthProvider>
    </Background>
  );
}
