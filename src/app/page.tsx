//page.tsx

"use client";
import React from 'react';
import Image from 'next/image';
import fotoBemVindos from '../assets/foto_bemvindos.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
      <h1 className="text-3xl font-bold underline">Uma família!</h1>
      <p>Seja bem-vindo e bem-vinda a da Primeira Igreja Batista em Teotônio Vilela. 
        Aqui você encontra informações sobre nossos cultos, eventos e atividades. 
        Fique à vontade para navegar e conhecer mais sobre a nossa igreja.</p>
  </section>  
  <section className="info-page2">
      <h1>Culto todos os Domingo!</h1>
      <p>
        Nossos cultos são realizados todos os domingos às 18h00. Venha participar conosco e ouvir a Palavra de Deus.
      </p>
      <Button href="/local" variant="outline-info">Visite-nos!</Button>{' '}
  </section>  

  <section className="info-page3">
      <h1>Conheça nossos eventos!</h1>
      <p>
        Acompanhe a nossa programação de eventos e participe conosco. 
      </p>
  </section>

  <section className="info-page4">
      <h1>Conheça nossas células!</h1>
      <p>
        Participe de nossas células e faça parte de uma comunidade de fé.
      </p>

  </section>

  <section className="info-page5">
      <h1>Conheça nossos ministérios!</h1>
      <p>
        Conheça os ministérios da PIBTV e participe conosco.
      </p>

  </section>  

  <section className="info-page6">
      <h1>Pedidos de Oração</h1>
      <p>
        Deixe o seu pedido de oração conosco.
      </p>

      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Informe seu nome e se preferir, um telefone para contato</Form.Label>
        <Form.Control type="email" placeholder="Nome e Contato" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Informe abaixo seu pedido de oração</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
    <Button variant="success">Enviar Pedido de Oração</Button>{' '}
  </section>
  
  <footer className='footer-page'>
    <p>PIBTV © 2024 - Todos os Direitos Reservado</p>
  </footer>
    </>
  );  
};

export default Home;
