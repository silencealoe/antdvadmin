<template>
  <div>
    <div style="width:100%;">
<!--      <vue-draggable-resizable-->
<!--        :w="900"-->
<!--        :h="700"-->
<!--        :on-drag="onDragCallback"-->
<!--        :drag-handle="'.drag-parent'"-->
<!--        style="z-index: 1;"-->
<!--        :parent="true"-->
<!--        class="drag-container"-->
<!--        :resizable="false"-->
<!--        ref="parentDrage"-->
<!--      >-->
        <div style="width: 900px;height: 700px;position: relative;margin: 0 auto" ref="parentDrage">
          <vue-draggable-resizable
            :w="140"
            :h="100"
            ref="dragBox"
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
            v-for="(item) in datas"
            :key="item.key">
            <div :class="['drag-box', (newDrag === item.value) && isSelect ?'new-drag' : '']">
              <div class="drag-content  drag-handle" @dblclick.stop="cardClick(item)">
                <h2>{{item.parent}} — {{item.title}}</h2>
                <div class="content-source">来源: {{item.source}}</div>
                <div class="badge">
                  <a-badge :count="item.count" :number-style="{ backgroundColor: '#f5574e' }"/>
                </div>
              </div>
              <div class="operation">
                <div class="operation-item" style="border-right: 1px solid #ccc" @click.stop="cardClick(item)">
                  <a-icon type="edit" class="operation-icon"/>
                </div>
                <div class="operation-item" @click.stop="handleDelete(item)">
                  <a-icon type="delete" class="operation-icon"/>
                </div>
              </div>
              <div class="box-labels" v-if="item.labels">
                <a-tag :color="labelColors[tags.name]" v-for="tags in item.labels" :key="tags.id">{{tags.name}}
                </a-tag>
                <!--                <a-tag color="#43cf7c">VLAN4</a-tag>-->
                <!--                <a-tag color="#000">VLAN5</a-tag>-->
              </div>
              <div class="footer" v-if="item.count > 1"></div>
              <p
                :style="[{width:'2px',height:item.lineHeight + 'px',background:'gray',position:'absolute',left:'50%',marginLeft:'-1px'}, positionStyle(item, dragHeight)]"
                v-show="item.lineHeight">
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
          <div class="common-line" style="height:6px;position: absolute;top:50%;left: -10%;z-index: 0"
               ref="commonLine">
            <p class="line-name name-left">
              <span v-if="!showInputOne" @dblclick.stop="showInputOne = true">{{ tempName }}</span>
              <a-input style="width: 150px" v-model="tempName" v-else @blur="handleLeftBlur"
                       @pressEnter=" showInputOne = false"></a-input>
            </p>
            <p class="line-name name-right">
              <span v-if="!showInputTwo" @dblclick.stop="showInputTwo = true">{{ tempRightName }}</span>
              <a-input style="width: 150px" v-model="tempRightName" v-else @blur="handleRightBlur"
                       @pressEnter=" showInputTwo = false"></a-input>
            </p>
          </div>
        </div>
<!--      </vue-draggable-resizable>-->
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'

export default {
  name: "dragCompo",
  components: {VueDraggableResizable},
  props: {
    deleteFun: {
      type: Function,
      default() {
        return ()=>{}
      }
    },
    updateDrag: {
      type: Function,
      default() {
          return ()=>{}
      }
    },
    isSelect: {
      type: Boolean,
      default() {
          return false
      }
    },
    dragData: {
        type: Array,
        default() {
          return []
        }
    }
  },
  data() {
      return {
          temWidth: '100%',
          // width: 0,
          // height: 0,
          // curX: 0,
          // isTop: true,
          parentHeight: 0,
          parentWidth: 0,
          dragHeight: 0,
          dragWidth: 0,
          busLineHeight: 0,
          curIndex: 10,
          storeY: 0,
          storeHeight: 0,
          vLine: [],
          hLine: [],
          showInputOne: false,
          showInputTwo: false,
          storeName: '总线',
          tempName: '总线',
          // storeName: 'eTh0'
          tempRightName: '总线',
          labelColors: {
              'VLAN2': '#f5574e',
              'VLAN3': '#e33c64',
              'VLAN4': '#43cf7c',
              'VLAN5': '#000',
              'VLAN6': '#d43030'
          },
          datas: this.dragData,
          newDrag: '',
          storeData: {}
          // data: [
          //     {
          //         id: '1',
          //         name: 'EOP-DB',
          //         x: 100,
          //         y: 100,
          //         lineHeight: 100,
          //         zIndexNum: 20,
          //         count: 2,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '2',
          //                 name: 'VLAN3'
          //             },
          //             {
          //                 id: '3',
          //                 name: 'VLAN4'
          //             },
          //             {
          //                 id: '4',
          //                 name: 'VLAN5'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '2',
          //         name: 'EOP-SI',
          //         x: 200,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 5,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '2',
          //                 name: 'VLAN3'
          //             },
          //             {
          //                 id: '3',
          //                 name: 'VLAN4'
          //             },
          //             {
          //                 id: '4',
          //                 name: 'VLAN5'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '3',
          //         name: 'drag Name3',
          //         x: 600,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 1,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '2',
          //                 name: 'VLAN3'
          //             },
          //             {
          //                 id: '3',
          //                 name: 'VLAN4'
          //             },
          //             {
          //                 id: '4',
          //                 name: 'VLAN5'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '4',
          //         name: 'drag Name4',
          //         x: 600,
          //         y: 400,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 1,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '2',
          //                 name: 'VLAN3'
          //             },
          //             {
          //                 id: '3',
          //                 name: 'VLAN4'
          //             },
          //             {
          //                 id: '4',
          //                 name: 'VLAN5'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '5',
          //         name: 'drag Name5',
          //         x: 600,
          //         y: 500,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '2',
          //                 name: 'VLAN3'
          //             },
          //             {
          //                 id: '3',
          //                 name: 'VLAN4'
          //             },
          //             {
          //                 id: '4',
          //                 name: 'VLAN5'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '6',
          //         name: 'drag Name6',
          //         x: 600,
          //         y: 600,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '2',
          //                 name: 'VLAN3'
          //             }
          //         ]
          //     },
          //     {
          //         id: '7',
          //         name: 'drag Name7',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10,
          //         labels: [
          //             {
          //                 id: '3',
          //                 name: 'VLAN4'
          //             },
          //             {
          //                 id: '4',
          //                 name: 'VLAN5'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '8',
          //         name: 'drag Name8',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '9',
          //         name: 'drag Name9',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '4',
          //                 name: 'VLAN5'
          //             },
          //             {
          //                 id: '5',
          //                 name: 'VLAN6'
          //             }
          //         ]
          //     },
          //     {
          //         id: '10',
          //         name: 'drag Name10',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10,
          //         labels: [
          //             {
          //                 id: '1',
          //                 name: 'VLAN2'
          //             },
          //             {
          //                 id: '2',
          //                 name: 'VLAN3'
          //             },
          //             {
          //                 id: '3',
          //                 name: 'VLAN4'
          //             }
          //         ]
          //     },
          //     {
          //         id: '11',
          //         name: 'drag Name11',
          //         x: 400,
          //         y: 100,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '12',
          //         name: 'drag Name12',
          //         x: 500,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '13',
          //         name: 'drag Name13',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '14',
          //         name: 'drag Name14',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '15',
          //         name: 'drag Name15',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '16',
          //         name: 'drag Name16',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '17',
          //         name: 'drag Name17',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '18',
          //         name: 'drag Name18',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '19',
          //         name: 'drag Name19',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     },
          //     {
          //         id: '20',
          //         name: 'drag Name20',
          //         x: 400,
          //         y: 200,
          //         lineHeight: 100,
          //         zIndexNum: 10,
          //         count: 10
          //     }
          // ]
      }
  },
  watch: {
    'parentHeight': {
      handler(val) {
          console.log('高度变化', val)
      },
      immediate: true
    },
    'dragData.length': {
        handler() {
            console.log('改变了', this.dragData[this.dragData.length - 1])
            this.datas = this.dragData
            if(this.dragData.length) {
              this.newDrag = this.dragData[this.dragData.length - 1].value
            }
            this.init()
        },
        deep: true
    }
  },
  computed: {
    positionStyle() {
      return function (item) {
        // console.log('jisuanshuxing', this.dragHeight)
        if (item.y > (this.parentHeight / 2)) { // 在横线下面
          return {
            bottom: 84 + 'px'
          }
        } else if (item.y < ((this.parentHeight / 2) - this.dragHeight)) { // 在横线上面
          return {
            top: this.dragHeight + 'px'
          }
        }
      }
    }
  },
  mounted() {
    console.log('isselct==', this.isSelect)
    this.$emit('update:isSelect', false)
    this.init()
  },
  methods: {
      init() {
        console.log('初始化', this.datas)
        this.storeDataTimer()
        if (this.datas.length) {
          this.$nextTick(() => {
            this.parentHeight = parseInt(this.$refs.parentDrage.style.height)
            this.parentWidth = parseInt(this.$refs.parentDrage.style.width)
            this.busLineHeight = parseInt(this.$refs.commonLine.style.height)
            // console.log('parent 高 宽', this.parentHeight, this.parentWidth)
            this.dragHeight = this.$refs.dragBox[0].height
            this.dragWidth = this.$refs.dragBox[0].width
            // console.log('width', this.dragHeight)
            if (this.isSelect) {
              this.getItemOffset(this.datas[this.datas.length - 1])
            }
            console.log('dataaa', this.datas)
            this.datas.forEach(item => {
              item.lineHeight = 100
              item.zIndexNum = 10
              this.getLineHeight(item, item.x, item.y)
              this.handleOnLine(item, item.x, item.y)
              // this.getDragIndex(item, item.y)
            })
          })
        }
      },
      storeDataTimer() {
          setTimeout(()=>{
              localStorage.setItem('datas', JSON.stringify(this.datas))
              this.storeDataTimer()
          }, 5000)
      },
      getOffsetData () {
          let x = Math.floor(Math.random()*(this.parentWidth - this.dragWidth))
          let y = Math.floor(Math.random()*(this.parentHeight - this.dragHeight))
          return {x, y}
      },
      getItemOffset(item){
        item.zIndexNum = 16  // 新生成的Index最大
        let randomData = this.getOffsetData()
        console.log('随机x', randomData.x, randomData.y)
        // arrOffset.forEach(item => {
        //     if(item.x === randomData.x || item.y === randomData.y) {
        //         randomData = this.getOffsetData()
        //     }
        // })
        item.x= randomData.x
        item.y= randomData.y
        console.log('dataaa', this.datas)
      },
      handleLeftBlur() {
          if (this.tempName.trim() === '') {
              this.tempName = this.storeName
          } else {
              this.storeName = this.tempName
          }
          this.tempRightName = this.tempName
          this.showInputOne = false
      },
      handleRightBlur() {
          if (this.tempRightName.trim() === '') {
              this.tempRightName = this.storeName
          } else {
              this.storeName = this.tempRightName
          }
          this.tempName = this.tempRightName
          this.showInputTwo = false
      },
      handleEdit() {
        alert('编辑')
      },
      handleDelete(item) {
          // this.datas.splice(index, 1)
          console.log('组件删除', item)
          this.deleteFun(item)
          // some();
      },
      saveData () {
        console.log('保存数据', this.datas)
      },
      getDragIndex(item, y) { // 获取Z-Index 分层次不同zIndex不同
          console.log('改变zindex', y, this.parentHeight*3/4)
          if( (y< (this.parentHeight/6)) || (y >= (this.parentHeight*5/6)) ) {
              console.log('aaaassd11++ 10')
              item.zIndexNum = 10
          }
          if(((y>= (this.parentHeight/6)) && (y< (this.parentHeight/3))) || (y>=(this.parentHeight*2/3) && y< (this.parentHeight*5/6)) ) {
              console.log('12')
              item.zIndexNum = 12
          }
          if((y>=(this.parentHeight/3)) && (y<(this.parentHeight*2/3))) {
              console.log('15')
              item.zIndexNum = 15
          }
      },
      getRefLineParams(params) {
          const {vLine, hLine} = params
          this.vLine = vLine
          this.hLine = hLine
      },
      onDragCallback() {
          // console.log('line width', x,y,parseInt(getComputedStyle(this.$refs.commonLine).width))
          // const maxY = parseInt(getComputedStyle(this.$refs.commonLine).width)
          // if(x < 0 || y < 0 || y > 700 || x > (maxY - 100)) {
          //     return false
          // }
      },
      onDragStartCallback(item, e) {
          console.log('拖拽开始', item, e)
      },
      handleOnLine (item, x, y) {
        const lineUpMin = (this.parentHeight / 2) - this.dragHeight - (this.dragHeight / 2)
        const lineUpMax = (this.parentHeight / 2) - this.dragHeight + (this.dragHeight / 2)
        const lineDownMax = (this.parentHeight / 2) + (this.dragHeight / 2) + this.busLineHeight
        if (y >= lineUpMin && y < lineUpMax) { // 矩形在线的上半部分
            item.lineHeight = 50
            item.y = item.y - 50 - (item.y - ((this.parentHeight / 2) - this.dragHeight))
        }
        if (y >= lineUpMax && y < lineDownMax) { // 矩形在线的下半部分`
            item.lineHeight = 50
            item.y = lineDownMax
        }
      },
      onDragStop(item, x, y) {
          console.log('存储de', x, y)
          console.log('拖拽停止', item)
          console.log('aaaa', this.parentHeight)
          this.newDrag = ''
          item.zIndexNum = 10
          item.y = y
          this.getLineHeight(item, x, y)
          this.handleOnLine(item, x, y)
          // const lineUpMin = (this.parentHeight / 2) - this.dragHeight - (this.dragHeight / 2)
          // const lineUpMax = (this.parentHeight / 2) - this.dragHeight + (this.dragHeight / 2)
          // const lineDownMax = (this.parentHeight / 2) + (this.dragHeight / 2) + this.busLineHeight
          // if (y >= lineUpMin && y < lineUpMax) { // 矩形在线的上半部分
          //     item.lineHeight = 50
          //     item.y = item.y - 50 - (item.y - ((this.parentHeight / 2) - this.dragHeight))
          // }
          // if (y >= lineUpMax && y < lineDownMax) { // 矩形在线的下半部分
          //     item.lineHeight = 50
          //     item.y = lineDownMax
          // }
          this.getDragIndex(item, y)
      },
      getLineHeight(item, x, y) {
          console.log('sdfsd', this.dragHeight)
          const lineUp = (this.parentHeight / 2) - this.dragHeight
          const lineDown = (this.parentHeight / 2) + this.busLineHeight
          if (y > lineUp && y < lineDown) { // 矩形在线上时
              item.lineHeight = 0
          }
          if (y < lineUp) {
              // console.log('上面', lineUp)
              item.lineHeight = lineUp - y
          } else if (y > lineDown) {
              item.lineHeight = y - lineDown
          }
          // console.log('获取高度', item, x, y)
      },
      dragging(item, x, y) {
          item.zIndexNum = 20
          this.getLineHeight(item, x, y)
          item.y = y
          item.x = x
      },
      cardClick(item) {
          console.log('ssss', item)
          this.$emit('showDrawer', true)
          this.updateDrag(item)
          // alert(item.name)
      }
    }
}
</script>

<style scoped>
  .vdr {
    border: none;
  }
  .header {
    height: 60px;
    padding: 20px;
    border-bottom: 1px solid #cccccc;
  }

  .drag-box {
    width: 100%;
    height: 100%;
    position: relative;
    background: white;
    box-shadow: 0px 0px 10px 2px #cccccc;
  }
  .new-drag {
    box-shadow: 0px 0px 10px 2px #000;
  }

  .drag-container {
    width: 100%;
    height: 100%;
    /*margin-left: 100px;*/
    margin: 0 auto;
    /*background: #f0f0f0;*/
    position: relative;
    /*border: 1px solid rosybrown;*/
  }

  .line-name {
    /*width: 40px;*/
    /*height: 18px;*/
    background: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
    cursor: text;
    position: absolute;
    z-index: 100000;
    top: -20px;
    color: black;
    font-size: 14px;
    font-weight: bold;
  }

  .name-left {
    left: 0;
  }

  .name-right {
    right: 0;
  }

  .arrow {
    font-size: 12px;
    position: absolute;
    left: -5px;
    color: gray;
  }

  .arrow-up {
    top: -3px
  }

  .arrow-down {
    bottom: -3px;
  }

  .box-line {
    width: 2px;
    background: black;
    position: absolute;
    left: 50%;
  }

  .common-line {
    width: 120%;
    margin: 0 auto;
    background: black;
  }

  .drag-wrap {
    border: 1px solid #e6e6e6;
  }

  .drag-handle {
    cursor: move;
  }

  .box-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 50px;
    height: 110%;
    position: absolute;
    right: -40px;
    top: -8px;
  }

  .box-labels .ant-tag {
    margin: 0;
    height: 16px;
    transform: rotateZ(-15deg);
    line-height: 16px;
    /*margin-bottom: 4px;*/
    font-size: 12px;
    color: white;
    border-radius: 18px;
  }

  .operation {
    display: flex;
    background: #f0f0f0;
    width: 100%;
    height: 20px;
    border-top: 1px solid #ccc;
    /*margin-top:26px;*/
  }

  .operation-item {
    width: 50%;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
  }

  .drag-content {
    padding: 4px;
    box-sizing: border-box;
    position: relative;
  }

  .drag-content .badge {
    position: absolute;
    right: 4px;
    top: 20px;
  }

  .drag-content h2 {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    font-size: 16px;
    margin: 0;
    margin-bottom: 18px;
  }

  .content-source {
    font-size: 12px;
    color: gray;
    margin-bottom: 10px;
  }

  .operation-item:hover .operation-icon {
    color: dodgerblue;
    font-size: 12px;
  }

  .drag-parent {
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
