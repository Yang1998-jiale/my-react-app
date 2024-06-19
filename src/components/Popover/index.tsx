/*
 * @Author: yjl
 * @Date: 2024-06-14 14:15:06
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-19 17:39:10
 * @Description: 描述
 */
import { useState, memo } from "react";
import { Popover, PopoverProps } from "antd";

interface StatusProps extends PopoverProps {}
function Status(props: StatusProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover {...props} open={open}>
      <div
        draggable="true"
        onDrag={() => setOpen(false)}
        onMouseMove={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {props.children}
      </div>
    </Popover>
  );
}

interface PopoverBoxProps extends PopoverProps {}
function PopoverDom(props: PopoverBoxProps) {
  return <Popover {...props}>{props.children}</Popover>;
}
export const PopoverBox = memo(PopoverDom);

export const PopoverStatus = memo(Status);
