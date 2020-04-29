<template>
    <div class="antvtable">
      <h2>table</h2>
      <div class="add-btn">
        <a-button type="dashed" icon="plus" @click="showModal">添加数据</a-button>
      </div>
      <div class="tablelist">
        <a-table
          :columns="columns"
          :dataSource="data"
          :pagination="false"
          :scroll="{ x: 1500, y: 500 }"
        >
          <template slot="tags" slot-scope="tags">
            <a-tag
              v-for="tag in tags"
              color="geekblue"
              :key="tag"
            >
              {{tag}}
            </a-tag>
          </template>
          <template slot="action" slot-scope="text,record,index">
            <a-tooltip title="编辑"  class="actionIco">
              <a-icon type="edit" theme="twoTone" style="font-size: 20px"/>
            </a-tooltip>
            <a-tooltip title="删除" class="actionIco" style="font-size: 20px" @click="deleteItem(index)">
              <a-icon type="delete" theme="twoTone"/>
            </a-tooltip>
          </template>
        </a-table>
        <a-pagination
          :total="total"
          :pageSizeOptions="['5','10','20']"
          showSizeChanger
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pageSize"
          v-model="current"
          @showSizeChange="onShowSizeChange"
          @change="pageChange"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span v-if="props.value!=='50'">{{props.value}}条/页</span>
          </template>
        </a-pagination>
      </div>
      <a-modal title="添加数据" :maskClosable="false" v-model="visible" @ok="handleOk" okText="确定" cancelText="取消">
        <a-form :form="form">
          <a-form-item
            :label-col="{span:4}"
            :wrapper-col="{span:8}"
            label="Full Name"
          >
            <a-input
              v-decorator="['name',{ rules: [{ required: true, message: 'Please input your full name' }] }]"
              placeholder="Please input your name"
            />
          </a-form-item>
          <a-form-item
            :label-col="{span:4}"
            :wrapper-col="{span:8}"
            label="Age"
          >
            <a-input
              v-decorator="['age',{ rules: [{ required: checkNick, message: 'Please input your age' }] }]"
              placeholder="Please input your age"
            />
          </a-form-item>
          <a-form-item
            :label-col="{span:4}"
            :wrapper-col="{span:8}"
            label="Tag"
          >
            <a-input

              v-decorator="['tags',{ rules: [{ required: checkNick, message: 'Please input your tag' }] }]"
              placeholder="Please input your Tag"
            />
          </a-form-item>
          <a-form-item
            :label-col="{span:4}"
            :wrapper-col="{span:10}"
            label="Gender"
          >
            <a-input

              v-decorator="['gender',{ rules: [{ required: checkNick, message: 'Please input your gender' }] }]"
              placeholder="Please input your Gender"
            />
          </a-form-item>
          <a-form-item
            :label-col="{span:4}"
            :wrapper-col="{span:12}"
            label="Nationality"
          >
            <a-input

              v-decorator="['address',{ rules: [{ required: checkNick, message: 'Please input your nationality' }] }]"
              placeholder="Please input your Nationality"
            />
          </a-form-item>
          <a-form-item
            :label-col="{span:4}"
            :wrapper-col="{span:8}"
            label="Tel"
          >
            <a-input

              v-decorator="['tel',{ rules: [{ required: checkNick, message: 'Please input your tel' }] }]"
              placeholder="Please input your Tel"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <div class="download">
        <a-button type="primary" icon="download" @click="downloadTable">Export Data</a-button>
      </div>
    </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name:'Atable',
    data(){
      const columns = [
        { title: 'Full Name', width: 150, dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: 'Age', width: 150, dataIndex: 'age', key: 'age', fixed: 'left' },
        { title: 'Tag', width: 150, dataIndex: 'tags', key: 'tags',scopedSlots: {customRender: 'tags'}},
        { title: 'Nationality', dataIndex: 'address', key: 'address', width: 200 },
        { title: 'Gender', dataIndex: 'gender', key: 'gender', width: 200 },
        { title: 'Grade', dataIndex: 'grade', key: 'grade', width: 200 },
        { title: 'Integral', dataIndex: 'integral', key: 'integral'},
        { title: 'Tel', dataIndex: 'tel', key: 'tel', width: 200 },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ];
      return{
        columns,
        data:[
          {
            key:'1',
            name:'Alex',
            age:22,
            tags:['developer'],
            address:`Italy`,
            gender:'Male',
            grade:'1',
            integral:'20',
            tel:'12345678'
          },
          {
            key:'2',
            name:'Judy',
            age:28,
            tags:['teacher'],
            address:`london`,
            gender:'Female',
            grade:'4',
            integral:'10',
            tel:'987654321'
          },
          {
              key:'3',
              name:'Judy',
              age:28,
              tags:['teacher'],
              address:`london`,
              gender:'Female',
              grade:'4',
              integral:'10',
              tel:'987654321'
          },
          {
              key:'4',
              name:'Judy',
              age:28,
              tags:['teacher'],
              address:`london`,
              gender:'Female',
              grade:'4',
              integral:'10',
              tel:'987654321'
          },
          {
              key:'5',
              name:'Judy',
              age:21,
              tags:['teacher'],
              address:`london`,
              gender:'Female',
              grade:'4',
              integral:'10',
              tel:'987654321'
          },
          {
              key:'6',
              name:'Judy',
              age:28,
              tags:['teacher'],
              address:`london`,
              gender:'Female',
              grade:'4',
              integral:'10',
              tel:'987654321'
          }
        ],
        total: 0,
        current:1,
        pageSize:10,
        visible:false,
        form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        checkNick: false,
        addRowData:{}
      }
    },
    mounted() {
      this.init()
    },
    methods:{
      init(){
        this.total = this.data.length
      },
      showModal(){
        this.visible = true;
      },
      handleOk(){
        this.visible = false;
        this.form.validateFields((err,values)=>{
            console.log(values)
            this.addRowData = values
        })
        this.addRowData.tags = this.addRowData.tags.split(' ');
        this.addRowData['key'] = this.data.length+1+'';
        this.addRowData['grade'] = 0;
        this.addRowData['integral'] = 0;
        console.log(this.addRowData)
        this.data.push(this.addRowData);

      },
      downloadTable(){
          let content = '';
          const exportDate = JSON.parse(JSON.stringify(this.data));
          this.columns.forEach(item=>{
              if(item.title!=='Action'){
                content+=item.title+','
              }
          });
          content+='\n';
          exportDate.forEach(item=>{
              delete item.key
              const rowData = Object.values(item) // 得到属性值
              console.log(rowData)
              rowData.forEach(it=>{
                  content+='\t'+it+',' // 解决数字过长显示科学计数法
              })
              content+='\n' // 表格换行
          });
          const a=document.createElement('a');
          a.href='data:text/csv;charset=utf-8,\ufeff'+content;
          a.download=`${moment().format('YYYYMMDD')}_tableData.csv`;
          document.body.append(a);
          a.click();
          document.body.removeChild(a)
      },
      onShowSizeChange(current, pageSize) {
          this.pageSize = pageSize;
      },
      pageChange(page, pageSize){
        console.log(page,pageSize)
      },
      deleteItem(index){
        console.log(index)
        this.data.splice(index,1)
      }
    }
  }

</script>
<style>
  .antvtable{
    padding:20px;
    color:white
  }
  h2{
    width:100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: rgba(255,255,255,.1);
    color:white
  }
  .actionIco{
    margin-right: 10px;
  }
  .download .ant-btn-primary{
    display: block;
    width:120px;
    margin:50px auto;
    background: gray;
    border:none;
  }
  .download .ant-btn-primary:hover{
    background: #f0f0f0;
    color:black;
  }
  .add-btn{
    margin:10px 0;
  }
  /*.ant-table-fixed-left table, .ant-table-fixed-right table{*/
  /*  background: black;*/
  /*}*/

  /*.ant-table-thead th{*/
  /*  color: white !important;*/
  /*  background: rgba(0,0,0,.2) !important;*/
  /*}*/
  /*.ant-table-tbody td{*/
  /*  color:white;*/
  /*  background: rgba(0,0,0) !important;*/
  /*}*/
  /*.ant-table-tbody > tr > td,.ant-table-thead > tr > th{*/
  /*  border-bottom: 1px sandybrown solid;*/
  /*}*/
.ant-pagination{
  color:white;
  float: right;
  margin-top:20px;
}

</style>
