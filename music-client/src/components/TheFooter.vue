<template>
  <div class="the-footer">
    <p v-for="(item, index) in footerList" :key="index">
      {{item}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'the-footer',
  
  data () {
    return {
      footerList: [
        `Copyright © 2021 Supercharged by Group 18`
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-footer.scss';
</style>
