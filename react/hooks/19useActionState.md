# useActionState
React 19引入

```ts
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

## what is action
By convention, functions that use async transitions are called “Actions”. 
Actions automatically manage submitting data for you:

- Pending state: Actions provide a pending state that starts at the beginning of a request and automatically resets when the final state update is committed.
- Optimistic updates: Actions support the new useOptimistic hook so you can show users instant feedback while the requests are submitting.
- Error handling: Actions provide error handling so you can display Error Boundaries when a request fails, and revert optimistic updates to their original value automatically.
- Forms: `<form>` elements now support passing functions to the action and formAction props. Passing functions to the action props use Actions by default and reset the form automatically after submission.

## useActionState使用
```jsx
// Using <form> Actions and useActionState
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      redirect("/path");
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Update</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

## reference
https://react.dev/blog/2024/12/05/react-19