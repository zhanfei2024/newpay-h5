<template>
	<a :href="href" :class="blockClass">
		<div class="my-grid-icon">
			<slot name="icon"></slot>
		</div>
		<p class="my-grid-label"><slot></slot></p>
	</a>
</template>

<script>
function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

export default {
  name: 'my-grid-item',
  data () {
    return {
      blockClass: "my-grid my-grid-3",
    }
  },
  props: {
    to: String,
    per:{
      type:Boolean,
      default:false
      }
  },

  computed: {
    href () {
      let href

      if (this.$router && this.to) {
        const base = this.$router.history.base
        const resolved = this.$router.match(this.to)
        const fullPath = resolved.redirectedFrom || resolved.fullPath

        href = base ? cleanPath(base + fullPath) : fullPath
      } else {
        href = this.to
      }

      if (href && !this.added && this.$router) {
        this.$nextTick(() => {
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
      }
      return href
    }
  },
  created(){
    if(this.per){
        this.blockClass="my-grid my-grid-4";
    }
  },
  methods: {
    handleClick ($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  }
}
</script>

<style>
  .my-grid {
    position: relative;
    float: left;
    padding: 20px 10px;
    box-sizing: border-box
  }
  .my-grid-3{
     width: 33.33333333%;
  }
  .my-grid-4{
      width:25%;
  }

  .my-grid:before {
    top: 0;
    width: 1px;
    border-right: 1px solid #d9d9d9;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(.5);
    transform: scaleX(.5)
  }

  .my-grid:after, .my-grid:before {
    content: " ";
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d9d9d9
  }
  
  .my-grid:after {
    left: 0;
    height: 1px;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5)
  }

  .my-grid:active {
    background-color: #ececec
  }

  .my-grid-icon {
    width: 28px;
    height: 28px;
    margin: 0 auto
  }

  .my-grid-icon img {
    display: block;
    width: 100%;
    height: 100%
  }

  .my-grid-icon + .my-grid-label {
    margin-top: 5px
  }

  .my-grid-label {
    display: block;
    color: #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden
  }

  .my-grid-label {
    text-align: center;
    font-size: 14px
  }
</style>
