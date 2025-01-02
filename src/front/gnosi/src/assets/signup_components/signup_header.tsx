import React from 'react';

export function SignupHeader() {
  return (
    <header className="flex flex-col gap-2 sm:gap-4">
      <h1 className="font-gnosi text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        Crie sua conta!
      </h1>
      <p className="font-gnosi text-lg sm:text-xl md:text-2xl text-white">
        Cadastre seus dados
      </p>
    </header>
  );
}