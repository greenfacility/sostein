// Copyright (c) 2016 Uber Technologies, Inc.
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
  Crosshair,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  LineMarkSeries,
  LineMarkSeriesCanvas,
  LineSeries,
  LineSeriesCanvas,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

import { Button } from 'antd';
import NoSSR from 'react-no-ssr';
import ShowcaseButton from '../showcase-components/showcase-button';

const ButtonGroup = Button.Group;

function getRandomData() {
  return new Array(100).fill(0).map((row, i) => ({
    x: i,
    y: Math.random() * 20,
    color: Math.random() * 10
  }));
}

const randomData = getRandomData();

const colorRanges = {
  typeA: ['#007bff', '#52c41a'],
  typeB: ['#faad14', '#f5222d']
};

const nextType = {
  typeA: 'typeB',
  typeB: 'typeA'
};

const nextModeContent = {
  canvas: 'Switch to SVG',
  svg: 'Switch to canvas'
};

const drawModes = ['canvas', 'svg'];

export default class Example extends React.Component {
  state = {
    drawMode: 1,
    data: randomData,
    colorType: 'typeA',
    strokeWidth: 1,
    showMarks: false,
    value: false,
    hideComponent: false
  };

  render() {
    const {
      colorType,
      drawMode,
      data,
      hideComponent,
      strokeWidth,
      showMarks,
      value
    } = this.state;
    const lineSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      color: colorType === 'typeA' ? '#007bff' : '#f5222d',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      strokeWidth,
      data,
      onNearestX: d => this.setState({ value: d })
    };
    const SVGComponent = showMarks ? LineMarkSeries : LineSeries;
    const CanvasComponent = showMarks ? LineMarkSeriesCanvas : LineSeriesCanvas;

    const mode = drawModes[drawMode];
    return (
      <div className="canvas-wrapper">
        <ButtonGroup size="sm">
          <ShowcaseButton
            onClick={() => this.setState({ drawMode: (drawMode + 1) % 2 })}
            buttonContent={nextModeContent[mode]}
          />
          <ShowcaseButton
            onClick={() => this.setState({ showMarks: !showMarks })}
            buttonContent={showMarks ? 'Hide marks' : 'Show marks'}
          />
          <ShowcaseButton
            onClick={() => this.setState({ data: getRandomData() })}
            buttonContent={'Update data'}
          />
          <ShowcaseButton
            onClick={() => this.setState({ colorType: nextType[colorType] })}
            buttonContent={`Toggle color to ${nextType[colorType]}`}
          />
          <ShowcaseButton
            onClick={() =>
              this.setState({ strokeWidth: strokeWidth === 1 ? 2 : 1 })
            }
            buttonContent={'Toggle strokewidth'}
          />
          <ShowcaseButton
            onClick={() => this.setState({ hideComponent: !hideComponent })}
            buttonContent={hideComponent ? 'SHow' : 'Hide'}
          />
        </ButtonGroup>
        {!hideComponent && (
          <NoSSR>
            <FlexibleWidthXYPlot
              onMouseLeave={() => this.setState({ value: false })}
              height={276}
            >
              <VerticalGridLines style={{ strokeWidth: 0.5 }} />
              <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
              <XAxis style={{ strokeWidth: 0.5 }} />
              <YAxis style={{ strokeWidth: 0.5 }} />
              {mode === 'canvas' && <CanvasComponent {...lineSeriesProps} />}
              {mode === 'svg' && <SVGComponent {...lineSeriesProps} />}
              {value && <Crosshair values={[value]} />}
            </FlexibleWidthXYPlot>
          </NoSSR>
        )}
      </div>
    );
  }
}
