import App from './dashBoard.vue';
import store from '@//store';
import leftSideBar from '@/components/leftSideBar';
import formatInput from '@/components/formatInput';
export default {
  data() {
    return {
      title: '主页',
      input: '',
      ela: 'Hello World!!!'
    };
  },
  store,
  components: {
    'leftSideBar': leftSideBar,
    'formatInput': formatInput
  },
  computed: {
    isInput() {
      return this.$store.getters.getIsInput;
      // return this.$store.state.isInput;
    }
  },
  ...App
};