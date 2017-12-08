import $ from 'jquery';
import axios from 'axios';

export default {
  methods: {
    /* apis , fn */
    rpc: function(apis, fn) {
      var setupApis = [];
      var that = this;
      apis.forEach(function(api) {
        setupApis.push(that.rpcsetup(api));
      });
      axios.all(setupApis)
        .then(axios.spread(function() {
          fn(([].slice.call(arguments)).map(function(arg) {
            return arg.data.result;
          }), ([].slice.call(arguments)).map(function(arg) {
            return arg.data.error;
          }));
        }));
      // var xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = function() {
      //   if (xhr.readyState === 4) {
      //     if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      //       console.log('successful: ' + xhr.status);
      //     } else {
      //       console.log('Request was unsuccessful: ' + xhr.status);
      //     }
      //   }
      // };
      // xhr.open('post', 'https://icepointcloud.com/gateway/api/jsonrpc.jsp');
      // xhr.setRequestHeader('icepoint_from', 'admin');
      // xhr.send({
      //   query: JSON.stringify({
      //     jsonrpc: '2.0',
      //     method: 'bizadmin.listStoreOrRepositoryByCompanyId',
      //     id: String(new Date().getTime()),
      //     params: [{
      //       'isRepository': false
      //     }]
      //   })
      // });
    },
    rpcsetup: function(api) {
      let config = {
        method: 'post',
        url: 'http://localhost:8080//data/post',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        headers: {
          'icepoint_from': 'admin'
        },
        responseType: 'json',
        query: {
          jsonrpc: '2.0'
        }
      };
      config.query.method = api.method;
      config.query.id = String(new Date().getTime());
      config.query.params = api.params;
      config.data = 'query=' + encodeURIComponent(JSON.stringify(config.query));
      return axios(config);
    },
    has: function(field, _empty) {
      var empty = _empty || false; // empty 布尔值，判断是否判断“”值
      if (empty) {
        if (field === undefined ||
          field === null ||
          field === '') {
          return false;
        } else {
          return true;
        }
      } else {
        if (field === undefined ||
          field === null) {
          return false;
        } else {
          return true;
        }
      }
    },
    add: function(a, b) { // 解决浮点问题的加法
      var c, d, e;
      try {
        c = a.toString().split('.')[1].length;
      } catch (f) {
        c = 0;
      }
      try {
        d = b.toString().split('.')[1].length;
      } catch (f) {
        d = 0;
      }
      e = Math.pow(10, Math.max(c, d));
      return (this.mul(a, e) + this.mul(b, e)) / e;
    },
    sub: function(a, b) { // 解决浮点问题的减法
      var c, d, e;
      try {
        c = a.toString().split('.')[1].length;
      } catch (f) {
        c = 0;
      }
      try {
        d = b.toString().split('.')[1].length;
      } catch (f) {
        d = 0;
      }
      e = Math.pow(10, Math.max(c, d));
      return (this.mul(a, e) - this.mul(b, e)) / e;
    },
    mul: function(a, b) { // 解决浮点问题的乘法
      var c = 0,
        d = a.toString(),
        e = b.toString();
      try {
        c += d.split('.')[1].length;
      } catch (f) {}
      try {
        c += e.split('.')[1].length;
      } catch (f) {}
      return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
    },
    divid: function(a, b) { // 解决浮点问题的除法
      var c, d, e = 0,
        f = 0;
      try {
        e = a.toString().split('.')[1].length;
      } catch (g) {}
      try {
        f = b.toString().split('.')[1].length;
      } catch (g) {}
      c = Number(a.toString().replace('.', ''));
      d = Number(b.toString().replace('.', ''));
      return this.mul(c / d, Math.pow(10, f - e));
    },
    // 将任何数据转换成数字字符串
    toDecimal: function(num, round, type) {
      var r;
      if (typeof round === 'number') {
        r = parseInt(round, 10);
      } else {
        r = 2;
      }
      var n = parseFloat(num);
      if (type === 'number') {
        return isNaN(n) ? Number((0).toFixed(r)) : Number(n.toFixed(r));
      } else {
        return isNaN(n) ? (0).toFixed(r) : n.toFixed(r);
      }
    },
    // 截取小数点
    toFloor: function(num, round, type) {
      var r;
      if (typeof round === 'number') {
        r = parseInt(round, 10);
      } else {
        r = 2;
      }
      var n = isNaN(parseFloat(num)) ? 0 : parseFloat(num);
      var x = Math.pow(10, r);
      var t = this.divid(Math.floor(Math.abs(this.mul(n, x))), x);
      t = n < 0 ? t * -1 : t;
      if (type === 'number') {
        return Number(t);
      } else {
        return t.toFixed(r);
      }
    },
    // 查询当前物理地址
    ipAddress: function() {
      var that = this;
      $.getScript((window.location.protocol.indexOf('https') > -1 ? 'https' : 'http') + '://pv.sohu.com/cityjson?ie=utf-8', function() {
        if (window.returnCitySN && window.returnCitySN.cname && window.returnCitySN.cname !== '') {
          that.physicalAddress = window.returnCitySN.cname.indexOf('市') > -1 ? window.returnCitySN.cname.substring(0, window.returnCitySN.cname.indexOf('市') + 1) : window.returnCitySN.cname;
        } else {
          that.physicalAddress = undefined;
          console.log('没有找到匹配的IP地址信息！');
        }
      });
    },
    HTMLDecode: function(text) {
      var temp = document.createElement('div');
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    },
    HTMLEncode: function(html) {
      var temp = document.createElement('div');
      (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
      var output = temp.innerHTML;
      temp = null;
      return output;
    }
  }
};

Array.prototype.contains = function(obj) {
  let i = this.length;
  if (!i) {
    while (i--) {
      if (this[i] === obj) {
        return true;
      }
    }
  }
  return false;
};