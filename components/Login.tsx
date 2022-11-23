import Link from 'next/link';
import React, { ReactElement } from 'react';

function Login(): ReactElement {
  return (
    <div className="min-h-screen grid place-items-center bg-black">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-white mb-4">Spotify Profile</h1>
        <Link href="/api/login" className="btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Login;
