import React, { ReactElement } from 'react';
import Nav from './Nav';
import Logout from './shared/Logout';
import SpotifyLogo from './shared/SpotifyLogo';

export default function Navbar(): ReactElement {
  return (
    <div className="min-h-screen w-60 bg-blackAlt absolute top-0 left-0">
      <SpotifyLogo />
      <Nav />
      <Logout />
    </div>
  );
}
