import Link from 'next/link';
import React, { ReactElement } from 'react';

function Login(): ReactElement {
  return (
    <div className="min-h-screen grid place-items-center">
      <Link href="/api/login">Login</Link>
    </div>
  );
}

export default Login;
