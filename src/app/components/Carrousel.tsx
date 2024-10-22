import Carousel from 'react-bootstrap/Carousel';
import CarouselImg from './CarouselImg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CaroucelExemple() {
  return (
    <section className='carousel-section'>
    <Carousel>
      <Carousel.Item>
        <CarouselImg />
        <Carousel.Caption>
        <Card style={{ width: '18rem'}}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Projeto ABBASE</Card.Title>
        <Card.Text>
          Projeto ABBASE é uma iniciativa da PIBTV que visa atender as necessidades de famílias carentes da região.
        </Card.Text>
        <Button variant="primary">Ver Mais</Button>
      </Card.Body>
    </Card>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImg />
        <Carousel.Caption>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Quilo do Amor</Card.Title>
        <Card.Text>
          O Quilo do Amor é um projeto social da PIBTV que auxilia famílias carentes através de doação alimentos.
        </Card.Text>
        <Button variant="primary">Ver Mais</Button>
      </Card.Body>
    </Card>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImg />
        <Carousel.Caption>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Células</Card.Title>
        <Card.Text>
          As células são grupos de estudo e comunhão que se reúnem semanalmente para estudar e compartilhar a Palavra de Deus.
        </Card.Text>
        <Button variant="primary">Ver Mais</Button>
      </Card.Body>
    </Card>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </section>
    );
}

export default CaroucelExemple;