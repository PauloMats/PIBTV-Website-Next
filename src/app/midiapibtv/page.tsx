import React from 'react';
import Image from 'next/image';
import image01 from '../../assets/Captura de tela 2024-07-08 091727.png';
import image02 from '../../assets/Foto Mulheres da Igreja.png';
import image03 from '../../assets/celula encontro comunhao.png';
import image04 from '../../assets/celula prototipo.png';
import image05 from '../../assets/celula prototipo encontro.png';
import './midiapibtv.css';

const Page: React.FC = () => {
    return (
        <div className='container'>
            <section className='page_midiapibtv'>
                <div>   
                    <h1>Fotos e Vídeos de nossa Igreja</h1>
                </div>
                <div className='image-container'>
                    <Image src={image01} alt="Image 1" className="responsive-image" />
                </div>
                <div className='image-container'>
                    <Image src={image02} alt="Image 2" className="responsive-image" />
                </div>
                <div className='image-container'>
                    <Image src={image03} alt="Image 3" className="responsive-image" />
                </div>
                <div className='image-container'>
                    <Image src={image04} alt="Image 4" className="responsive-image" />
                </div>
                <div className='image-container'>
                    <Image src={image05} alt="Image 5" className="responsive-image" />
                </div>
                <div>
                    <h3>    Veja nossos vídeos</h3>
                </div>
            </section>
        </div>
    );
};

export default Page;
