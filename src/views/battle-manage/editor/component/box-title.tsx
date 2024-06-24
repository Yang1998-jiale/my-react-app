/*
 * @Author: yjl
 * @Date: 2024-06-24 11:58:06
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-24 13:47:26
 * @Description: 描述
 */

interface Props {
  title: string | number;
  desc?: string | number | undefined;
}
export default function BoxTitle({ title, desc }: Props) {
  return (
    <>
      <div className="w-100% flex items-center justify-between p-b-16px b-b-1px b-b-solid b-b-#2b2f47">
        <span className="c-#f1f2f8 font-700 text-16px">{title}</span>
        <span className="c-#4e5672">{desc}</span>
      </div>
    </>
  );
}
