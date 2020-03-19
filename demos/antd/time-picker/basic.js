import { TimePicker } from 'antd';
import moment from 'moment';

function onChange(time, timeString) {
  console.log(time, timeString);
}

const Component = () => (
  <TimePicker
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
  />
);
export default Component;
