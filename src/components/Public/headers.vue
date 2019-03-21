<template>
  <div :style="{display: isDisplay}">
    <h1 class="homeTitle">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    inline: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    isDisplay: function() {
      return this.inline ? 'inline-block' : 'block'
    }
  },
  mounted() {
    console.log(this.title)
  }
}
</script>

<style>
  .homeTitle {
    font-weight: 300;
    font-size: 24px;
    padding: 20px 0;
  }
</style>


