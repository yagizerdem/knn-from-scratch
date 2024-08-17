<script>
    import appStore from "../appStore";
  import Toastify from 'toastify-js'
      var bounciness = 0.5
      function clickHandler(){
          if(Math.abs(bounciness - 0.75) > 0.25){
              return(
                  Toastify({
    text: "ball radius max size is 1 , min 0.5",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast()
              )
          }
          $appStore.bounciness = bounciness
      }
  
  </script>
  
  
  <div class="container">
      <h1>adjust ball bounciness</h1>
      <input type="number" bind:value={bounciness} min="0.5" max="10"       step="0.1" />
      <button on:click={clickHandler}>set</button>
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
  input{
      width: 150px;
      height: 30px;
      margin: 10px 0 0 10px;
  }
  </style>