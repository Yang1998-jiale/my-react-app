/*
 * @Author: yjl
 * @Date: 2024-06-27 09:33:38
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-27 14:41:32
 * @Description: 描述
 */
import { PlusOutlined } from "@ant-design/icons";
import { memo } from "react";

interface SelectBoxProps {
  selectInfo: any;
  showModal?: () => void;
  deleteCbk?: (equipID?: string | undefined, equipInfo?: any) => void;
  isRadius?: boolean;
  isDelete?: boolean;
  className?: string;
}
function SelectBox({
  selectInfo,
  deleteCbk = () => {},
  showModal = () => {},
  isRadius = false,
  isDelete = true,
  className = "",
}: SelectBoxProps) {
  return (
    <div className={`${isRadius && "b-rd-50%"} ${className}`}>
      {selectInfo ? (
        <div
          className={`inline-block vertical-middle w-40px h-40px  cursor-pointer relative b-rd-4px bg-#1a1f3a b-1px b-solid b-#23294a ${
            isRadius && "b-rd-50%"
          }`}
        >
          {isDelete && (
            <div
              className="w-16px h-16px b-rd-50% bg-red absolute top-0 right-0 translate-[30%,-30%] flex justify-center items-center c-#fff font-700"
              onClick={() => {
                deleteCbk(selectInfo);
              }}
            >
              <div className="w-50% h-2px bg-#fff"></div>
            </div>
          )}
          <img
            src={selectInfo?.imagePath}
            className={`w-100% h-100% ${isRadius && "b-rd-50%"}`}
            alt=""
          />
        </div>
      ) : (
        <div
          className={`inline-block vertical-middle w-40px h-40px flex cursor-pointer justify-center items-center text-20px line-height-40px  c-#242947 font-700 b-rd-4px bg-#1a1f3a b-1px b-solid b-#23294a ${
            isRadius && "b-rd-50%"
          }`}
          onClick={() => {
            showModal();
          }}
        >
          <PlusOutlined />
        </div>
      )}
    </div>
  );
}

const SelectItem = memo(SelectBox);

export default SelectItem;
