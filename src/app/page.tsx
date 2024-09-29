//page.tsx

"use client";
import React from 'react';
import Image from 'next/image';
import fotoBemVindos from '../assets/foto_bemvindos.png';
import '../app/Home.module.css';


const Home: React.FC = () => {
  return (
    <>    
    <div>
      <section>
      <div className='image-page-container'>
      <Image
              src={fotoBemVindos}
              alt="Imagem da igreja"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Estilo inline para garantir comportamento desejado
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
  </div>
      </section>
    </div>
    <section className="info-page1">
      <h1>Bem-vindos à Primeira Igreja Batista em Teotônio Vilela</h1>
      <p>Seja bem-vindo ao site da Primeira Igreja Batista em Teotônio Vilela. Aqui você encontra informações sobre nossos cultos, eventos e atividades. Fique à vontade para navegar e conhecer mais sobre a nossa igreja.</p>
  </section>  
  <section className="info-page2">
      <h1>Culto todos os Domingo!</h1>
      <p>
        Nossos cultos são realizados todos os domingos às 18h00. Venha participar conosco e ouvir a Palavra de Deus.
      </p>
  </section>  
    </>
  );  
};

export default Home;
