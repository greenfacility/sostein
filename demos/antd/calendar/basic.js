import { Calendar } from 'antd';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const Component = () => <Calendar onPanelChange={onPanelChange} />;

export default Component;
