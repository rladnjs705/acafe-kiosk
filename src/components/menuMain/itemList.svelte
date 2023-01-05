<script>
  import Item from './item.svelte';
</script>

<div class="row row-cols-4 g-4 pl-3 pr-3 pt-2 pb-4 list-bg-shadow">
      <div class="col mb-2">
        <span class="btn-add-modal-show" >
          <div class="card menu-add-box h-100 d-flex justify-content-center align-items-center">
            <i class='bx bx-plus bx-md' ></i>
          </div>
        </span>
      </div>                               
       <Item />
  <!-- Loading-box start-->

  <!-- Loading-box end-->
</div>