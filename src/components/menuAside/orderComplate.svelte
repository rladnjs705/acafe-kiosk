<script>
  import Modal from '../common/modal.svelte';
  import { modalActiveComplateOrder } from '$stores';
</script>

<Modal bind:modalActive={$modalActiveComplateOrder}>
  <h4 slot="modal-title" >주문 완료</h4>
  <div class="modal-body" slot="modal-body">
    <h5 class="mb-3">
      10000 원 결재
    </h5>  
      <span class="invalid-feedback was-validated">0</span>
  </div>
  <div class="modal-footer" slot="modal-footer" >
    <button class="btn btn-primary" >확인</button>
  </div>
</Modal>

