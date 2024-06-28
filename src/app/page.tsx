// src/app/page.tsx
"use client";

import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div>
    <div className={styles.container}></div>
      <section className={styles.banner}>
        <h1>Jesus está aqui, Tudo é possível ao que crê! </h1>
        <p>CULTO AOS <b>DOMINGO</b> ÀS 18H | <b>TERÇA-FEIRAS</b> ÀS 19H30 </p>
        <div className={styles.socialIcons}>
          <br />
          <br />
          <br />
          <br />
          <br /> 
          <p>Nossas redes sociais</p>
          <a href="#instagram">📸</a>
          <a href="#youtube">📺</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
