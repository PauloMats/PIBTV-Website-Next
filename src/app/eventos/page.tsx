import React from 'react';
import Footer from '../components/Footer';

const Page: React.FC = () => {
    return (
        <>
        <div className='container'>
            <h1>Eventos e Avisos</h1>
            <p> - Dia ... 
                - Horário ...
                - Local ...
                Em breve mais informações.
            </p>
            
        </div>
        <Footer />
        </>
    );
};

export default Page;