<template>
  <div>
    <h-row style="margin-bottom:6px;">
      <h-col span="4">
        <h-input
          v-model="value"
          placeholder="请输入姓名"
          maxlength="8"
          @on-enter="searchName"
          clearable
          @on-clear="nameSearch=false"
        ></h-input>
      </h-col>
      <h-col span="4" :offset="1">
        <h-select v-model="model" placeholder="请选择性别" @on-change="search">
          <h-option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</h-option>
        </h-select>
      </h-col>
      <h-col span="6" :offset="1">
        <h-date-picker
          v-model="dateVal"
          type="daterange"
          placement="bottom-end"
          placeholder="选择日期"
          style="width: 200px"
          @on-change="changeVal"
        ></h-date-picker>
      </h-col>
    </h-row>
    <h-row>
      <h-col span="4" v-show="nameSearch">
        <h-alert show-icon>对姓名进行搜索</h-alert>
      </h-col>

      <h-col span="4" v-show="dateSearch" :push="nameSearch?6:10">
        <h-alert show-icon>对日期进行搜索</h-alert>
      </h-col>
    </h-row>
    <h-table
      :columns="columns"
      :data="data |pagination(currentPage,pageSize)"
      size="small"
      ref="table"
    ></h-table>
    <div>
      <div style="margin-top:5px;display:flex;justify-content:flex-end;">
        <h-page
          :total="data.length"
          show-sizer
          :page-size-opts="[1,2,3,4] "
          :page-size="pageSize"
          :current-page="currentPage"
          @on-change="handleCurrentChange"
          @on-page-size-change="handleSizeChange"
        ></h-page>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "姓名",
          key: "name",
          fixed: "left",
          width: 200
        },
        {
          title: "性别",
          key: "sex",
          filters: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.sex == "男";
            } else if (value === 2) {
              return row.sex == "女";
            }
          }
        },
        {
          title: "年龄",
          key: "age",
          sortable: true
        },
        {
          title: "生日",
          key: "date",
          width: 300,
          sortable: true
        }
      ],
      data: [
        {
          name: "张三",
          sex: "男",
          age: 22,
          date: "1993/02/01"
        },
        {
          name: "李四",
          sex: "男",
          age: 24,
          date: "1995/02/01"
        },
        {
          name: "王五",
          sex: "男",
          age: 26,
          date: "1991/02/01"
        },
        {
          name: "张大妈",
          sex: "女",
          age: 46,
          date: "1971/02/03"
        },
        {
          name: "王大妈",
          sex: "女",
          age: 56,
          date: "1941/06/08"
        },
        {
          name: "阿萨德我",
          sex: "女",
          age: 26,
          date: "1993/05/01"
        }
      ],
      sexList: [
        { label: "男", value: 1 },
        { label: "女", value: 2 }
      ],
      model: "",
      value: "",
      nameSearch: false,
      dateSearch: false,
      dateVal: [],
      pageSize: 1,
      currentPage: 1
    };
  },
  methods: {
    search() {
      this.data = [
        {
          name: "张三",
          sex: "男",
          age: 22,
          date: "1993/02/01"
        },
        {
          name: "李四",
          sex: "男",
          age: 24,
          date: "1995/02/01"
        },
        {
          name: "王五",
          sex: "男",
          age: 26,
          date: "1991/02/01"
        },
        {
          name: "张大妈",
          sex: "女",
          age: 46,
          date: "1971/02/03"
        },
        {
          name: "王大妈",
          sex: "女",
          age: 56,
          date: "1941/06/08"
        },
        {
          name: "阿萨德我",
          sex: "女",
          age: 26,
          date: "1993/05/01"
        }
      ];
      if (this.model) {
        if (this.model == 1) {
          this.data = this.data.filter(item => {
            return item.sex == "男";
          });
        } else if (this.model == 2) {
          this.data = this.data.filter(item => {
            return item.sex == "女";
          });
        }
      } else {
        this.data = [
          {
            name: "张三",
            sex: "男",
            age: 22,
            date: "1993/02/01"
          },
          {
            name: "李四",
            sex: "男",
            age: 24,
            date: "1995/02/01"
          },
          {
            name: "王五",
            sex: "男",
            age: 26,
            date: "1991/02/01"
          },
          {
            name: "张大妈",
            sex: "女",
            age: 46,
            date: "1971/02/03"
          },
          {
            name: "王大妈",
            sex: "女",
            age: 56,
            date: "1941/06/08"
          },
          {
            name: "阿萨德我",
            sex: "女",
            age: 26,
            date: "1993/05/01"
          }
        ];
      }
    },
    searchName() {
      this.value ? (this.nameSearch = true) : (this.nameSearch = false);
    },
    changeVal() {
      console.log(this.dateVal);
      this.dateVal.length > 0
        ? (this.dateSearch = true)
        : (this.dateSearch = false);
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  filters: {
    pagination(array, pageNo, pageSize) {
      let offset = (pageNo - 1) * pageSize; //当前页第一条的索引
      let data =
        offset + pageSize >= array.length
          ? array.slice(offset, array.length)
          : array.slice(offset, offset + pageSize);
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>