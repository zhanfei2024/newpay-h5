<template>
  <a class="mint-cell my-cell" :href="href">
    <span class="mint-cell-mask" v-if="isLink"></span>
    <div class="mint-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <slot name="icon">
          <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
        </slot>
        <slot name="title">
          <span class="mint-cell-text" v-text="title"></span>
          <span v-if="label" class="mint-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="mint-cell-value" :class="{ 'is-link' : isLink }">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
    </div>
    <div class="mint-cell-right">
      <slot name="right"></slot>
    </div>
    <i v-if="isLink" class="mint-cell-allow-right"></i>
  </a>
</template>

<script>

export default {
  name: 'my-cell',

  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },

  computed: {
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.added = true;
          this.$el.addEventListener('click', this.handleClick);
        });
        return resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    }
  }
};
</script>

<style>
.my-cell:not(.newline) .mint-cell-value {
  width: 68%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  text-align: right;
}
.my-cell.newline .mint-cell-value {
  width: 68%;
  /*text-overflow: ellipsis;*/
  overflow: auto;
  display: block;
  text-align: right;
  line-height: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.my-cell .mint-cell-value>:first-child {
  width: 100%;
  text-align: right;
  overflow: auto;
}
</style>