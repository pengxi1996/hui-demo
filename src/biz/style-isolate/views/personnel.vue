<template>
  <div class="g-box">
    <h-form label-width="100">
      <h-row :gutter="8">
        <h-col span="6">
          <h-form-item :label="$t('m.i.systemManagement.userNum')+':'">
            <h-input type="text" v-model="filters.number"></h-input>
          </h-form-item>
        </h-col>
        <h-col span="6">
          <h-form-item :label="$t('m.i.systemManagement.userName')+':'">
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
      <div class="g-button">
        <h-button-group>
          <h-button type="primary" @on-click="addRole">{{$t('m.i.systemManagement.add')}}</h-button>
        </h-button-group>
        <h-button-group>
          <h-button @on-click="addRole">{{$t('m.i.systemManagement.logout')}}</h-button>
          <h-button @on-click="addRole">{{$t('m.i.systemManagement.activate')}}</h-button>
        </h-button-group>
        <h-button-group>
          <h-button @on-click="addRole">{{$t('m.i.systemManagement.freeze')}}</h-button>
          <h-button @on-click="addRole">{{$t('m.i.systemManagement.thaw')}}</h-button>
        </h-button-group>
      </div>
      <h-table
        border
        :columns="columns"
        :data="data1"
        @on-select="selectOne"
        @on-select-all="selectAll"
        @on-selection-change="selectChange"
        @on-select-cancel="selectCancel"
        stripe
      ></h-table>
      <div class="g-page">
        <h-page
          :total="filters.total"
          :page-size="filters.pageSize"
          :current="filters.pageIndex"
          size="small"
          show-elevator
          show-sizer
          @on-change="handlePageChange"
          @on-page-size-change="handlePageSizeChange"
        ></h-page>
      </div>
    </div>
    <!-- 新增角色弹框 -->
    <h-msg-box
      v-model="addRoleMsg"
      :escClose="true"
      :title="$t('m.i.systemManagement.addMsg')"
      @on-ok="ok"
      @on-cancel="cancel"
      :beforeEscClose="beforetest"
    >
      <h-form ref="addRoleForm" :model="addRoleForm" :rules="ruleValidate" :label-width="100">
        <h-form-item :label="$t('m.i.systemManagement.roleNum')" prop="roleNum">
          <h-input v-model="addRoleForm.roleNum"></h-input>
        </h-form-item>
        <h-form-item :label="$t('m.i.systemManagement.roleName')" prop="roleName">
          <h-input v-model="addRoleForm.roleName"></h-input>
        </h-form-item>
        <h-form-item :label="$t('m.i.systemManagement.userStatus')" prop="remarks">
          <h-input
            v-model="addRoleForm.remarks"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></h-input>
        </h-form-item>
      </h-form>
      <p slot="footer">
        <h-button @click="cancelMethod" type="primary">{{$t('m.i.systemManagement.submit')}}</h-button>
        <h-button type="primary" @click="confirmMethod">{{$t('m.i.systemManagement.submit2')}}</h-button>
      </p>
    </h-msg-box>
    <!-- 分配用户弹框 -->
    <h-msg-box
      v-model="assginUsersMsg"
      :escClose="true"
      @on-ok="ok"
      @on-cancel="cancel"
      :beforeEscClose="beforetest"
      width="850"
      maxHeight="400"
      top="50"
    >
      <assginUsers></assginUsers>
    </h-msg-box>
  </div>
</template>

<script>
import { assginUsers } from "../components/index.js";
export default {
  name: "role",
  components: {
    assginUsers
  },
  data() {
    return {
      filters: {
        number: "",
        name: "",
        total: 40,
        pageIndex: 1,
        pageSize: 10
      },
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
      assginUsersMsg: false,
      ruleValidate: {
        roleNum: [
          {
            required: true,
            message: this.$t("m.i.systemManagement.addRuleMsg_1"),
            trigger: "blur"
          }
        ],
        roleName: [
          {
            required: true,
            message: this.$t("m.i.systemManagement.addRuleMsg_2"),
            trigger: "blur"
          }
        ]
      },
      addRoleForm: {
        roleNum: "",
        roleName: "",
        remarks: ""
      },
      value: "test"
    };
  },
  created() {},
  mounted() {},
  computed: {
    columns() {
      let self = this;
      return [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: self.$t("m.i.systemManagement.userNum"),
          key: "userNum"
        },
        {
          title: self.$t("m.i.systemManagement.userName"),
          key: "userName"
        },
        {
          title: self.$t("m.i.systemManagement.userStatus"),
          key: "userStatus"
        },
        {
          title: self.$t("m.i.systemManagement.workingStatus"),
          key: "workingStatus",
          width: 120
        },
        {
          title: self.$t("m.i.systemManagement.cellphoneNumber"),
          key: "cellphoneNumber",
          width: 140
        },
        {
          title: self.$t("m.i.systemManagement.email"),
          key: "email",
          width: 120
        },
        {
          title: self.$t("m.i.systemManagement.creationDate"),
          key: "creationDate",
          width: 120
        },
        {
          title: self.$t("m.i.systemManagement.creator"),
          key: "creator"
        },
        {
          title: self.$t("m.i.systemManagement.modifiedDate"),
          key: "modifiedDate",
          width: 120
        },
        {
          title: self.$t("m.i.systemManagement.editor"),
          key: "editor"
        },
        {
          title: self.$t("m.i.systemManagement.lastLoginTime"),
          key: "lastLoginTime",
          width: 140
        },
        {
          title: self.$t("m.i.systemManagement.remarks"),
          key: "remarks"
        },

        {
          title: self.$t("m.i.systemManagement.operate"),
          key: "action",
          fixed: "right",
          width: 160,
          align:'center',
          render: (h, params) => {
            let that = params;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      self.assginPer(that);
                    }
                  }
                },
                self.$t("m.i.systemManagement.authorize")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      self.edit(that);
                    }
                  }
                },
                self.$t("m.i.systemManagement.edit")
              )
            ]);
          },
          className: "table-info-column"
        }
      ];
    }
  },
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
    },
    handlePageChange(val) {
      console.log(val);
    },
    handlePageSizeChange(val) {
      console.log(val);
    },
    custom() {
      this.$hMsgBox.confirm({
        title: this.$t("m.i.systemManagement.confirm"),
        render: h => {
          return h("p", {
            domProps: {
              innerHTML: this.$t("m.i.systemManagement.confirmDel")
            }
          });
        },
        okText: this.$t("m.i.systemManagement.determine"),
        cancelText: this.$t("m.i.systemManagement.cancel"),
        onOk: () => {
          this.$hMessage.info("点击了确定");
        }
      });
    },
    edit(e) {
      console.log("点击了编辑按钮");
    },
    assginPer(val) {
      console.log("点击了分配权限按钮");
      console.log(val);
    },
    assginUsers() {
      this.assginUsersMsg = true;
    },
    beforetest() {
      console.log("关闭弹框");
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
.g-button {
  margin-bottom: 0.8em;
}
.h-btn-group {
  margin-right: 1em;
}
/deep/ .table-info-column div .h-btn-text {
  color: #3696f4;
}
</style>
