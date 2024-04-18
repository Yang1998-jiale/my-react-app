/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-18 18:11:38
 * @Description: 描述
 */
import "./App.css";
import Menu from "@/components/Menu/index";
import Routers from "@/router/index";

function App() {
  
  return (
    <>
      <Menu />
      <div className="w-100% h-100% flex flex-col">
        <div className="flex-1">
          <Routers />
        </div>
      </div>
    </>
  );
}

export default App;
