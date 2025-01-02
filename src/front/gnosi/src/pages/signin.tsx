import { SigninHeader } from './../assets/signin_components/signin_header';
import { SigninForm } from './../assets/signin_components/signin_form';
import '../styles/signin.css';

export function Signin() {
  return (
    <div className="signin-container grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-backgroundcolor">
      {/* Imagem no lado esquerdo */}
      <div className="bg-img-atenas bg-cover bg-no-repeat bg-center h-full" />

      {/* Formulário de Cadastro */}
      <div id="container" className="flex justify-center items-center px-4 py-8 lg:py-0">
        <div className="w-full max-w-[636px]">
          <main className="flex flex-col gap-8 sm:gap-12">
            {/* Cabeçalho */}
            <SigninHeader />
            {/* Formulário */}
            <SigninForm />
          </main>
        </div>
      </div>
    </div>
  );
}