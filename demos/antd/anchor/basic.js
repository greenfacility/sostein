import { Anchor } from 'antd';

const { Link } = Anchor;

ReactDOM.render(
  <Anchor>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-fixed" title="Fixed demo" />
    <Link href="#API" title="API">
      <Link href="#Anchor-Props" title="Anchor Props" />
      <Link href="#Link-Props" title="Link Props" />
    </Link>
  </Anchor>,
  mountNode
);

export default Component;
/*
<style>
.code-box-demo .ant-affix {
  z-index: 11;
}
</style>
*/
