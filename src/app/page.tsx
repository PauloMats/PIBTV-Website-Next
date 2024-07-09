// src/app/page.tsx
"use client";

import styles from './Home.module.css';
import './globals.css'; // Importação do CSS global

const Home: React.FC = () => {
  return (
    <div className={styles.backgroundPage}>
      <section className={styles.banner}>
        <h1>Tudo é possível ao que crê! </h1>
        <p>CULTO AOS <b>DOMINGO</b> ÀS 18H | <b>TERÇA-FEIRAS</b> ÀS 19H30 </p>
        <div className={styles.socialIcons}>
          <p>Nossas redes sociais</p>
          <a href="https://www.instagram.com/pibteotoniovilela/">📸</a>
          <a href="#youtube">📺</a>
        </div>
      </section>
    </div>
  );  
};

export default Home;
