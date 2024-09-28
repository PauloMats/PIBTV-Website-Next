//page.tsx

"use client";
import React from 'react';
import styles from './Home.module.css';
import './globals.css';
import Image from 'next/image';
import fotoBemVindos from '../assets/foto_bemvindos.png';


const Home: React.FC = () => {
  return (
    <>    
    <div className={styles.backgroundPage}>
      <section className={styles.banner}>
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Image
              src={fotoBemVindos}
              alt="Foto do culto de domingo"
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Ajusta o tamanho para diferentes larguras de tela
              style={{ objectFit: 'cover' }} // Define o comportamento de preenchimento da imagem
            />
  </div>
      </section>
    </div>
    <section className="info-page1">
      <h1>Bem-vindos à Primeira Igreja Batista em Teotônio Vilela</h1>
      <p>Seja bem-vindo ao site da Primeira Igreja Batista em Teotônio Vilela. Aqui você encontra informações sobre nossos cultos, eventos e atividades. Fique à vontade para navegar e conhecer mais sobre a nossa igreja.</p>
  </section>  
  <section className="info-page2">
      <h1>titulo aqui</h1>
      <p>texto aqui</p>
  </section>  
    </>
  );  
};

export default Home;
