//page.tsx

"use client";
import React from 'react';
import Image from 'next/image';
import fotoBemVindos from '../assets/foto_bemvindos.png';
import '../app/Home.module.css';
import Button from 'react-bootstrap/Button';


const Home: React.FC = () => {
  return (
    <>    
    <div>
      <section>
      <div className='image-page-container'>
      <Image
              className="image-page"
              src={fotoBemVindos}
              alt="Imagem da igreja"
            />
  </div>
      </section>
    </div>
    <section className="info-page1">
      <h1>Uma família!</h1>
      <p>Seja bem-vindo e bem-vinda a da Primeira Igreja Batista em Teotônio Vilela. 
        Aqui você encontra informações sobre nossos cultos, eventos e atividades. 
        Fique à vontade para navegar e conhecer mais sobre a nossa igreja.</p>
        <Button variant="secondary">Primary</Button>{''}
      
  </section>  
  <section className="info-page2">
      <h1>Culto todos os Domingo!</h1>
      <p>
        Nossos cultos são realizados todos os domingos às 18h00. Venha participar conosco e ouvir a Palavra de Deus.
      </p>
  </section>  
  <footer className='footer-page'>
    <p>PIBTV © 2024 - Todos os Direitos Reservado</p>
  </footer>
    </>
  );  
};

export default Home;
