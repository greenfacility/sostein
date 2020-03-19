import { Row } from 'antd';
import { fullMapSection } from '../showcase-components/showcase-utils';
import { showCase } from '../index';

const { SimpleTreemap, TreemapExample } = showCase;

const TREEMAPS = [
  {
    name: 'Simple Treemap',
    component: SimpleTreemap,
    componentName: 'SimpleTreemap',
    docsLink:
      'http://uber.github.io/react-vis/documentation/other-charts/treemap',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/treemap/index.js'
  },
  {
    name: 'Animated Treemap',
    component: TreemapExample,
    componentName: 'TreemapExample'
  }
];

function TreemapShowcase(props) {
  return (
    <article id="treemaps">
      <Row type="flex" align="top" gutter={16}>
        {TREEMAPS.map(fullMapSection)}
      </Row>
    </article>
  );
}

export default TreemapShowcase;
