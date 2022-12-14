import React, {memo, useRef,useEffect} from 'react';
import {Graph} from '@antv/x6';
import './index.less'
const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
};
const Columar = memo(() => {
  const conRef = useRef<any>();
  function init() {
    const graph = new Graph({
      container: document.getElementById('container') as HTMLElement,
      background: {
        color: '#202735', // 设置画布背景颜色
      },
      grid: {
       // size: 10,      // 网格大小 10px
       // visible: true, // 渲染网格背景
      },
   
    });
    graph.fromJSON(data)
    // graph.zoom(-0.5) 物体缩放
  }
  useEffect(()=>{
       init()

  },[])

 
  return (
    <div id="container" style={{height:'100% '}} ref={conRef}>
      <div className='zzz'></div>

    </div>
  );
});

export default Columar;
