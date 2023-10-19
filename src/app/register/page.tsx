import { AuthProvider } from "@/api/auth";
import React from "react";
import Background from "../components/bgtodos/bg/page";
import Registration from "@/api/register/page";



export default function Register() {



  return (
    <Background >
      <AuthProvider>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Registration />
        </div>
      </AuthProvider>
    </Background>
  )
}
