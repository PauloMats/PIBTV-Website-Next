// src/components/navbar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import logopibtv from '../../assets/LOGO SITE PIBTV.png';
import { useState } from 'react';
import './Navbar.css';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o menu hamburguer
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Função para fechar o menu ao clicar em uma opção
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="div01"> 
        <div className="div02">
          {/* Ajustando o tamanho da imagem */}
          <Image 
            src={logopibtv} 
            alt="PIBTV" 
            className="navbar-logo"
          />
        </div>
        <div className={`div03 ${menuOpen ? 'open' : ''}`}>
          <ul className="ul01">
            <li>
              <Link href="/" className="nav-link" onClick={closeMenu}>Início</Link>
            </li>
            <li>
              <Link href="/local" className="nav-link" onClick={closeMenu}>Visite-nos</Link>
            </li>
            <li>
              <Link href="/midiapibtv" className="nav-link" onClick={closeMenu}>Mídia PIBTV</Link>
            </li>
            <li>
              <Link href="/sobrenos" className="nav-link" onClick={closeMenu}>Sobre nós</Link>
            </li>
            <li>
              <Link href="/eventos" className="nav-link" onClick={closeMenu}>Eventos e Avisos</Link>
            </li>
            <li>
              <Link href="/celulas" className="nav-link" onClick={closeMenu}>Células</Link>
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
