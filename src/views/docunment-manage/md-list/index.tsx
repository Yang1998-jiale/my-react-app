import { useState } from "react";

export default function Index() {
  const [state, setState] = useState({
    message: "index",
    count: 1,
  });
  return (
    <>
      <div
        className="w-100% h-100% cursor-pointer"
        onClick={() => setState({ ...state, count: state.count + 1 })}
      >
        {state.message + state.count}
      </div>
    </>
  );
}
