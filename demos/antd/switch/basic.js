import { Switch } from 'antd';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

const Component = () => <Switch defaultChecked onChange={onChange} />;

export default Component;
