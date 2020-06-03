<template>
  <div>
    <div class="tabs">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="拓扑结构">
          <a-row style="margin-bottom: 20px">
            <a-col :span="6">
              <a-tree-select
                v-model="value"
                show-search
                style="width: 100%"
                :tree-data="treeData"
                allow-clear
                multiple
                tree-default-expand-all
                :filterTreeNode="fillterFun"
                @change="onChange"
                @deselect="onDeselect"
                @select="onselect"
                placeholder="镜像搜索"
              />
            </a-col>
            <a-col :span="18" align="right">
              <a-button @click="save" type="primary">保存</a-button>
            </a-col>
          </a-row>
          <a-row style="position: relative;background: #f6f6f6;padding: 15px;min-height: 600px">
            <a-col>
              <DragComponent :deleteFun="deleteFun" ref="dragChild" @showDrawer="showDrawer" :dragData="selectDatas"></DragComponent>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="列表">
          Content of Tab Pane 2
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-drawer
      title="组件编排"
      placement="right"
      :closable="true"
      :visible="visible"
      :wrap-style="{ position: 'absolute', height:'100px'}"
      @close="onClose"
    >
    </a-drawer>
  </div>


</template>

<script>
import DragComponent from "../components/DragComponent";
export default {
  name: 'dragPages',
  components: {
      DragComponent
  },
  data () {
    const treeData = [
          {
              title: '运维',
              value: '0',
              key: '0',
              children: [
                  {
                      title: 'apollo',
                      value: '01',
                      key: '01',
                      x: 100,
                      y: 100,
                      lineHeight: 100,
                      zIndexNum: 20,
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
                      zIndexNum: 10,
                      x: 200,
                      y: 200,
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
              children: [
                  {
                      title: 'Mysql',
                      value: '11',
                      key: '11',
                      count: 10,
                      lineHeight: 100,
                      zIndexNum: 10,
                      x: 450,
                      y: 450,
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
            children: [
                {
                    title: 'CDR',
                    value: '21',
                    key: '21',
                    count: 10,
                    lineHeight: 100,
                    zIndexNum: 10,
                    x: 250,
                    y: 450,
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
                    count: 10,
                    lineHeight: 100,
                    zIndexNum: 10,
                    x: 0,
                    y: 550,
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
                    count: 10,
                    lineHeight: 100,
                    zIndexNum: 10,
                    x: 0,
                    y: 450,
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
                    count: 10,
                    lineHeight: 100,
                    zIndexNum: 10,
                    x: 250,
                    y: 450,
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
                    lineHeight: 100,
                    zIndexNum: 10,
                    x: 250,
                    y: 250,
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
      selectDatas: []
    }
  },
  methods: {
    callback(){},
    onClose() {
      this.visible= false
    },
    showDrawer(val) {
      this.visible = val
    },
    save() {
        console.log('children', this.$refs)
        this.$refs.dragChild.saveData()
    },
    onselect(val, e) {
      console.log(val)
      console.log(e)
      this.selectDatas.push(e.dataRef)
      console.log('选择', this.selectDatas)
    },
    onDeselect (val, option) {
      console.log('quxiao', val, option)
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
    fillterFun (searchVal, treeNode) {
      console.log(treeNode)
      return treeNode.data.props.title.includes(searchVal)
    },
    deleteFun() {
        console.log('执行了删除')
        // this.$message.error('执行了删除')
    }
  }


}
</script>

<style scoped>

</style>
