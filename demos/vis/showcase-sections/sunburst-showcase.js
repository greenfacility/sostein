import { Row } from 'antd';
import { mapSection } from '../showcase-components/showcase-utils';
import { showCase } from '../index';

const {
  AnimatedSunburst,
  ArcSeriesExample,
  BasicSunburst,
  ClockExample,
  SunburstWithTooltips
} = showCase;

const SUNBURSTS = [
  {
    name: 'Arc Series Example',
    component: ArcSeriesExample,
    componentName: 'ArcSeriesExample',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/arc-series',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/arc-series.js'
  },
  {
    name: 'Basic Sunburst',
    component: BasicSunburst,
    componentName: 'BasicSunburst',
    docsLink:
      'http://uber.github.io/react-vis/documentation/other-charts/sunburst-diagram',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/sunburst/index.js'
  },
  {
    name: 'Clock',
    component: ClockExample,
    componentName: 'ClockExample'
  },
  {
    name: 'Animated Sunburst',
    component: AnimatedSunburst,
    componentName: 'AnimatedSunburst'
  },
  {
    name: 'Sunburst with tooltips',
    component: SunburstWithTooltips,
    componentName: 'SunburstWithTooltips'
  }
];

function SunburstSection(props) {
  return (
    <article id="sunbursts">
      <Row type="flex" align="top" gutter={16}>
        {SUNBURSTS.map(mapSection)}
      </Row>
    </article>
  );
}

export default SunburstSection;
