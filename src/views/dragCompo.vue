<template>
  <div style="background: white; height: 100vh;">
    <div class="header">
      <a-button type="primary" @click="save">保存</a-button>
    </div>
    <div style="width: 100%;height: 100vh">
      <vue-draggable-resizable :w="1200" :h="800" :on-drag="onDragCallback" :drag-handle="'.drag-parent'" style="z-index: 1" :parent="true"  :resizable="true" class-name="drag-container">
        <div style="height: 800px;width: 1200px;border: 1px solid darkred;position: relative;margin: 0 auto;">
          <vue-draggable-resizable
            :w="160"
            :h="100"
            class="drag-wrap"
            :is-conflict-check="true"
            :snap="true"
            :debug="false"
            :snapTolerance="10"
            @refLineParams="getRefLineParams"
            :on-drag="onDragCallback"
            @dragstop="(x, y) => onDragStop(item, x, y)"
            :drag-handle="'.drag-handle'"
            :z="item.zIndexNum"
            :on-drag-start="(e) => onDragStartCallback(item, e)"
            @dragging="(left, top) => dragging(item, left, top)"
            :x="item.x"
            :y="item.y"
            :resizable="false"
            :parent="true"
            v-for="(item, index) in data"
            :key="item.id">
            <div class="drag-box">
              <div class="drag-content  drag-handle" @click="cardClick(item)">
                <h2>{{item.name}}</h2>
                <div class="content-source">来源: SME</div>
                <div class="badge">
                  <a-badge :count="item.count" />
                </div>
              </div>
              <div class="operation">
                <div class="operation-item" style="border-right: 1px solid #ccc" @click.stop="handleEdit">
                  <a-icon type="edit" class="operation-icon"/>
                </div>
                <div class="operation-item" @click.stop="handleDelete(index)">
                  <a-icon type="delete" class="operation-icon"/>
                </div>
              </div>
              <div class="footer" v-if="item.count > 1"></div>
              <p :style="[{width:'2px',height:item.lineHeight + 'px',background:'gray',position:'absolute',left:'50%',marginLeft:'-1px'}, positionStyle(item)]" v-show="item.lineHeight">
                <a-icon type="up" class="arrow arrow-up"/>
                <a-icon type="down" class="arrow arrow-down"/>
              </p>
            </div>
          </vue-draggable-resizable>
          <span class="ref-line v-line"
                v-for="(item,index) in vLine"
                v-show="item.display"
                :key="'1'+item+index"
                :style="{ left: item.position, top: item.origin, height: item.lineLength}"
          />
          <span class="ref-line h-line"
                v-for="(item, index) in hLine"
                :key="''+item+index"
                v-show="item.display"
                :style="{ top: item.position, left: item.origin, width: item.lineLength}"
          />
          <div class="common-line drag-parent" style="position: absolute;top:400px;z-index: 0" ref="commonLine">
            <p class="line-name name-left">eth0</p>
            <p class="line-name name-right">eth0</p>
          </div>
        </div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable  from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
export default {
  name: "dragCompo",
  components: { VueDraggableResizable  },
  data () {
    return {
      // width: 0,
      // height: 0,
      // curX: 0,
      // isTop: true,
      curIndex: 10,
      storeY: 0,
      storeHeight: 0,
      vLine: [],
      hLine: [],
      // data: []
      data: [
          {
              id: '1',
              name: 'EOP-DB',
              x: 100,
              y: 100,
              lineHeight: 100,
              zIndexNum: 10,
              count: 2
          },
          {
              id: '2',
              name: 'EOP-SI',
              x: 200,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 5
          },
          {
              id: '3',
              name: 'drag Name3',
              x: 600,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 1
          },
          {
              id: '4',
              name: 'drag Name4',
              x: 600,
              y: 700,
              lineHeight: 100,
              zIndexNum: 10,
              count: 1
          },
          {
              id: '5',
              name: 'drag Name5',
              x: 600,
              y: 500,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '6',
              name: 'drag Name6',
              x: 600,
              y: 600,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '7',
              name: 'drag Name7',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '8',
              name: 'drag Name8',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '9',
              name: 'drag Name9',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '10',
              name: 'drag Name10',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '11',
              name: 'drag Name11',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '12',
              name: 'drag Name12',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '13',
              name: 'drag Name13',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '14',
              name: 'drag Name14',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '15',
              name: 'drag Name15',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '16',
              name: 'drag Name16',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '17',
              name: 'drag Name17',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '18',
              name: 'drag Name18',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '19',
              name: 'drag Name19',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          },
          {
              id: '20',
              name: 'drag Name20',
              x: 400,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10,
              count: 10
          }
      ]
    }
  },
  watch: {
  },
  computed: {
    positionStyle () {
        return function (item) {
            if (item.y > 400) {
                // console.log('jisuanshuxing', item.y)
                return {
                    bottom: 84 + 'px'
                }
            } else if (item.y < 300){
                return {
                    top: 99 + 'px'
                }
            }
        }
    }
  },
  mounted() {
      // console.log('common line', this.$refs.commonLine.style.top)
      // this.curY = 200
      localStorage.setItem('data', JSON.stringify(this.data))
      this.init()
  },
  methods: {
    init () {
        // console.log('初始化', localStorage.getItem('data'))
        this.data = JSON.parse(localStorage.getItem('data'))
        this.data.forEach(item => {
            this.getLineHeight(item, item.x, item.y)
        })
    },
    handleEdit () {
      alert('编辑')
    },
    handleDelete (index) {
        this.data.splice(index,1)
        this.$message.success('删除成功')
    },
    getDragIndex (item,x, y) { // 获取Z-Index
      const res = this.data.filter(item => { // 检测是否交叉
        console.log('差', x - item.x)
        const dis = x - item.x
        if ((dis < 100 && dis > 0)  || ( dis > -100 && dis < 0 )) return true
      })
      // const newRes = JSON.parse(JSON.stringify(res))
      if (res.length) {
        const minRe = res.every(ite => { // y 小于所有交叉项的y 在最上面
            return ite.y > y
        })
        const maxRe = res.every(ite => { // y 大于所有交叉项的y 在最下面
            return ite.y < y
        })
        // if(res.length >= 2) {
        //     console.log('不止一个')
        //     newRes.sort((item1, item2) => { // 按 y 从小到大排序
        //         return item1.y - item2.y
        //     })
        //     console.log('sorttt', newRes)
        //     for(let i=0; i<newRes.length; i++) {
        //         if((newRes[i].y < y && y< newRes[i+1].y) && y < 300) {
        //             console.log('中间的')
        //             item.zIndexNum = newRes[i].zIndexNum
        //             newRes[i].zIndexNum -= 1
        //         }
        //     }
        // }

        if((minRe && y < 300) || (maxRe && y> 400)) {
          console.log('最小')
          item.zIndexNum -= res.length
        }
        if((maxRe && y< 300) || (minRe && y > 400)) {
            item.zIndexNum += res.length
        }
      }
      console.log('有交叉了', this.data)
    },
    getRefLineParams (params) {
        const { vLine, hLine } = params
        this.vLine = vLine
        this.hLine = hLine
    },
    onDragCallback () {
        // console.log('line width', x,y,parseInt(getComputedStyle(this.$refs.commonLine).width))
        // const maxY = parseInt(getComputedStyle(this.$refs.commonLine).width)
        // if(x < 0 || y < 0 || y > 700 || x > (maxY - 100)) {
        //     return false
        // }
    },
    onDragStartCallback (item, e) {
      console.log('拖拽开始', item, e)
    },
    onDragStop (item, x, y) {
      console.log('存储de', x, y)
      console.log('拖拽停止',item)
        item.zIndexNum = 10
        item.y = y
        this.getLineHeight(item, x, y)
        if(y>=250 && y<350) { // 矩形在线的上半部分
          item.lineHeight = 50
          item.y = item.y - 50 - (item.y - 300)
        }
        if (y>= 350 && y<456) { // 矩形在线的下半部分
          item.lineHeight = 50
          item.y = 455
        }
        this.getDragIndex(item, x, y)
    },
    getLineHeight (item,x, y) {
        // console.log('获取高度', item)
        if(y>300 && y<406) { // 矩形在线上时
            item.lineHeight = 0
        }
        if(y < 300) {
            item.lineHeight = 300 - y
        } else if(y > 400) {
            item.lineHeight = y - 405
        }
    },
    dragging(item,x,y) {
        item.zIndexNum = 20
        this.getLineHeight(item, x, y)
        item.y = y
        item.x = x
    },
    save () {
      console.log('保存', this.data)
      localStorage.setItem('data', JSON.stringify(this.data))
      this.init()
    },
    cardClick (item) {
      console.log('ssss', item)
        // alert(item.name)
    }
  }
}
</script>

<style scoped>
  .header{
    height: 60px;
    padding: 20px;
    border-bottom: 1px solid #cccccc;
  }
  .drag-box{
    width:100%;
    height: 100%;
    position: relative;
    background: white;
    box-shadow: 0px 0px 10px 2px #cccccc;
  }
  .drag-container{

  }
  .line-name{
    position: absolute;
    top: -20px;
    color: black;
    font-size: 18px;
    font-weight: bold;
  }
  .name-left{
    left: 0;
  }
  .name-right {
    right: 0;
  }
  .arrow{
    font-size: 12px;
    position: absolute;
    left:-5px;
    color: gray;
  }
  .arrow-up{
    top:-3px
  }
  .arrow-down{
    bottom: -3px;
  }
  .box-line{
    width: 2px;
    background: black;
    position: absolute;
    left:50%;
  }
  .common-line{
    width: 100%;
    height: 6px;
    background: bisque;
  }
  .drag-wrap {
    border:1px solid #e6e6e6;
  }
  .drag-handle{
    cursor: move;
  }
  .operation{
    display: flex;
    background: #f0f0f0;
    width:100%;
    height: 20px;
    border-top: 1px solid #ccc;
    /*margin-top:26px;*/
  }
  .operation-item {
    width:50%;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }
  .drag-content{
    padding:8px;
    box-sizing: border-box;
    position: relative;
  }
  .drag-content .badge {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .drag-content h2{
    font-size: 16px;
    margin: 0;
    margin-bottom: 20px;
  }
  .content-source {
    font-size: 12px;
    color: gray;
  }
  .operation-item:hover  .operation-icon {
    color: dodgerblue;
    font-size: 12px;
  }
  .drag-parent{
    cursor: move;
  }
  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  .footer:before {
    content: '';
    position: absolute;
    z-index: -1;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

</style>
