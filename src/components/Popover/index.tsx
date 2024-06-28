/*
 * @Author: yjl
 * @Date: 2024-06-14 14:15:06
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-28 14:17:34
 * @Description: 描述
 */
import { useState, memo } from "react";
import { Popover, PopoverProps } from "antd";

interface StatusProps extends PopoverProps {}
function Status(props: StatusProps) {
  const { className } = props;
  const [open, setOpen] = useState(false);
  return (
    <Popover {...props} open={open}>
      <div
        className={className}
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
