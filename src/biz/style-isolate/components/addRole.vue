<template>
  <div>
    <h-form ref="formValidate" :model="formValidate" :label-width="120" label-position="left">
      <!-- :rules="ruleValidate" 校验规则-->
      <div class="g-pro">项目信息</div>
      <h-row>
        <h-col span="12">
          <h-form-item label="项目名称:" prop="name">
            <h-input v-model="formValidate.name"></h-input>
          </h-form-item>
        </h-col>
        <h-col span="12">
          <h-form-item label="注册批文号:" prop="mail">
            <h-input v-model="formValidate.mail"></h-input>
          </h-form-item>
        </h-col>
        <h-col span="12">
          <h-form-item label="发行总额(亿):" prop="mail">
            <h-typefield type="money"></h-typefield>
          </h-form-item>
        </h-col>
      </h-row>

      <div class="g-pro">项目信息</div>
      <h-row>
        <h-col span="12">
          <h-form-item label="城市" prop="city">
            <h-select v-model="formValidate.city" placeholder="请选择所在地">
              <h-option value="beijing">北京市</h-option>
              <h-option value="shanghai">上海市</h-option>
              <h-option value="shenzhen">深圳市</h-option>
            </h-select>
          </h-form-item>
        </h-col>
      </h-row>

      <h-form-item label="选择日期">
        <h-row>
          <h-col span="11">
            <h-form-item prop="date">
              <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></h-date-picker>
            </h-form-item>
          </h-col>
          <h-col span="2" style="text-align: center">-</h-col>
          <h-col span="11">
            <h-form-item prop="time">
              <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></h-time-picker>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form-item>
      <h-form-item label="性别" prop="gender">
        <h-radio-group v-model="formValidate.gender">
          <h-radio label="male">男</h-radio>
          <h-radio label="female">女</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="爱好" prop="interest">
        <h-checkbox-group v-model="formValidate.interest">
          <h-checkbox label="吃饭"></h-checkbox>
          <h-checkbox label="睡觉"></h-checkbox>
          <h-checkbox label="跑步"></h-checkbox>
          <h-checkbox label="看电影"></h-checkbox>
        </h-checkbox-group>
      </h-form-item>
      <h-form-item label="介绍" prop="desc">
        <h-input
          v-model="formValidate.desc"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="请输入..."
        ></h-input>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formValidate')">提交</h-button>
        <h-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "至少选择一个爱好",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "最多选择两个爱好",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "请选择时间",
            trigger: "change"
          }
        ],
        desc: [
          { required: true, message: "请输入个人介绍", trigger: "blur" },
          {
            type: "string",
            min: 20,
            message: "介绍不能少于20字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("提交成功!");
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.g-pro {
  line-height: 34px;
  font-weight: 700;
  font-size: 16px;
  background-color: #f7f7f7;
  text-indent: 1em;
  border: 1px solid #d7d7d7;
  border-bottom: none;
}
.h-row {
  border: 1px solid #d7d7d7;
  padding: 8px 4px;
  margin-bottom: 10px;
  .h-col {
    padding: 0 6px;
  }
}
</style>