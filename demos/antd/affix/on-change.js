import { Affix, Button } from 'antd';

const Component = () => (
  <Affix offsetTop={120} onChange={affixed => console.log(affixed)}>
    <Button>120px to affix top</Button>
  </Affix>
);

export default Component;
