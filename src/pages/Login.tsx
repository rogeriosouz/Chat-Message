import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AuthGoogle';

export function Login() {
  const { singIn, isLogin } = useContext(AppContext);

  const router = useNavigate();

  useEffect(() => {
    if (Cookies.get('authUser')) {
      router('/');
    }
  }, []);

  return (
    <section className="w-full h-screen flex items-center justify-center p-3">
      <div className="gap-5 w-[500px] h-[300px] shadow-2xl border border-zinc-400 rounded flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Login Google</h1>
        <button
          onClick={() => singIn()}
          className="flex items-center justify-center gap-3 font-semibold transition-colors w-[100px] h-[40px] bg-white rounded border border-zinc-400 hover:border-zinc-300 hover:text-white"
        >
          <FcGoogle fontSize={25} />
        </button>
      </div>
    </section>
  );
}
