<template>
  <div class="login-container">
    <div class="login-box" v-if="loginShow">
      <Input v-model="username" class="loginInt" placeholder="用户名" clearable />
      <Input v-model="password" type="password" class="loginInt" placeholder="密码" clearable />
      <Button type="primary" @click="login">登录系统</Button>
      <span class='register' @click="registerDialog">注册账号</span>
    </div>
    <div class="register-box" v-if="!loginShow">
      <Input v-model="username" class="loginInt" placeholder="用户名" clearable />
      <Input v-model="password" type="password" class="loginInt" placeholder="密码" clearable />
      <Input v-model="name" type="text" class="loginInt" placeholder="姓名" clearable />
      <Button type="primary" @click="register">点击注册</Button>
      <span class='register' @click="backLogin">返回登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      name: '',
      loginShow: true,
    }
  },
  methods: {
    login () {
      this.$axios.get('http://localhost:3000/login/', {
        params: {
          account: this.username,
          password: this.password
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          this.$Message.success('登录成功')
          this.$router.push('/')
          localStorage.setItem('username', this.username)
        } else {
          this.$Message.error('用户名或密码错误！');
        }
      })
    },
    register () {
      this.$axios.get('http://localhost:3000/register/', {
        params: {
          account: this.username,
          password: this.password,
          name: this.name
        }
      }).then((res) => {
        if (res.data.code === 201) {
          this.$Message.success('注册成功，正在登录...')
          this.$router.push('/')
        } else {
          this.$Message.error(res.data.msg || '注册失败')
        }
      })
    },
    registerDialog () {
      this.loginShow = false
    },
    backLogin () {
      this.loginShow = true
    }
  }
}
</script>

<style>
  .login-container {
    height: 100vh;
    background: #efefef;
    display: flex;
  }

  .login-box {
    margin: auto;
  }

  .register-box {
    margin: auto;
  }

  .loginInt {
    width: 200px;
    display: block;
    margin: 10px;
  }

  .register {
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
</style>