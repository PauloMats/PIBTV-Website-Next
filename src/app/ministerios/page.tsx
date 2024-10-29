import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import image1 from '../../assets/img ministerio infantil.jpg';
import image2 from '../../assets/img ministerio louvor.jpg';
import image3 from '../../assets/img ministerio multimidia.jpg';
import image4 from '../../assets/img ministerio recepção.jpg';
import './ministerios.css';

const MinisteriosPage: React.FC = () => {
    const cards = [
        {
            title: 'Ministério Infantil',
            image: image1,    
            description: 'O Ministério Infantil é responsável por cuidar das crianças da igreja.',
        },
        {
            title: 'Ministério de Louvor',
            image: image2,
            description: 'O Ministério de Louvor é responsável por conduzir a igreja na adoração.',
        },
        {
            title: 'Ministério de Multimídia',
            image: image3,
            description: 'O Ministério de Multimídia é responsável por cuidar da parte técnica dos cultos, como som e projeção e iluminação.',
        },
        {   
            title: 'Ministério de Recepção',
            image: image4,
            description: 'O Ministério de Recepção é responsável por receber os visitantes e membros da igreja.',
        },
    ];

    return (
        <div className="container mt-5">    
            <div className="cards-colum">
                {cards.map((card, index) => (
                    <div className="col-md-3" key={index}>
                            <Image src={card.image} className="card-img-top" alt={card.title} layout="responsive" />
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.description}</p>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default MinisteriosPage;