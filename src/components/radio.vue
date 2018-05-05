<template>
  <mt-cell :value="value" class="my-radio">
    <label class="mint-radiolist-label" slot="title">
      <span class="mint-radio">
        <input class="mint-radio-input" type="radio" :name="name"
        :disabled="option.disabled"
        :value="option.value" @click.stop :checked="checked?'checked':''"> <!-- label 与 input 会触发两次 click，阻止 input的事件冒泡，使事件只触发一次 -->
        <span class="mint-radio-core"></span>
      </span>
      <slot>
        <span class="mint-radio-label" v-text="title"></span>
      </slot>
    </label>
  </mt-cell>
</template>

<script>
export default {
  name: "my-radio",
  data() {
    return {
    };
  },
  watch: {
  },
  methods: {
  },
  props: {
    title: String,
    name: String,
    value: String,
    checked: Boolean,
    option: {
        type: Object,
        default(){
          return {
            disabled: false,
            value: "",
          };
        },
    }
  }
}
</script>

<style>
.my-radio .mint-radio-core::after {
  top: 6px;
  left: 6px;
}
.my-radio .mint-radiolist-label {
  display: flex;
  align-items: center;
}
</style>
