import {router} from './router/router';
import {requiredComponents} from './globalComponents'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(router).mount('#app');

registerComponents(app);


 // nhung globalComponents

 function registerComponents(app) {
    for(let component of requiredComponents){
      app.component(component.componentName, component.component);
    }
}

