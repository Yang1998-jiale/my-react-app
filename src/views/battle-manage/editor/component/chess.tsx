import { Popover } from "antd";
import Content from "./popover-content";

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";

function chessFormart(target) {
  const newTarget = new Array(6).fill(undefined);
  if (!target.length) return [];
  target.forEach((item) => {
    const price = Number(item.price);
    if (item.id == "7593") {
      return;
    }
    if (newTarget[price]) {
      newTarget[price].chessList.push(item);
    } else {
      newTarget[price] = {
        price: price,
        chessList: [item],
      };
    }
  });
  return newTarget.filter((item) => item.price);
}
//棋子组件
export default function Chess({ chessList }) {
  const chessData = chessFormart(chessList);

  return (
    <div className=" w-100% h-100% flex flex-col ">
      {chessData.length
        ? chessData.map((item: any) => {
            return (
              <div className="c-#fff" key={item.price}>
                <h4 className="!m-t-0 m-b-8px">{item.price + "费"}</h4>
                <div className="flex flex w-100% flex-wrap">
                  {item.chessList.map((item) => {
                    return (
                      <Popover
                        content={<Content info={item} type={"chess"} />}
                        rootClassName={"chess-popover"}
                        key={item.id}
                      >
                        <img
                          src={minUrl + item.name}
                          className="w-50px h-50px m-r-8px m-b-8px cursor-pointer"
                          alt=""
                        />
                      </Popover>
                    );
                  })}
                </div>
              </div>
            );
          })
        : "暂无数据"}
    </div>
  );
}

  