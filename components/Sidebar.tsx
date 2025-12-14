import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: '/profile', label: 'Profile' },
    { href: '/top-artists', label: 'Top Artists' },
    { href: '/top-tracks', label: 'Top Tracks' },
    { href: '/playlists', label: 'Playlists' },
    { href: '/recently-played', label: 'Recently Played' },
    { href: '/wrapped', label: 'Wrapped' }
  ];

  return (
    <>
      <button
        className="fixed left-4 top-4 z-20 md:hidden p-2 hover:bg-gray-900 rounded transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <aside
        className={`fixed left-0 top-0 z-10 h-screen w-64 transform bg-black text-white transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-gray-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-green-500">Spotify Profile</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-3 rounded transition-colors duration-200 font-medium ${
                    router.pathname === href
                      ? 'bg-green-500 text-black'
                      : 'text-gray-300 hover:bg-gray-900'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
