import {router} from './router/router';
import mitt from 'mitt';
import { createApp } from 'vue'
import App from './App.vue'
import {requiredComponents} from './globalComponents'
import 'vue3-toastify/dist/index.css';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/vi';






// event bus
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(router).mount('#app');

registerComponents(app);

//  nhung globalComponents

 function registerComponents(app) {
    for(let component of requiredComponents){
      app.component(component.componentName, component.component);
    }
}

