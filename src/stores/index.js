import { writable } from 'svelte/store';
import { ADD_MODE, EDIT_MODE } from '$utils/constans';

function setModalActiveItem() {
  const { subscribe, set } = writable(false);

  const openModal = () => set(true);
  const closeModal = () => set(false);

  return {
    subscribe,
    set,
    openModal,
    closeModal,
  }
}

function setItemFormValue() {
  const initValues = {
    _id: '',
    itemName: '',
    itemCategoryId:'',
    itemPrice: '',
    itemImage: '',
  }

  const { subscribe, set } = writable({...initValues});

  const resetForm = () => set({...initValues});

  return {
    subscribe,
    set,
    resetForm,
  }
}

function setItemPage() {
  const initValues = {
    pageNumber: 1
  }

  const { subscribe, set, update } = writable({...initValues});

  const nextPage = () => {
    update(
      data => {
        data.pageNumber = data.pageNumber + 1;
        itemPageLock.set(true);
        itemPageLoading.set(true);
        return data;
      }
    )
  }

  const resetPage = () => {
    itemPageLock.set(true);
    set({...initValues});
  }

  return {
    subscribe,
    nextPage, 
    resetPage,
  }
}

function setItemFormMode() {
  const { subscribe, set } = writable('');

  const onAddMode = () => set(ADD_MODE);
  const onEditMode = () => set(EDIT_MODE);

  return {
    subscribe,
    onAddMode,
    onEditMode,
  }
}



export const modalActiveCategory = writable(false);
export const modalActiveItem = setModalActiveItem();
export const itemFormValue = setItemFormValue();
export const itemPage = setItemPage();
export const itemPageLock = writable(false);
export const itemFormMode = setItemFormMode();
export const itemSearch = writable('');
export const modalActiveComplateOrder = writable(false);
export const itemMainLoading = writable(false);
export const itemPageLoading = writable(false);