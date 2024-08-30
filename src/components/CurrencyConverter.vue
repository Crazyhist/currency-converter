<template>
	<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
		<h1 class="text-2xl font-bold text-center mb-6">Currency Converter</h1>

		<div class="mb-4">
			<label for="amount" class="block text-sm font-medium text-gray-700"
				>Amount:</label
			>
			<input
				type="number"
				v-model="amount"
				id="amount"
				@input="convertCurrency"
				min="0.01"
				step="0.01"
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
		</div>

		<div class="mb-4">
			<label for="from" class="block text-sm font-medium text-gray-700"
				>From:</label
			>
			<select
				v-model="fromCurrency"
				id="from"
				@change="convertCurrency"
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option
					v-for="currency in currencies"
					:key="currency"
					:value="currency"
				>
					{{ currency }}
				</option>
			</select>
		</div>

		<div class="mb-4">
			<label for="to" class="block text-sm font-medium text-gray-700"
				>To:</label
			>
			<select
				v-model="toCurrency"
				id="to"
				@change="convertCurrency"
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option
					v-for="currency in currencies"
					:key="currency"
					:value="currency"
				>
					{{ currency }}
				</option>
			</select>
		</div>

		<div class="text-center mt-6">
			<p class="text-lg font-semibold">{{ result }}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			amount: 1,
			fromCurrency: this.getDefaultCurrency(),
			toCurrency: 'EUR',
			result: null,
			currencies: [
				'USD',
				'EUR',
				'RUB',
				'JPY',
				'GBP',
				'AUD',
				'CAD',
				'CHF',
				'CNY',
			],
			exchangeRates: {},
		}
	},
	methods: {
		getDefaultCurrency() {
			const locale = navigator.language
			const currencyMap = {
				'en-US': 'USD',
				'en-GB': 'GBP',
				'ru-RU': 'RUB',
				'ja-JP': 'JPY',
				'zh-CN': 'CNY',
			}
			return currencyMap[locale] || 'RUB'
		},
		fetchExchangeRates() {
			const apiKey = '14d4cc9e1a58ff59253756ed'
			axios
				.get(
					`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.fromCurrency}`
				)
				.then((response) => {
					this.exchangeRates = response.data.conversion_rates
					this.convertCurrency()
				})
				.catch((error) => {
					console.error('Error fetching exchange rates:', error)
				})
		},
		convertCurrency() {
			if (this.amount <= 0) {
				this.result = 'Please enter a positive amount'
				return
			}

			if (!this.exchangeRates[this.toCurrency]) return
			this.result = `${this.amount} ${this.fromCurrency} = ${(
				this.amount * this.exchangeRates[this.toCurrency]
			).toFixed(2)} ${this.toCurrency}`
		},
	},
	mounted() {
		this.fetchExchangeRates()
	},
	watch: {
		fromCurrency() {
			this.fetchExchangeRates()
		},
	},
}
</script>

<style scoped></style>
