import { Collapse } from 'antd';

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Component = () => (
  <Collapse defaultActiveKey={['1']} onChange={callback}>
    <Panel header="This is panel header 1" key="1">
      <p className="m-0">{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p className="m-0">{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" disabled>
      <p className="m-0">{text}</p>
    </Panel>
  </Collapse>
);

export default Component;
