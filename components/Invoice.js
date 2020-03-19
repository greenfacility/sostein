import { Button, Card, Col, Divider, Row } from 'antd';

import MockInvoice from '../demos/mock/invoice';
import { formatPrice } from '../lib/helpers';

const Invoice = () => {
  const tax = 15;
  const getSubTotal = () =>
    MockInvoice.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const getCalculatedTax = () => (tax * getSubTotal()) / 100;

  const getTotal = () => getSubTotal() + getCalculatedTax();

  return (
    <>
      <Card
        className="shadow-sm text-monospace"
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <div className="bg-dark text-light rounded-top p-5">
          <div className="p-5">
            <h1 className="text-white">Envato</h1>
            <Row type="flex" justify="space-between">
              <Col>
                <ul className="list-unstyled">
                  <li>Apple Inc</li>
                  <li>Austin Walker</li>
                  <li>austin.walker94@example.com</li>
                </ul>
                <ul className="list-unstyled">
                  <li>4783 Blue Island Ave</li>
                  <li>Ljan terrasse 346</li>
                  <li>Vear</li>
                  <li>Rogaland</li>
                  <li>3095</li>
                  <li>United States of America</li>
                </ul>
                <ul className="list-unstyled">
                  <li>Invoice #45789</li>
                  <li>November 05, 2019</li>
                </ul>
              </Col>
              <Col className="text-right">
                <ul className="list-unstyled">
                  <li>Amazon AWS</li>
                  <li>Francine Miles</li>
                  <li>frank.miles98@example.com</li>
                </ul>
                <ul className="list-unstyled">
                  <li>1033 W Sherman Dr</li>
                  <li>798 Mariana Isle</li>
                  <li>Lake Maegan</li>
                  <li>Wyoming</li>
                  <li>00 263</li>
                  <li>South Africa</li>
                </ul>
              </Col>
            </Row>
          </div>
        </div>

        <div className="p-5">
          <div className="p-5">
            <Divider className="m-0" />
            <Row
              type="flex"
              justify="space-between"
              className="py-2 text-muted"
            >
              <div>
                <small>Description</small>
              </div>
              <div className="text-right">
                <small>Amount</small>
              </div>
            </Row>
            <Divider className="m-0" />
            {MockInvoice.map((item, index) => (
              <div key={index}>
                <Row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  className="py-4"
                >
                  <div className="mr-auto">
                    <span>{item.title}</span>
                    <small
                      className="text-muted"
                      css={`
                        display: block;
                      `}
                    >
                      {item.subtitle}
                      {item.quantity && (
                        <span>
                          &nbsp;*&nbsp;
                          {item.quantity}
                        </span>
                      )}
                    </small>
                  </div>
                  <div className="text-right">
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </Row>
                <Divider className="m-0" />
              </div>
            ))}
            <Divider className="m-0" />
            <Row>
              <div
                className="ml-auto"
                css={`
                  display: block;
                  width: 100%;
                  max-width: 400px;
                `}
              >
                <Row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  className="py-4"
                >
                  <small className="mr-auto text-muted">Subtotal</small>
                  <span className="text-right">
                    {formatPrice(getSubTotal())}
                  </span>
                </Row>
                <Divider className="m-0" />
                <Row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  className="py-4"
                >
                  <small className="mr-auto text-muted">Tax</small>
                  <span>
                    <small className="text-muted">@ {tax}% - </small>
                    <span>{formatPrice(getCalculatedTax())}</span>
                  </span>
                </Row>
                <Divider className="m-0" />
                <Row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  className="py-4"
                >
                  <small className="mr-auto text-muted">Discount</small>
                  <span>
                    <small className="text-muted">0% off - </small>
                    <span>{formatPrice(0)}</span>
                  </span>
                </Row>
                <Divider className="m-0 bg-primary" />
                <Row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  className="py-4"
                >
                  <small className="mr-auto text-muted">Total</small>
                  <strong>{formatPrice(getTotal())}</strong>
                </Row>
                <Divider className="m-0 bg-primary" />
              </div>
            </Row>
          </div>
        </div>
      </Card>

      <div className="my-5 text-center">
        <Button type="primary" className="px-5">
          Pay Now
        </Button>
      </div>
    </>
  );
};

export default Invoice;
