<!--
 * @Author: yjl
 * @Date: 2024-05-10 09:15:11
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-24 17:48:24
 * @Description: 描述
-->
1.写一个auto-router：自动收集指定目录下的指定文件,模拟ssr，目录下每一个文件夹就是一个路由


微前端是什么:
    微前端的主要思像就是在一个web应用中引用另一个web应用,我们对它的期望是 可以做到1.自由通信 2.自由的路由切换 3.不限制技术栈 4.可以独立部署,独立发布

微前端方案:
    1.iframe 是一个天然的js沙箱 但是也正是如此 数据隔离的太完美 通信方面比较困难  并且会有路由失效问题 空白时间过长

    2.single-spa 主要实现思路是 通过预注册子应用 监听路由变匹配对应的子应用资源 qiankun是就在这个基础上进行完善的

    3.qiankun 再single-spa的基础上完善 子应用资源由js列表改成url,减轻了注册子应用的负担 实现js和css隔离 增加子应用预加载 并实现缓存 加快加载速度

    4.wujie方案 将子应用js注入到主应用同于的ifram中运行,ifram是原生的js沙箱,内部有完成的Histroy和location 子应用再ifram中运行时路由也得到了完全解耦
      wujie解决路由前进后退问题:再ifram内部进行Histroy.pushState,浏览器会自动添加ifram的session-history,从而实现子应用路由独立可以自由使用浏览器的回退前进功能
      并且会劫持ifram中history的pushState和replaceState方法,方便把子应用上的路由同步到主应用的路由参数中,从而保证页面刷新时可以保持子页面同步
      wujie是如果进行隔离的: wujie使用webCompound的方式来实现页面隔离,创造一个完全自定义的元素 将子应用渲染进去,这样子应用在ifram运行 dom再主应用的webCompound中运行,通过代理ifram的document做到两者互联
      wujie通信方式 : 可以通过wujie提供的容器组件 可以传递props传递,也可以通过Event Bus 还有就是子应用可以通过window.parent与主应用通信
      使用中遇到的问题
        1.在wujie主应用中引用的子应用如果有弹窗类组件比如antd的 modal message组件 这些组件的本质是在dom中真实的创一个dom结构,所以当页面首次使用后dom在主应用的dom中创建了实例 但没有销毁,子应用再次使用这个弹窗的时候就无法弹出 解决方法是 再子应用的wujie生命周期中主动销毁
        2.wujie使用过程中如果子应用有一些全局指令和全局组件 需要在子应用的wujie生命周期重新注册


<!-- 提交取消/代理 -->
git config --global --unset http.proxy
git config --global --unset https.proxy
git config --global https.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890