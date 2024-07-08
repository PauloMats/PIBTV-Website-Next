import React from 'react';
import Image from 'next/image';
import image01 from '../../assets/Captura de tela 2024-07-08 091727.png';

const Page: React.FC = () => {
    return (
    <section className='page_midiapibtv'>
        <div>   
            <h1>Fotos e Vídeos de nossa Igreja</h1>
        </div>
        <div>
    <Image src={image01} alt="Image 1" />
        </div>
        <div>
            <h2>Veja nossos vídeos</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/8e7UN1ZKj5Q" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
    </section>
    );
};

export default Page;