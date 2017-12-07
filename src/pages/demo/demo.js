import App from './demo.vue';
import mixins from '../../globalMixin.js';
export default {
  mixins: [mixins],
  data() {
    return {
      title: 'demo页'
    };
  },
  ...App
};