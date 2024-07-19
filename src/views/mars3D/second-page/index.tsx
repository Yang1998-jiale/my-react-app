/*
 * @Author: yjl
 * @Date: 2024-07-16 11:47:00
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-17 13:24:54
 * @Description: 描述
 */
// import { queryMars3DData } from "@/api/mars3D/index";
import useMars3D from "@/hooks/web/mars3D";
import * as mars3d from "mars3d";
import { useEffect } from "react";
export default function Index() {
  const { map } = useMars3D("mars3dBox", {
    scene: {
      center: {
        lat: 31.252107,
        lng: 121.437239,
        alt: 2953.7,
        heading: 103.9,
        pitch: -31.4,
      },
    },
  });

  useEffect(() => {
    let tileset = new mars3d.layer.TilesetLayer({
      pid: 2040,
      name: "上海市",
      url: "//172.168.5.110:7777/mars3d/3dtiles/jzw-shanghai/tileset.json",
      maximumScreenSpaceError: 1,
      style: {
        color: {
          conditions: [["true", "color('rgba(42, 160, 224, 1)')"]],
        },
      },
      marsJzwStyle: true,
      highlight: { type: "click", color: "#FFFF00" },
      popup: "all",
      show: true,
    });
    let roadLayer=new mars3d.layer.GeoJsonLayer({
      name: "道路线",
      url: "//172.168.5.110:7777/mars3d/file/geojson/shanghai-road.json",
      symbol: {
        styleOptions: {
          width: 12,
          materialType: "PolylineGlow",
          materialOptions: {
            glowPower: 0.2,
            color: "#FF4500",
            opacity: 0.8
          }
        }
      },
      popup: "{name}",
    })
    // console.log(tileset);
    map.current.addLayer(tileset);
    map.current.addLayer(roadLayer);
  });

  // queryMars3DData("3dtiles/jzw-shanghai/tileset.json").then((res) => {
  //   console.log(res);
  // });
  return (
    <>
      <div id="mars3dBox" className="w-100% h-100% relative"></div>
    </>
  );
}
