<template>
  <div>
    <h-form ref="assginUsersForm" :model="assginUsersForm" :label-width="100">
      <h-row style="margin-top:8px;">
        <h-col span="8">
          <h-form-item :label="$t('m.i.systemManagement.userNum')">
            <h-input v-model="assginUsersForm.roleNum"></h-input>
          </h-form-item>
        </h-col>
        <h-col span="8">
          <h-form-item :label="$t('m.i.systemManagement.userName')">
            <h-input v-model="assginUsersForm.roleName"></h-input>
          </h-form-item>
        </h-col>
        <h-col span="8">
          <h-form-item :label="$t('m.i.systemManagement.userCategory')">
            <h-select v-model="model1">
              <h-option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</h-option>
            </h-select>
          </h-form-item>
        </h-col>
        <h-col span="8">
          <h-form-item
            :label="$t('m.i.systemManagement.distribution')"
            :label-width="lang=='zh-CN'||lang=='zh-TW'?100:140"
          >
            <h-select v-model="model1">
              <h-option
                v-for="item in distributionList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</h-option>
            </h-select>
          </h-form-item>
        </h-col>
        <h-col span="8">
          <h-form-item :label="$t('m.i.systemManagement.organization')">
            <h-select v-model="model1">
              <h-option
                v-for="item in distributionList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</h-option>
            </h-select>
          </h-form-item>
        </h-col>
        <h-col span="7" :offset="1">
          <h-button type="primary" @on-click="search">{{$t('m.i.systemManagement.inquiry')}}</h-button>
          <h-button>{{$t('m.i.systemManagement.reset')}}</h-button>
        </h-col>
      </h-row>
    </h-form>
    <h-table
      border
      :columns="columns"
      :data="userData"
      @on-select="selectOne"
      @on-select-all="selectAll"
      @on-selection-change="selectChange"
      @on-select-cancel="selectCancel"
      stripe
    ></h-table>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      assginUsersForm: {
        roleNum: "",
        roleName: "",
        remarks: ""
      },
      lang: "",
      userData: [
        {
          userNum: 123123,
          userName: "张三",
          organization: "北京市朝阳区芍药居",
          allocation: 1,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        },
        {
          userNum: 123123,
          userName: "李四",
          organization: "北京市朝阳区芍药居",
          allocation: 2,
          userCategory: "类别",
          userStatus: "正常"
        }
      ],
      cityList: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        },
        {
          value: "shenzhen",
          label: "深圳市"
        },
        {
          value: "hangzhou",
          label: "杭州市"
        },
        {
          value: 1,
          label: "南京市"
        },
        {
          value: 2,
          label: "重庆市"
        }
      ],
      distributionList: [
        {
          value: 1,
          label: this.$t("m.i.systemManagement.yes")
        },
        {
          value: 2,
          label: this.$t("m.i.systemManagement.no")
        }
      ]
    };
  },
  created() {
    this.lang = this.$i18n.locale;
  },
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
          title: self.$t("m.i.systemManagement.organization"),
          key: "organization",
          width: 180
        },
        {
          title: self.$t("m.i.systemManagement.allocation"),
          key: "allocation",
          render:(h,params)=>{
              const row = params.row
              const color = row.allocation==1?'red':'green'
              const text = row.allocation==1?'未分配':'已分配'
              return h('span',{
                style:{
                  color:color
                }
              },text)
          }
        },
        {
          title: self.$t("m.i.systemManagement.userCategory"),
          key: "userCategory"
        },
        {
          title: self.$t("m.i.systemManagement.userStatus"),
          key: "userStatus"
        }
      ];
    }
  },
  methods: {},
  watch: {}
};
</script>

<style scoped lang="scss">
</style>
