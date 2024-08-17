<script>
  import appStore from "./lib/appStore";
  import AdjustBallBounciness from "./lib/Controllers/AdjustBallBounciness.svelte";
  import AdjustBallRadius from "./lib/Controllers/AdjustBallRadius.svelte";
  import ThrowBulk from "./lib/Controllers/ThrowBulk.svelte";
import Engine from "./lib/Engine.svelte";
  import Header from "./lib/Header.svelte";



</script>

<Header/>
<div class="grid-container">
  <div class="grid-item">
    <div class="wrapper">
      <Engine/>
    </div>
  </div>

  <div class="grid-item">
    <ThrowBulk/>
  </div>
  <div class="grid-item">
    <AdjustBallRadius/>
  </div>
  <div class="grid-item">
    <AdjustBallBounciness/>
  </div>



</div>


<style>
.wrapper{
  width: fit-content;
  height: fit-content;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
  width: 1500px;
  height: 800px;
}
.grid-item{
  margin: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>