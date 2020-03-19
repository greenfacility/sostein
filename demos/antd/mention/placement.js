import { Mention } from 'antd';

const { toString } = Mention;

function onChange(contentState) {
  console.log(toString(contentState));
}

function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

const Component = () => (
  <Mention
    style={{ width: '100%' }}
    onChange={onChange}
    suggestions={[
      'afc163',
      'benjycui',
      'yiminghe',
      'RaoHai',
      '中文',
      'にほんご'
    ]}
    onSelect={onSelect}
    placement="top"
  />
);

export default Component;
