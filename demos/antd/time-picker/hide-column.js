import { TimePicker } from 'antd';
import moment from 'moment';

const format = 'HH:mm';

const Component = () => (
  <TimePicker defaultValue={moment('12:08', format)} format={format} />
);
export default Component;
