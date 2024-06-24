/*
 * @Author: yjl
 * @Date: 2024-06-24 11:22:25
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-24 11:23:29
 * @Description: 描述
 */
import { useState } from 'react';


export default function HexConter() {
  const [state, setState] = useState({
    message:'hex-conter',
    count: 1,
  })
  return (
    <>
      <div
        className='w-100% h-100% cursor-pointer'
        onClick={() => setState({ ...state, count: state.count + 1 })}
      >
        {state.message + state.count}
      </div>
    </>
  );
}
