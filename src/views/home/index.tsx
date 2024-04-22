/*
 * @Author: yjl
 * @Date: 2024-04-18 16:01:12
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-22 16:19:38
 * @Description: 描述
 */
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [age, setAge] = useState(24);
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setAge(age + 1);
          navigate("/study/index");
        }}
      >
        按钮
      </Button>
      <p className="c-red">我的年龄是{age}</p>
    </div>
  );
}
