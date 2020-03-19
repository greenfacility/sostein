import { DatePicker, Icon } from 'antd';

const smileIcon = <Icon type="smile" />;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

const Component = () => (
  <div>
    <DatePicker suffixIcon={smileIcon} onChange={onChange} />
    <br />
    <MonthPicker
      suffixIcon={smileIcon}
      onChange={onChange}
      placeholder="Select month"
    />
    <br />
    <RangePicker suffixIcon={smileIcon} onChange={onChange} />
    <br />
    <WeekPicker
      suffixIcon={smileIcon}
      onChange={onChange}
      placeholder="Select week"
    />
    <br />
    <DatePicker suffixIcon="ab" onChange={onChange} />
    <br />
    <MonthPicker
      suffixIcon="ab"
      onChange={onChange}
      placeholder="Select month"
    />
    <br />
    <RangePicker suffixIcon="ab" onChange={onChange} />
    <br />
    <WeekPicker suffixIcon="ab" onChange={onChange} placeholder="Select week" />
  </div>
);
export default Component;
