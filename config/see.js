module.exports = {
  // 模版变量 http://hui.hundsun.com/community/topic/147/利用-see-平台的模版配置能力动态修改-api_home
  variables: [
    {
      type: "input",
      label: "服务基础路径",
      name: "API_HOME",
      default: "http://127.0.0.1:8088/g/hsxone.omc/v"
    },
    {
      type: "select",
      label: "web协议",
      name: "URL_PROTOCOL",
      options: "http:http;https:https",
      default: "http"
    },
    {
      type: "switch",
      label: "是否启用租户",
      name: "IS_TENANT_ENABLED",
      options: "true:是;false:否",
      default: "true"
    }
  ]
};
