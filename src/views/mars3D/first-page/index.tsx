/*
 * @Author: yjl
 * @Date: 2024-07-15 15:32:00
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-17 13:43:47
 * @Description: 描述
 */
import useMars3D from "@/hooks/web/mars3D";
import { useEffect } from "react";
import { Data } from "../point.json";
import { Input } from "antd";
import * as mars3d from "mars3d";
import * as Cesium from "mars3d-cesium";
// import areaInfo from "../area.json";

export default function Index() {
  // let fuzouList = mars3d.Util.geoJsonToGraphics(areaInfo);
  // console.log(fuzouList);
  const { showHeatMap, searchByKey, map } = useMars3D("mars3dContainer", {
    scene: {
      center: {
        lat: 25.873121,
        lng: 119.290515,
        alt: 51231,
        heading: 2,
        pitch: -71,
      },
    },
  });
  useEffect(() => {
    showHeatMap(
      Data.map((item) => {
        return {
          lng: item.x,
          lat: item.y,
          value: item.t0,
        };
      })
    );

    // fuzouList.map((item) => {
    //   initArea(item);
    // });
    initAreaMask();
  });

  function initArea(info) {
    const graphicLayer = new mars3d.layer.GraphicLayer({
      name: info.attr.name,
    });
    map.current.addLayer(graphicLayer);
    const graphic = new mars3d.graphic.PolygonEntity({
      positions: info.positions,
      style: {
        color: "#0077ee",
        opacity: 0.1,
        //高亮时的样式
        // highlight: {
        //   type: mars3d.EventType.mouseOver, //默认为鼠标移入，也可以加该参数后单击高亮
        //   opacity: 0.2,
        // },
        outline: true,
        outlineColor: "#0077ee",
        outlineWidth: 2,
        clampToGround: true, // 贴地
      },
    });

    graphicLayer.addGraphic(graphic);
  }

  function initAreaMask() {
    let maskLayer = new mars3d.layer.GeoJsonLayer({
      url: "/mars3d/file/geojson/areas/350100.json",
      mask: true, // 标识为遮罩层【重点参数】
      symbol: {
        styleOptions: {
          fill: true,
          color: "#000000",
          opacity: 0.4,
          outline: true,
          outlineColor: "#0077ee",
          outlineWidth: 6,
          outlineOpacity: 0.6,
          arcType: Cesium.ArcType.GEODESIC,
          global: false, // 是否全球遮罩，false时为中国区域
          clampToGround: true,
        },
      },
    });

    map.current.addLayer(maskLayer);
  }

  return (
    <>
      <div className="w-100% h-100% relative">
        <div id="mars3dContainer" className="w-100% h-100% relative"></div>
        <div className="absolute top-24px left-24px w-200px z-10001">
          <Input
            placeholder="请输入关键字"
            onChange={(e) => {
              console.log(e.target.value);

              searchByKey(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}
