import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

const Component = () => (
  <InputNumber min={0} max={10} step={0.1} onChange={onChange} />
);

export default Component;
