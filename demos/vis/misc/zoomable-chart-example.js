// Copyright (c) 2017 Uber Technologies, Inc.
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
  Highlight,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis
} from 'react-vis';

import ShowcaseButton from '../showcase-components/showcase-button';
import { generateSeededRandom } from '../showcase-utils';

const seededRandom = generateSeededRandom(9);
const totalValues = 100;

/**
 * Get the array of x and y pairs.
 * The function tries to avoid too large changes of the chart.
 * @param {number} total Total number of values.
 * @returns {Array} Array of data.
 * @private
 */
function getRandomSeriesData(total) {
  const result = [];
  let lastY = seededRandom() * 40 - 20;
  let y;
  const firstY = lastY;
  for (let i = 0; i < total; i++) {
    y = seededRandom() * firstY - firstY / 2 + lastY;
    result.push({
      x: i,
      y
    });
    lastY = y;
  }
  return result;
}

export default class ZoomableChartExample extends React.Component {
  state = {
    lastDrawLocation: null,
    series: [
      {
        data: getRandomSeriesData(totalValues),
        disabled: false,
        title: 'Apples'
      },
      {
        data: getRandomSeriesData(totalValues),
        disabled: false,
        title: 'Bananas'
      }
    ]
  };

  render() {
    const { series, lastDrawLocation } = this.state;
    return (
      <div>
        <div>
          <FlexibleWidthXYPlot
            animation
            xDomain={
              lastDrawLocation && [
                lastDrawLocation.left,
                lastDrawLocation.right
              ]
            }
            yDomain={
              lastDrawLocation && [
                lastDrawLocation.bottom,
                lastDrawLocation.top
              ]
            }
            height={311}
          >
            <HorizontalGridLines />

            <YAxis />
            <XAxis />

            {series.map((entry, i) => (
              <LineSeries
                key={entry.title}
                data={entry.data}
                color={`${i === 0 ? '#007bff' : '#52c41a'}`}
              />
            ))}

            <Highlight
              onBrushEnd={area => this.setState({ lastDrawLocation: area })}
              onDrag={area => {
                this.setState({
                  lastDrawLocation: {
                    bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                    left: lastDrawLocation.left - (area.right - area.left),
                    right: lastDrawLocation.right - (area.right - area.left),
                    top: lastDrawLocation.top + (area.top - area.bottom)
                  }
                });
              }}
            />
          </FlexibleWidthXYPlot>
        </div>

        <ShowcaseButton
          buttonContent={'Reset zoom'}
          onClick={() => this.setState({ lastDrawLocation: null })}
        />
      </div>
    );
  }
}
