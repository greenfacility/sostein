import {
  fullMapSection,
  mapSection
} from '../showcase-components/showcase-utils';

import { Row } from 'antd';
import { showCase } from '../index';

const {
  BasicSankeyExample,
  VoronoiSankeyExample,
  EnergySankeyExample,
  LinkEventSankeyExample,
  LinkHintSankeyExample
} = showCase;

const SANKEYS = [
  {
    name: 'Basic',
    component: BasicSankeyExample,
    componentName: 'BasicSankeyExample',
    docsLink:
      'http://uber.github.io/react-vis/documentation/other-charts/sankey-diagram',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/sankey/index.js'
  },
  {
    name: 'With Voronoi Selection',
    component: VoronoiSankeyExample,
    componentName: 'VoronoiSankeyExample'
  },
  {
    name: 'With link selection',
    component: LinkEventSankeyExample,
    componentName: 'LinkEventSankeyExample'
  },
  {
    name: 'With hint (for links)',
    component: LinkHintSankeyExample,
    componentName: 'LinkHintSankeyExample'
  }
];

const SANKEYS2 = [
  {
    name: 'Energy Example',
    component: EnergySankeyExample,
    componentName: 'EnergySankeyExample'
  }
];

function SankeysSection(props) {
  return (
    <article id="sankeys">
      <Row type="flex" align="top" gutter={16}>
        {SANKEYS.map(mapSection)}
      </Row>

      <Row type="flex" align="top" gutter={16}>
        {SANKEYS2.map(fullMapSection)}
      </Row>
    </article>
  );
}

export default SankeysSection;
