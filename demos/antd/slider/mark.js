import { Slider } from 'antd';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50'
    },
    label: <strong>100°C</strong>
  }
};

const Component = () => (
  <div>
    <p>included=true</p>
    <Slider marks={marks} defaultValue={37} />
    <Slider range marks={marks} defaultValue={[26, 37]} />

    <p>included=false</p>
    <Slider marks={marks} included={false} defaultValue={37} />

    <p>marks & step</p>
    <Slider marks={marks} step={10} defaultValue={37} />

    <p>step=null</p>
    <Slider marks={marks} step={null} defaultValue={37} />
  </div>
);

export default Component;
