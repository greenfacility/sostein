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
  Borders,
  ContourSeries,
  MarkSeriesCanvas,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';

import { Button } from 'antd';
import { Component } from 'react';
import DATA from '../datasets/old-faithful.json';
import NoSSR from 'react-no-ssr';
import { RefreshCcw } from 'react-feather';
import ShowcaseButton from '../showcase-components/showcase-button';

const ButtonGroup = Button.Group;

function updateData() {
  return DATA.map(row => ({
    waiting: row.waiting + (Math.random() - 0.5) * 10,
    eruptions: row.eruptions + (Math.random() - 0.5) * 2
  }));
}
export default class ContourSeriesExample extends Component {
  state = {
    data: DATA
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <NoSSR>
          <ButtonGroup size="sm">
            <ShowcaseButton
              onClick={() => this.setState({ data: updateData() })}
              buttonContent={<RefreshCcw size={14} strokeWidth={1} />}
            />
          </ButtonGroup>
          <XYPlot
            xDomain={[40, 100]}
            yDomain={[1.5, 8]}
            width={600}
            getX={d => d.waiting}
            getY={d => d.eruptions}
            height={276}
          >
            <ContourSeries
              animation
              className="contour-series-example"
              style={{
                stroke: '#125C77',
                strokeLinejoin: 'round'
              }}
              colorRange={['#007bff', '#52c41a']}
              data={data}
            />
            <MarkSeriesCanvas
              animation
              data={data}
              size={1}
              color={'#125C77'}
            />
            <Borders style={{ all: { fill: '#fff' } }} />
            <XAxis style={{ strokeWidth: 0.5 }} />
            <YAxis style={{ strokeWidth: 0.5 }} />
          </XYPlot>
        </NoSSR>
      </div>
    );
  }
}
