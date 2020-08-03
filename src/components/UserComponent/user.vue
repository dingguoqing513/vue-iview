<template>
  <div class="user-container">
    <headers title="员工管理" inline></headers>
    <div class="btnBox">
      <div class="btnBox-item">
        <Button type="primary" shape="circle" icon="md-add" @click="addUser">新增</Button>
        <Button type="success" shape="circle" icon="md-arrow-round-down" @click="exportExcel">导出</Button>
      </div>
      <div class="btnBox-item btnBox-right">
        <Input placeholder="搜索用户"
               class="searchUser"
               v-model.trim="searchValue"
               @on-click="searchUser"
               @on-enter="searchUser"
               @on-search="searchUser">
            <Icon type="ios-search" slot="suffix" />
        </Input>
      </div>
    </div>
    <Table :loading="tableLoading"
           ref="userSelection"
           :columns="columns"
           :data="userList"
           @on-selection-change="onSelect">
    </Table>
    <Page class="page-class"
          :total="total"
          :current="current"
          size="small"
          show-total
          show-elevator
          @on-change='onCurrentChange'/>
    <Modal class="modalAddUser"
           v-model="addUserModal"
           draggable
           scrollable
           :title="modalTitle"
           @on-visible-change="addUserModalChange('addUserForm')">
          <Form ref="addUserForm" :model="addUserForm" :rules="addUserRef" :label-width="120">
            <FormItem label="用户名：" prop="name">
              <Input v-model="addUserForm.name" placeholder="用户名" clearable style="width: 300px" />
            </FormItem>
            <FormItem label="工 号：" prop="id">
              <Input v-model="addUserForm.id" :disabled="showModal === 'edit'" placeholder="工号" clearable style="width: 300px" />
            </FormItem>
            <FormItem label="部 门：" prop="department">
              <Input v-model="addUserForm.department" placeholder="部门" clearable style="width: 300px" />
            </FormItem>
            <FormItem label="手 机：" prop="phone">
              <Input v-model="addUserForm.phone" placeholder="手机" clearable style="width: 300px" />
            </FormItem>
            <FormItem label="邮 箱：" prop="email">
              <Input v-model="addUserForm.email" placeholder="邮箱" clearable style="width: 300px" />
            </FormItem>
            <FormItem label="学 历：" prop="education" style="width: 420px">
              <!-- <Input v-model="addUserForm.education" placeholder="学历" clearable style="width: 300px" /> -->
              <Select v-model="addUserForm.education">
                <Option v-for="item in educations" :value="item.label" :key="item.lable">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>
          <div slot="footer">
            <Button size="large" @click="cancelAddUser('addUserForm')">取消</Button>
            <Button type="success" size="large" v-if="showModal === 'add'" :loading="add_modal_loading" @click="submitAddUser('addUserForm')">新增</Button>
            <Button type="primary" size="large" v-if="showModal === 'edit'" :loading="add_modal_loading" @click="submitEditUser('addUserForm')">完成</Button>
        </div>
    </Modal>

    <Modal v-model="delModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>确定删除？</span>
        </p>
        <div style="text-align:center">
            <h3 style='color:#f60;font-weight:normal;margin: 20px 0;'>删除后将不可恢复，是否继续？</h3>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="del_modal_loading" @click="delListItem">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import headers from '@/components/Public/headers.vue'
import mock from '../../utils/data.js'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
export default {
  data () {
    return {
      tableLoading: true,
      addUserForm: {
        name: '',
        id: '',
        department: '',
        phone: '',
        email: '',
        education: ''
      },
      delModal: false,
      add_modal_loading: false,
      del_modal_loading: false,
      delItem: {},
      modalTitle: '',
      educations: mock.educations,
      searchValue: '',
      addUserRef: {
        name: [
          { required: true, message: '用户名不可以为空', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '工号不可以为空' }
        ],
        department: [
          { required: true, message: '部门不可以为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不可以为空', trigger: 'change' },
          { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" }
        ],
        email: [
          { required: true, message: '部门不可以为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式填写有误', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '学历不可以为空', trigger: 'blur' }
        ]
      },
      total: 0,
      current: 1,
      showModal: '',
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
        key: 'education',
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
                  this.showModal = 'edit'
                  this.modalTitle = '修改用户'
                  this.addUserModal = true
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
              },
              on: {
                click: () => {
                  this.delModal = true
                  this.delItem = params.row
                }
              }
            }, '删除')
          ])
        }
      }],
      userList: mock.testUserList,
      selection: [],
      addUserModal: false
    }
  },
  created () {
    this.$axios.get('/api/userInfo', {
      params: {
        account: localStorage.getItem('username')
      }
    }).then((res) => {
      console.log(res)
    })
  },
  mounted () {
    this.tableLoading = false
    this.getUserList()
  },
  methods: {
    getUserList (params) {
      this.$axios.get('/api/userList', {
        params: params ? params : {
          page: 1,
          page_size: 10
        }
      }).then((res) => {
        console.log(res)
        this.userList = res.data.list
        this.total = res.data.total
      })
    },
    addUser () {
      this.modalTitle = '新增用户'
      this.showModal = 'add'
      this.addUserModal = true
    },
    submitAddUser (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = { ...this.addUserForm, phone: this.addUserForm.phone }
          this.requestAddUser(params)
        } else {
          this.$Message.error('Fail');
        }
      })
    },
    submitEditUser (name) {
      console.log(this.addUserForm)
      this.$refs[name].validate((valid) => {
        if (valid) {
          let params = { ...this.addUserForm, phone: this.addUserForm.phone }
          this.requestEditUser(params)
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    addUserModalChange (name) {
      this.$refs[name].resetFields();
    },
    cancelAddUser (name) {
      this.addUserModal = false
    },
    requestAddUser (data) {
      console.log(data)
      this.$axios.post('/api/addUser', data).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$Message.success('新增成功!')
          this.getUserList()
          this.addUserModal = false
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    requestEditUser (data) {
      this.$axios.patch('/api/updateList', data).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$Message.success('修改成功!')
          this.getUserList()
          this.addUserModal = false
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    requestDelUser () {
      console.log(this.delItem)
      this.$axios.delete('/api/delList', {
        data: {
          id: this.delItem.id
        }
      }).then((res) => {
        console.log(res)
        this.delModal = false;
        this.del_modal_loading = false;
        this.$Message.success(res.data.msg);
        this.getUserList()
      })
    },
    delListItem () {
      this.del_modal_loading = true;
      this.requestDelUser()
    },
    editTable (data) {
      this.addUserForm = { ...data }
    },
    onSelect(selection, row) {
      this.selection = selection
    },
    onCurrentChange (page) {
      this.getUserList({ page: page, page_size: 10 })
    },
    searchUser () {
      console.log(this.searchValue)
      this.$axios.post('/api/searchList', {
        keyword: this.searchValue
      }).then((res) => {
        console.log(res)
        this.userList = res.data.list
        this.total = res.data.total
      })
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
  .user-container {
    position: relative;
  }
  .btnBox {
    display: inline-block;
    align-items: center;
    margin-left: 20px;
    position: relative;
    top: -3px;
    width: calc(100% - 121px);
  }

  .btnBox-item {
    display: inline-block;
  }

  .btnBox-right {
    position: absolute;
    right: 0;
  }

  .btnBox-right input {
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 15px;
    padding-left: 15px;
  }

  .btnBox-right input:focus {
    box-shadow: 0 3px 3px 0 rgba(45, 140, 240, .2);
  }

  .searchUser {
    width: 300px;
  }

  .page-class {
    margin: 20px auto 60px;
    text-align: center;
  }

  .btnBox button {
    margin: 0 5px;
  }

  .modalAddUser .ivu-modal-header {
    text-align: center;
  }

  .modalAddUser .ivu-form-item {
    margin-bottom: 25px;
  }
</style>

