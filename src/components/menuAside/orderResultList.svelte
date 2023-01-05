<script>
  import { fade } from 'svelte/transition';
</script>
<!-- order results start -->
<ul>
     <li class="d-flex  flex-column p-4 order-result-list "><p>Loading...</p></li>
      <!-- order one start -->
      <li class="d-flex  flex-column p-4 order-result-list" in:fade={{delay:300, duration:500}} >
        <div class="d-flex justify-content-between ">
          <ul class="order-inner-list">
            <li class="d-flex justify-content-between date">
                <p class="btnOrderCheck">확인</p>
              
            </li>        
                <li class="d-flex justify-content-between ">
                  <p>이름</p>
                  <p>0개</p>
                </li>   
                <li class="d-flex justify-content-between ">
                  <p>가격(개당: 2000)</p>
                  <p>2000</p>
                </li>                  
            <li class="d-flex justify-content-between total ">
              <p>개수합계</p>
              <p>10</p>
            </li>                   
            <li class="d-flex justify-content-between total ">
              <p>가격합계</p>
              <p>2000</p>
            </li>                                 
          </ul>
        </div>
      </li>
      <!-- order one end -->                                                                                           
</ul> 
<!-- order results end-->