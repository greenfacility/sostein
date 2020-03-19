import { Progress } from 'antd';

const Component = () => (
  <div>
    <Progress
      type="circle"
      percent={75}
      format={percent => `${percent} Days`}
    />
    <Progress type="circle" percent={100} format={() => 'Done'} />
  </div>
);
export default Component;
