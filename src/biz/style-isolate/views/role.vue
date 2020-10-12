<template>
  <div class="g-box">
    <h-form label-width="100">
      <h-row :gutter="8">
        <h-col span="6">
          <h-form-item :label="$t('m.i.systemManagement.roleNum')+':'">
            <h-input type="text" v-model="filters.number"></h-input>
          </h-form-item>
        </h-col>
        <h-col span="6">
          <h-form-item :label="$t('m.i.systemManagement.roleName')+':'">
            <h-input type="text" v-model="filters.name"></h-input>
          </h-form-item>
        </h-col>
        <el-col span="4">
          <h-button type="primary" @on-click="search">{{$t('m.i.systemManagement.inquiry')}}</h-button>
          <h-button @on-click="reset">{{$t('m.i.systemManagement.reset')}}</h-button>
        </el-col>
      </h-row>
    </h-form>
    <div style="margin-top:1em;">
      <div style="margin-bottom:.8em;">
        <h-button-group>
          <h-button type="primary" @on-click="addRole">新增</h-button>
          <h-button @on-click="reset">删除</h-button>
          <h-button @on-click="reset">分配用户</h-button>
        </h-button-group>
      </div>
      <h-table
        border
        :columns="columns4"
        :data="data1"
        @on-select="selectOne"
        @on-select-all="selectAll"
        @on-selection-change="selectChange"
        @on-select-cancel="selectCancel"
      ></h-table>
    </div>
    <!-- 新增角色弹框 -->
    <h-msg-box
      v-model="addRoleMsg"
      :escClose="true"
      title="新增角色信息"
      @on-ok="ok"
      @on-cancel="cancel"
      :beforeEscClose="beforetest"
    >
      <h-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <h-form-item label="角色编号" prop="name">
          <h-input v-model="formValidate.name"></h-input>
        </h-form-item>
        <h-form-item label="角色名称" prop="mail">
          <h-input v-model="formValidate.mail"></h-input>
        </h-form-item>
        <h-form-item label="备注" prop="desc">
          <h-input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></h-input>
        </h-form-item>
      </h-form>
      <p slot="footer">
        <h-button @click="cancelMethod" type="primary">提交</h-button>
        <h-button type="primary" @click="confirmMethod">提交并继续授权</h-button>
      </p>
    </h-msg-box>
  </div>
</template>

<script>
export default {
  name: "role",
  components: {},
  data() {
    return {
      filters: {
        number: "",
        name: ""
      },
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "角色编号",
          key: "roleNum"
        },
        {
          title: "角色名称",
          key: "roleName"
        },
        {
          title: "备注",
          key: "address"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  }
                },
                "分配权限"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居"
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗"
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道"
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道"
        }
      ],
      addRoleMsg: false,
      ruleValidate: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
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
      },
      formValidate: {}
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    search() {
      console.log(1);
    },
    reset() {
      this.filters.number = "";
      this.filters.name = "";
    },
    selectOne(selection, row) {
      console.log("选中一条");
      console.log(selection);
      console.log(row);
    },
    selectCancel(selection, row) {
      console.log("取消一条");
      console.log(selection);
      console.log(row);
    },
    selectAll(selection) {
      console.log("全选");
      console.log(selection);
    },
    selectChange(selection) {
      console.log("CHANGE事件");
      console.log(selection);
    },
    addRole() {
      this.addRoleMsg = true;
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.g-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 8px 5px;
}
</style>
