# react使用typscript

## 1. 函数组件与 props 类型
```
export type KanbanCardType = {
  title: string;
  status: string;
};
```
定义了一个KanbanCardType类型

```
import { KanbanCardType } from './types/KanbanCard.types';
// ...
type KanbanColumnProps = {
  bgColor: string;
  canAddNew?: boolean;
  cardList?: Array<KanbanCardType>;
  onAdd?: (newCard: KanbanCardType) => void;
  onDrop?: React.DragEventHandler<HTMLElement>;
  onRemove?: (cardToDel: KanbanCardType) => void;
  setDraggedItem?: (card: KanbanCardType) => void;
  setIsDragSource?: (isDragSource: boolean) => void;
  setIsDragTarget?: (isDragTarget: boolean) => void;
  title: string;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  bgColor,
  canAddNew = false,
  cardList = [],
  onAdd,
  onDrop,
  onRemove,
  setDraggedItem,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
  title
}) => {
  // ...
};

export default KanbanColumn;
```
React.FC ，FC 后面的 `<KanbanColumnProps>` 是代表 props 类型的范型，
这里`React.FC<KanbanColumnProps>`就表示这个变量是一个输入为 KanbanColumnProps 类型、输出为 React 元素的函数组件。
(React.FC是函数式组件，是在TypeScript使用的一个泛型，FC就是FunctionComponent的缩写，事实上React.FC可以写成React.FunctionComponent)

## Hooks 类型
```
const [showAdd, setShowAdd] = useState<boolean>(false);
const [todoList, setTodoList] = useState<Array<KanbanCardType>>([]);

const AdminContext = React.createContext<boolean>(false);
...
```

## ts中type和interface的区别
1. type 可以作为联合 Union 类型的别名，但 interface 不可以
```
type Pet = Cat | Dog; // 可以
interface IPet extends Cat | Dog {} // 不可以，会抛错
```

2. interface 可以重复声明（Redeclaration），但 type 不可以
```
interface ICat {
  age: number
}
interface ICat {
  color: string
} // 可以，会合并
const cat: ICat = { age: 4, color: 'silver shaded' };

type Cat = { age: number };
type Cat = { color: string }; // 不可以，会抛错
```
越是希望组件的设计开发更封闭一些，越倾向于用 type ，越是认为组件需要更开放更灵活，越倾向于 interface。