<template>
  <div style="background: white; height: 100vh;position: relative">
    <div>
      <vdr :w="200" :h="100" :on-drag="onDragCallback" @dragging="(left, top) => dragging(index, left, top)" :x="item.x" :y="item.y" :resizable="false" v-for="(item, index) in data" :key="item.id">
        <div class="drag-box">
          <h2>{{item.name}}</h2>
          <p :style="[{width:'2px',height:item.lineHeight + 'px',background:'black',position:'absolute',left:'50%'}, positionStyle(item)]"></p>
        </div>
      </vdr>
      <div class="common-line" style="width:90%;position: absolute;top:400px;left:100px" ref="commonLine"></div>
<!--      <vdr-->
<!--        :w="200"-->
<!--        :h="200"-->
<!--        :parent="true"-->
<!--        :debug="false"-->
<!--        :min-width="200"-->
<!--        :min-height="200"-->
<!--        :isConflictCheck="true"-->
<!--        :snap="true"-->
<!--        :snapTolerance="20"-->
<!--      >-->
<!--      </vdr>-->
    </div>
  </div>
</template>
<!--<vue-draggable-resizable :w="200" :h="200" @dragging="onDrag" @dragstop="onDragStop">-->
<!--  <p>{{ dragging ? 'You are dragging me crazy' : 'Standing still' }}</p>-->
<!--</vue-draggable-resizable>-->


<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
export default {
  name: "dragCompo",
  components: { vdr },
  data () {
    return {
      // width: 0,
      // height: 0,
      // curX: 0,
      // isTop: true,
      data: [
          {
              id: '1',
              name: 'drag Name',
              x: 100,
              y: 200,
              lineHeight: 100,
              curY: 0,
              topNum: 98,
              botNum: 0
          },
          {
              id: '2',
              name: 'drag Name2',
              x: 200,
              y: 200,
              lineHeight: 100,
              curY: 0,
              topNum: 98,
              botNum: 0
          },
          {
              id: '3',
              name: 'drag Name3',
              x: 600,
              y: 200,
              lineHeight: 100,
              curY: 0,
              topNum: 98,
              botNum: 0
          },
          {
              id: '4',
              name: 'drag Name4',
              x: 600,
              y: 500,
              lineHeight: 100,
              curY: 0,
          }
      ]
    }
  },
  computed: {
    positionStyle () {
        return function (item) {
            if (item.y > 400) {
                console.log('jisuanshuxing', item.y)
                return {
                    bottom: 82 + 'px'
                }
            } else if (item.y < 400){
                return {
                    top: 98 + 'px'
                }
            }
        }
    }
  },
  mounted() {
      // console.log('common line', this.$refs.commonLine.style.top)
      // this.curY = 200
  },
  methods: {
    // onResize: function (x, y, width, height) {
    //     this.x = x
    //     this.y = y
    //     this.width = width
    //     this.height = height
    // },
    onDragCallback (x) {
        console.log(this.$refs.commonLine.style.width)
        if(x <= 100) {
            return false
        }
    },
    dragging(index,x,y) {
        console.log('left:', x)
        console.log('top:', y)
        this.data[index].curY = this.data[index].y
        console.log('cur', this.data[index].curY)
        if(y < 400) {
            if(y > this.data[index].curY) {
                console.log('减小')
                this.data[index].lineHeight = this.data[index].lineHeight - (y - this.data[index].curY)
                // if(this.data[index].lineHeight<=100) {
                //     this.data[index].lineHeight = 100
                // }
            } else if(y< this.data[index].curY) {
                console.log('增加', this.data[index].lineHeight)
                this.data[index].lineHeight = this.data[index].lineHeight + (this.data[index].curY - y)
            } else {
                // this.data[index].lineHeight = 100
            }
        } else if(y > 400) {
            // this.data[index].lineHeight = 0
            if(y > this.data[index].curY) {
                console.log('增加', this.data[index].lineHeight)
                this.data[index].lineHeight = this.data[index].lineHeight + (y - this.data[index].curY)
            } else if(y< this.data[index].curY) {
                console.log('减小')
                this.data[index].lineHeight = this.data[index].lineHeight - (this.data[index].curY - y)
            } else {
                // this.data[index].lineHeight = 100
            }
        }
        this.data[index].curY = y
        this.data[index].y = y
        this.data[index].x = x
        console.log('height', this.data[index].lineHeight)

    }
  }
}
</script>

<style scoped>
  .drag-box{
    width:200px;
    height: 100px;
    border:2px solid black;
    position: relative;
  }
  .box-line{
    width: 2px;
    background: black;
    position: absolute;
    left:50%;
  }
  .common-line{
    width: 90%;
    height: 4px;
    background: black;
  }

</style>
