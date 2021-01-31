<template>
  <input
    class="input"
    type="number"
    placeholder="Enter number"
    :value="value"
    @input="$emit('onValueChange', $event.target.value)"
    @focus="$event.target.select()"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const Component = defineComponent({
  name: 'VInput',
  props: {
    value: {
      type: String,
    },
  },
});

export default Component;
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";

.input {
  padding: 12px 16px;
  border-radius: 25px;
  background-color: $light-color;
  color: $dark-color;
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  transition: 0.2s all;
  &:focus {
    box-shadow: 1px 1px 5px $dark-color;
  }
}
</style>
