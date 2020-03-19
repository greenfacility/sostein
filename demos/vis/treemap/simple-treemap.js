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

import { Row, Select } from 'antd';

import D3FlareData from '../datasets/d3-flare-example.json';
import ShowcaseButton from '../showcase-components/showcase-button';
import Treemap from 'react-vis/dist/treemap';
const Option = Select.Option;


const MODE = [
  'circlePack',
  'partition',
  'partition-pivot',
  'squarify',
  'resquarify',
  'slice',
  'dice',
  'slicedice',
  'binary'
];

const STYLES = {
  SVG: {
    stroke: '#fff',
    strokeWidth: '0.25',
    strokeOpacity: 0.5
  },
  DOM: {
    border: 'thin solid #fff'
  }
};

export default class SimpleTreemapExample extends React.Component {
  state = {
    modeIndex: MODE[0],
    useSVG: true
  };

  updateModeIndex = value => {
    this.setState({
      modeIndex: value
    });
  };

  render() {
    const { modeIndex, useSVG } = this.state;

    return (
      <div className="centered-and-flexed">
        <Row type="flex" align="middle" justify="center">
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
          <ShowcaseButton
            onClick={() => this.setState({ useSVG: !useSVG })}
            buttonContent={useSVG ? 'Use dom' : 'use SVG'}
          />
        </Row>
        <Row type="flex" align="middle" justify="center">
          <Treemap
            className="m-auto d-block"
            {...{
              animation: true,
              className: 'nested-tree-example',
              colorType: 'literal',
              colorRange: ['#007bff'],
              data: D3FlareData,
              mode: modeIndex,
              renderMode: useSVG ? 'SVG' : 'DOM',
              height: 300,
              width: 350,
              margin: 10,
              getSize: d => d.value,
              getColor: d => d.hex,
              style: STYLES[useSVG ? 'SVG' : 'DOM']
            }}
          />
        </Row>
      </div>
    );
  }
}
