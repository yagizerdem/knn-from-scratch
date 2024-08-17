<script>
    import appStore from "../appStore";
    import Toastify from 'toastify-js'
    $: randomColor = () => {
        return ['#fd5c63' , '#7CB9E8' ,'#32de84'][Math.floor(Math.random() * 3)];
    }
    var amount = 0;
    var start = 0;
    var end = 0;
    var step = 0
    function clickHandler(){

        if($appStore.createNewBall){
            var x = start
            for(var i = 0 ; i < amount ; i++){
                $appStore.createNewBall({x ,y:50 , radius:$appStore.radius , color:randomColor()}) 
                x += step
                if(x >= end){
                    x = start
                }
            }
        }
    }
</script>


<div class="container">
    <h1>bulk throw</h1>
    <label>amount</label>
    <input type="number" placeholder="amount" bind:value={amount}/>
    <label>start</label>
    <input type="number" placeholder="start" bind:value={start}/>
    <label>end</label>
    <input type="number" placeholder="end" bind:value={end}/>
    <label>step</label>
    <input type="number" placeholder="step" bind:value={step}/>
    <button on:click={clickHandler}>Throw</button>
    <button on:click={() =>{
        start = 20
        end = 780
        amount = 700
        step = (end - start) / amount
    }}>Auto</button>
</div>

<style>
.container{
    width: 200px;
    height: 240px;
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}
input{
    display: block;
    border:none;
    outline: none;
    padding: 5px 10px;
    margin-top: 10px;
    
    border-radius: 5px;
}
button{
    border-radius: 4px;
    width: 100px;
    margin-top: 20px;
    cursor: pointer;
}
</style>