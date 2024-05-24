import { useState, forwardRef, useImperativeHandle } from "react";
import CbessBoard from "@/components/ChessBoard/index";
const PositionList = [
  {
    label: "站位一",
    value: 0,
  },
  {
    label: "站位二",
    value: 1,
  },
];
function FinalPosition(_props, parentRef) {
  const [heroList, setHeroList] = useState([]);
  const [positonKey, setPositionKey] = useState<number>(0);
  useImperativeHandle(parentRef, () => {
    return {
      setHeroList,
      heroList,
    };
  });
  return (
    <>
      <div className="w-100% h-100% cursor-pointer">
        <div className="flex items-center m-r-16px justify-end">
          {PositionList.map((item) => (
            <div
              style={
                positonKey == item.value
                  ? {
                      color: "#fff",
                      borderColor: "#fff",
                    }
                  : {}
              }
              onClick={() => setPositionKey(item.value)}
              key={item.value}
              className="text-center w-80px p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)]  b-rd-2px hover-c-#fff cursor-pointer hover-b-#fff"
            >
              {item.label}
            </div>
          ))}
        </div>
        <CbessBoard heroList={heroList} positonKey={positonKey} />
      </div>
    </>
  );
}
const Final = forwardRef(FinalPosition);
export default Final;
