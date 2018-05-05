<template>
	<div class="my-grids">
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: 'my-grid'
}
</script>

<style>
	.my-grids {
		position: relative;
		overflow: hidden
	}

	.my-grids:before {
		right: 0;
		height: 1px;
		border-top: 1px solid #d9d9d9;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5)
	}

	.my-grids:after, .my-grids:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		color: #d9d9d9
	}

	.my-grids:after {
		width: 1px;
		bottom: 0;
		border-left: 1px solid #d9d9d9;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleX(.5);
		transform: scaleX(.5)
	}
</style>
