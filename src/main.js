import App from "./App.svelte";
import Toast from "./components/Toast/index.svelte";
import "./style/init.css";
import "./style/flex.css";
import "./style/index.css";

const stoast = new Toast({
  target: document.body,
});

window.filterToast  = stoast;
export default App;
