// src/app/components/navbar.tsx
import Link from 'next/link';
import './Navbar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="div01">
        <div className="div02">Primeira Igreja Batista em Teotônio Vilela</div>
        <div className="div03">
          <ul className="ul01">
            <li>
              <Link href="/" className="inicio">Início</Link>
            </li>
            {/* <li>
              <Link href="#visit" className="visit">Visite-nos</Link>
            </li>
            <li>
              <Link href="#media-library" className="mediaLibrary">Mídia PIBTV</Link>
            </li>
            <li>
              <Link href="#about" className="about">Sobre nós</Link>
            </li>
            <li>
              <Link href="#events" className="events">Eventos e Avisos</Link>
            </li> */}
            <li>
              <Link href="/members" className="members">Membros</Link>
            </li>
            <li>
              <Link href="/members/add" className="members_add">Adicionar Membro</Link>
            </li>
          </ul>
        </div>
        <div className="menu">
          <button>☰</button>
        </div>
      </div>
    </nav>
  )
}
