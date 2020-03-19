import { Cascader } from 'antd';

const options = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        items: [
          {
            code: 'xihu',
            name: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        items: [
          {
            code: 'zhonghuamen',
            name: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
];

function onChange(value) {
  console.log(value);
}

const Component = () => (
  <Cascader
    fieldNames={{ label: 'name', value: 'code', children: 'items' }}
    options={options}
    onChange={onChange}
    placeholder="Please select"
  />
);

export default Component;
