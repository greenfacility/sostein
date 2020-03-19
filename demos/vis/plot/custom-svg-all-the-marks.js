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
  CustomSVGSeries,
  FlexibleWidthXYPlot,
  Hint,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

import { Button } from 'antd';
import ShowcaseButton from '../showcase-components/showcase-button';

const ButtonGroup = Button.Group;

function generateData(reversed) {
  return ['star', 'square', 'circle', 'diamond'].reduce((
    acc,
    row,
    rowIndex
  ) => {
    const cellsInRow = [...new Array(5)].map((cell, index) => {
      return {
        x: index,
        y: reversed ? (5 - rowIndex) * 5 : rowIndex * 5,
        size: (index + 1) * 3,
        customComponent: row
      };
    });

    return acc.concat(cellsInRow);
  }, []);
}

const DATA = generateData(false);
const REVERSED_DATA = generateData(true);

const tipStyle = {
  display: 'flex',
  color: '#fff',
  background: '#000',
  alignItems: 'center',
  padding: '5px'
};

export default class Example extends React.Component {
  state = {
    reverse: false
  };
  render() {
    const { reverse, hoveredCell } = this.state;

    return (
      <div>
        <ButtonGroup size="sm">
          <ShowcaseButton
            buttonContent="Reverse"
            onClick={() => this.setState({ reverse: !reverse })}
          />
        </ButtonGroup>
        <FlexibleWidthXYPlot margin={50} height={276}>
          <VerticalGridLines style={{ strokeWidth: 0.5 }} />
          <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
          <XAxis style={{ strokeWidth: 0.5 }} />
          <YAxis style={{ strokeWidth: 0.5 }} />
          <CustomSVGSeries
            animation
            style={{ stroke: '#f5222d', fill: '#007bff' }}
            data={reverse ? REVERSED_DATA : DATA}
            onValueMouseOver={v => {
              this.setState({ hoveredCell: v });
            }}
            onValueMouseOut={v => this.setState({ hoveredCell: false })}
          />
          {hoveredCell && (
            <Hint value={hoveredCell}>
              <div style={tipStyle}>{hoveredCell.customComponent}</div>
            </Hint>
          )}
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
