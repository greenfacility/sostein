import { Card, Col, Row, Switch } from 'antd';

import MockPricing from '../demos/mock/pricing';
import PricingTable from './shared/Pricing';
import { useState } from 'react';

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  return (
    <>
      <div className="text-center my-5">
        <h1
          className="font-weight-bold"
          css={`
            display: block;
          `}
        >
          Simple, predictable pricing.
        </h1>
        <h6>
          Get started with the free tier and upgrade anytime, commitment free.
        </h6>
        <p>
          Monthly&nbsp;
          <Switch
            checked={!!annual}
            onChange={checked => setAnnual(checked)}
            className="mx-1"
          />
          &nbsp;Yearly <small className="text-success">Save 10%</small>
        </p>
      </div>

      <Card
        className="shadow-sm rounded overflow-hidden"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <Row type="flex" justify="space-around" gutter={0}>
          {MockPricing.map((item, index) => (
            <Col
              className={` ${MockPricing.length - 1 !== index ? '' : ''}`}
              key={index}
              xl={6}
              md={12}
              sm={24}
              xs={24}
            >
              <PricingTable
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                price={!annual ? item.price : item.price * 12 * 0.9}
                features={item.features}
                icon={item.icon}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default Pricing;
