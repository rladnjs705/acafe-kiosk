<script>
  import Modal from '../common/modal.svelte';
  import { modalActiveCategory } from '$stores';
</script>

<Modal bind:modalActive={$modalActiveCategory}>
  <!-- slot modal-header start -->
  <h4 slot="modal-title">메뉴 추가</h4>
  <!-- slot modal-header end -->

  <!-- slot modal-body start -->
  <div class="modal-body" slot="modal-body">
    <h5 class="mb-3">카테고리 목록</h5>
    
    <ul class="category-list">
        <li class="mb-3 d-flex justify-content-between">
          <p>Loading</p>
        </li>                   
            <li class="mb-3 d-flex justify-content-between">
              <p>카테고리</p> 
              <div class="edit-box">
                <a href="#null" class="link"><i class='bx bxs-pencil'  ></i></a>
                <a href="#null" class="link"><i class='bx bxs-trash'  ></i></a>
              </div>
            </li>           
            <li class="mb-3 d-flex justify-content-between">
              <input type="text" class="form-control border-line">
            </li>
    </ul>
  </div>
  <!-- slot modal-body end -->

  <!-- slot modal-footer start -->
  <div class="modal-footer d-flex flex-column align-items-stretch" slot="modal-footer">
    <div class="input-group">
      <input type="text" class="form-control border-line">
      <button class="btn btn-primary">등록</button>
    </div>
  </div>     
  <!-- slot modal-footer end -->
</Modal>
