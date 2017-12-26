<template>
  <div class="text-center">
    <left-side-bar class="mt1"></left-side-bar>
    <el-main v-if="isInput==='one'" class="mt1 qiujie">
      <strong>这是{{title}}</strong>
      <div style="width: 150px;margin: 10px auto;">
        <format-input v-model="input" :type="'number'" :v-class="'form-control'" :options="{maxLength: 10}" :v-style="{'borderColor': 'red'}" :attr="{'placeholder': '只能输数字', 'data-type': 'qiujie'}"></format-input>
      </div>
    </el-main>
    <el-main v-else-if="isInput==='two'" class="mt1 qiujie">
      <strong>这是{{title}}</strong>
      <div style="width: 210px;margin: 10px auto;">
        <el-input v-model='ela'></el-input>
      </div>
      <div style="width:1000px;margin: 0 auto;">
        <dr-table ref="table" :colobject="colobject" :tabledata="tdata" @selectedrows="selectedRows" @dblclickrow="openToast" :height="481" selectable has-index hoverable>
          <template slot="tr" slot-scope="props">
            <td>
              <div class="cell cell-left">
                {{props.item['customerName']}}
              </div>
            </td>
            <td>
              <div class="cell">
                {{props.item['customerPhone']}}
              </div>
            </td>
            <td>
              <div class="cell cell-center">
                {{props.item['gender'] == 'MALE '? '男 ': (props.item['gender'] == 'FEMALE '? '女 ': '未知 ')}}
              </div>
            </td>
            <td>
              <div class="cell cell-center">
                {{props.item['age']}}
              </div>
            </td>
            <td>
              <div class="cell cell-center">
                {{props.item['birthday']}}
              </div>
            </td>
            <td>
              <div class="cell cell-right">
                {{toFloor(props.item['consumptionAmount'])}}
              </div>
            </td>
            <td>
              <div class="cell cell-center">
                {{props.item['memberFlag'] ? '是 ': '否 '}}
              </div>
            </td>
            <td>
              <div class="cell cell-center">
                {{props.item['memberLevel'] ? props.item['memberLevel'].memberLevel : ' '}}
              </div>
            </td>
            <td>
              <div class="cell cell-right">
                {{props.item['membergrowth']}}
              </div>
            </td>
            <td>
              <div class="cell cell-right">
                {{props.item['integral']}}
              </div>
            </td>
            <td>
              <div class="cell cell-right">
                {{props.item['balance']}}
              </div>
            </td>
            <td>
              <div class="cell cell-right">
                <span v-if="props.item['memberLevel']!=null">
                  {{Number(props.item['memberLevel']['discount']) * 10 + '% '}}
                </span>
              </div>
            </td>
            <td>
              <div class="cell cell-center">
                <span v-if="props.item['customerType']!=null">
                  {{props.item['customerType']['customerType']}}
                </span>
              </div>
            </td>
            <td>
              <div class="cell cell-center">
                {{props.item['status'] == 'NORMAL '? '正常 ': '冻结 '}}
              </div>
            </td>
          </template>
        </dr-table>
      </div>
    </el-main>
  </div>
</template>
<script>
import App from './dashBoard';
export default App;
</script>
<style lang='scss' scoped>
@import './dashBoard';
</style>