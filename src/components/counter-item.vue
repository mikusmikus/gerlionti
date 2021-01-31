<template>
  <div class="row center-xs middle-xs">
    <div class="col-sm-6 col-xs-12">
      <VInput :value="value" @onValueChange="$emit('onValueChange', $event)" />
    </div>
    <div class="col-sm-3 col-xs-6">
      <VButton buttonClass="btn-secondary" @onClick="$emit('onIncreaseClick')">
        Increase
      </VButton>
    </div>
    <div class="col-sm-3 col-xs-6">
      <VButton buttonClass="btn-secondary" @onClick="$emit('onDecreaseClick')">
        Decrease
      </VButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from './button.vue';
import VInput from './input.vue';

const Component = defineComponent({
  name: 'counter-item',
  components: {
    VButton,
    VInput,
  },
  props: {
    value: {
      type: String,
    },
  },
  emits: ['onIncreaseClick', 'onDecreaseClick', 'imputValueChanged'],
});

export default Component;
</script>

<style lang="scss" scoped></style>
