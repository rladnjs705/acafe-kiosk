<script>
  import Modal from '../common/modal.svelte';
  import { modalActiveItem, itemFormValue, itemFormMode } from '$stores';
  // import { query, mutation } from 'svelte-apollo';
  // import { ADD_ITEM, GET_CATEGORIES, GET_ITEMS, UPDATE_ITEM, DELETE_ITEM, ITEM_FIELDS, UPLOAD_FILE } from '$lib/apollo/query';
  // import { ADD_MODE, EDIT_MODE } from '$utils/constans.js';
  // import { extractErrors, itemValidateSchema } from '$utils/validates';

  // const items = query(GET_ITEMS);
  // const categories = query(GET_CATEGORIES);
  // const addItem = mutation(ADD_ITEM);
  // const updateItem = mutation(UPDATE_ITEM);
  // const deleteItem = mutation(DELETE_ITEM);
  // const uploadFile = mutation(UPLOAD_FILE);

  // let errors = {};

  // $: {
  //   if($itemFormMode === ADD_MODE) {
  //     itemFormValue.resetForm();
  //     errors = {};
  //   }
    
  //   if($itemFormMode === EDIT_MODE) errors = {};
  // }

  // const onAddItem = async () => {
  //   $itemFormValue.itemPrice = Number($itemFormValue.itemPrice);

  //   try {
  //     await addItem({
  //       variables: $itemFormValue,
  //       update: (cache, {data: {addItem}}) => {
  //         // const existingItems = cache.readQuery({query: GET_ITEMS});
  //         // const newItem = addItem;

  //         // cache.writeQuery({
  //         //   query: GET_ITEMS,
  //         //   variables: { itemCategoryId: $itemCategorySelected},
  //         //   data: {
  //         //     itemPageCount: existingItems.itemPageCount,
  //         //     items: [newItem, ...existingItems.items],
  //         //   }
  //         // });

  //         cache.modify({
  //           fields: {
  //             items(existingItemsRefs = [], {readField}) {
  //               const newItemRef = cache.writeFragment({
  //                 data: addItem,
  //                 fragment: ITEM_FIELDS,
  //               });

  //               return [newItemRef, ...existingItemsRefs];
  //             }
  //           }
  //         });
  //       }
  //     });
  //     clearItemForm();
  //   }
  //   catch(error) {
  //     //console.log(`add item error: ${error.message}`)
  //   }
  // }

  // const clearItemForm = () => {
  //   itemFormValue.resetForm();
  //   modalActiveItem.closeModal();
  //   errors = {};
  //   // items.refetch();
  // }

  // const onUpdateItem = async () => {
  //   $itemFormValue.itemPrice = Number($itemFormValue.itemPrice);

  //   try {
  //     await updateItem({
  //       variables: $itemFormValue,
  //       update: (cache, {data: {updateItem}}) => {
  //         // const existingItems = cache.readQuery({query: GET_ITEMS});
  //         // const newItems = existingItems.items.map(item => item.id === updateItem._id ? item = updateItem : item );

  //         // cache.writeQuery({
  //         //   query: GET_ITEMS,
  //         //   variables: { itemCategoryId: $itemCategorySelected },
  //         //   data: { 
  //         //     itemPageCount: existingItems.itemPageCount,
  //         //     items: newItems,
  //         //   }
  //         // });
  //         cache.modify({
  //           fields: {
  //             items(existingItemRefs, {readField}) {
  //               cache.writeFragment({
  //                 data: updateItem,
  //                 fragment: ITEM_FIELDS,
  //               });

  //               return existingItemRefs;
  //             }
  //           }
  //         });
  //       }
  //     });
  //     clearItemForm();
  //   }
  //   catch(error) {
  //     console.log(`update item error ${error}`);
  //   }
  // }

  // const onDeleteItem = async () => {
  //   if(confirm('?????? ????????? ??????????????????????')) {
  //     try {
  //       await deleteItem({
  //         variables: {_id: $itemFormValue._id},
  //         update: (cache, {data: {deleteItem}}) => {
  //           cache.modify({
  //             fields: {
  //               items(existingItems, {}) {
  //                 const newItems = existingItems.filter(
  //                   item => item.__ref !== `Item:${deleteItem}`
  //                 );
  //                 return newItems;
  //               }
  //             }
  //           });
  //         }
  //       });
  //       clearItemForm();
  //     }
  //     catch(error) {
  //       console.log(`delete item error: ${error}`);
  //     }
  //   }
  // }

  // const onUploadFile = async (e) => {
  //   const { files } = e.target;

  //   try {
  //     const upload = await uploadFile({variables: {file: files[0]}});
  //     $itemFormValue.itemImage = upload.data.uploadFile.filePath + upload.data.uploadFile.fileName;
  //     return upload;
  //   }
  //   catch(error) {
  //     console.log(`file upload error: ${error}`);
  //   }
  // }

  // const onSubmitAddItem = async () => {
  //   try {
  //     await itemValidateSchema.validate($itemFormValue, {abortEarly: false});
  //     onAddItem();
  //   }
  //   catch(error) {
  //     errors = extractErrors(error);
  //   }
  // }

  // const onSubmitUpdateCategory = async () => {
  //   try {
  //     await itemValidateSchema.validate($itemFormValue, {abortEarly: false});
  //     onUpdateItem();
  //   }
  //   catch(error) {
  //     errors = extractErrors(error);
  //   }
  // }

</script>
<Modal bind:modalActive={$modalActiveItem}>
  <!-- slot modal-header start -->
  <h4 slot="modal-title" >?????? ??????</h4>
  <!-- slot modal-header end -->

  <!-- slot modal-body start -->          
  <div class="modal-body" slot="modal-body" >
    <div class="mb-3 ">
      <label for="recipient-name" class="col-form-label">?????? ??????:</label>
      <input type="text" class="form-control" id="recipient-name" bind:value={$itemFormValue.itemName}>
      <!-- <div class="invalid-feedback was-validated">????????? ????????? ?????????.</div> -->
    </div>
    <div class="mb-3">
      <label for="recipient-name" class="col-form-label">?????? ????????????:</label>
      <select name="menu-cateogry-select" class="form-select" bind:value={$itemFormValue.itemCategoryId} >
        <option value="">???????????? ??????</option>
      </select>
    </div>            
    <div class="mb-3">
      <label for="message-text" class="col-form-label">?????? ??????:</label>
      <input type="text" class="form-control" id="recipient-name" bind:value={$itemFormValue.itemPrice} >
    </div>
    <div class="mb-3">
      <label for="message-text" class="col-form-label">?????? ?????????:</label>
      <input type="file" class="form-control" id="recipient-name" >
    </div>    
  </div>
  <!-- slot modal-body end -->      
  
  <!-- slot modal-footer start -->          
  <div class="modal-footer d-flex flex-column align-items-stretch" slot="modal-footer" >
      <button type="button" class="btn btn-primary pt-3 pb-3" >?????? ??????</button>
      <!-- <div class="row item-bottom">
        <div class="col">
          <button type="button" class="btn btn-primary pt-3 pb-3" on:click={onSubmitUpdateCategory} >?????? ??????</button>        
        </div>
        <div class="col">
          <button type="button" class="btn btn-danger pt-3 pb-3" on:click={onDeleteItem} >?????? ??????</button>        
        </div>        
      </div> -->
  </div>
  <!-- slot modal-footer end -->          
</Modal>  