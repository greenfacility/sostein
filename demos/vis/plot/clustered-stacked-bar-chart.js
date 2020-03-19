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
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

export default class Example extends React.Component {
  state = {
    useCanvas: false
  };
  render() {
    const { useCanvas } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

    return (
      <FlexibleWidthXYPlot
        className="clustered-stacked-bar-chart-example"
        xType="ordinal"
        stackBy="y"
        height={300}
      >
        <DiscreteColorLegend
          style={{ position: 'absolute', left: '50px', top: '10px' }}
          orientation="horizontal"
          items={[
            {
              title: 'Apples',
              color: '#007bff'
            },
            {
              title: 'Oranges',
              color: '#52c41a'
            }
          ]}
        />
        <VerticalGridLines style={{ strokeWidth: 0.5 }} />
        <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
        <XAxis style={{ strokeWidth: 0.5 }} />
        <YAxis style={{ strokeWidth: 0.5 }} />
        <BarSeries
          cluster="2015"
          color="#007bff"
          data={[
            { x: 'Q1', y: 10 },
            { x: 'Q2', y: 5 },
            { x: 'Q3', y: 15 },
            { x: 'Q4', y: 20 }
          ]}
        />
        <BarSeries
          cluster="2015"
          color="#52c41a"
          data={[
            { x: 'Q1', y: 3 },
            { x: 'Q2', y: 7 },
            { x: 'Q3', y: 2 },
            { x: 'Q4', y: 1 }
          ]}
        />
        <BarSeries
          cluster="2016"
          color="#f5222d"
          data={[
            { x: 'Q1', y: 3 },
            { x: 'Q2', y: 8 },
            { x: 'Q3', y: 11 },
            { x: 'Q4', y: 19 }
          ]}
        />
        <BarSeries
          cluster="2016"
          color="#faad14"
          data={[
            { x: 'Q1', y: 22 },
            { x: 'Q2', y: 2 },
            { x: 'Q3', y: 22 },
            { x: 'Q4', y: 18 }
          ]}
        />
      </FlexibleWidthXYPlot>
    );
  }
}
