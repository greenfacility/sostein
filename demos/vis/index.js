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
  CategoryColorAtMarkLevel,
  CategoryColorAtMarkLevelCustomPalette,
  CategoryColorAtMarkLevelFixedStroke,
  CategoryColorAtSeriesLevel,
  ColorInXYPlot,
  ColorSpecificity,
  Continuous,
  CustomPalette,
  GradientCharts,
  LineSeriesMarkSeries,
  LinearColorAtMarkLevel,
  LinearColorAtMarkLevelNoPalette,
  LinearColorAtSeriesLevel,
  LiteralColorAtMarkLevel,
  LiteralColorAtSeriesLevel,
  ReactVis20,
  ReactVis5,
  SensibleDefaults
} from './color/mini-color-examples';
import {
  LineChartMouseOverSeries,
  LineChartMouseOverXY,
  LinkedCharts,
  ScatterPlotOnNearestXY
} from './interaction/interaction-examples';

import AnimatedParallelCoordinates from './parallel-coordinates/animated-parallel-coordinates';
import AnimatedRadarChart from './radar-chart/animated-radar-chart';
import AnimatedSunburst from './sunbursts/animated-sunburst';
import AnimationExample from './misc/animation-example';
import ArcSeriesExample from './radial-chart/arc-series-example';
import AreaChart from './plot/area-chart';
import AreaChartElevated from './plot/area-chart-elevated';
import AxisOn0 from './axes/axis-on-0';
import AxisWithTurnedLabels from './plot/axis-with-turned-labels';
import BarChart from './plot/bar-chart';
import BasicParallelCoordinates from './parallel-coordinates/basic-parallel-coordinates';
import BasicRadarChart from './radar-chart/basic-radar-chart';
import BasicSankey from './sankey/basic';
import BasicSankeyExample from './sankey/basic';
import BasicSunburst from './sunbursts/basic-sunburst';
import BidirectionDragChart from './misc/2d-dragable-plot';
import BigBaseBarChart from './plot/big-base-bar-chart';
import BrushedParallelCoordinates from './parallel-coordinates/brushed-parallel-coordinates';
import ClockExample from './sunbursts/clock-example';
import ClusteredStackedVerticalBarChart from './plot/clustered-stacked-bar-chart';
import ComplexChart from './plot/complex-chart';
import ContinuousColorLegendExample from './legends/continuous-color';
import ContinuousSizeLegendExample from './legends/continuous-size';
import ContourSeriesExample from './plot/contour-series-example';
import CustomAxes from './axes/custom-axes';
import CustomAxesOrientation from './axes/custom-axes-orientation';
import CustomAxisChart from './axes/custom-axis';
import CustomAxisTickElement from './axes/custom-axis-tick-element';
import CustomAxisTickFormat from './axes/custom-axis-tick-format';
import CustomRadiusRadialChart from './radial-chart/custom-radius-radial-chart';
import CustomSVGAllTheMarks from './plot/custom-svg-all-the-marks';
import CustomSVGExample from './plot/custom-svg-example';
import CustomSVGRootLevel from './plot/custom-svg-root-level';
import CustomScales from './plot/custom-scales';
import DecorativeAxisCrissCross from './axes/decorative-axes-criss-cross';
import DifferenceChart from './plot/difference-chart';
import DonutChartExample from './radial-chart/donut-chart';
import DragableChartExample from './misc/dragable-chart-example';
import DynamicComplexEdgeHints from './axes/dynamic-complex-edge-hints';
import DynamicCrosshair from './axes/dynamic-crosshair';
import DynamicCrosshairScatterplot from './axes/dynamic-crosshair-scatterplot';
import DynamicHints from './axes/dynamic-hints';
import DynamicProgrammaticRightEdgeHints from './axes/dynamic-programmatic-rightedge-hints';
import DynamicSimpleEdgeHints from './axes/dynamic-simple-edge-hints';
import DynamicSimpleTopEdgeHints from './axes/dynamic-simple-topedge-hints';
import EmptyChart from './axes/empty-chart';
import EnergySankey from './sankey/energy-sankey';
import EnergySankeyExample from './sankey/energy-sankey';
import FauxScatterplotChart from './plot/faux-radial-scatterplot';
import { FlexibleCharts } from './flexible/flexible-examples';
import FourQuadrantRadarChart from './radar-chart/four-quadrant-radar-chart';
import GradientExample from './misc/gradient-example';
import GradientPie from './radial-chart/gradient-pie';
import GridLinesChart from './plot/grid';
import HeatmapChart from './plot/heatmap-chart';
import HexHeatmap from './plot/hex-heatmap';
import HexbinSizeExample from './plot/hexbin-size-example';
import Histogram from './plot/histogram';
import HorizontalDiscreteColorLegendExample from './legends/horizontal-discrete-color';
import HorizontalDiscreteCustomPalette from './legends/horizontal-discrete-custom-palette';
import LabelSeriesExample from './misc/label-series-example';
import LabeledHeatmap from './plot/labeled-heatmap';
import LineChart from './plot/line-chart';
import LineChartCanvas from './plot/line-chart-canvas';
import LineChartManyColors from './color/line-chart-many-colors';
import LineChartWithStyle from './plot/line-chart-with-style';
import LineMarkChart from './plot/linemark-chart';
import LineSeriesCanvasNearestXYExample from './plot/line-series-canvas-nearest-xy-example';
import LinkEventSankeyExample from './sankey/link-event';
import LinkHintSankeyExample from './sankey/link-hint';
import { MiniCharts } from './data/mini-data-examples';
import MixedStackedChart from './plot/mixed-stacked-chart';
import NullDataExample from './misc/null-data-example';
import PaddedAxis from './axes/padded-axis';
import ParallelCoordinatesExample from './axes/parallel-coordinates-example';
import RadarChartSeriesTooltips from './radar-chart/radar-chart-series-tooltips';
import RadarChartWithTooltips from './radar-chart/radar-chart-with-tooltips';
import ScatterplotCanvas from './plot/scatterplot-canvas';
import ScatterplotChart from './plot/scatterplot';
import SearchableDiscreteColorLegendExample from './legends/searchable-discrete-color';
import SelectionPlotExample from './misc/selection-plot-example';
import SimpleRadialChart from './radial-chart/simple-radial-chart';
import SimpleTreemap from './treemap/simple-treemap';
import StackedHistogram from './plot/stacked-histogram';
import StackedHorizontalBarChart from './plot/stacked-horizontal-bar-chart';
import StackedVerticalBarChart from './plot/stacked-vertical-bar-chart';
import StaticCrosshair from './axes/static-crosshair';
import StaticHints from './axes/static-hints';
import SunburstWithTooltips from './sunbursts/sunburst-with-tooltips';
import SyncedCharts from './misc/synced-charts';
import TimeChart from './misc/time-chart';
import TreemapExample from './treemap/dynamic-treemap';
import TriangleExample from './misc/triangle-example';
import VerticalDiscreteColorLegendExample from './legends/vertical-discrete-color';
import VornoiSankey from './sankey/voronoi';
import VoronoiLineChart from './misc/voronoi-line-chart';
import VoronoiSankeyExample from './sankey/voronoi';
import WhiskerChart from './plot/whisker-chart.js';
import WidthHeightMarginChart from './plot/width-height-margin';
import ZoomableChartExample from './misc/zoomable-chart-example';
import sourceLinker from './showcase-components/source-linker';

const mainShowCase = {
  AxisOn0,
  ComplexChart,
  LineChart,
  LineChartManyColors,
  LineChartCanvas,
  LineChartWithStyle,
  LineMarkChart,
  LineSeriesCanvasNearestXYExample,
  BarChart,
  BigBaseBarChart,
  DifferenceChart,
  StackedVerticalBarChart,
  MixedStackedChart,
  StackedHorizontalBarChart,
  ClusteredStackedVerticalBarChart,
  StackedHistogram,
  Histogram,
  AnimationExample,
  AreaChart,
  AreaChartElevated,
  FauxScatterplotChart,
  CustomSVGExample,
  CustomSVGRootLevel,
  CustomSVGAllTheMarks,
  ScatterplotChart,
  ScatterplotCanvas,
  WhiskerChart,
  HeatmapChart,
  HexHeatmap,
  HexbinSizeExample,
  LabeledHeatmap,
  ContourSeriesExample,
  WidthHeightMarginChart,
  CustomScales,
  CustomAxesOrientation,
  CustomAxisChart,
  CustomAxisTickFormat,
  CustomAxisTickElement,
  AxisWithTurnedLabels,
  GridLinesChart,
  StaticHints,
  DecorativeAxisCrissCross,
  DynamicHints,
  DynamicComplexEdgeHints,
  DynamicSimpleEdgeHints,
  DynamicSimpleTopEdgeHints,
  DynamicProgrammaticRightEdgeHints,
  EmptyChart,
  StaticCrosshair,
  DynamicCrosshair,
  DynamicCrosshairScatterplot,
  PaddedAxis,
  ParallelCoordinatesExample,
  SyncedCharts,
  TimeChart,
  TriangleExample,
  VoronoiLineChart,
  CustomAxes,
  LabelSeriesExample,
  GradientExample,
  NullDataExample,
  ZoomableChartExample,
  SelectionPlotExample,
  DragableChartExample,
  BidirectionDragChart,

  SensibleDefaults,
  ColorInXYPlot,
  ColorSpecificity,
  CategoryColorAtMarkLevel,
  CategoryColorAtMarkLevelCustomPalette,
  CategoryColorAtMarkLevelFixedStroke,
  GradientCharts,
  LinearColorAtMarkLevel,
  LinearColorAtMarkLevelNoPalette,
  LineSeriesMarkSeries,
  LiteralColorAtMarkLevel,
  CategoryColorAtSeriesLevel,
  LinearColorAtSeriesLevel,
  LiteralColorAtSeriesLevel,
  ReactVis5,
  ReactVis20,
  Continuous,
  CustomPalette,

  MiniCharts,

  FlexibleCharts,

  LineChartMouseOverSeries,
  LineChartMouseOverXY,
  LinkedCharts,
  ScatterPlotOnNearestXY,

  SimpleTreemap,
  TreemapExample,

  AnimatedSunburst,
  BasicSunburst,
  ClockExample,
  SunburstWithTooltips,

  SimpleRadialChart,
  DonutChartExample,
  CustomRadiusRadialChart,
  GradientPie,
  ArcSeriesExample,

  AnimatedRadarChart,
  BasicRadarChart,
  FourQuadrantRadarChart,
  RadarChartWithTooltips,
  RadarChartSeriesTooltips,

  BasicParallelCoordinates,
  AnimatedParallelCoordinates,
  BrushedParallelCoordinates,

  BasicSankeyExample,
  VoronoiSankeyExample,
  EnergySankeyExample,
  LinkEventSankeyExample,
  LinkHintSankeyExample,

  VerticalDiscreteColorLegendExample,
  HorizontalDiscreteColorLegendExample,
  HorizontalDiscreteCustomPalette,
  SearchableDiscreteColorLegendExample,
  ContinuousColorLegendExample,
  ContinuousSizeLegendExample,

  EnergySankey,
  BasicSankey,
  VornoiSankey
};

const showCaseWithLinks = Object.keys(mainShowCase).reduce(
  (acc, showCaseExample) => {
    acc[`${showCaseExample}WithLink`] = sourceLinker(
      mainShowCase[showCaseExample]
    );
    return acc;
  },
  {}
);

export const showCase = { ...mainShowCase, ...showCaseWithLinks };
