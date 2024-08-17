<script>
    import appStore from "../appStore";
    import knn from "../knn";


    function clickHandler(){
        knn()
    }
  
  </script>
  
  
  <div class="container">
      <h1>start knn algorithm</h1>
      <label>predicition point</label>
      <input type="text" bind:value={$appStore.predictionPoint}/>
      <button on:click={clickHandler}>run</button>
  </div>
  
  <style>
  .container{
      width: 200px;
      height: 200px;
      background-color: gray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
  }
  h1{
      font-weight: 600;
      font-size: 25px;
      text-align: center;
  }
  button{
      padding: 5px 50px;
      margin-top: 20px;
      cursor: pointer;
      border-radius: 4px;
  }
  </style>