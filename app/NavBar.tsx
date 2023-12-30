import Link from "next/link";
import React from "react";
import { SiMoleculer } from "react-icons/si";

const NavBar = () => {
  const navLinks = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Molecules",
      href: "/molecules",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <SiMoleculer />
      </Link>
      <ul className="flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
