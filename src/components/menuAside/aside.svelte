<script>
  import OrderList from './orderList.svelte';
  import OrderBottom from './orderBottom.svelte';
  import OrderResultList from './orderResultList.svelte';
  import OrderComplate from './orderComplate.svelte';
</script>

<aside> <!-- aside start-->
  <div class="side-header">
    <div class="title-box d-flex align-items-center justify-content-between pl-4 pr-4 pt-4">
      <h2>주문내용</h2>
      <span>
          <a href="#null" ><i class='bx bx-log-in'></i></a>
      </span>
    </div>
    <div class="info-box d-flex justify-content-between align-items-center pl-4 pr-4">
      <p>상품 이름</p>
      <p>수량</p>
    </div>
  </div>
  <!-- <div class={$authToken ? "side-content-admin aside-box simplebar mt-auto" : "side-content aside-box simplebar mt-auto"}> -->
    <div class="side-content aside-box simplebar mt-auto">
       <OrderResultList />
      <OrderList />
  </div>
  <!-- <div class={$authToken ? "side-bottom-admin d-flex flex-column justify-content-center align-items-center" : "side-bottom d-flex flex-column justify-content-center align-items-center" }> -->
    <div class="side-bottom d-flex flex-column justify-content-center align-items-center">
      <OrderBottom />
  </div>
</aside><!-- end aside -->   

<OrderComplate />