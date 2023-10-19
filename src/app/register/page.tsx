import { AuthProvider } from "@/api/auth";
import React from "react";
import Background from "../components/bgtodos/bg/page";
import Registration from "@/api/register/page";



export default function Register() {



  return (
    <Background imageURL="https://firebasestorage.googleapis.com/v0/b/green-team-hackatoon.appspot.com/o/bg.png?alt=media&token=cd3fe099-c15c-4d48-a46a-1a1b5d3c80af&_gl=1*1buekgm*_ga*MjAzOTQzNDExMi4xNjkyNzA2OTI1*_ga_CW55HF8NVT*MTY5NzM2OTkyOS4yNS4xLjE2OTczNjk5NDguNDEuMC4w">
      <AuthProvider>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Registration />
        </div>
      </AuthProvider>
    </Background>
  )
}
