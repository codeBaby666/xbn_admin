<template>
	<div>
		<transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
    </div>
</template>

<script>

  	export default {
    	
  	}

</script>

<style>
  	@import './style/reset.css';
	@import './style/style.css';
	.router-fade-enter-active, .router-fade-leave-active {
		transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
		opacity: 0;
	}
</style>
