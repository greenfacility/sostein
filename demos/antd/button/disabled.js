import { Button } from 'antd';

const Component = () => (
  <div>
    <Button type="primary">Primary</Button>
    <Button type="primary" disabled>
      Primary(disabled)
    </Button>
    <br />
    <Button>Default</Button>
    <Button disabled>Default(disabled)</Button>
    <br />
    <Button type="dashed">Dashed</Button>
    <Button type="dashed" disabled>
      Dashed(disabled)
    </Button>
    <div className="rounded bg-dark p-3">
      <Button ghost>Ghost</Button>
      <Button ghost disabled>
        Ghost(disabled)
      </Button>
    </div>
  </div>
);

export default Component;
