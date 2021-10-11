import App from "./App.svelte";
import Toast from "./components/Toast/index.svelte";
import "./style/init.css";
import "./style/flex.css";
import "./style/index.css";

const stoast = new Toast({
  target: document.body,
});

window.filterToast  = stoast;
const app = new App({
  target: document.getElementById("filterSelector") || document.body,
  props: {
    selectOptions: [
      {
        key: "广告渠道",
        value: "ad",
        data: [
          {
            type: "radio",
            key: "adkey",
            // value: 'hide',  初始默认值
            validateMsg: '请选择广告渠道方式',
            data: [
              { key: "屏蔽", value: "hide" },
              { key: "查询", value: "search" },
            ],
          },
          {
            type: "check",
            key: "system",
            validateMsg: '请选择渠道',
            // 快捷按钮 - 只有check 类型有  值为按钮显示文案    无值表示不显示
            quickAction: {
              search: '请搜索',
              all: '全选',
              reverse: '反选',
              clear: '清空'
            },
            value: ['ios'],
            data: [
              {
                key: "IOS",
                value: "ios",
              },
              {
                key: "安卓",
                value: "Android",
              },
              {
                key: "小米",
                value: "xiaomi",
              },
            ],
          },
        ],
      },
      {
        key: "广告词",
        value: "ads",
        data: [
          {
            type: "input",
            placeholder: '请输入',
            key: "asss",
          },
        ],
      },
      {
        key: "关键dd匹配",
        value: "keyword",
        data: [
          {
            type: "select",
            key: "keyword",
            placeholder: '请选择',
            data: [
              {
                key: "IOS",
                value: "ios",
              },
              {
                key: "安卓",
                value: "android",
              },
            ],
          },
          {
            type: "input",
            value: 'helo world',
            validateMsg: '请输入',
            placeholder: 'placeholder',
            key: "keyval",
          },
        ],
      },
    ],
    onSelect: (e) => {
      console.log('======', e);
    },
    onConfirm: (e) => {
      console.log('=======xxx===', e);
    }
  },
});
setTimeout(() => {
  
},2000)
// export default app;
export default App;
