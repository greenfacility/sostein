import { Checkbox } from 'antd';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const Component = () => <Checkbox onChange={onChange}>Checkbox</Checkbox>;

export default Component;
