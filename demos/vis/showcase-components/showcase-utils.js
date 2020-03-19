import { Card, Col } from 'antd';

export function mapSection(section, index) {
  const { name } = section;
  const SectionComponent = section.component;

  return (
    <Col xs={24} sm={24} md={24} lg={12} key={`${name}-index`}>
      <Card className="mb-4" title={name}>
        <div className="text-center">
          {SectionComponent && <SectionComponent />}
        </div>
      </Card>
    </Col>
  );
}

export function fullMapSection(section, index) {
  const { comment, name } = section;
  const SectionComponent = section.component;

  return (
    <Col sm={24} md={24} lg={24} key={`${name}-index`}>
      <Card className="mb-4" title={name}>
        <div className="text-center">
          {comment && <p className="docs-comment">{comment}</p>}
          {SectionComponent && <SectionComponent />}
        </div>
      </Card>
    </Col>
  );
}
