<template>
  <div>Welcome! {{username}}</div>
</template>

<script>
export default {
  data () {
    return {
      username: this.$route.query.name
    }
  }
}
</script>

<style>

</style>
