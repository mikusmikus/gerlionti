<template>
  <button :type="buttonType" :disabled="disabled" @click="$emit('onClick')" :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

const Component = defineComponent({
  name: 'Vbutton',
  emits: ['onClick'],
  props: {
    buttonType: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonClass: {
      type: String,
      default: 'btn-primary',
    },
  },
});

export default Component;
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";

%button {
  width: 100%;
  padding: 13px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: $white-color;
  border: 2px solid $main-color;
  border-radius: 25px;
  margin-bottom: 10px;
  cursor: pointer;
  letter-spacing: 2px;
  transition: 0.2s all;
  outline: none;
  &:active {
    color: $dark-color;
  }
  &:hover {
    box-shadow: 1px 2px 5px $dark-color;
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
}
.btn-primary {
  @extend %button;
  background-color: $main-color;
}
.btn-secondary {
  @extend %button;
  color: $main-color;
  background: transparent;
}
.btn-light {
  @extend %button;
  background-color: $white-color;
  border: 2px solid $white-color;
  color: $dark-color;
}
.btn-round{
  width: 50px;
  height: 50px;
  color: $main-color;
  background: transparent;
  font-weight: 300;
  font-size: 35px;
  padding: 0;
  border-radius: 50%;
}
</style>
