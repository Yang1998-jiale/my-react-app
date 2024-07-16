/*
 * @Author: yjl
 * @Date: 2024-07-15 10:43:40
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-15 15:23:29
 * @Description: 描述
 */
import html2canvas from "html2canvas";
// import type { ReactDOM } from "react";

export const createImage = async (dom, options = {}): Promise<string> => {
  if (!dom) {
    return "";
  }
  try {
    const canvas = await html2canvas(dom, {
      useCORS: true,
      ...options,
    });
    const image = canvas.toDataURL("image/png");

    return image;
  } catch (error) {
    return "";
  }
};
