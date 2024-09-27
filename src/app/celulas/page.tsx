import React from 'react';
import Image from 'next/image';
import image1 from '../../assets/celula encontro comunhao.png';
import image2 from '../../assets/celula prototipo encontro.png';
import image3 from '../../assets/Edificação Celulas.png';
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
import './celulas.css'

    const Celulas = () => {
        return (
            <div className="container">
                <h1>Conheça nossas Células</h1>
                <br />
                <p>Célula Huiós</p>
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
                <br />
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
            </div>
            
                
        );
    };

export default Celulas;
