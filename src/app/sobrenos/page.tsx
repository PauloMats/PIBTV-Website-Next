import React from 'react';
import './sobrenos.css';
import Image from 'next/image';
import Imagem1 from '../../assets/Edificação Celulas.png';
import Imagem2 from '../../assets/Foto Mulheres da Igreja.png';
import Imagem3 from '../../assets/celula encontro comunhao.png';

const InfoPage = () => {
    return (
        <>
        <div className='container'>
            <br /><br /><br /> <br />
            <h1>Mais sobre a PIBTV</h1>
            <p>A Primeira Igreja Batista em Teotônio Vilela foi fundada em...</p>
        </div>
        <div>
        <div id="carouselExampleIndicators" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <Image src={Imagem1} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <Image src={Imagem2} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <Image src={Imagem3} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
        </>
    );
};

export default InfoPage;