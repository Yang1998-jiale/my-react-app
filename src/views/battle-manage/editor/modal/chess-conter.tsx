import { chessFormart } from "../util";
import { useState, useEffect } from "react";

interface Props {
  chessList: any[];
}
export default function ChessConter({ chessList }: Props) {
  const [chess, setChess]: any[] = useState([]);
  useEffect(() => {
    setChess(() => {
      return chessFormart(chessList);
    });
  }, [chessList]);
  return (
    <>
      <div className="w-100% h-100% cursor-pointer">{}</div>
    </>
  );
}
