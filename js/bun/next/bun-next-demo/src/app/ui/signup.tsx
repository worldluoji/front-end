'use client'
 
import { useFormState } from 'react-dom';
import { createUser } from '../actions';
 
const initialState = {
  message: '',
}
 
export function Signup() {
  const [state, formAction] = useFormState(createUser, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      {/* <p aria-live="polite"> 中，当这段 <p> 段落内的内容发生变化时，屏幕阅读器会在合适的时间点通知用户有关的变化，而不会立即打断用户的当前活动。
      这适用于那些重要但不是特别紧急的信息更新，比如通知、状态更新等。 */}
      <p aria-live="polite">{state?.message}</p>
      <button>Sign up</button>
    </form>
  )
}