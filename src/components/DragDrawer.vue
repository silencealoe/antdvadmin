<template>
  <div>
    <a-drawer
      title="组件编排"
      :width="400"
      placement="right"
      :closable="true"
      :visible="isVisible"
      :wrap-style="{ position: 'absolute', height:'100px'}"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" @submit="handleSubmit">
        <a-form-item label="组件名">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item label="实例数">
          <a-input-number   :min="1" :max="10" />
        </a-form-item>
        <a-form-item label="服务端口">
          <a-row align="middle">
            <a-col :span="11">
              <a-input addon-before="端口名称"  placeholder="请输入" />
            </a-col>
            <a-col :span="10">
              <a-input addon-before="端口号"  placeholder="请输入" />
            </a-col>
            <a-col :span="3" align="center">
              <a-icon type="plus-circle" theme="twoTone" style="font-size: 20px;vertical-align: middle"/>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="外部访问">
          <a-switch default-checked>
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item label="覆盖启动脚本">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="启动参数">
          <a-row align="middle">
            <a-col :span="11">
              <a-input addon-before="key"  placeholder="请输入" />
            </a-col>
            <a-col :span="10">
              <a-input addon-before="value"  placeholder="请输入" />
            </a-col>
            <a-col :span="3" align="center">
              <a-icon type="plus-circle" theme="twoTone" style="font-size: 20px;vertical-align: middle"/>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="环境变量">
          <a-row align="middle">
            <a-col :span="11">
              <a-input addon-before="key"  placeholder="请输入" />
            </a-col>
            <a-col :span="10">
              <a-input addon-before="value"  placeholder="请输入" />
            </a-col>
            <a-col :span="3" align="center">
              <a-icon type="plus-circle" theme="twoTone" style="font-size: 20px;vertical-align: middle"/>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="节点偏好">
          <a-select mode="tags" style="width: 100%" placeholder="请选择节点偏好">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
              {{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="网卡">
          <a-select mode="tags" style="width: 100%" placeholder="请选择网卡">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
              {{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="存储">
          <a-select style="width: 100%;margin-bottom: 10px" placeholder="请选择存储">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
              {{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
          <a-input placeholder="请输入挂载路径"/>
        </a-form-item>
        <a-form-item label="健康检查">
          <a-select style="width: 100%;" placeholder="请选择检查方式">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
              {{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
        </a-form-item>
      </a-form>

    </a-drawer>
  </div>
</template>

<script>
export default {
  name: "DragDrawer",
  props: {
    visible: {
      type: Boolean,
      default() {
          return false
      }
    }
  },
  data() {
    return {
      isVisible: this.visible,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  computed: {
      formItemLayout() {
          const { layout } = this.form
          return layout === 'horizontal'
              ? {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 14 },
              }
              : {};
      },
      buttonItemLayout() {
          const { layout } = this.form
          return layout === 'horizontal'
              ? {
                  wrapperCol: { span: 14, offset: 4 },
              }
              : {};
      }
  },
  methods: {
    onClose() {
        this.$emit('update:visible', false)
        // this.visible= false
    },
    handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    },
    handleSelectChange(value) {
        console.log(value);
        this.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    },
  }
}
</script>

<style scoped>

</style>
