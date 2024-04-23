/*
 * @Author: yjl
 * @Date: 2024-04-23 10:10:43
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-23 10:26:00
 * @Description: 描述
 */
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

const modules = import.meta.glob("./**/*.ts", { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes("/_")) {
    return;
  }
  mockModules.push(...(modules as any)[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
