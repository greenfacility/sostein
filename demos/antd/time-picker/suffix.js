import { TimePicker, Icon } from 'antd';
import moment from 'moment';

function onChange(time, timeString) {
  console.log(time, timeString);
}

const icon = <Icon type="smile" />;

const Component = () => (
  <TimePicker
    suffixIcon={icon}
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
  />
);
export default Component;
