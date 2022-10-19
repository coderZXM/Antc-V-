import React, { memo,useState,useEffect } from 'react'
import { Graph,Shape } from '@antv/x6'
import './index.less'
import Tools from '../../assets/js/graphTools'
import { Item } from 'rc-menu'
import graphTools from '../../assets/js/graphTools'

const Columnar= memo(() => {
  const [modueList,setModueList] = useState<Array<any>>([
    {
      id:1,
      name:'水泵',
      type:'inital'
    },
    {
      id:2,
      name:'冷却塔',
      type:'inital'
    },
    {
      id:3,
      name:'制冷器',
      type:'logic'
    },
    {
      id:4,
      name:'集分水器',
      type:'logic'
    },
  ])
  const [graph ,setGraph] = useState<any>()
  let [curSelectNode,setCurSelectNode] = useState<any>(null)

  //初始化流程画布
  function init(){
    let  container = document.getElementById('container')
    let graph1 = new Graph({
      container:container as HTMLElement,
      width:container?.offsetWidth,
      height:container?.offsetHeight,
      background:false,//背景
      snapline:true,//对齐线
      //配置连线规则
      connecting:{
        snap:true,
        allowBlank:false,
        allowMulti:false,
        allowLoop:false,
        highlight:true,
        sourceAnchor: { // 当连接到节点时，通过 sourceAnchor 来指定源节点的锚点。
          name: 'center'
        },
        targetAnchor: 'center', // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
        connector: {name:'rounded',args:{radius:8}}, // 连接器将起点、路由返回的点、终点加工为 元素的 d 属性，决定了边渲染到画布后的样式，默认值为 normal。
        connectionPoint: 'boundary', // 指定连接点，默认值为 boundary。
        // router: 'manhattan',
        router: { // 实体关系路由，由 Z 字形的斜角线段组成。
          name: 'manhattan',
          args: {
            direction: 'T',
          },
        },
      // 在移动边的时候判断连接是否有效，
      // 如果返回 false，当鼠标放开的时候，不会连接到当前元素，
      // 否则会连接到当前元素。
      // 可以连接的节点，链接桩会变色
      validateConnection({ sourceMagnet, targetMagnet, sourceCell, targetCell  }: any) {
        // 只能从输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'group1') {
          return false
        }
        // 只能连接到输入链接桩
        if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'group1') {
          return false
        }
        return true
      },
        validateEdge({ edge , type , previous}){
          //连线设置折线
          // edge.setRouter({
          //   name:'er'
          // })
          //设置连线样式
          edge.setAttrs({
            line:{
              stroke:'#275ad3',
              strokeDasharray: 5,
              targetMarker: 'classic',
              style: {
                animation: 'ant-line 30s infinite linear',
              },
            },
          })
          return  true

        },
        //自定义链接的线
        createEdge() { // 连接的过程中创建新的边
          return new Shape.Edge({
            zIndex: 1,
                    attrs: {
              line: {
              stroke: '#275ad3',
              strokeWidth: 1,
              strokeDasharray: 5, // 控制虚线间隔
              targetMarker: {
              name: 'classic',
              size: 5
            }
         }
       }
     })
    },
  },
      //画布是否可以平移
      panning:{
        enabled:true,
      },
      mousewheel:{
        enabled:true,//支持滚动与缩放
      },
      grid:{
        type:'mesh',
        size:20 , //网格大小
        visible:true,//渲染网格背景
        args:{
          color:'#eeeeee',//网格线/点颜色，
          thickness:2 , // 网格线宽度/网格点宽度
        }
      }

    })
    setGraph(graph1)
    nodeAddEven()

   


  }
  //添加节点
  function addHandleNode(x :any, y :any, id:any,name :any, type:any){
     type === 'inital' ?
     graph.addNode(graphTools.initInitialNode(x, y, id, name, type))
     :
     graph.addNode(graphTools.initLogicNode(x, y, id, name, type))

  }
    //拖动
  const onDragEnd = (item :any) =>{
      return (e : any) =>{
        addHandleNode(e.pageX - 600  , e.pageY - 200  , new Date().getTime(),item.name,item.type)
      }
    }
  //拖动
  const onDragOver = (e : any) =>{
   e.preventDefault()
  }
  //节点绑定事件
  function nodeAddEven(){
      // 节点绑定点击事件
     graph?.on('node:click', ({node}) => {
        // 判断是否有选中过节点
        if (curSelectNode) {
          // 移除选中状态
         curSelectNode.removeTools()
          // 判断两次选中节点是否相同curSelectNode
          if (curSelectNode !== node) {
            node.addTools([{
              name: 'boundary',
              args: {
                attrs: {
                  fill: '#16B8AA',
                  stroke: '#2F80EB',
                  strokeWidth: 1,
                  fillOpacity: 0.1
                }
              }
            }, {
              name: 'button-remove',
              args: {
                x: '100%',
                y: 0,
                offset: {
                  x: 0,
                  y: 0
                }
              }
            }])
           // curSelectNode = node
            setCurSelectNode(node)
          } else {
            //curSelectNode = null
            setCurSelectNode(null)
          }
        } else {
          //curSelectNode = node
          setCurSelectNode(node)
          node.addTools([{
            name: 'boundary',
            args: {
              attrs: {
                fill: '#16B8AA',
                stroke: '#2F80EB',
                strokeWidth: 1,
                fillOpacity: 0.1
              }
            }
          }, {
            name: 'button-remove',
            args: {
              x: '100%',
              y: 0,
              offset: {
                x: 0,
                y: 0
              }
            }
          }])
        }
      })
       // 连线绑定悬浮事件
       //cell:mouseenter
     graph?.on('cell:mouseenter', ({ cell}) => {
       console.log(cell)
              if (cell.shape == 'edge') {
                cell.addTools([
                  {
                    name: 'button-remove',
                    args: {
                      x: '100%',
                      y: 0,
                      offset: {
                        x: 0,
                        y: 0
                      },
                    },
                  }])
                cell.setAttrs({
                  line: {
                    stroke: '#409EFF',
                  },
                })
                cell.zIndex = 99
              }
            })
     graph?.on('cell:mouseleave', ({ cell }) => {
              if (cell.shape === 'edge') {
                cell.removeTools()
                cell.setAttrs({
                  line: {
                    stroke: '#275da3',
                  },
                })
                cell.zIndex = 1
              }
            })

  }


  useEffect(()=>{
    init()
    
  },[])
  return (
    <div className='home'>
    <div className='menu-bar'>
      <h2>组态图组件</h2>
    <div className='menu-list'>
      {
        modueList.map(item =>{
          return (
            <div 
            draggable={true}
            key={item.id}
            onDragEnd={onDragEnd(item)}
            >
                 <img style={{height:'60px',width:'60px'}} src={require('../../assets/img/图片1.png')}/>
                 <span>{item.name}</span>
            </div>
          )
        })
        
      
      }

    </div>
    </div>
    <div className="canvas-card">
    <div id="container"
    onDragOver = {onDragOver}
    
    >Columnar</div>
    </div>
    </div>

  )
})

export default Columnar