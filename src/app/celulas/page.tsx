"use client";

import './celulas.css'
import React from 'react';
import image4 from '../../assets/img cel huios 1.jpg';
import image5 from '../../assets/img cel huios 2.jpg';
import image6 from '../../assets/img cel huios 3.jpg';
import image8 from '../../assets/img cel huios 4.jpg';
import image9 from '../../assets/img cel huios 5.jpg';
import image10 from '../../assets/img cel huios 7.jpg';
import image11 from '../../assets/img cel huios 8.jpg';
import image12 from '../../assets/img cel huios 9.jpg';
import image13 from '../../assets/img cel upf 1.jpg';
import image14 from '../../assets/img cel upf 2.jpg';
import image15 from '../../assets/img cel upf 3.jpg';
import image16 from '../../assets/img cel upf 4.jpg';
import image17 from '../../assets/img cel upf 5.jpg';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'next/image';

    const Celulas = () => {
        return (
            <div className='page-celulas'>
            <h1>Conheça nossas Células</h1>
            <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Célula Huiós</Accordion.Header>
              <Accordion.Body>
              <div className="container">
              <section className='description-celula'>
                
                    <div className='aside1'>
                    <Button variant="outline-info">Informações Sobre a Célula</Button>{' '}
                     <p>Célula Huiós</p>
                     <p>Local: Rua Pedro Cavalcante </p>
                     <p>Dia e Hora: Toda as Quintas as 19h45</p>
                     <p>Líder: Misael </p>
                     <p>Contato: 82 9117-3873</p>
                    </div>
                    <div className='aside2'>
                    <Button variant="outline-info">Localização dos encontros</Button>{' '}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d245.64219790645382!2d-36.354951663579804!3d-9.911025205542877!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x70424a69a546ef9%3A0xdafc018f87d9fe8d!2sLIONSINFO%20CURSOS!5e0!3m2!1spt-BR!2sbr!4v1727713719064!5m2!1spt-BR!2sbr" width="400" height="300" style={{ border: '0' }} allowFullScreen={true} loading="lazy"  referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </section>
                
                <div className="image-gallery-1">  
                    
                    <div className="image-container">
                        <Image className="image" src={image4} alt="Image 1" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image5} alt="Image 2" />    
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image6} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image8} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image9} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image10} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image11} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image12} alt="Image 3" />
                    </div>
                </div>  
                </div>
              
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Célula Unidos Pela Fé</Accordion.Header>
              <Accordion.Body>
              <p>Célula Unidos Pela Fé</p>
                <br />
                <div className="image-gallery-2">
                    <div className="image-container">
                        <Image className="image" src={image13} alt="Image 2" />    
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image14} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image15} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image16} alt="Image 3" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image17} alt="Image 3" />
                    </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
    
            </div>   
        );
    };
   
export default Celulas;
