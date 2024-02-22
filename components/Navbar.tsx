import React, { ReactElement } from 'react';
import Nav from './Nav';
import Logout from './shared/Logout';
import SpotifyLogo from './shared/SpotifyLogo';

export default function Navbar(): ReactElement {
  return (
    <div className="absolute left-0 top-0 min-h-screen w-60 bg-blackAlt">
      <SpotifyLogo />
      <Nav />
      <Logout />
    </div>
  );
}
