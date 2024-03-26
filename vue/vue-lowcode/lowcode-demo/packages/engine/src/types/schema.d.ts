
// 为了全面覆盖CSS样式，可以考虑使用社区提供的如csstype这样的库，它提供了完整的CSS-in-JS样式类型定义。
import * as CSS from 'csstype';
interface CssProps extends CSS.Properties<number | string> {}

interface Props {
  [propName: string]: any
}

interface INode {
  type: {
    resolvedName: string;
  };
  css: CssProps;
  props: Props;
  displayName: string;
  custom?: {};
  hidden?: boolean;
  nodes?: string[];
  linkedNodes?: {};
};

type IHTMLBody = Record<string, INode>;

interface ISchema {
  version: string;
  librarys: [];
  i18n: {
    zh: {};
    eu: {};
  };
  store: {};
  dataSource: {};
  lifeCycles: {};
  htmlBody: IHTMLBody;
}