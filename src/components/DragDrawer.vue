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
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="组件名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item label="Gender" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]"
            placeholder="Select a option and change input text above"
            @change="handleSelectChange"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
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
