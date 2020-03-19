// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

import { RefreshCcw } from 'react-feather';
import { Select } from 'antd';
import ShowcaseButton from '../showcase-components/showcase-button';

const Option = Select.Option;

function generateData() {
  return [...new Array(10)].map(row => ({
    x: Math.random() * 5,
    y: Math.random() * 10
  }));
}

const MODE = ['noWobble', 'gentle', 'wobbly', 'stiff'];

export default class Example extends React.Component {
  state = {
    data: generateData(),
    modeIndex: MODE[0]
  };

  updateModeIndex = value => {
    this.setState({
      modeIndex: value
    });
  };

  render() {
    const { modeIndex, data } = this.state;
    return (
      <div className="centered-and-flexed">
        <Select
          defaultValue={modeIndex}
          onChange={this.updateModeIndex}
          size="small"
          className="mr-2"
        >
          {MODE.map((mode, index) => (
            <Option value={mode} key={index}>
              {mode}
            </Option>
          ))}
        </Select>
        <ShowcaseButton
          onClick={() => this.setState({ data: generateData() })}
          buttonContent={<RefreshCcw size={14} strokeWidth={1} />}
        />

        <FlexibleWidthXYPlot height={276}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries animation={modeIndex} data={data} color="#007bff" />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
