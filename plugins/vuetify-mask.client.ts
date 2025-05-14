import IMask from 'imask';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', {
    mounted(el, binding) {
      const input = el.querySelector('input');
      if (!input) return;

      const maskOptions = getMask(binding.value);
      IMask(input, maskOptions);
    },
    updated(el, binding) {
      const input = el.querySelector('input');
      if (!input) return;

      const maskOptions = getMask(binding.value);
      IMask(input, maskOptions);
    },
  });
});

function getMask(type: string | 'cpfcnpj') {
  if (type === 'cpfcnpj') {
    return {
      mask: [
        {
          mask: '000.000.000-00',
          maxLength: 11,
        },
        {
          mask: '00.000.000/0000-00',
          maxLength: 14,
        },
      ],
      overwrite: true,
      dispatch(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '');
        return number.length > 11
          ? dynamicMasked.compiledMasks[1]
          : dynamicMasked.compiledMasks[0];
      },
    };
  }

  return { mask: type };
}