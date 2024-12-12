# useOptimistic
React19引入的hook，用于在更新数据时，显示 optimisticName，而不是当前值。

The useOptimistic hook will immediately render the optimisticName while the updateName request is in progress. When the update finishes or errors, React will automatically switch back to the currentName value.
```jsx
function ChangeName({currentName, onUpdateName}) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async formData => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    const updatedName = await updateName(newName);
    onUpdateName(updatedName);
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
    </form>
  );
}
```