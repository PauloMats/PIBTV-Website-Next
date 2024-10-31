"use client";
import React from 'react';
import Image from 'next/image';
import fotoBemVindos from '../assets/foto_bemvindos.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from './components/Footer';
import CaroucelExemple from './components/Carrousel';
import { Card } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <>    
      <div>
        <section className="hero-section">
          <div className='image-page-container'>
            <Image
              className="image-page"
              src={fotoBemVindos}
              alt="Imagem da igreja"
              priority // Adicionando prioridade para a imagem
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 70vw" // Responsividade
            />
          </div>
        </section>
      </div>
      
      <section className="info-page1">
        <h1 className="text-3xl font-bold underline">Uma família!</h1>
        <p>Seja bem-vindo e bem-vinda à Primeira Igreja Batista em Teotônio Vilela. 
          Aqui você encontra informações sobre nossos cultos, eventos e atividades. 
          Fique à vontade para navegar e conhecer mais sobre a nossa igreja.</p>
      </section>  

      <section className="info-page2">
        <h1>Culto todos os Domingos!</h1>
        <p>
          Nossos cultos são realizados todos os domingos às 18h00. E encontros de célula todas as quintas às 19h45.
          <br /> Venha participar conosco e ouvir a Palavra de Deus.
          <br /> Somos uma igreja em CÉLULAS, e prezamos pela comunhão e pelo ensino da Palavra de Deus.
        </p>
        <Button href="/local" variant="primary">Visite-nos!</Button>
      </section>  

      <h1 className='h1-center'>Onde a PIBTV é relevante</h1>

      <section className='card-mobile'>
        <CaroucelExemple />
      </section>

      <section className='card-section'>
        {["Quilo do Amor", "Células", "Projeto ABBASE"].map((title, index) => (
          <Card key={index} style={{ width: '300px' }} className="custom-card">
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                {/* Texto correspondente ao título (ajuste conforme necessário) */}
                {title === "Quilo do Amor" && 
                  "O Quilo do Amor é um projeto social da PIBTV que auxilia famílias carentes através de doação de alimentos."}
                {title === "Células" && 
                  "As células são grupos de estudo e comunhão que se reúnem semanalmente para estudar e compartilhar a Palavra de Deus."}
                {title === "Projeto ABBASE" && 
                  "Projeto ABBASE é uma iniciativa da PIBTV que visa atender as necessidades de famílias carentes da região."}
              </Card.Text>
              <Button href='/projetos' variant="primary">Ver Mais</Button>
            </Card.Body>
          </Card>
        ))}
      </section>

      <section className='page-infos'>
        {[
          { title: "Conheça nossos Eventos", link: "/eventos", description: "Acompanhe a nossa programação de eventos e participe conosco." },
          { title: "Conheça nossas Células", link: "/celulas", description: "Participe de nossas células e faça parte de uma comunidade de fé." },
          { title: "Conheça nossos Ministérios", link: "/ministerios", description: "Conheça os ministérios da PIBTV e participe conosco." },
        ].map((info, index) => (
          <section key={index} className={`info-page${index + 3}`}>
            <h1>{info.title}</h1>
            <p>{info.description}</p> 
            <Button href={info.link} variant="primary">{info.title.split(" ")[2]}</Button>
          </section>
        ))}

        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Informe seu nome e, se preferir, um telefone para contato</Form.Label>
            <Form.Control type="text" placeholder="Nome e Contato" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Informe abaixo seu pedido de oração</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="success">Enviar Pedido de Oração</Button>
        </Form>
      </section>
      <Footer />
    </>
  );  
};

export default Home;
