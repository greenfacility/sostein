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
  AreaSeries,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  LineMarkSeries,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

export default function AreaChartElevated(props) {
  return (
    <FlexibleWidthXYPlot height={300}>
      <VerticalGridLines style={{ strokeWidth: 0.5 }} />
      <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
      <XAxis style={{ strokeWidth: 0.5 }} />
      <YAxis style={{ strokeWidth: 0.5 }} />
      <AreaSeries
        className="area-elevated-series-1"
        color="#007bff"
        data={[
          { x: 1, y: 10, y0: 1 },
          { x: 2, y: 25, y0: 5 },
          { x: 3, y: 15, y0: 3 }
        ]}
      />
      <AreaSeries
        className="area-elevated-series-2"
        color="#52c41a"
        data={[
          { x: 1, y: 5, y0: 6 },
          { x: 2, y: 20, y0: 11 },
          { x: 3, y: 10, y0: 9 }
        ]}
      />
      <LineMarkSeries
        className="area-elevated-line-series"
        color="#f5222d"
        data={[{ x: 1, y: 5.5 }, { x: 2, y: 15 }, { x: 3, y: 9 }]}
      />
    </FlexibleWidthXYPlot>
  );
}
