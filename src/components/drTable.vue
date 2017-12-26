<template>
  <div class="dr-table" ref="table" :style="tableHeightStyle" @contextmenu.prevent>
    <div class="border-left" :style="borderLeftStyle"></div>
    <div class="border-bottom" :style="borderBottomStyle"></div>
    <div class="border-right" :style="borderRightStyle"></div>
    <div ref="headerWrapper" class="drheader-wrapper">
      <table :style="tableWidthStyle">
        <div v-if="!isWebkit" class="border-bottom" :style="borderBottomStyle"></div>
        <colgroup>
          <col v-for="col in validCols" v-if="!col.hidden" :width="col.width + 'px'">
        </colgroup>
        <thead>
          <tr v-for="(tr, i) in labels" :style="rowHeigthStyle" v-if="!tr.every(function(it) {return it.hidden})">
            <template v-for="(th, j) in tr" v-if="!th.hidden">
              <th v-if="hasIndex && i + j == 0" v-setspan="th">
                <div>
                  <input v-if="selectable" ref="ckball" type="checkbox" @change="selectAllRows($event)">
                </div>
              </th>
              <th v-else-if="!th.prop" v-setspan="th">
                <div>{{th.label}}</div>
              </th>
              <th v-else v-setspan="th" @mousemove="resizeMove($event, th.prop)" @mouseout="resizeOut" @mousedown="resizeDown" @mouseup="resizeUp" @contextmenu.prevent="headeRightClick($event, Object.keys(validCols).indexOf(th.prop))">
                <div>{{th.label}}</div>
              </th>
            </template>
          </tr>
        </thead>
      </table>
    </div>
    <div ref="bodyWrapper" class="drbody-wrapper" :style="bodyStyle" @scroll="scrollBody">
      <table :style="tableWidthStyle">
        <colgroup>
          <col v-for="col in validCols" :width="col.width + 'px'" v-if="!col.hidden">
        </colgroup>
        <tbody ref="tbody">
          <tr v-for="(row, i) in tabledata" :key="'tr-'+i" :style="rowHeigthStyle" @mouseenter="hoverEnter(i)" @mouseleave="hoverLeave(i)" @dblclick="dblclick(i)" @click="selectRowByRow(i)" :class="getHoverClass(i)">
            <template v-if="hasIndex">
              <td v-if="selectable" class="index-td" @click.stop="selectRowByCb(i)" @mouseenter="ckbHoverEnter(i)" @mouseleave="ckbHoverLeave(i)">
                <input v-if="selectedRows.indexOf(i) != -1 || ckbHoverIndex == i" :checked="selectedRows.indexOf(i) != -1" type="checkbox">
                <strong v-else>{{i + 1}}</strong>
              </td>
              <td v-else class="index-td">
                <strong>{{i + 1}}</strong>
              </td>
            </template>
            <slot name="tr" :item="row" :index="i">
              <td v-for="col in Object.keys(validCols)" v-if="!validCols[col].hidden && col!='drindex'" :style="row[col] && typeof row[col] == 'object'? row[col].style:''" :class="row[col] && typeof footer[col] == 'object'? footer[col].class:''">
                {{row[col] && typeof row[col] == 'object' ? row[col].value : row[col]}}
              </td>
            </slot>
          </tr>
          <tr v-if="tabledata.length != 0 && showFooter && !isWebkit" style="visibility: hidden;" :style="rowHeigthStyle">
            <td v-for="i in colCount">
              <div class="cell">
              </div>
            </td>
          </tr>
          <tr v-if="tabledata.length == 0" style="visibility: hidden;">
            <td v-for="i in colCount">
              <div class="cell">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showFooter" ref="footerWrapper" class="drfooter-wrapper">
      <table :style="tableWidthStyle">
        <colgroup>
          <col v-for="col in validCols" :width="col.width + 'px'" v-if="!col.hidden">
        </colgroup>
        <thead ref="tfooter">
          <tr :style="rowHeigthStyle">
            <td v-if="hasIndex" class="index-td">
              <strong>总计</strong>
            </td>
            <slot v-if="hasIndex" name="tf" :col-Count="colCount - 1">
              <td v-for="col in Object.keys(validCols)" v-if="!validCols[col].hidden" :style="footer[col] && typeof footer[col] == 'object'? footer[col].style:''">
                {{footer[col] && typeof footer[col] == 'object' ? footer[col].value : footer[col]}}
              </td>
            </slot>
            <slot v-else name="tf" :col-Count="colCount">
              <td v-for="col in Object.keys(validCols)" v-if="!validCols[col].hidden" :style="footer[col] && typeof footer[col] == 'object'? footer[col].style:''">
                {{footer[col] && typeof footer[col] == 'object' ? footer[col].value : footer[col]}}
              </td>
            </slot>
          </tr>
        </thead>
      </table>
    </div>
    <div class="fixed-left" v-if="hasIndex" :style="fixedLeftStyle">
      <div class="border-left" :style="borderLeftStyle"></div>
      <div class="border-bottom" :style="borderBottomStyle"></div>
      <div ref="flHeaderWrapper" class="drheader-wrapper">
        <div class="border-right" :style="borderRightStyle"></div>
        <table :style="tableWidthStyle">
          <div v-if="!isWebkit" class="border-bottom" :style="borderBottomStyle"></div>
          <colgroup>
            <col v-for="col in validCols" :width="col.width + 'px'" v-if="!col.hidden">
          </colgroup>
          <thead>
            <tr v-for="(tr, i) in labels" :style="rowHeigthStyle">
              <template v-for="(th, j) in tr" v-if="!th.hidden">
                <th v-if="hasIndex && i + j == 0" v-setspan="th">
                  <div>
                    <input v-if="selectable" ref="ckball" type="checkbox" @change="selectAllRows($event)">
                  </div>
                </th>
                <th v-else-if="!th.prop" v-setspan="th">
                  <div>{{th.label}}</div>
                </th>
                <th v-else v-setspan="th" @mousemove="resizeMove($event, th.prop)" @mouseout="resizeOut" @mousedown="resizeDown" @mouseup="resizeUp">
                  <div>{{th.label}}</div>
                </th>
              </template>
            </tr>
          </thead>
        </table>
      </div>
      <div ref="flBodyWrapper" class="fldrbody-wrapper" :style="flBodyStyle">
        <table :style="tableWidthStyle">
          <colgroup>
            <col v-for="col in validCols" :width="col.width + 'px'" v-if="!col.hidden">
          </colgroup>
          <tbody ref="flTbody">
            <tr v-for="(row, i) in tabledata" :key="'tr-'+i" :style="rowHeigthStyle" @mouseenter="hoverEnter(i)" @mouseleave="hoverLeave(i)" @dblclick="dblclick(i)" @click="selectRowByRow(i)" :class="getHoverClass(i)">
              <template v-if="hasIndex">
                <td v-if="selectable" class="index-td" @click.stop="selectRowByCb(i)" @mouseenter="ckbHoverEnter(i)" @mouseleave="ckbHoverLeave(i)">
                  <input v-if="selectedRows.indexOf(i) != -1 || ckbHoverIndex == i" :checked="selectedRows.indexOf(i) != -1" type="checkbox">
                  <strong v-else>{{i + 1}}</strong>
                </td>
                <td v-else class="index-td">
                  <strong>{{i + 1}}</strong>
                </td>
              </template>
              <slot name="tr" :item="row" :index="i">
                <td v-for="col in Object.keys(validCols)" v-if="!validCols[col].hidden && col!='drindex'" :style="row[col] && typeof row[col] == 'object'? row[col].style:''" :class="row[col] && typeof row[col] == 'object'? row[col].class:''">
                  {{row[col] && typeof row[col] == 'object' ? row[col].value : row[col]}}
                </td>
              </slot>
            </tr>
            <tr v-if="tabledata.length != 0 && showFooter && !isWebkit" style="visibility: hidden;" :style="rowHeigthStyle">
              <td v-for="i in colCount">
                <div class="cell">
                </div>
              </td>
            </tr>
            <tr v-if="tabledata.length == 0" style="visibility: hidden;">
              <td v-for="i in colCount">
                <div class="cell">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="showFooter" ref="flFooterWrapper" class="drfooter-wrapper">
        <table :style="tableWidthStyle">
          <colgroup>
            <col v-for="col in validCols" :width="col.width + 'px'">
          </colgroup>
          <thead ref="flTfooter">
            <tr :style="rowHeigthStyle">
              <td v-if="hasIndex" class="index-td">
                <strong>总计</strong>
              </td>
              <slot v-if="hasIndex" name="tf" :col-Count="colCount - 1">
                <td v-for="col in Object.keys(validCols)" v-if="!validCols[col].hidden" :style="footer[col] && typeof footer[col] == 'object'? footer[col].style:''">
                  {{footer[col] && typeof footer[col] == 'object' ? footer[col].value : footer[col]}}
                </td>
              </slot>
              <slot v-else name="tf" :col-Count="colCount">
                <td v-for="col in Object.keys(validCols)" v-if="!validCols[col].hidden" :style="footer[col] && typeof footer[col] == 'object'? footer[col].style:''">
                  {{footer[col] && typeof footer[col] == 'object' ? footer[col].value : footer[col]}}
                </td>
              </slot>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="resize-proxy" ref="resizeProxy" v-show="resizeStatus.showProxy" :style="proxyStyle"></div>
    <div class="contextmenu" ref="contextMenu" v-if="contextmenuStatus.show" :style="contextmenuStyle" @contextmenu.prevent>
      <ul>
        <li v-for="(item, i) in menu" v-if="showMenuItem(item)" @click="selectmenu(item.id)">
          <slot name="contextmenu" :item="item" :index="i">
            <span>{{item.text}}</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'drTable',
  props: {
    colobject: {
      type: Array,
      required: true
    },
    tabledata: {
      type: Array,
      required: true
    },
    menu: {
      type: Array,
      default () {
        return [];
      }
    },
    maxHeight: [Number],
    minHeight: [Number],
    height: [Number],
    rowHeight: {
      type: [Number],
      default: 30
    },
    hasIndex: {
      type: [Boolean],
      default: false
    },
    scrollable: {
      type: [Boolean],
      default: true
    },
    selectable: {
      type: [Boolean],
      default: false
    },
    hoverable: {
      type: [Boolean],
      default: false
    },
    showFooter: {
      type: [Boolean],
      default: false
    },
    footer: {
      type: [Object],
      default () {
        return {};
      }
    }
  },
  data() {
    return {
      colobj: [],
      // 列结构对象
      scrollBarSize: 0,
      outWidth: 0,
      outHeight: 0,
      // 有效计算列
      validCols: {},
      resizeStatus: {
        showProxy: false,
        dragable: false,
        resizeCol: '',
        proxyLeft: 0,
        isDraging: false,
        dragStart: 0
      },
      contextmenuStatus: {
        for: '',
        show: false,
        top: 0,
        left: 0,
        rowindex: -1,
        colindex: -1
      },
      hoverIndex: -1,
      ckbHoverIndex: -1,
      selectedRows: []
    };
  },
  computed: {
    isWebkit() {
      let ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('webkit') === -1;
    },
    // 总行数
    rowCount() {
      return this.tabledata.length;
    },
    // 总列数
    colCount() {
      return Object.keys(this.validCols).length;
    },
    // 滚动条状态
    scrollBar() {
      let sb = {};
      sb.size = this.scrollBarSize;
      sb.horizontal = this.totalWidth > this.outWidth && this.scrollable;
      sb.vertical = this.totalHeight > this.outHeight && this.scrollable;
      return sb;
    },
    // 列宽总和
    totalWidth() {
      let amount = 0;
      let keys = Object.keys(this.validCols);
      keys.forEach(
        function(key) {
          amount += !this.validCols[key].hidden ? Number(this.validCols[key].width) : 0;
        }.bind(this)
      );
      return amount;
    },
    // 行高总和
    totalHeight() {
      return this.rowCount * this.rowHeight;
    },
    headerHeight() {
      return this.headerLevel * this.rowHeight + (this.isWebkit ? 2 : 1);
    },
    tableHeightStyle() {
      return {
        height: this.outHeight + 'px'
      };
    },
    // 表格宽度样式
    tableWidthStyle() {
      return {
        width: this.totalWidth + 'px'
      };
    },
    // 行高样式
    rowHeigthStyle() {
      return {
        height: this.rowHeight + 'px'
      };
    },
    // body包装层宽高样式
    bodyStyle() {
      let sb = this.scrollBar;
      // let ua = navigator.userAgent.toLowerCase();
      return {
        paddingTop: this.headerHeight + 'px',
        height: this.outHeight + (sb.horizontal ? sb.size : 0) + 'px',
        width: this.outWidth + (sb.vertical ? sb.size : 0) + 'px',
        overflow: this.scrollable ? 'auto' : 'hidden',
        paddingBottom: (this.showFooter ? this.rowHeight : 0) + 'px'
      };
    },
    flBodyStyle() {
      let sb = this.scrollBar;
      // let ua = navigator.userAgent.toLowerCase();
      return {
        paddingTop: this.headerHeight + 'px',
        height: this.outHeight + (sb.horizontal ? sb.size : 0) + 'px',
        width: this.outWidth + (sb.vertical ? sb.size : 0) + 'px',
        paddingBottom:
          (this.showFooter ? this.rowHeight : 0) +
          (sb.horizontal ? sb.size : 0) +
          'px'
      };
    },
    // 左边框样式
    borderLeftStyle() {
      return {
        height: this.outHeight + 'px'
      };
    },
    // 右边框样式
    borderRightStyle() {
      return {
        height: this.outHeight + 'px'
      };
    },
    // 下边框样式
    borderBottomStyle() {
      return {};
    },
    // resize proxy样式
    proxyStyle() {
      let left = 0,
        table = this.$refs.table;
      if (table) {
        left -= table.getBoundingClientRect().left;
      }
      return {
        left: this.resizeStatus.proxyLeft + left + 'px'
      };
    },
    contextmenuStyle() {
      let status = this.contextmenuStatus;
      let style = {
        top: status.top + 1 + 'px',
        left: status.left + 1 + 'px'
      };
      return style;
    },
    fixedLeftCols() {
      let fixedLeftCols = {};
      for (let col in this.validCols) {
        let obj = this.validCols[col];
        if (obj.fixed) {
          fixedLeftCols[col] = obj;
        } else {
          break;
        }
      }
      return fixedLeftCols;
    },
    fixedLeftStyle() {
      let fixedWidth = 0;
      for (let col in this.fixedLeftCols) {
        let obj = this.fixedLeftCols[col];
        fixedWidth += obj.width;
      }
      return {
        width: fixedWidth + (this.isWebkit ? 1 : 0) + 'px',
        height: this.outHeight + 'px'
      };
    },
    // 表头层级
    headerLevel() {
      function getHeaderLevel(n) {
        let level = 1;
        if (n.children) {
          level += Math.max.apply(
            null,
            n.children.map(function(child) {
              return getHeaderLevel(child);
            })
          );
        } else {
          if (n.hidden) level = 0;
        }
        return level;
      }
      return Math.max.apply(
        null,
        this.colobj.map(
          function(col) {
            return getHeaderLevel(col);
          }
        )
      );
    },
    // 表头组
    labels() {
      let _this = this;
      let labels = [];

      function getColspan(n) {
        let colspan = 0;
        if (n.children) {
          n.children.forEach(function(c) {
            colspan += getColspan(c);
          });
        } else {
          if (!n.hidden) colspan = 1;
        }
        return colspan;
      }

      function setRowLabel(node, i) {
        let label = {};
        // if (node.hidden) {
        //   return;
        // }
        label.label = node.label;
        if (node.children) {
          node.children.forEach(function(child) {
            setRowLabel(child, i + 1);
          });
        } else {
          label.prop = node.prop;
        }
        label.colspan = getColspan(node);
        label.rowspan = node.children ? 1 : _this.headerLevel - i + 1;
        label.fixed = node.hasOwnProperty('fixed');
        label.hidden = node.hidden;
        if (!labels[i]) {
          labels.push([]);
        }
        labels[i].push(label);
      }
      this.colobj.forEach(
        function(col) {
          setRowLabel(col, 0);
        }
      );
      return labels;
    }
  },
  created() {
    this.ComputeValidCols();
  },
  watch: {
    tabledata: {
      deep: true,
      handler() {
        this.bindRCEvent();
      }
    },
    colobject: {
      deep: true,
      handler() {
        this.ComputeValidCols();
      }
    },
    selectedRows() {
      this.handlerSelectAllStatus();
    },
    rowCount() {
      this.handlerSelectAllStatus();
    }
  },
  mounted() {
    this.watchOutSize();
    this.setScrollBarSize();
    this.hideFixedCol();
    this.bindRCEvent();
  },
  methods: {
    bindRCEvent() {
      if (this.menu.length === 0) return;
      this.$nextTick(function() {
        let _this = this;
        let refs = _this.$refs;
        let tbody = refs.tbody;
        [].forEach.call(tbody.children, function(row, i) {
          [].forEach.call(row.children, function(col, j) {
            col.oncontextmenu = _this.rightClick(i, j);
          });
        });
      });
    },
    addRowIndex() {
      if (this.hasIndex) {
        this.colobj = [{
          label: '',
          prop: 'drindex',
          fixed: true,
          width: '40'
        }].concat(this.colobject);
      } else {
        this.colobj = this.colobject;
      }
    },
    hideFixedCol() {
      let refs = this.$refs;
      let tbody = refs.tbody;
      let tfooter = refs.tfooter;
      let flTbody = refs.flTbody;
      let flTfooter = refs.flTfooter;
      let hideBodyCount = Object.keys(this.fixedLeftCols).length;

      function addClass(el, classname) {
        if (el && el.className.indexOf(classname) === -1) {
          el.className = el.className.concat(' ' + classname);
        }
      }
      for (let i = 0, len = tbody.children.length; i < len; i++) {
        let tr = tbody.children[i];
        for (let j = 0; j < hideBodyCount; j++) {
          addClass(tr.children[j], 'is-vh');
        }
      }
      if (tfooter) {
        for (let i = 0; i < hideBodyCount; i++) {
          addClass(tfooter.firstChild.children[i], 'is-vh');
        }
      }
      if (flTbody) {
        for (let i = 0, len = flTbody.children.length; i < len; i++) {
          let tr = flTbody.children[i];
          for (let j = this.colCount; j > hideBodyCount; j--) {
            addClass(tr.children[j], 'is-dn');
          }
        }
      }
      if (flTfooter) {
        for (let i = this.colCount; i > hideBodyCount; i--) {
          addClass(flTfooter.firstChild.children[i], 'is-dn');
        }
      }
    },
    ComputeValidCols() {
      let _this = this;
      _this.validCols = {};
      _this.addRowIndex();

      function getValidCol(cols) {
        cols.forEach(function(col) {
          if (!col.children) {
            let prop = {
              width: Number(col.width),
              fixed: col.hasOwnProperty('fixed'),
              prop: col.prop,
              hidden: col.hidden === undefined ? false : col.hidden
            };
            if (col.minWidth) prop.minWidth = Number(col.minWidth);
            _this.$set(_this.validCols, col.prop, prop);
          } else {
            getValidCol(col.children);
          }
        });
      }
      getValidCol(this.colobj);
    },
    scrollBody(e) {
      let refs = this.$refs;
      let body = e.target;
      refs.headerWrapper.scrollLeft = body.scrollLeft;
      if (refs.footerWrapper) refs.footerWrapper.scrollLeft = body.scrollLeft;
      if (refs.flBodyWrapper) refs.flBodyWrapper.scrollTop = body.scrollTop;
    },
    hoverEnter(i) {
      this.hoverIndex = i;
    },
    hoverLeave() {
      this.hoverIndex = -1;
    },
    ckbHoverEnter(i) {
      this.ckbHoverIndex = i;
    },
    ckbHoverLeave() {
      this.ckbHoverIndex = -1;
    },
    getHoverClass(i) {
      return {
        'hover-tr':
          (this.hoverable && this.hoverIndex === i) ||
          this.selectedRows.indexOf(i) !== -1
      };
    },
    scrollToBottom() {
      let bw = this.$refs.bodyWrapper;
      bw.scrollTop += 100000;
    },
    selectAllRows(e) {
      let selectObjs = [];
      if (e.target.checked) {
        if (e.target.checked) {
          for (let i = 0; i < this.rowCount; i++) {
            if (this.selectedRows.indexOf(i) === -1) {
              this.selectedRows.push(i);
              selectObjs.push({
                index: i,
                checked: true
              });
            }
          }
        }
      } else {
        selectObjs = this.selectedRows.map(function(it) {
          return {
            index: it,
            checked: false
          };
        });
        this.selectedRows = [];
      }
      this.$emit('selectrow', selectObjs);
    },
    handlerSelectAllStatus() {
      if (!this.hasIndex) return;
      this.$nextTick(function() {
        let count = this.selectedRows.length;
        let ckbs = this.$refs.ckball;
        let rc = this.rowCount;
        if (ckbs) {
          for (let i = 0; i < ckbs.length; i++) {
            let ckb = ckbs[i];
            if (count === 0) {
              ckb.indeterminate = false;
              ckb.checked = false;
            } else if (count === rc && rc !== 0) {
              ckb.indeterminate = false;
              ckb.checked = true;
            } else {
              ckb.indeterminate = true;
            }
          }
        }
        this.$emit('selectedrows', this.selectedRows);
      });
    },
    selectRowByCb(i) {
      let selectObj = {
        index: i
      };
      if (this.selectedRows.indexOf(i) === -1) {
        this.selectedRows.push(i);
        selectObj.checked = true;
      } else {
        this.selectedRows.splice(this.selectedRows.indexOf(i), 1);

        selectObj.checked = false;
      }
      this.$emit('selectrow', [selectObj]);
    },
    selectRowByRow(i) {
      let selectObjs = [];
      this.selectedRows.forEach(function(it) {
        if (it !== i) {
          selectObjs.push({
            index: it,
            checked: false
          });
        }
      });
      if (this.selectedRows.indexOf(i) === -1) {
        selectObjs.push({
          index: i,
          checked: true
        });
      }
      this.selectedRows = [];
      this.selectedRows.push(i);
      this.$emit('selectrow', selectObjs);
    },
    watchOutSize() {
      let _this = this;
      let table = this.$refs.table;

      function watchOutSize() {
        _this.outWidth = table.offsetWidth;
        if (_this.height) {
          _this.outHeight = _this.isWebkit ? _this.height + 3 : _this.height + 1;
        } else {
          let outHeight =
            _this.headerHeight +
            _this.totalHeight +
            (_this.showFooter ? _this.rowHeight : 0) +
            (_this.isWebkit ? 1 : 0);
          if (_this.minHeight && outHeight < _this.minHeight) {
            outHeight = _this.isWebkit ? _this.minHeight + 3 : _this.minHeight + 1;
          }
          if (_this.maxHeight && outHeight > _this.maxHeight) {
            outHeight = _this.isWebkit ? _this.maxHeight + 3 : _this.maxHeight + 1;
          }
          _this.outHeight = outHeight;
        }
      }
      watchOutSize();
      setInterval(watchOutSize, 400);
    },
    setScrollBarSize() {
      let ua = navigator.userAgent.toLowerCase();
      let isWebkit = ua.indexOf('webkit') !== -1;
      if (!this.scrollable) this.scrollBarSize = 0;
      else if (isWebkit) this.scrollBarSize = 8;
      else {
        let temp = document.createElement('p'),
          w1,
          w2;
        temp.style.width = '100px';
        temp.style.height = '100px';
        this.$refs.table.appendChild(temp);
        w1 = temp.clientWidth;
        temp.style.overflowY = 'scroll';
        w2 = temp.clientWidth;
        this.scrollBarSize = w1 - w2;
        this.$refs.table.removeChild(temp);
      }
    },
    dblclick(i) {
      this.$emit('dblclickrow', i);
    },
    headeRightClick(e, j) {
      if (this.menu.length === 0) return;
      this.contextmenuStatus.rowindex = -1;
      this.contextmenuStatus.colindex = j;
      this.rclickHandler('header', e);
    },
    rightClick(rowindex, colindex) {
      let _this = this;
      return function(e) {
        _this.contextmenuStatus.rowindex = rowindex;
        _this.contextmenuStatus.colindex = colindex;
        _this.rclickHandler('body', e);
      };
    },
    rclickHandler() {
      /*  let _this = this;
          let status = this.contextmenuStatus;
          let tableRect = this.$refs.table.getBoundingClientRect();
          status.left = e.clientX;
          status.top = e.clientY;
          status.show = true;
          status.for = clickfor;*/
      let status = this.contextmenuStatus;
      this.$emit('openmenu', {
        rowindex: status.rowindex,
        colindex: status.colindex
      });
      document.addEventListener('click', chandler);
      document.addEventListener('mousewheel', mwhandler);

      function chandler() {
        status.show = false;
        document.removeEventListener('mousewheel', mwhandler);
        document.removeEventListener('click', chandler);
      }

      function mwhandler(e) {
        e.preventDefault();
        return false;
      }
    },
    showMenuItem(item) {
      let status = this.contextmenuStatus;
      if (item.at && !item.at.test(status.rowindex + ',' + status.colindex)) {
        return false;
      } else {
        return !item.for || this.contextmenuStatus.for === item.for;
      }
    },
    selectmenu(clickid) {
      let status = this.contextmenuStatus;
      this.$emit('selectmenu', {
        clickid: clickid,
        for: status.for,
        rowindex: status.rowindex,
        colindex: status.colindex
      });
    },
    resizeMove(event, prop) {
      let target = event.target;
      let restat = this.resizeStatus;

      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      let rect = target.getBoundingClientRect();
      let bodyStyle = document.body.style;

      if (!restat.isDraging) {
        if (rect.right - event.pageX < 12) {
          bodyStyle.cursor = 'col-resize';
          restat.resizeCol = prop;
          restat.dragable = true;
        } else {
          bodyStyle.cursor = '';
          restat.resizeCol = '';
          restat.dragable = false;
        }
      }
    },
    resizeOut() {
      document.body.style.cursor = '';
      if (!this.resizeStatus.isDraging) {
        this.resizeStatus.dragable = false;
      }
    },
    resizeDown(event) {
      let restat = this.resizeStatus;
      if (restat.dragable) {
        restat.showProxy = true;
        restat.isDraging = true;
        restat.dragStart = event.pageX;
        restat.proxyLeft = restat.dragStart;

        document.addEventListener('mousemove', this.proxyMove);
        document.addEventListener('mouseup', this.resizeUp);
        document.onselectstart = function() {
          return false;
        };
        document.ondragstart = function() {
          return false;
        };
      }
    },
    resizeUp() {
      let restat = this.resizeStatus;
      let vCols = this.validCols;
      if (restat.dragable) {
        restat.showProxy = false;
        document.removeEventListener('mousemove', this.proxyMove);
        document.removeEventListener('mouseup', this.resizeUp);
        document.onselectstart = null;
        document.ondragstart = null;
        restat.isDraging = false;
        restat.dragable = false;
        let resizeCol = restat.resizeCol;
        if (resizeCol) {
          vCols[resizeCol].width += restat.proxyLeft - restat.dragStart;
          if (vCols[resizeCol].width <= 24) {
            vCols[resizeCol].width = 24;
          }
          if (vCols[resizeCol].width <= vCols[resizeCol].minWidth) {
            vCols[resizeCol].width = vCols[resizeCol].minWidth;
          }
        }
      }
    },
    proxyMove(event) {
      this.resizeStatus.proxyLeft = event.pageX;
    }
  },
  directives: {
    setspan: {
      bind(el, binding) {
        el.colSpan = binding.value.colspan;
        el.rowSpan = binding.value.rowspan;
      },
      update(el, binding) {
        el.colSpan = binding.value.colspan;
        el.rowSpan = binding.value.rowspan;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.dr-table {
  * {
    box-sizing: border-box;
  }
  width: 100%;
  max-width: 100%;
  color: #5e6167;
  box-sizing: border-box;
  position: relative;
  .drheader-wrapper {
    position: absolute;
    overflow: hidden;
    border-top: 1px solid #ebeef5;
    z-index: 2;
    table {
      background: #f5f7fa;
      position: relative;
    }
  }
  .drbody-wrapper {
    overflow: auto;
    td.index-td {
      background: #f5f7fa;
      text-align: center !important;
    }
  }
  .fldrbody-wrapper {
    overflow: hidden !important;
    td.index-td {
      background: #f5f7fa;
      text-align: center !important;
    }
    td:not(:first-child) {
      visibility: hidden;
    }
  }
  .drfooter-wrapper {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    z-index: 2;
    table {
      background: #efefef;
    }
    td,
    th {
      border-top: 1px solid #ebeef5;
      text-align: center !important;
    }
  }
  .drheader-wrapper,
  .drbody-wrapper,
  .drfooter-wrapper,
  .fldrbody-wrapper {
    width: 100%;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
  }
  tr.hover-tr {
    background: #f5f7fa;
  }
  td,
  th {
    font-size: 12px;
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  th {
    text-align: center;
  }
  th.is-dn,
  td.is-dn {
    display: none;
  }
  th.is-vh,
  td.is-vh {
    visibility: hidden;
  }
  .cell,
  .cell-right,
  .cell-center {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 6px;
    padding-right: 6px;
    >* {
      width: 100%;
      background: transparent;
    }
    >*:focus {
      background: #fff;
    }
    input {
      padding-left: 6px;
      padding-right: 6px;
      border: 0 !important;
      outline: 0 !important;
    }
  }
  .cell-np {
    padding-left: 0px;
    padding-right: 0px;
  }
  .cell-right {
    text-align: right;
    >* {
      text-align: right;
    }
  }
  .cell-center {
    text-align: center;
    >* {
      text-align: center;
    }
  }
  .fixed-left {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    overflow: hidden;
  }
  .border-left,
  .border-right,
  .border-bottom {
    position: absolute;
    z-index: 3;
    border: 0;
  }
  .border-left {
    top: 0;
    left: 0;
    width: 1px;
    border-right: 1px solid #ebeef5;
  }
  .border-right {
    top: 0;
    right: 0;
    width: 1px;
    border-right: 1px solid #ebeef5;
  }
  .border-bottom {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #ebeef5;
  }
  .resize-proxy {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #ebeef5;
    z-index: 10;
  }
  .contextmenu {
    position: fixed;
    background: #fff;
    font-size: 12px;
    padding: 0;
    box-shadow: 1px 1px 8px #aaa;
    z-index: 15;
    border-radius: 1px;
    background: #fafafa;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        padding: 2px 10px 2px 10px;
        margin: 0;
        line-height: 21px;
        height: 25px;
        user-select: none;
        * {
          text-align: center;
          float: left;
        }
      }
      li:hover {
        background: #e3e3e3;
      }
    }
  }
}

.dr-table {
   ::-webkit-scrollbar {
    background: #fdfdfd;
    width: 8px;
    height: 8px;
  }
   ::-webkit-scrollbar-track {
    background: #fdfdfd;
  }
   ::-webkit-scrollbar-thumb {
    background: #c3c3c3;
  }
}
</style>