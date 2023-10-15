import { AuthProvider } from "@/api/auth";
import LoginUser from "@/api/login/page";
import React from "react";
import Background from "../components/bg/page";

export default function Login() {
  return (
    <Background imageURL="/bg.png">
      <AuthProvider>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoginUser />
        </div>
      </AuthProvider>
    </Background>
  );
}
