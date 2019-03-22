<template>
  <div>
    <headers title="员工管理" inline></headers>
    <div class="btnBox">
      <Button type="primary" shape="circle" icon="md-add">新增</Button>
      <Button type="primary" shape="circle" icon="md-trash">批量删除</Button>
      <Button type="primary" shape="circle" icon="md-arrow-round-down">导出</Button>
    </div>

    <Table :loading="tableLoading"
           ref="userSelection"
           :columns="columns"
           :data="userList">
    </Table>
  </div>
</template>

<script>
import headers from '@/components/Public/headers.vue'
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
      }]
    }
  },
  mounted() {
    this.tableLoading = false
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

