import { Slider } from 'antd';

function formatter(value) {
  return `${value}%`;
}

const Component = () => (
  <div>
    <Slider tipFormatter={formatter} />
    <Slider tipFormatter={null} />
  </div>
);

export default Component;
