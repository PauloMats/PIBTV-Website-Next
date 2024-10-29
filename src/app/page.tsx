//page.tsx

"use client";
import React from 'react';
import Image from 'next/image';
import fotoBemVindos from '../assets/foto_bemvindos.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CaroucelExemple from './components/Carrousel';
import { Card } from 'react-bootstrap';


const Home: React.FC = () => {
  return (
    <>    
    <div>
      <br /><br /><br />
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
        Nossos cultos são realizados todos os domingos às 18h00. E encontros de célula todas as Quintas às 19h45.
        <br /> Venha participar conosco e ouvir a Palavra de Deus.

        Somos uma igreja em CÉLULAS, e prezamos pela comunhão e pelo ensino da Palavra de Deus.
      </p>
      <Button href="/local" variant="primary">Visite-nos!</Button>{' '}
  </section>  

  <h1 className='h1-center'>Onde a PIBTV é relevante</h1>

  <section className='card-mobile'>

  {/* Carrossel para mobile */}
  <CaroucelExemple />
 </section>

{/* Cards para telas grandes */}
<section className='card-section'>

  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Quilo do Amor</Card.Title>
        <Card.Text>
          O Quilo do Amor é um projeto social da PIBTV que auxilia famílias carentes através de doação alimentos.
        </Card.Text>
        <Button variant="primary">Ver Mais</Button>
      </Card.Body>
    </Card>

  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Células</Card.Title>
        <Card.Text>
          As células são grupos de estudo e comunhão que se reúnem semanalmente para estudar e compartilhar a Palavra de Deus.
        </Card.Text>
        <Button variant="primary">Ver Mais</Button>
      </Card.Body>
    </Card>
  
 
  <Card style={{ width: '18rem'}}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Projeto ABBASE</Card.Title>
        <Card.Text>
          Projeto ABBASE é uma iniciativa da PIBTV que visa atender as necessidades de famílias carentes da região.
        </Card.Text>  
        <Button variant="primary">Ver Mais</Button>
      </Card.Body>
    </Card>

</section>

<section className='page-infos'>
<section className="info-page3">
  <h1>Conheça nossos eventos!</h1>
  <p>Acompanhe a nossa programação de eventos e participe conosco.</p>
  <Button href="/eventos" variant="primary">Eventos e Avisos</Button>
</section>

<section className="info-page4">
  <h1>Conheça nossas células!</h1>
  <p>Participe de nossas células e faça parte de uma comunidade de fé.</p>
  <Button href="/celulas" variant="primary">Células</Button>
</section>

<section className="info-page5">
  <h1>Conheça nossos ministérios!</h1>
  <p>Conheça os ministérios da PIBTV e participe conosco.</p>
  <Button href="/ministerios" variant="primary">Ministérios</Button>
</section>    

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
    </>
  );  
};

export default Home;
