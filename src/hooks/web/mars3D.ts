/*
 * @Author: yjl
 * @Date: 2024-07-16 10:58:03
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-16 15:45:02
 * @Description: 描述
 */
import { useRef, useCallback, useEffect } from "react";
import { debounce } from "@/utils/index";
import * as mars3d from "mars3d";


function useMars3D(id: string, options: any = {}) {
  const mapRef: any = useRef(null);
  const tdt_query = new mars3d.query.TdtPOI({
    key: ["4f00c18cd4125639bff3e402648221bf"],
  });
  const baseConfig = {
    basemaps: [
      {
        name: "天地图卫星",
        icon: "img/basemaps/tdt_img.jpg",
        type: "tdt",
        layer: "img_d",
        key: ["4f00c18cd4125639bff3e402648221bf"],
        show: true,
      },
    ],

    scene: {
      center: {
        lat: 31.161939,
        lng: 121.497728,
        alt: 110844.2,
        heading: 360,
        pitch: -90,
      },
      showSun: true, //是否显示太阳
      showMoon: true, //是否显示月亮
      showSkyBox: true, //是否显示天空盒
      showSkyAtmosphere: true, //是否显示地球大气层外光圈
      fog: true, //是否启用雾化效果
      fxaa: true, //是否启用抗锯齿
      cameraController: {
        zoomFactor: 3,
        minimumZoomDistance: 1,
        maximumZoomDistance: 50000000,
        enableRotate: true,
        enableTranslate: true,
        enableTilt: true,
        enableZoom: true,
        enableCollisionDetection: true,
        minimumCollisionTerrainHeight: 15000,
      },
      global: {
        enableLighting: true,
      },
    },
    control: {
      baseLayerPicker: true, //basemaps底图切换按钮
      homeButton: true, //视角复位按钮
      sceneModePicker: true, //二三维切换按钮
      navigationHelpButton: true, //帮助按钮
      fullscreenButton: true, //全屏按钮
    },

    layers: [
      {
        type: "tdt", //必须的参数
        name: "天地图注记",
        layer: "img_z",
        key: ["4f00c18cd4125639bff3e402648221bf"],
        show: true,
      },
    ],
  };

  // 初始化地图
  const initMap = useCallback(() => {
    mapRef.current = new mars3d.Map(id, {
      ...baseConfig,
      ...options,
    });
  }, [id, options]);

  useEffect(() => {
    initMap();
  });
  function fetchJson(url) {
    return mars3d.Util.fetchJson(url);
  }
  /**
   * 显示热力图
   * @param points
   * @param options
   */
  function showHeatMap(
    points,
    options = {
      heatStyle: {
        radius: 20,
        minOpacity: 0,
        maxOpacity: 0.4,
        blur: 0.3,
        gradient: {
          0: "#e9ec36",
          0.25: "#ffdd2f",
          0.5: "#fa6c20",
          0.75: "#fe4a33",
          1: "#ff0000",
        },
      },
      // 以下为矩形矢量对象的样式参数
      style: {
        opacity: 1.0,
        // clampToGround: true,
      },
      flyTo: true,
    }
  ) {
    const heatLayer = new mars3d.layer.HeatLayer({
      ...options,
      positions: points,
    });
    mapRef.current.addLayer(heatLayer);
  }

  function searchByKey(key) {
    tdt_query.query({ text: key }).then((res) => {
      console.log(res);
    });
  }
  return {
    map: mapRef,
    initMap,
    fetchJson,
    showHeatMap,
    searchByKey: debounce(searchByKey, 2000),
  };
}

export default useMars3D;
