<template>
  <div>
    <headers title="员工管理" inline></headers>
    <div class="btnBox">
      <Button type="primary" shape="circle" icon="md-add">新增</Button>
      <Button type="primary" shape="circle" icon="md-trash">批量删除</Button>
      <Button type="primary" shape="circle" icon="md-arrow-round-down" @click="exportExcel">导出</Button>
    </div>

    <Table :loading="tableLoading"
           ref="userSelection"
           :columns="columns"
           :data="userList"
           @on-selection-change="onSelect">
    </Table>
  </div>
</template>

<script>
import headers from '@/components/Public/headers.vue'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  data() {
    return {
      tableLoading: true,
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '姓名',
        key: 'name',
        align: 'center'
      }, {
        title: '工号',
        key: 'id',
        align: 'center'
      }, {
        title: '部门',
        key: 'department',
        align: 'center'
      }, {
        title: '手机',
        key: 'phone',
        align: 'center'
      }, {
        title: '邮箱',
        key: 'email',
        align: 'center'
      }, {
        title: '学历',
        key: 'qualification',
        align: 'center'
      }, {
        title: '操作',
        key: 'action',
        width: 130,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                opacity: '0.7'
              },
              on: {
                click: () => {
                  this.editTable(params.row)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginLeft: '5px',
                opacity: '0.7'
              }
            }, '删除')
          ])
        }
      }],
      userList: [{
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }, {
        name: '胡歌',
        id: 201903220001,
        department: '技术部',
        phone: '16655667788',
        email: '747896298@qq.com',
        qualification: '本科'
      }],
      selection: []
    }
  },
  mounted() {
    this.tableLoading = false
  },
  methods: {
    editTable (data) {
      console.log(data)
    },
    onSelect(selection, row) {
      this.selection = selection
    },
    exportExcel() {
      if (this.selection == '') return this.$Message.warning('请先选择您要导出的项')
      const defaultCellStyle =  { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}}
      const wopts = { bookType:'xlsx', bookSST:false, type:'binary', defaultCellStyle: defaultCellStyle, showGridLines: false}   
      const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }; 
      let data = this.selection
      wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)

      let tmpDown =  new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" })
      FileSaver.saveAs(tmpDown, '员工列表.xls')
    },
    //字符串转字符流
    s2ab(s) {
      if (typeof ArrayBuffer !== 'undefined') {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);  
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;  
          return buf;  
      } else {
          var buf = new Array(s.length);  
          for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;  
          return buf;  
      }
    }
  },
  components: {
    headers
  }
}
</script>

<style>
  .btnBox {
    display: inline-block;
    margin-left: 20px;
    position: relative;
    top: -3px;
  }

  .btnBox button {
    margin: 0 5px;
  }
</style>

