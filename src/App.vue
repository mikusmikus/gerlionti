<template>
  <form class="form" @submit.prevent="saveChangedValues()">
    <div class="row start-xs">
      <div class="col-xs-12">
        <VButton
          data-testid="button-add"
          buttonClass="btn-primary btn-round"
          @onClick="addNewCountItem()"
        >
          +
        </VButton>
      </div>
    </div>
    <CounterItem
      v-for="(item, index) in CounterList"
      :key="item.id"
      @onIncreaseClick="changeCountHandler(index, 1)"
      @onDecreaseClick="changeCountHandler(index, -1)"
      @onValueChange="CounterList[index].countValue = $event"
      :value="item.countValue"
    />
    <div class="row">
      <div class="col-xs-6">
        <VButton type="submit">Save</VButton>
      </div>
      <div class="col-xs-6">
        <VButton
          buttonClass="btn-light"
          :disabled="isDisabled()"
          @click.prevent="restorePreviousValues()"
        >
          Restore
        </VButton>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { uuid } from 'vue-uuid';
import CounterItem from './components/counter-item.vue';
import VButton from './components/button.vue';

type InputData = {
  id: string;
  countValue: string;
  savedCountValue: string;
};

interface Data {
  CounterList: InputData[];
}
const Component = defineComponent({
  components: {
    VButton,
    CounterItem,
  },
  data(): Data {
    return {
      CounterList: [],
    };
  },
  mounted() {
    const localStorageList = JSON.parse(localStorage.CounterList || '[]');
    if (!localStorageList.length) {
      this.CounterList = [{ id: uuid.v1(), countValue: '', savedCountValue: '' }];
    } else {
      this.CounterList = localStorageList;
    }
  },
  methods: {
    addNewCountItem() {
      const newInputObject: InputData = {
        id: uuid.v1(),
        countValue: '',
        savedCountValue: '',
      };
      this.CounterList.push(newInputObject);
    },
    changeCountHandler(index: number, value: number) {
      let newValue = Number(this.CounterList[index].countValue);
      newValue += value;
      this.CounterList[index].countValue = String(newValue);
    },
    saveChangedValues() {
      this.CounterList = this.CounterList.map((item) => ({
        ...item,
        savedCountValue: item.countValue,
      }));
      localStorage.CounterList = JSON.stringify(this.CounterList);
    },
    restorePreviousValues() {
      this.CounterList = this.CounterList.map((item) => ({
        ...item,
        countValue: item.savedCountValue,
      }));
    },
    isDisabled() {
      return !this.CounterList.some((item) => item.countValue !== item.savedCountValue);
    },
  },
});

export default Component;
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.form {
  background-color: rgb(200, 222, 230);
  padding: 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  border: 5px;
}
</style>
