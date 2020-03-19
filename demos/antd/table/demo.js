import { Card, Divider } from 'antd';

import Ajax from './ajax';
import Basic from './basic';
import Bordered from './bordered';
import ColSpan from './colspan-rowspan';
import Custom from './custom-filter-panel';
//import Drag from './drag-sorting';
import Dynamic from './dynamic-settings';
import EditCell from './edit-cell';
import EditRow from './edit-row';
import Expand from './expand';
import ExpandChildren from './expand-children';
import FixedColumns from './fixed-columns';
import FixedColumnsHeader from './fixed-columns-header';
import FixedHeader from './fixed-header';
import GroupinColumns from './grouping-columns';
import Head from './head';
import Jsx from './jsx';
import NestedTabled from './nested-table';
import Reset from './reset-filter';
import Resizable from './resizable-column';
import RowSelection from './row-selection';
import RowSelectionCustom from './row-selection-custom';
import RowSelectionOperation from './row-selection-and-operation';
import Size from './size';

class Demo extends React.Component {
  render() {
    return (
      <Card bodyStyle={{ padding: 0 }} id="components-button-demo">
        <Divider orientation="left">
          <small>Basic</small>
        </Divider>
        <div className="p-4">
          <Basic />
        </div>

        <Divider orientation="left">
          <small>Ajax</small>
        </Divider>
        <div className="p-4">
          <Ajax />
        </div>

        <Divider orientation="left">
          <small>Bordered</small>
        </Divider>
        <div className="p-4">
          <Bordered />
        </div>

        <Divider orientation="left">
          <small>Colspan rowspan</small>
        </Divider>
        <div className="p-4">
          <ColSpan />
        </div>

        <Divider orientation="left">
          <small>Custom filter panel</small>
        </Divider>
        <div className="p-4">
          <Custom />
        </div>

        {/*<Divider orientation="left"><small>Drag sorting</small></Divider>
          <div className="p-4">
            <Drag />
          </div>*/}

        <Divider orientation="left">
          <small>Dyanmic settings</small>
        </Divider>
        <div className="p-4">
          <Dynamic />
        </div>

        <Divider orientation="left">
          <small>Edit cell</small>
        </Divider>
        <div className="p-4">
          <EditCell />
        </div>

        <Divider orientation="left">
          <small>BasiEDit rowc</small>
        </Divider>
        <div className="p-4">
          <EditRow />
        </div>

        <Divider orientation="left">
          <small>Expand children</small>
        </Divider>
        <div className="p-4">
          <ExpandChildren />
        </div>

        <Divider orientation="left">
          <small>Expand</small>
        </Divider>
        <div className="p-4">
          <Expand />
        </div>

        <Divider orientation="left">
          <small>Fixed columns header</small>
        </Divider>
        <div className="p-4">
          <FixedColumnsHeader />
        </div>

        <Divider orientation="left">
          <small>Fixed columns</small>
        </Divider>
        <div className="p-4">
          <FixedColumns />
        </div>

        <Divider orientation="left">
          <small>Fixed header</small>
        </Divider>
        <div className="p-4">
          <FixedHeader />
        </div>

        <Divider orientation="left">
          <small>Grouping columns</small>
        </Divider>
        <div className="p-4">
          <GroupinColumns />
        </div>

        <Divider orientation="left">
          <small>Head</small>
        </Divider>
        <div className="p-4">
          <Head />
        </div>

        <Divider orientation="left">
          <small>Jsx</small>
        </Divider>
        <div className="p-4">
          <Jsx />
        </div>

        <Divider orientation="left">
          <small>Nested table</small>
        </Divider>
        <div className="p-4">
          <NestedTabled />
        </div>

        <Divider orientation="left">
          <small>Reset filter</small>
        </Divider>
        <div className="p-4">
          <Reset />
        </div>

        <Divider orientation="left">
          <small>Resizable column</small>
        </Divider>
        <div className="p-4">
          <Resizable />
        </div>

        <Divider orientation="left">
          <small>Row selection and opration</small>
        </Divider>
        <div className="p-4">
          <RowSelectionOperation />
        </div>

        <Divider orientation="left">
          <small>Row selection custom</small>
        </Divider>
        <div className="p-4">
          <RowSelectionCustom />
        </div>

        <Divider orientation="left">
          <small>Row selection</small>
        </Divider>
        <div className="p-4">
          <RowSelection />
        </div>

        <Divider orientation="left">
          <small>Size</small>
        </Divider>
        <div className="p-4">
          <Size />
        </div>
      </Card>
    );
  }
}

export default Demo;
