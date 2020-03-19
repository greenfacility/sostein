import { Card, Carousel } from 'antd';
import { Heart, Share, Star } from 'react-feather';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  .ant-card-cover {
    position: relative;
  }
`;

const Cover = styled.div`
  position: relative;
  width: 100%;
  .ant-carousel {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .slick-slider {
    width: 100%;
    height: 100%;
  }
  .slick-slide > div {
    display: flex;
  }
  .image {
    position: relative;
    background-size: cover;
    background-position: top center;
    width: 100%;
  }
  .weakColor & .image {
    -webkit-filter: invert(100%);
    filter: invert(100%);
  }
  .content {
    position: relative;
    z-index: 9;
  }
  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent 0,
      rgb(29, 29, 29) 100%
    );
  }
`;

const Content = styled.div`
  position: relative;
  height: 4.5em;
  overflow: hidden;
  &:after {
    content: '';
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10%;
    height: 1.5em;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%
    );
  }
`;

const PostCard = ({ title, subtitle, text, images, imageHeight }) => (
  <StyledCard>
    <Card
      cover={
        <Cover style={{ height: imageHeight }}>
          <Carousel
            autoplay
            autoplaySpeed={6000}
            className="rounded-top overflow-hidden"
          >
            {images.map((image, index) => (
              <div key={index}>
                <div
                  className="image"
                  css={`
                    background-image: url(${image});
                    height: ${imageHeight}px;
                  `}
                />
              </div>
            ))}
          </Carousel>
          <div className="title p-4">
            <h6 className="mb-0 text-white">{title}</h6>
            <small className="mb-0 text-white-50">{subtitle}</small>
          </div>
        </Cover>
      }
      actions={[
        <Heart size={20} strokeWidth={1} />,
        <Star size={20} strokeWidth={1} />,
        <Share size={20} strokeWidth={1} />
      ]}
    >
      <Content>{text}</Content>
    </Card>
  </StyledCard>
);

PostCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageHeight: PropTypes.number.isRequired
};

export default PostCard;
