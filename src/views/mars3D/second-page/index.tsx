/*
 * @Author: yjl
 * @Date: 2024-07-16 11:47:00
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-16 11:48:07
 * @Description: 描述
 */
import useMars3D from "@/hooks/web/mars3D";
export default function Index() {
  const { map } = useMars3D("mars3dBox");
  return (
    <>
      <div id="mars3dBox" className="w-100% h-100% relative"></div>
    </>
  );
}
