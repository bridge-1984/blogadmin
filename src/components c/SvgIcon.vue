<template>
<i class="sketch-icon">
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</i>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      return `#${this.name}`
    }
  }
}
</script>

<style lang='less' scoped>
.sketch-icon {
  .icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.32em;
    padding-right: 2px;
    fill: currentColor;
    overflow: hidden;
  }
}

</style>
