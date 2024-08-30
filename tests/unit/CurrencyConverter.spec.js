import { mount } from '@vue/test-utils'
import CurrencyConverter from '../../src/components/CurrencyConverter.vue'

describe('CurrencyConverter.vue', () => {
	it('Проверка конвертации валюты', () => {
		const wrapper = mount(CurrencyConverter)

		wrapper.setData({
			amount: 100,
			fromCurrency: 'USD',
			toCurrency: 'EUR',
			exchangeRates: { EUR: 0.85 },
		})

		wrapper.vm.convertCurrency()

		expect(wrapper.vm.result).toBe('85.00')
	})
})
