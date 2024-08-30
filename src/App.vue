<template>
	<div id="app">
		<CurrencyConverter />
	</div>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter.vue'

export default {
	name: 'App',
	components: {
		CurrencyConverter,
	},
}
</script>

<style>
body {
	font-family: Arial, sans-serif;
	background-color: #f4f4f4;
	color: #333;
	margin: 0;
	padding: 0;
}
</style>
