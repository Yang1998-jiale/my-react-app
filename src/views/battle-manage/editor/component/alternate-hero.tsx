/*
 * @Author: yjl
 * @Date: 2024-07-02 10:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-02 14:24:16
 * @Description: 描述
 */

import BoxTitle from "./box-title";
// import SelectItem from "./select-box";
export default function AlternateHero() {
  return (
    <>
      <div className="w-100% !p-b-30px right-box">
        <BoxTitle title="备选英雄">
          <div className="c-#f1f2f8 b-1px b-solid b-#f1f2f8 p-x-12px p-y-2px b-rd-4px cursor-pointer">
            新增
          </div>
        </BoxTitle>
        <div></div>
      </div>
    </>
  );
}
