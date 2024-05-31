/*
 * @Author: yjl
 * @Date: 2024-05-27 15:40:44
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-31 11:06:06
 * @Description: 描述
 */
import CbessBoard from "./ChessBoard/index";
import type { Chess } from "@/types/battle";
type Prop = {
  heroList: Chess[];
  positonKey: number;
};
export default function Final({ heroList, positonKey }: Prop) {
  return (
    <>
      <div className="w-100% h-100% cursor-pointer">
        <CbessBoard heroList={heroList} positonKey={positonKey as number} />
      </div>
    </>
  );
}
