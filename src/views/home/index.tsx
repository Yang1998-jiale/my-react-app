/*
 * @Author: yjl
 * @Date: 2024-04-18 16:01:12
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-18 16:07:12
 * @Description: 描述
 */
import { useState } from "react";
import { Button } from "antd";

export default function Home() {
  const [age, setAge] = useState(24);

  return (
    <div>
      <Button type="primary" onClick={() => setAge(age + 1)}>
        按钮
      </Button>
      <p className="c-red">我的年龄是{age}</p>
    </div>
  );
}
