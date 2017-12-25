<template> <span class="dr-input">
    <input v-if="isEdit" 
      type="text" 
      ref="input" 
      :class="vClass" 
      :value="value"
      @input="validate($event.target.value)" 
      @blur="complete($event.target.value)"
      @keyup.enter="enterFn"
      onclick="$(this).focus();$(this).select()">
    <span v-else 
      class="dr-input-span" 
      :class="vSpanClass"
      >{{value}}
    </span> </span>
</template>
<script>
import mixin from '@/globalMixin.js';
export default {
  name: 'formatInput',
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    options: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    value: [String, Number],
    vClass: [String, Array],
    vSpanClass: [String, Array],
    attr: Object,
    vStyle: Object,
    vSpanStyle: Object
  },
  mounted() {
    if (this.has(this.attr, true)) {
      for (let i in this.attr) {
        this.$refs.input.setAttribute(i, this.attr[i]);
      }
    }
    if (this.has(this.vStyle, true)) {
      for (let i in this.vStyle) {
        this.$refs.input.style[i] = this.vStyle[i];
      }
    }
    /*    if (this.type === 'date') {
          $(this.$refs.input).datepicker();
        }*/
    if (this.options && this.options.maxLength !== undefined) this.$refs.input.maxLength = this.options.maxLength;
  },
  methods: {
    // 数字校验
    regNum(input, option) {
      let opt = option || {};
      let temp = (input && input.toString()) || '';
      if (temp !== '') {
        if (this.has(opt.min, true) && opt.min >= 0) {
          temp = temp.replace(/[^\d\.]/g, '');
        } else {
          temp = temp.replace(/[^\d\.\-]/g, '').replace(/^([\-]?\d{0,}\.?\d{0,})[^0-9]?/, '$1').replace('-', '*').replace(/\-/g, '').replace('*', '-');
        }
        temp = temp.replace(/^0[\d]/g, '0').replace('.', '#').replace(/\./g, '').replace('#', '.');
      }
      if (this.has(opt.dec, true)) {
        if (!isNaN(parseInt(opt.dec, 0))) {
          // 判断小数部分保留几位
          let dec = parseInt(opt.dec, 0);
          switch (dec) {
            case 0:
              temp = temp.replace(/\./g, '');
              break;
            default:
              temp = temp.replace(new RegExp('(\\.[0-9]{' + dec + '})[0-9]*', 'g'), '$1');
              break;
          }
        } else {
          console.error('options.dec不是正确的类型');
        }
      }
      if (this.has(opt.int, true)) {
        if (!isNaN(parseInt(opt.int, 0))) {
          // 判断实数部分保留几位
          let int = parseInt(opt.int, 0);
          let dectemp = temp.replace(/(-)|(\.[0-9]{0,})/g, '');
          if (dectemp.length > int) {
            temp = (temp.match(/-/g) ? temp.match(/-/g)[0] : '') + dectemp.substr(0, int) + (temp.match(/\.[0-9]{0,}/g) ? temp.match(/\.[0-9]{0,}/g)[0] : '');
          }
        } else {
          console.error('options.int不是正确的类型');
        }
      }
      return temp;
    },
    validate(value) {
      let data = value.trim();
      switch (this.type) {
        case 'number':
          data = this.regNum(data, this.options);
          if (this.has(this.options.max, true) && data > this.options.max && data !== '') {
            data = this.options.max.toString();
          }
          if (this.has(this.options.min, true) && data < this.options.min && data !== '') {
            data = this.options.min.toString();
          }
          break;
      }
      if (this.options && this.has(this.options.noString, true) && this.options.noString) {
        if (data === '') data = this.options.min ? this.options.min : 0;
        else data = isNaN(Number(data)) ? 0 : Number(data);
      }
      if (data !== value) this.$refs.input.value = data;
      this.$emit('input', data);
    },
    complete(value) {
      if (this.options && this.has(this.options.autoComplete, true) && this.options.autoComplete && this.has(this.options.dec, true) && !isNaN(parseInt(this.options.dec, 0))) {
        let number = this.options.dec;
        let _f = parseFloat(value);
        if (isNaN(_f)) {
          _f = 0;
        }
        let x = Math.pow(10, number);
        let f = Math.round(_f * x) / x;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + number) {
          s += '0';
        }
        if (this.has(this.options.noString, true) && this.options.noString) {
          if (s === '') s = this.options.min ? this.options.min : 0;
          else s = isNaN(Number(s)) ? 0 : Number(s);
        }
        this.$refs.input.value = s;
        this.$emit('input', s);
      }
      this.$emit('blur', true);
    },
    enterFn: function() {
      this.$emit('keyup-enter', true);
    }
  },
  watch: {
    attr() {
      if (this.has(this.attr, true)) {
        for (let i in this.attr) {
          this.$refs.input.setAttribute(i, this.attr[i]);
        }
      }
    }
  }
};
</script>