// @ts-expect-error
import React from 'react';
import { SignupHeader } from './../assets/signup_components/signup_header';
import { SignupForm } from './../assets/signup_components/signup_form';
import '../styles/signup.css';
export function Signup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-backgroundcolor">
      {/* Imagem no lado esquerdo */}
      <div className="bg-img-atenas bg-cover bg-no-repeat bg-center h-full" />
      {/* Formulário de Cadastro */}
      <div id="container" className="flex justify-center items-center px-4 py-8 lg:py-0">
        <div className="w-full max-w-[636px]">
          <main className="flex flex-col gap-8 sm:gap-12">
            {/* Cabeçalho */}
            <SignupHeader />
            {/* Formulário */}
            <SignupForm />
          </main>
        </div>
      </div>
    </div>

  );
}