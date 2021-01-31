import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { uuid } from 'vue-uuid';

describe('App.vue default', () => {
  const wrapper = mount(App);
  it('renders App', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should find form in component', () => {
    expect(wrapper.classes()).toContain('form');
  });
  it('should find save and restore  button', () => {
    const saveButton = wrapper.find('.btn-primary');
    const restoreButton = wrapper.find('.btn-light');
    expect(saveButton.exists()).toBe(true);
    expect(restoreButton.exists()).toBe(true);
  });
  it('should find add button', () => {
    const addButton = wrapper.find('.btn-round');
    expect(addButton.exists()).toBe(true);
  });

  it('should find (increase decrease) buttons and inputfield', () => {
    const buttons = wrapper.findAll('.btn-secondary');
    const Input = wrapper.findAll('.input');
    expect(Input.length).toBe(1);
    expect(buttons.length).toBe(2);
  });
});

describe('App.vue Functionality', () => {
  const wrapper = mount(App);
  it('should renders new CountItem (input, 2 buttons) when click + button', async () => {
    const addButton = wrapper.find('.btn-round');
    expect(addButton.exists()).toBe(true);

    await addButton.trigger('click');

    const buttons = wrapper.findAll('.btn-secondary');
    const Input = wrapper.findAll('.input');

    expect(Input.length).toBe(2);
    expect(buttons.length).toBe(4);
  });
});

describe('App.vue functionality', () => {
  const wrapper = mount(App);
  it('tests addNewCountItem function', async () => {
    expect(wrapper.vm.CounterList.length).toBe(1);
    await wrapper.vm.addNewCountItem();
    await wrapper.vm.addNewCountItem();
    const result = wrapper.vm.CounterList.length;
    expect(result).toBe(3);
  });
  it('tests changeCountHandler function', async () => {
    await wrapper.vm.addNewCountItem();
    await wrapper.vm.addNewCountItem();
    expect(wrapper.vm.CounterList[0].countValue).toBe('');
    expect(wrapper.vm.CounterList[2].countValue).toBe('');
    await wrapper.vm.changeCountHandler(2, 1);
    await wrapper.vm.changeCountHandler(2, 1);
    expect(wrapper.vm.CounterList[0].countValue).toBe('');
    expect(wrapper.vm.CounterList[2].countValue).toBe('2');
    await wrapper.vm.changeCountHandler(0, -1);
    const result = wrapper.vm.CounterList[0].countValue;
    expect(result).toBe('-1');
  });
  it('tests saveChangedValues function', async () => {
    await wrapper.vm.addNewCountItem();
    await wrapper.vm.changeCountHandler(1, 1);
    await wrapper.vm.changeCountHandler(1, 1);
    expect(wrapper.vm.CounterList[1].countValue).toBe('2');
    expect(wrapper.vm.CounterList[1].savedCountValue).toBe('');
    await wrapper.vm.saveChangedValues();
    const result = wrapper.vm.CounterList[1].savedCountValue;
    expect(result).toBe('2');
  });
  it('tests restorePreviousValues function', async () => {
    wrapper.vm.CounterList = [{ id: uuid.v1(), countValue: '', savedCountValue: '' }];
    expect(wrapper.vm.CounterList.length).toBe(1);
    await wrapper.vm.addNewCountItem();
    await wrapper.vm.changeCountHandler(1, 1);
    await wrapper.vm.changeCountHandler(1, 1);
    expect(wrapper.vm.CounterList[1].countValue).toBe('2');
    await wrapper.vm.restorePreviousValues();
    expect(wrapper.vm.CounterList[1].countValue).toBe('');
    await wrapper.vm.changeCountHandler(1, 1);
    await wrapper.vm.saveChangedValues();
    await wrapper.vm.restorePreviousValues();
    const result = wrapper.vm.CounterList[1].countValue;
    expect(result).toBe('1');
  });
});
