import { Icon, Tree } from 'antd';

const TreeNode = Tree.TreeNode;

class Demo extends React.Component {
  render() {
    return (
      <Tree showIcon defaultExpandAll defaultSelectedKeys={['0-0-0']}>
        <TreeNode icon={<Icon type="smile-o" />} title="parent 1" key="0-0">
          <TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-0" />
          <TreeNode
            icon={({ selected }) => (
              <Icon type={selected ? 'frown' : 'frown-o'} />
            )}
            title="leaf"
            key="0-0-1"
          />
        </TreeNode>
      </Tree>
    );
  }
}

export default Demo;
