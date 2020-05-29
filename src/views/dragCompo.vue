<template>
  <div style="background: white; height: 100vh;">
    <vue-draggable-resizable :w="1000" :h="800" :on-drag="onDragCallback" :drag-handle="'.drag-parent'" style="z-index: 10"   :resizable="false" >
      <div style="height: 800px;width: 1000px;border: 1px solid darkred;position: relative;margin: 0 auto;">
        <vue-draggable-resizable
          :w="200"
          :h="100"
          class="drag-wrap"
          :is-conflict-check="true"
          :snap="true"
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
          :parent="true"
          :resizable="false"
          v-for="(item) in data"
          :key="item.id">
          <div class="drag-box">
            <div class="drag-content  drag-handle">
              <h2>{{item.name}}</h2>
              <div class="content-source">来源: SME</div>
            </div>
            <div class="operation">
              <div class="operation-item" style="border-right: 1px solid #ccc" @click="handleEdit">
                <a-icon type="edit" class="operation-icon"/>
              </div>
              <div class="operation-item" @click="handleDelete">
                <a-icon type="delete" class="operation-icon"/>
              </div>
            </div>
            <p :style="[{width:'2px',height:item.lineHeight + 'px',background:'black',position:'absolute',left:'50%',marginLeft:'-1px'}, positionStyle(item)]"></p>
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
        <div class="common-line drag-parent" style="position: absolute;top:400px;z-index: 0" ref="commonLine"></div>
      </div>
    </vue-draggable-resizable>
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
      storeY: 0,
      storeHeight: 0,
      vLine: [],
      hLine: [],
      data: [
          {
              id: '1',
              name: 'EOP-DB',
              x: 100,
              y: 100,
              lineHeight: 100,
              zIndexNum: 10
              // curY: 0,
              // topNum: 98,
              // botNum: 0
          },
          {
              id: '2',
              name: 'EOP-SI',
              x: 200,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10
              // curY: 0,
              // topNum: 98,
              // botNum: 0
          },
          {
              id: '3',
              name: 'drag Name3',
              x: 600,
              y: 200,
              lineHeight: 100,
              zIndexNum: 10
              // curY: 0,
              // topNum: 98,
              // botNum: 0
          },
          {
              id: '4',
              name: 'drag Name4',
              x: 600,
              y: 700,
              lineHeight: 100,
              zIndexNum: 10
              // curY: 0,
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
                console.log('jisuanshuxing', item.y)
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
      this.init()
  },
  methods: {
    init () {
        this.data.forEach(item => {
            this.getLineHeight(item, item.y)
        })
    },
    handleEdit () {
      alert('编辑')
    },
    handleDelete () {
      alert('删除')
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
      // const ite = { ...item }
      // this.storeY = ite.y
      // this.storeHeight = ite.lineHeight
    },
    onDragStop (item, x, y) {
        console.log('存储de', this.storeY)
      console.log('拖拽停止',item, x, y)
        item.zIndexNum = 10
      // if (this.storeY === y) {
          console.log('===')
        item.y = y
        this.getLineHeight(item, y)
          // item.lineHeight = 300 - y
      // }
    },
    getLineHeight (item,y) {
        if(y>300 && y<406) {
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
        // console.log('left:', x)
        // console.log('top:', y)
        // console.log('itemY', this.data[index].y)
        // this.data[index].curY = this.data[index].y
        // console.log('cur', this.data[index].curY)
        this.getLineHeight(item, y)
        // this.data[index].curY = y  // if(y>300 && y<406) {
        //     this.data[index].lineHeight = 0
        // }
        // if(y < 300) {
        //     this.data[index].lineHeight = 300 - y
        // } else if(y > 400) {
        //     this.data[index].lineHeight = y - 405
        // }
        item.y = y
        item.x = x
        // console.log('height', this.data[index].lineHeight)

    }
  }
}
</script>

<style scoped>
  .drag-box{
    width:100%;
    height: 100%;
    position: relative;
    background: white;
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
    border:1px solid black;
  }
  .drag-handle{
    cursor: move;
  }
  .operation{
    display: flex;
    background: #f0f0f0;
    width:100%;
    height: 30px;
    border-top: 1px solid #ccc;
    /*margin-top:26px;*/
  }
  .operation-item {
    width:50%;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
  .drag-content{
    padding:8px;
    box-sizing: border-box;
  }
  .drag-content h2{
    font-size: 18px;
    margin: 0;
    margin-bottom: 6px;
  }
  .content-source {
    font-size: 12px;
    color: gray;
  }
  .operation-item:hover  .operation-icon {
    color: dodgerblue;
  }
  .drag-parent{
    cursor: move;
  }

</style>
