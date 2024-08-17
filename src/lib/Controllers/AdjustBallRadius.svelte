<script>
  import appStore from "../appStore";
import Toastify from 'toastify-js'
    var radius = 10
    function clickHandler(){
        if(Math.abs(radius - 12.5) > 2.5){
            return(
                Toastify({
  text: "ball radius max size is 15 , min 10",
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
        $appStore.radius = radius
    }

</script>


<div class="container">
    <h1>adjust ball radius</h1>
    <input type="number" bind:value={radius} min="10" max="15"/>
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