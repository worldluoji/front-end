# useFormStatus
React 19引入的hook，用于获取表单的状态。
```jsx
import {useFormStatus} from 'react-dom';

function DesignButton() {
  const {pending} = useFormStatus();
  return <button type="submit" disabled={pending} />
}
```
useFormStatus reads the status of the parent `<form>` as if the form was a Context provider.

## reference
https://react.dev/reference/react-dom/hooks/useFormStatus