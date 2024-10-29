import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import image1 from '../../assets/abase Project.png';
import image2 from '../../assets/quilo do amor.jpg';
import './projetos.css';

const MinisteriosPage: React.FC = () => {
    const cards = [
        {
            title: 'Projeto ABASE',
            image: image1,    
            description: 'O Projeto ABASE é responsável por cuidar de crianças e adolescentes em situação de vulnerabilidade social.',
        },
        {
            title: 'Quilo do Amor',
            image: image2,
            description: 'O Quilo do Amor é uma ação social que visa arrecadar alimentos para famílias carentes.',
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