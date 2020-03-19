import { Caption, Figure, Image, SubTitle, Title } from './styles/Tile';
import { Col, Row } from 'antd';

let images = [];

for (let num = 1; num <= 20; num += 1) {
  images.push(num);
}

const Tile = () => (
  <Row type="flex" gutter={1}>
    {images.map(id => (
      <Col xl={6} lg={8} sm={12} xs={24} key={id}>
        <Figure height={300}>
          <Image
            source={`/static/images/unsplash/${id}.jpg`}
            alt={`image ${id}`}
          />
          <Caption className={` ${id > 10 ? 'footer' : 'header'}`}>
            <Title>Grid tile {id}</Title>
            <SubTitle>Media {id}</SubTitle>
          </Caption>
        </Figure>
      </Col>
    ))}
  </Row>
);

export default Tile;
