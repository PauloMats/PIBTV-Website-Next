"use client";
import React from 'react';
import styles from './Home.module.css';
import './globals.css';


const Home: React.FC = () => {
  return (
    <>    
    <div className={styles.backgroundPage}>
      <section className={styles.banner}>
        <h1>Seja Bem Vindo(a)!
          <br /> <br />
          <span>Primeira Igreja Batista em Teotônio Vilela</span>
        </h1> <br />
        <p>CULTO AOS <b>DOMINGO</b> ÀS 18H | <b>TERÇA-FEIRAS</b> ÀS 19H30 </p>
        <br />
        <div className={styles.socialIcons}>
          <p>Nossas redes sociais</p>
          <a href="https://www.instagram.com/pibteotoniovilela/">📸</a>
          <a href="#youtube">📺</a>
        </div>
      </section>
    </div>
    
    </>
  );  
};

export default Home;
