import Energy from '../datasets/energy.json';
import Sankey from 'react-vis/dist/sankey';
import { Select } from 'antd';

const Option = Select.Option;

const MODE = ['justify', 'center', 'left', 'right'];

export default class EnergySankey extends React.Component {
  state = {
    modeIndex: MODE[0]
  };

  updateModeIndex = value => {
    this.setState({
      modeIndex: value
    });
  };

  render() {
    const { modeIndex } = this.state;

    return (
      <div className="centered-and-flexed">
        <Select
          defaultValue={modeIndex}
          onChange={this.updateModeIndex}
          size="small"
          className="mx-3"
        >
          {MODE.map((mode, index) => (
            <Option value={mode} key={index}>
              {mode}
            </Option>
          ))}
        </Select>
        <Sankey
          className="m-auto"
          animation
          margin={50}
          nodes={Energy.nodes}
          links={Energy.links}
          width={960}
          align={modeIndex}
          height={500}
          layout={24}
          nodeWidth={15}
          nodePadding={10}
          style={{
            links: {
              opacity: 0.3
            },
            labels: {
              fontSize: '8px'
            },
            rects: {
              strokeWidth: 2,
              stroke: '#1A3177'
            }
          }}
        />
      </div>
    );
  }
}
