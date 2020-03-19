import { Button } from 'antd';

const Component = () => (
  <div className="rounded bg-dark p-3">
    <Button type="primary" ghost>
      Primary
    </Button>
    <Button ghost>Default</Button>
    <Button type="dashed" ghost>
      Dashed
    </Button>
    <Button type="danger" ghost>
      danger
    </Button>
  </div>
);

export default Component;
