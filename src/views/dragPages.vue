<template>
  <div>
    <div class="tabs">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="拓扑结构">
          <a-row style="margin-bottom: 20px">
            <a-col :span="12">
              <span style="margin-right: 10px">镜像搜索:</span>
              <a-tree-select
                v-model="value"
                show-search
                style="min-width: 50%;max-width: 100%"
                :tree-data="treeData"
                allow-clear
                multiple
                tree-default-expand-all
                :filterTreeNode="fillterFun"
                @change="onChange"
                @deselect="onDeselect"
                @select="onselect"
                placeholder="请选择镜像"
              />
            </a-col>
            <a-col :span="12" align="right">
              <a-button @click="save" type="primary">保存</a-button>
            </a-col>
          </a-row>
          <a-row style="position: relative;background: #f6f6f6;padding: 15px;min-height: 600px">
            <a-col>
              <DragComponent
                :deleteFun="deleteFun"
                :updateDrag="updateDrag"
                ref="dragChild"
                :dragData="selectDatas"
                :isSelect.sync="isSelect"
                @dragClick="dragClick"
              ></DragComponent>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="列表">
          Content of Tab Pane 2
        </a-tab-pane>
      </a-tabs>
    </div>
    <DragDrawer :visible.sync="visible" v-if="visible"></DragDrawer>
  </div>


</template>

<script>
import DragDrawer from "../components/DragDrawer";
import DragComponent from "../components/DragComponent";
import axios from 'axios'
export default {
  name: 'dragPages',
  components: {
      DragComponent,
      DragDrawer
  },
  data () {
    const treeData = [
          {
              title: '运维',
              value: '0',
              key: '0',
              selectable: false,
              children: [
                  {
                      title: 'apollo',
                      value: '01',
                      key: '01',
                      source: 'SME',
                      lineHeight: 100,
                      // zIndexNum: 20,
                      count: 2,
                      labels: [
                          {
                              id: '1',
                              name: 'VLAN2'
                          },
                          {
                              id: '2',
                              name: 'VLAN3'
                          },
                          {
                              id: '3',
                              name: 'VLAN4'
                          }
                      ]
                  },
                  {
                      title: 'zipkin',
                      value: '02',
                      key: '02',
                      count: 10,
                      lineHeight: 100,
                      // zIndexNum: 10,
                      source: 'SME',
                      labels: [
                          {
                              id: '1',
                              name: 'VLAN2'
                          },
                          {
                              id: '2',
                              name: 'VLAN3'
                          },
                          {
                              id: '3',
                              name: 'VLAN4'
                          }
                      ]
                  }
              ],
          },
          {
              title: '数据库',
              value: '1',
              key: '1',
              selectable: false,
              children: [
                  {
                      title: 'Mysql',
                      value: '11',
                      key: '11',
                      count: 10,
                      source: 'SME',
                      lineHeight: 100,
                      // zIndexNum: 10,
                      labels: [
                          {
                              id: '1',
                              name: 'VLAN2'
                          },
                          {
                              id: '2',
                              name: 'VLAN3'
                          },
                          {
                              id: '3',
                              name: 'VLAN4'
                          }
                      ]
                  }
              ]
          },
          {
            title: 'EOP',
            value: '2',
            key: '2',
            selectable: false,
            children: [
                {
                    title: 'CDR',
                    value: '21',
                    key: '21',
                    source: 'SME',
                    count: 10,
                    lineHeight: 100,
                    // zIndexNum: 10,
                    labels: [
                        {
                            id: '1',
                            name: 'VLAN2'
                        },
                        {
                            id: '2',
                            name: 'VLAN3'
                        },
                        {
                            id: '3',
                            name: 'VLAN4'
                        }
                    ]
                },
                {
                    title: 'MGR',
                    value: '22',
                    key: '22',
                    source: 'SME',
                    count: 10,
                    lineHeight: 100,
                    // zIndexNum: 10,
                    labels: [
                        {
                            id: '1',
                            name: 'VLAN2'
                        },
                        {
                            id: '2',
                            name: 'VLAN3'
                        },
                        {
                            id: '3',
                            name: 'VLAN4'
                        }
                    ]
                },
                {
                    title: 'NI',
                    value: '23',
                    key: '23',
                    source: 'SME',
                    count: 10,
                    lineHeight: 100,
                    // zIndexNum: 10,
                    labels: [
                        {
                            id: '1',
                            name: 'VLAN2'
                        },
                        {
                            id: '2',
                            name: 'VLAN3'
                        },
                        {
                            id: '3',
                            name: 'VLAN4'
                        }
                    ]
                },
                {
                    title: 'CDR',
                    value: '24',
                    key: '24',
                    source: 'SME',
                    count: 10,
                    lineHeight: 100,
                    // zIndexNum: 10,
                    labels: [
                        {
                            id: '1',
                            name: 'VLAN2'
                        },
                        {
                            id: '2',
                            name: 'VLAN3'
                        },
                        {
                            id: '3',
                            name: 'VLAN4'
                        }
                    ]
                },
                {
                    title: 'SI',
                    value: '25',
                    key: '25',
                    count: 10,
                    source: 'SME',
                    lineHeight: 100,
                    // zIndexNum: 10,
                    labels: [
                        {
                            id: '1',
                            name: 'VLAN2'
                        },
                        {
                            id: '2',
                            name: 'VLAN3'
                        },
                        {
                            id: '3',
                            name: 'VLAN4'
                        }
                    ]
                }
            ]
        }
      ];
    return {
      value: undefined,
      treeData,
      visible: false,
      selectDatas: [],
      isSelect: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init () {
        // this.selectDatas = [
        //     {
        //         parent: 'EOP',
        //         title: 'SI',
        //         value: '25',
        //         key: '25',
        //         count: 10,
        //         source: 'SME',
        //         lineHeight: 100,
        //         zIndexNum: 10,
        //         x: 200,
        //         y: 200,
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
        //     }
        // ] // 从接口中取数据
        axios.get('http://rap2.taobao.org:38080/app/mock/249262/componentData').then(res => {
            console.log('获取的数据',res.data.data)
            this.selectDatas = res.data.data
            if (this.selectDatas.length) {
                this.value = this.selectDatas.map(item=>{
                    return item.value
                })
            }
        })
    },
    callback(){},
    onClose() {
      this.visible= false
    },
    showDrawer(val) {
      console.log('show', val)
      this.visible = val
    },
    save() {
        console.log('children', this.selectDatas) // 改变后的数据
        this.$refs.dragChild.saveData()
    },
    onselect(val, e) {
      console.log(val)
      console.log(e)
      const tempObj = JSON.parse(JSON.stringify(e.dataRef))
      // this.getItemOffset(tempObj)
      tempObj.parent = e.$parent.dataRef.title
      this.isSelect = true
      this.selectDatas.push(tempObj)
      console.log('选择', this.selectDatas)
    },
    onDeselect (val, option) {
      console.log('quxiao', val, option)
        this.isSelect = false
        this.selectDatas = this.selectDatas.filter(item=>{
          return item.value !== val
      })
      console.log('删除', this.selectDatas)
    },
    onChange(value, e) {
        console.log('change')
        console.log(e)
        console.log('len', value.length)
        this.value = value
        if(!value.length) {
            console.log('aaaa')
            this.selectDatas = []
        }
    },
    dragClick(item) { // 点击每一个dragcom
        console.log('canshu', item)
        this.visible = true
    },
    fillterFun (searchVal, treeNode) {
      console.log(treeNode)
      return treeNode.data.props.title.includes(searchVal)
    },
    updateDrag (item) {
        console.log('编辑的数据', item)
        this.$message.warn(`编辑的数据${item}`)
    },
    deleteFun(item) {
        this.isSelect = false
        console.log('执行了删除', item)
        this.selectDatas = this.selectDatas.filter(it => {
            return it.value !== item.value
        })
        if(this.selectDatas.length) {
            this.value = this.selectDatas.map(item=>{
                return item.value
            })
        }
        // this.$message.error('执行了删除')
    }
  }


}
</script>

<style scoped>

</style>
