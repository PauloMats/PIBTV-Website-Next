import Link from 'next/link';
import './Navbar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="div01">
        <div className="div02"> Pibtv </div>
        <div className="div03">
          <ul className="ul01">
            <li>
              <Link href="/" className="inicio">Início</Link>
            </li>
            <li>
              <Link href="/members" className="members">Membros</Link>
            </li>
            <li>
              <Link href="/members/add" className="members_add">Adicionar Membro</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}