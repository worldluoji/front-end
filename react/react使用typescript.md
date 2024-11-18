# react使用typscript

## 1. 函数组件与 props 类型
```tsx
export type KanbanCardType = {
  title: string;
  status: string;
};
```
定义了一个KanbanCardType类型

```tsx
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

## 2. Hooks 类型
```tsx
const [showAdd, setShowAdd] = useState<boolean>(false);
const [todoList, setTodoList] = useState<Array<KanbanCardType>>([]);

const AdminContext = React.createContext<boolean>(false);
...
```

## 3. PropsWithChildren
PropsWithChildren可以让属性自带children:
```tsx
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = PropsWithChildren<{
    isVisiable: boolean;
    onClose: () => void;
}>;

const styles = StyleSheet.create({
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16
    }
});

export default function EmojiPicker({ isVisiable, children, onClose }: Props) {
    // animationType prop determines how it enters and leaves the screen. In this case, it is sliding from the bottom of the screen.
    return (
        <Modal animationType="slide" transparent={true} visible={isVisiable}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                { children }
            </View>
        </Modal>
    )
}
```