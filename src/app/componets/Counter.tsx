"use client";

// components/Counter.tsx
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { increment, decrement, setValue } from "../storeApp/Slice/counterSlice";

const Counter = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counter.value);

  const customerSupport = useAppSelector((state) => state.customerSupport);

  console.log("customer support", customerSupport);

  return (
    <div>
      <h1>Counter: {counterValue}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(setValue(0))}>Reset</button>
    </div>
  );
};

export default Counter;
