"use client";

import React from 'react';
import Image from 'next/image';
import localimage from '../../assets/Print Street Viwer PIBTV.png';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Importando ícones
import './local.css';

const Page = () => {
    return (
        <div className='container'>
            <h1>Faça-nos uma Visita!</h1>
            <h3>Será uma alegria imensa te receber!</h3>
            <div className='location-info'>
                <FaMapMarkerAlt className='icon' />
                <p>Estamos situados na Av. Maria Jeane Moreira Sampaio, S/N. Teotônio Vilela, AL</p>
                <a href="https://maps.app.goo.gl/QW8paEocsWxE2QXo8" target="_blank" rel="noopener noreferrer" className='map-link'>Ver no Google Maps</a>
            </div>
            <Image className='image' src={localimage} alt="Image" />

            <h4>Dúvidas?</h4>
            <p>Veja abaixo como chegar ao nosso endereço facilmente pelo google maps!</p>
            <iframe className='google-maps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491.2873813094692!2d-36.35078653181511!3d-9.909032278713363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x70425000eba772f%3A0xbd20dae624f98bcd!2sPrimeira%20Igreja%20Batista%20de%20Teot%C3%B4nio%20Vilela!5e0!3m2!1spt-BR!2sbr!4v1720546595672!5m2!1spt-BR!2sbr" width="600" height="450" style={{ border: '0' }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
};

export default Page;
