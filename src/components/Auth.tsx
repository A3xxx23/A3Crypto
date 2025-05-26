import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

export const Auth = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Verifica si ya hay sesión activa
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    // Escucha cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'localhost:5173/auth/callback', // Cambia esto a tu URL de redirección
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex-1 flex justify-end space-x-6">
      {session ? (
        <button
          onClick={handleLogout}
          className="rounded-full border border-white/10 flex justify-center items-center gap-x-2 py-2 px-4
          bg-white/5 hover:scale-110 hover:bg-white/10 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="rounded-full border border-white/10 flex justify-center items-center gap-x-2 py-2 px-4
          bg-white/5 hover:scale-110 hover:bg-white/10 hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Auth;
