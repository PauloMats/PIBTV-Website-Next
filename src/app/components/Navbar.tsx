"use client";

import Link from 'next/link';
import { useState } from 'react';
import './Navbar.css';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="div01">
        <div className="div02">Primeira Igreja Batista em Teotônio Vilela</div>
        <div className={`div03 ${menuOpen ? 'open' : ''}`}>
          <ul className="ul01">
            <li>
              <Link href="/" className="inicio">Início</Link>
            </li>
            <li>
              <Link href="/local" className="visit">Visite-nos</Link>
            </li>
            <li>
              <Link href="/midiapibtv" className="mediaLibrary">Mídia PIBTV</Link>
            </li>
            <li>
              <Link href="/sobrenos" className="about">Sobre nós</Link>
            </li>
            <li>
              <Link href="/eventos" className="events">Eventos e Avisos</Link>
            </li> 
            <li>
              <Link href="/celulas" className="members">Células</Link>
            </li>
            <li>
              <Link href="/members/add" className="members_add">Adicionar Membro</Link>
            </li>
          </ul>
        </div>
        <div className="menu">
          <button onClick={toggleMenu}>☰</button>
        </div>
      </div>
    </nav>
  );
}
