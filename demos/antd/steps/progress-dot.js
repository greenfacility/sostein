import { Steps } from 'antd';

const Step = Steps.Step;

const Component = () => (
  <Steps progressDot current={1}>
    <Step title="Finished" description="This is a description." />
    <Step title="In Progress" description="This is a description." />
    <Step title="Waiting" description="This is a description." />
  </Steps>
);

export default Component;
