<template>
  <div class="markdown">
    <mavon-editor v-model="value"></mavon-editor>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      defaultData: 'preview'
    }
  }
}
</script>

<style>

</style>
