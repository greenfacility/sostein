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

import { FlexibleWidthXYPlot, HexbinSeries, XAxis, YAxis } from 'react-vis';

import { Button } from 'antd';
import { Component } from 'react';
import DATA from '../datasets/car-data.json';
import ShowcaseButton from '../showcase-components/showcase-button';

const ButtonGroup = Button.Group;

const DIMENSIONS = [
  'economy (mpg)',
  'cylinders',
  'displacement (cc)',
  'power (hp)',
  'weight (lb)',
  '0-60 mph (s)',
  'year'
];

export default class HexbinSizeExample extends Component {
  state = {
    xAxis: 0,
    yAxis: 3
  };

  updateX(increment) {
    this.setState({
      xAxis: (this.state.xAxis + (increment ? 1 : -1)) % DIMENSIONS.length
    });
  }

  updateY(increment) {
    this.setState({
      yAxis: (this.state.yAxis + (increment ? 1 : -1)) % DIMENSIONS.length
    });
  }

  render() {
    const { xAxis, yAxis } = this.state;
    const data = DATA.map(d => ({
      x: Number(d[DIMENSIONS[xAxis]]),
      y: Number(d[DIMENSIONS[yAxis]])
    }));

    return (
      <div className="centered-and-flexed">
        <div className="centered-and-flexed-controls d-flex">
          <ButtonGroup size="sm">
            <ShowcaseButton
              onClick={() => this.updateX(false)}
              buttonContent={'Prev X'}
            />
            <ShowcaseButton buttonContent={`X AXIS ${DIMENSIONS[xAxis]}`} />
            <ShowcaseButton
              onClick={() => this.updateX(true)}
              buttonContent={'Next X'}
            />
          </ButtonGroup>
          <span className="mr-auto" />
          <ButtonGroup size="sm">
            <ShowcaseButton
              onClick={() => this.updateY(false)}
              buttonContent={'Prev Y'}
            />
            <ShowcaseButton buttonContent={`Y AXIS ${DIMENSIONS[yAxis]}`} />
            <ShowcaseButton
              onClick={() => this.updateY(true)}
              buttonContent={'Next Y'}
            />
          </ButtonGroup>
        </div>
        <FlexibleWidthXYPlot
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          height={331}
        >
          <HexbinSeries
            animation
            sizeHexagonsWithCount
            className="hexbin-size-example"
            colorRange={['#f5222d', '#faad14']}
            radius={15}
            data={data}
          />
          <XAxis title={DIMENSIONS[xAxis]} style={{ strokeWidth: 0.5 }} />
          <YAxis title={DIMENSIONS[yAxis]} style={{ strokeWidth: 0.5 }} />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
