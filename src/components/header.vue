<template>
  <div class="my-header">
    <mt-header :title="title" :fixed="fixed">
      <slot name="left" slot="left"></slot>
      <slot name="right" slot="right"></slot>
    </mt-header>
    <div v-if="fixed" style="height:40px"></div>
  </div>
</template>
<script>
  export default{
    name:'my-header',
    props: {
      title: {
        type: String,
        default: ''
      },
      fixed:Boolean,
    },
    
  }
</script>