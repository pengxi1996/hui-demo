<template>
  <div class="layout">
    <h-row name="flex" class="bizMainIndex">
      <h-col span="24" class="layout-menu-box">
        <!-- 搜索框 -->
        <div class="bizIndexSearch h-topbar-tool clearfix">
          <HSearchselect :options="options" @select="onSelectMenu" ref="select"></HSearchselect>
        </div>
        <div class="bizIndexSideBar">
          <h-row :gutter="40" type="flex" justify="center" align="middle">
            <h-col span="6" v-for="(item,index) in sideBar" :key="index">
              <h-row type="flex" justify="center" align="middle">
                <h-col span="8" style="text-align:center">
                  <h-icon :name="item.icon"></h-icon>
                </h-col>
                <h-col span="16">
                  <p class="amount">
                    <span>{{item.amount}}</span>
                    <small>{{item.unit}}</small>
                  </p>
                  <p class="row-title">{{item.title}}</p>
                </h-col>
              </h-row>
            </h-col>
          </h-row>
        </div>
        <div class="bizIndexInfoBar">
          <h-row type="flex" justify="center" align="middle">
            <h-col span="15" >
              <h-row class="bizIndexTitle" justify="center" align="middle">
                <h-col span="20" class="bizTitleText">
                  {{$t('m.i.homePage.collect')}}
                </h-col>
                <h-col span="4" class="bizTitleRight" v-if="carouselArr.length>0">
                  <span class="carouselLastLength">{{carouselLastLength}}</span><span class="carouselArrLength"> / {{carouselArrLength}}</span>
                </h-col>
              </h-row>
              <h-carousel
                v-model="carouselOptions.value"
                :dots="carouselOptions.dots"
                :arrow="carouselOptions.arrow" 
                v-if="carouselArr.length>0 && browser.length>0"
                @on-change="setCarouselArrLength">
                <h-carouselitem v-for="(item,index) in carouselArr" :key="index">
                    <div class="clearfix demo-carousel " >
                        <div class="inner"
                        v-for="(item2,index2) in item"
                        :key="index2"
                        @click="handleJump(item2.url)">
                        <p class="iconWrap">
                          <h-icon name="group_fill"></h-icon>
                          <!-- <img :src="item2.icon" alt=""> -->
                        </p>
                        <p class="group_id">{{item2.id}}</p>
                        <p v-if="lang == 'zh-TW'" class="group_name">{{item2.hk_title}}</p>
                        <p v-else-if="lang == 'en-US'" class="group_name">{{item2.lang_title}}</p>
                        <p v-else class="group_name">{{item2.title}}</p>
                      </div>
                    </div>  
                </h-carouselitem>
              </h-carousel>
              <div class="carouselPlacehold" v-else>
                {{$t('m.i.homePage.noData')}}
              </div>
            </h-col>
            <h-col offset="1" span="8" class="indexMessageBox">
              <h-row class="bizIndexTitle" justify="center" align="middle">
                <h-col span="18" class="bizTitleText">
                  {{$t('m.i.homePage.msg')}}
                </h-col>
                <h-col span="6" class="bizTitleRight">
                  <span class="bizIndexMore" @click="handleJump('/bizMenu/bizMsgManager/bizEmailInbox')">{{$t('m.i.homePage.more')}}</span>
                </h-col>
              </h-row>
              <ul v-if="messageBox && messageBox.length > 0">
                <li v-for="(item,index) in messageBox" :key="index" @click="viewNoReadInfo(item)">
                  <h-row>
                    <h-col span="16">
                      <p style="cursor: pointer;" :title="item.msg_title">{{item.msg_title}}</p>
                    </h-col>
                    <h-col span="8">
                      <span style="cursor: pointer;" :title="item.receive_time">{{item.receive_time}}</span>
                    </h-col>
                  </h-row>
                </li>
              </ul>
              <div class="carouselPlacehold" v-else>
                {{$t('m.i.homePage.noData')}}
              </div>
            </h-col>
          </h-row>
        </div>
      </h-col>
    </h-row>
    <!--查看消息窗口-->
    <h-msg-box width="820" v-model="viewMsgWin" :mask-closable="false" ref="viewMsg">
      <p slot="header">
        <span>{{ currentMsgTitle }}</span>
      </p>
      <h-form :model="viewMsgForm" :label-width="116" ref="viewMsgForm" cols="1">
        <!--详情发件人-->
        <h-form-item :label="$t('m.i.emailBox.sender')" prop="sender">
          <h-input v-model="viewMsgForm.sendUserId" :disabled="true"></h-input>
        </h-form-item>
        <!--详情时间-->
        <h-form-item :label="$t('m.i.emailBox.sendTime')" prop="sendTime">
          <h-input v-model="viewMsgForm.sendTime" :disabled="true"></h-input>
        </h-form-item>
        <!--内容-->
        <h-form-item :label="$t('m.i.emailBox.content')" prop="content">
          <h-editor ref="topBarEditor"> </h-editor>
        </h-form-item>
      </h-form>
      <div slot="footer">
        <h-button type="primary" @click="viewMsgWin = !viewMsgWin">{{$t('m.i.common.close')}}</h-button>
      </div>
    </h-msg-box>
  </div>
</template>
<script>
import {on, off} from '@common/utils/commonUtil'
import HSearchselect from '@frame/components/searchselect/HSearchSelect.vue'
import { getBrowerInfo } from '@frame/utils/browerInfo'
import HEditor from '@frame/components/HEditor'
import Cookies from 'js-cookie'
export default {
  name: "bizIndex",
  props: {},
  components: {
    HSearchselect,
    HEditor
  },
  data() {
    return {
      sideBar: [
        {
          amount: "2390",
          title: this.$t('m.i.homePage.userAmount'),
          icon: "person-stalker",
          unit: this.$t('m.i.homePage.personUnit')
        },
        {
          amount: "135",
          title: this.$t('m.i.homePage.roleAmount'),
          icon: "man",
          unit: this.$t('m.i.homePage.numUnit')
        },
        {
          amount: "364",
          title: this.$t('m.i.homePage.posAmount'),
          icon: "t-b-post",
          unit: this.$t('m.i.homePage.numUnit')
        },
        {
          amount: "5",
          title: this.$t('m.i.homePage.orgAmount'),
          icon: "t-b-organizational",
          unit: this.$t('m.i.homePage.numUnit')
        }
      ],
      carouselOptions: {
        value: 0,
        dots: "outside",
        arrow: "never"
      },
      carouselArr: [
        [
          {
            group_id: "",
            group_name: ""
          }
        ]
      ],
      messageBox: [],
      carouselLastLength:0,
      carouselArrLength:0,
      activeIndex:0,
      activeIndex1:0,
      rankingList: [
        {
          title: this.$t('m.i.homePage.cache'),
          amount: "198",
          width:0
        },
        {
          title: this.$t('m.i.homePage.dict'),
          amount: "167",
          width:0
        },
        {
          title: this.$t('m.i.homePage.user'),
          amount: "95",
          width:0
        },
        {
          title: this.$t('m.i.homePage.role'),
          amount: "23",
          width:0
        },
        {
          title: this.$t('m.i.homePage.log'),
          amount: "20",
          width:0
        }
      ],
      options: [],
      browser: '',
      lang: Cookies.get('lang'),
      viewMsgForm: {
        sendUserId: '',
        sendTime: '',
        content: ''
      },
      viewMsgWin: false  
    };
  },
  methods: {
    //获取组群
    getGroupInfo() {
      let pageInfo = {
        pageNo: 1,
        pageSize: 999999
      };
      let isUrlLowercase = window.LOCAL_CONFIG.isUrlLowercase + ''
      let url = '/getCustomGroupConfigListByPage' + '?time=' + new Date().getTime()
      if (isUrlLowercase === 'true') {
        url = url.toLowerCase()
      }
      this.$http.post(window.LOCAL_CONFIG.OMC_GSV + url, pageInfo).then(res => {
        if (res) {
          this.carouselArr = [];
          let resData = res.data.rows;
          for (var i = 0; i < resData.length; i = i + 4) {
            let arr = [];
            this.carouselArrLength = resData.length;
            for (let j = 0; j < 4; j++) {
              let index = i + j;
              if (resData[index]) {
                arr.push(resData[index]);
              }
            }  
            this.carouselArr.push(arr);
            this.carouselLastLength = this.carouselArr[0].length; 
          }
        } else {
          this.$hMessage.error({
            content: this.$t("m.i.common.netError"),
            duration: 3,
            closable: true
          });
        }
      });
    },
    //轮播宽度
    setCarouselArrLength(oldvalue,value){
      this.carouselLastLength = value * 4  + this.carouselArr[value].length;
    },
    //计算排名展示的宽度
    calculateOrightWidth(classList){
      let obj = document.getElementsByClassName(classList);
      let spanObj = obj[0].getElementsByClassName("rankingAmount");
      let parent = obj[0].getElementsByClassName("rankingLine");
      let spanWidth = spanObj[0].clientWidth + 4;
      let parentWidth = parent[0].clientWidth;
      return parseInt(parentWidth - spanWidth);
    },
    //获取排名的数据
    getList(classList,arr) {
      var amount, width;
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (i == 0) {
          item.width = this.calculateOrightWidth(classList) + "px";
          amount = parseInt(item.amount);
          width = this.calculateOrightWidth(classList);
        } else {
          let scale = parseInt(item.amount) / amount;
          item.width = scale * width + "px";
        }
      }
    },
    handleResize(){
      this.getList('leftRanking',this.rankingList);
      this.getList('rightRanking',this.rankingList);
    },
    onSelectMenu (option) {
      this.search = ''
      this.$nextTick(() => {
        setTimeout(() => {
          this.$router.push(option.url)
        }, 300)
      })
    },
    handleJump(url){
      this.$nextTick(() => {
        this.$router.push(url)
      })
    },
    getData(){
      let isUrlLowercase = window.LOCAL_CONFIG.isUrlLowercase + ''
      let url = '/getIndexInfo' + '?time=' + new Date().getTime()
      if (isUrlLowercase === 'true') {
        url = url.toLowerCase()
      }
      this.$http.post(window.LOCAL_CONFIG.OMC_GSV + url,'').then(res =>{
        if (res) {
          let resData = res.data
          this.messageBox = res.data.msg_list; // 获取消息列表
          this.carouselArr = [];
          for (var i = 0; i < resData.menu_list.length; i = i + 4) {
            let arr = [];
            this.carouselArrLength = resData.menu_list.length;
            for (let j = 0; j < 4; j++) {
              let index = i + j;
              if (resData.menu_list[index]) {
                arr.push(resData.menu_list[index]);
              }
            }  
            this.carouselArr.push(arr);
            this.carouselLastLength = this.carouselArr[0].length; 
          } // 获取轮播列表，并拆分
          let isUnderscore = window.LOCAL_CONFIG.isUnderscore + ''
          if(isUnderscore=="true"){
            this.sideBar[0].amount = resData.user_count ? resData.user_count : 0;
            this.sideBar[1].amount = resData.role_count ? resData.role_count : 0;
            this.sideBar[2].amount = resData.pos_count ? resData.pos_count : 0;
            this.sideBar[3].amount = resData.org_count ? resData.org_count : 0;
          }else{
            this.sideBar[0].amount = resData.userCount ? resData.userCount : 0;
            this.sideBar[1].amount = resData.roleCount ? resData.roleCount : 0;
            this.sideBar[2].amount = resData.posCount ? resData.posCount : 0;
            this.sideBar[3].amount = resData.orgCount ? resData.orgCount : 0;
          }
          
        } else {
          this.$hMessage.error({
            content: this.$t("m.i.common.netError"),
            duration: 3,
            closable: true
          });
        }
      })
    },
    viewNoReadInfo (item) {
      let that = this 
      let currentData = item
      let param = { msgIds: currentData.msg_id, isRead: 'true' }
      let isUrlLowercase = window.LOCAL_CONFIG.isUrlLowercase + ''
      let url = '/updateIsReadSataus' + '?time=' + new Date().getTime()
      if (isUrlLowercase === 'true') {
        url = url.toLowerCase()
      }
      this.$http.post(window.LOCAL_CONFIG.OMC_GSV + url, param)
        .then(res => {
          if (res) {
            let return_code = res.data.return_code
            if (return_code === '0') {
              that.currentMsgTitle = currentData.msg_title
              that.viewMsgForm.sendUserId = currentData.send_user_id
              that.viewMsgForm.sendTime = currentData.send_time
              that.$refs.topBarEditor.setDisabled(false)
              that.$refs.topBarEditor.setContent(currentData.content)
              that.viewMsgWin = true
              //刷新未读数据条目，以及右上角邮箱图标上数字
              that.refreshNoReadMessageInfo()
            }
          } else {
            that.$hMessage.error({content:that.$t('m.i.common.netError'),duration: 3,closable: true});
          }
        })
    },
    refreshNoReadMessageInfo(){
      let isUrlLowercase = window.LOCAL_CONFIG.isUrlLowercase + ''
      let url = '/getIndexInfo' + '?time=' + new Date().getTime()
      if (isUrlLowercase === 'true') {
        url = url.toLowerCase()
      }
      let that = this 
      this.$http.post(window.LOCAL_CONFIG.OMC_GSV + url,'').then(res =>{
        if (res) {
          let resData = res.data
          that.messageBox = res.data.msg_list; // 获取消息列表
          //右上角邮箱图标上数字
          var msgSpan = document.getElementById('msgNum')
          if(msgSpan){
            if(that.messageBox && that.messageBox!=null && that.messageBox.length>0){
              msgSpan.setAttribute('class', 'h-message-num')
              msgSpan.innerHTML = that.messageBox.length
            }else {
              msgSpan.removeAttribute('class')
              msgSpan.innerHTML = ''
            }
          }
        } else {
          that.$hMessage.error({
            content: that.$t("m.i.common.netError"),
            duration: 3,
            closable: true
          });
        }
      })
    },
  },
  created() {
    this.options = this.$store.state.app.leafTotal
  },
  mounted() {
    let navigator = getBrowerInfo()  
    this.browser = navigator.split(' ')[0]
    window.LOCAL_CONFIG.isToken && this.getData() 
  }
};
</script>
<style>
</style>
