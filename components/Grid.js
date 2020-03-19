import { Caption, Figure, Image, Title } from './styles/Media';
import { Col, Row } from 'antd';

let images = [];

for (let num = 1; num <= 20; num += 1) {
  images.push(num);
}

const Grid = () => (
  <Row type="flex" gutter={1}>
    {images.map(id => (
      <Col xl={6} lg={8} sm={12} xs={24} key={id}>
        <Figure height={300}>
          <Image
            source={`/static/images/unsplash/${id}.jpg`}
            alt={`image ${id}`}
          />
          <Caption>
            <Title>
              Media <strong>{id}</strong>
            </Title>
          </Caption>
        </Figure>
      </Col>
    ))}
  </Row>
);

export default Grid;
