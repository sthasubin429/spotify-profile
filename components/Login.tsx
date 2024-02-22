import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function Login(): ReactElement {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-2xl font-bold">Spotify Profile</h1>
        <Link href="/api/login" className="btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
