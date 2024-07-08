import React from 'react';
import Image from 'next/image';
import image1 from '../../assets/celula encontro comunhao.png';
import image2 from '../../assets/celula prototipo encontro.png';
import image3 from '../../assets/Edificação Celulas.png';
import './celulas.css'

    const Celulas = () => {
        return (
            <div className="container">
                <h1>Conheça nossa Célula Protótipo</h1>
                <div className="image-gallery">
                    <div className="image-container">
                        <Image className="image" src={image1} alt="Image 1" />
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image2} alt="Image 2" />    
                    </div>
                    <div className="image-container">
                        <Image className="image" src={image3} alt="Image 3" />
                    </div>
                </div>
            </div>
        );
    };

export default Celulas;
