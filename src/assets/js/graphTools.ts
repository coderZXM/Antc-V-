/* 
antv x6图谱相关工具函数
*/
export default {
    /* 
    初始化初始节点(开始,结束节点)
    x:x轴坐标
    y:y轴坐标
    id:开始节点id
    name:节点内容，默认为空
    type:节点类型，默认为空
    */
    initInitialNode( x :any, y :any, id:any,name :any, type:any) {
      let node = {
        shape: 'html',
        type: type,
        id: id, // String，可选，节点的唯一标识
        x: x, // Number，必选，节点位置的 x 值
        y: y, // Number，必选，节点位置的 y 值
        width: 140, // Number，可选，节点大小的 width 值
        height: 50, // Number，可选，节点大小的 height 值
        html: `
              <div class="custom_node_initial">
                <div id="ccc">
                   <i>💠</i>
                  <p title=${name}>${name||''}</p>
                </div>
              </div>
              <script>
              const btn = document.getElementById('ccc')
              btn.onclick =  function(){
                console.log('sssssss');
              }
              
              </script>
              `,
        attrs: {
          // 这里给生成的节点的body加上透明的边框,一定要给边框宽度加上>0的值,否则节点将不能连线
          body: {
            stroke: 'transparent',
            strokeWidth: 10, // 边框的粗细
            //magnet: true, // 节点是否可以连线
          }
        },
      }
      return node
    },
  
    /* 
    初始化逻辑节点
    x:x轴坐标
    y:y轴坐标
    id:开始节点id
    name:节点内容，默认为空
    type:节点类型，默认为空
    */
    initLogicNode(x :any, y :any, id:any,name :any, type:any) {
      let node = {
        shape: 'html',
        type: type, // 动作所属类型
        id: id, // String，可选，节点的唯一标识
        x: x, // Number，必选，节点位置的 x 值
        y: y, // Number，必选，节点位置的 y 值
        width: 140, // Number，可选，节点大小的 width 值
        height: 50, // Number，可选，节点大小的 height 值
        html: `
                <div class="custom_node_logic">
                  <div>
                     <i>🌐</i>
                    <p title=${name}>${name||''}</p>
                  </div>
                </div>
              `,
        //定义输入输出桩
        ports:{
                groups:{
                   group1:{
                    position:'top',
                    label: {
                      position: 'top',  // 标签位置 输入
                    },
                    unsetted:true,
                    attrs:{
                      circle:{
                      r:3,
                      magnet:'passive',//输入输出判定 现在是输入
                      stroke:'red',
                      strokeWidth:2,
                      fill:'red'
                        }
                     },
                   },
                   group2:{
                    position:'bottom',
                    label: {
                      position: 'bottom',  // 标签位置 输入
                    },
                    attrs:{
                      circle:{
                      r:3,
                      magnet:true,  //输出框
                      stroke:'red',
                      strokeWidth:2,
                      fill:'red'
                        }
                     }
                   }
                },
                items:[
                  {
                    id:'port1',
                    group:'group1',
                    attrs: {
                      text: {          // 标签选择器
                        text: '输入', // 标签文本
                      },
                    },
                  },
                  {
                    id:'port2',
                    group:'group1',
                    attrs: {
                      text: {          // 标签选择器
                        text: '输入', // 标签文本
                      },
                    },
                  },
                  {
                    id:'port3',
                    group:'group2',
                    attrs: {
                      text: {          // 标签选择器
                        text: '输出', // 标签文本
                      },
                    },
                  },
                  {
                    id:'port4',
                    group:'group2',
                    attrs: {
                      text: {          // 标签选择器
                        text: '输出', // 标签文本
                      },
                    },
                  },
                ]
              },
              //attrs 定制节点的样式
        attrs: {
          body: {
            stroke: 'transparent',
            strokeWidth: 10,
           // magnet: true,
          }
        },
      }
      return node
    }
  }
  