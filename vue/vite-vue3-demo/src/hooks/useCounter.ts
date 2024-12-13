import { ref } from 'vue';
export default function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const increment = () => {
    count.value++;
  };

  return { count, increment };
}
