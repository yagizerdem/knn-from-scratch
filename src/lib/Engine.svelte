<script defer>
  import Matter  from "matter-js";
  import { onMount } from "svelte";
  import appStore from "./appStore";
  import { v4 as uuidv4 } from 'uuid';
  import Record from "./Record";
  import diContainer from "./Service";
  
  const db = diContainer.get('database')
  
  var canvas;
  var context;
    const cursorPosition = {
        x:20,
        y:50
    }

    $: randomColor = () => {
        return ['#fd5c63' , '#7CB9E8' ,'#32de84'][Math.floor(Math.random() * 3)];
    }
var cursorBall = null
const CATEGORY_BALL = 0x0001; // 1
const CATEGORY_OBSTACLE = 0x0002; // 2


onMount(()=>{
        canvas = document.getElementById('canvas')
        context = canvas.getContext('2d')
        main()
    })
  function main(){
      // aliases
  var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Events = Matter.Events,
        Bodies = Matter.Bodies;

        var engine = Engine.create(),
        world = engine.world;

            // create renderer
    var render = Render.create({
        element: document.querySelectorAll("wrapper")[0],
        engine: engine,
        canvas: canvas,
        options: {
            width: 800,
            height: 600,
            wireframes :false,
             background: '#B2BEB5',
            showAngleIndicator: true
        }
    });

    Render.run(render);

    // create runner
var runner = Runner.create();
Runner.run(runner, engine);

// crate obstacles

var obstacles = []
for(let i = 0; i < 10 ; i++){
    for(let j = 0 ; j <20 ; j++){
        var offsetx  =i % 2 == 0 ? (10 + j * 40 ): 30 +(j *40) 
        const circle = Matter.Bodies.circle( offsetx , 100 + i * 40, 2, { 
            isStatic: true,
            collisionFilter: {
                    category: CATEGORY_OBSTACLE,
                    mask: CATEGORY_BALL // Define which categories this body should collide with
                },
            render: {
                fillStyle: '#000000'  // Set color to black
            }  })
        obstacles.push(circle)
    }
}
Composite.add(world, obstacles);

// add walls
const wallTop = Matter.Bodies.rectangle(400, 5, 800, 10 ,{ isStatic: true ,    collisionFilter: {
                    category: CATEGORY_OBSTACLE,
                    mask: CATEGORY_BALL // Define which categories this body should collide with
                }, }) 
const wallBottom = Matter.Bodies.rectangle(400, 595, 800, 10 ,{ isStatic: true  , collisionFilter: {
                    category: CATEGORY_OBSTACLE,
                    mask: CATEGORY_BALL // Define which categories this body should collide with
                },}) 
const wallLeft = Matter.Bodies.rectangle(2.5, 300 , 5, 600 ,{ isStatic: true , collisionFilter: {
                    category: CATEGORY_OBSTACLE,
                    mask: CATEGORY_BALL // Define which categories this body should collide with
                },  }) 
const wallRight = Matter.Bodies.rectangle(797.5, 300 , 5, 600 ,{ isStatic: true , collisionFilter: {
                    category: CATEGORY_OBSTACLE,
                    mask: CATEGORY_BALL // Define which categories this body should collide with
                },  }) 
Composite.add(world, wallTop);
Composite.add(world, wallBottom);
Composite.add(world, wallLeft);
Composite.add(world, wallRight);

// create cursor ball 
cursorBall = Matter.Bodies.circle(cursorPosition.x, cursorPosition.y , $appStore.radius ,{
    isStatic: true ,
    render:{
        fillStyle:randomColor()
    }
})
// creat buckets
for(let i = 1 ; i <= 10 ; i++){
    const bucket  = Composite.create({ label: i });
    const w = (800 - 10) / 10;
    const h = 100;
    var bottom =  Matter.Bodies.rectangle(w / 2 + (i -1) * w  + 5 , 600 - 30 / 2 , w, 10 ,{ isStatic: true ,    collisionFilter: {
                    category: CATEGORY_OBSTACLE,
                    mask: CATEGORY_BALL // Define which categories this body should collide with
                }, 
                render:{
            fillStyle:'#8C92AC'
        }
            })
            bottom.label = 'bottom'
            bottom.id = i
        if(i != 1){
            var left =  Matter.Bodies.rectangle((w / 2 + (i -1) * w  + 5)  - w / 2 , 600 - h / 2 , 5, h ,{ isStatic: true ,    collisionFilter: {
                    category: CATEGORY_OBSTACLE,
                    mask: CATEGORY_BALL // Define which categories this body should collide with
                }, 
                render:{
            fillStyle:'#8C92AC'
        }
            })
        }
        const filteredBodies = [bottom , left].filter(body => body !== null && body !== undefined);

                Composite.add(bucket, filteredBodies);
                World.add(world, bucket);
}


Composite.add(world, cursorBall);
// mouse 
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2, // Adjust stiffness as needed
                render: {
                    visible: false // Hide the mouse constraint line
                }
            }
        });
World.add(engine.world, mouseConstraint);


function createNewBall({x , y , radius , color}){
    const bounciness = $appStore.bounciness - Math.random() *0.02
    const newBall = Matter.Bodies.circle(x, y , radius ,{
    isStatic: false,
    restitution : bounciness,
    collisionFilter: {
                    category: CATEGORY_BALL,
                    mask: CATEGORY_OBSTACLE // Define which categories this body should collide with
                },
    render:{
        fillStyle:color
    }
})
newBall.label = 'ball'
newBall.uuid = uuidv4()
Composite.add(world, newBall);

const newRecord = new Record({uuid:newBall.uuid , x , y , bounciness , radius})
db.emit('newRecord' , newRecord)
}
$appStore.createNewBall =createNewBall // for resuing function from other compoonet 

Events.on(mouseConstraint, "mousedown", ({mouse})=>{
    const {mousedownPosition} = mouse
    createNewBall({x:cursorPosition.x , y:cursorPosition.y , radius:$appStore.radius , color:randomColor()})
})

Events.on(mouseConstraint, "mousemove", ({mouse})=>{
    const {position} = mouse
    const {x} = position
    if(x < 15 || x > 780) return
    cursorPosition.x = x
    Matter.Body.setPosition(cursorBall, Matter.Vector.create(cursorPosition.x, cursorPosition.y) , false)
})

Events.on(engine, 'collisionStart', (event) => {
            const pairs = event.pairs;

            pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;
                
                // Check if collision is with the bottom of the canvas
                if (bodyA.position.y >= render.options.height - bodyA.bounds.max.y || bodyB.position.y >= render.options.height - bodyB.bounds.max.y) {
                    [bodyA, bodyB].forEach(body => {
                        if (!body.isStatic) {
                            // Decrease restitution, ensuring it doesn't go below a certain threshold
                            body.restitution = 0.5;
                        }
                    });
                }
            });
        });

Events.on(engine, "afterUpdate", ()=>{
            const allBodies = Matter.Composite.allBodies(engine.world);
            for(var i = allBodies.length-1 ;  i >= 0 ; i--){
                const body = allBodies[i]
                if(body.label == 'ball'){
                    if(body.speed <= 0.01 && body.position.y >= 530 ){
                        Matter.World.remove(world, body)
                        // update bucket count 
                        const buckets = Composite.allBodies(world).filter(item => item.label == 'bottom')
                        buckets.forEach(bucket => {
                            if (Matter.Collision.collides(body, bucket) != null) {
                                $appStore.bucketCounter[bucket.id]++
                                db.emit('setBucket' , {uuid:body.uuid , no:bucket.id})
                            }
                        });
                    }
                    if(body.speed <= 0.00001){
                        Matter.World.remove(world, body)
                    }
                }
            }
})

function renderText(bodies) {
    bodies.forEach((el , index) => {
        const { position } = el;
        if(el.label == 'bottom'){
        const{ x, y} = position
        var count = $appStore.bucketCounter[el.id]
        if(count > 9999){
            context.font = '20px Arial';
        }else{
            
            context.font = '30px Arial';
        }
        context.fillText(count, x  -(count.toString().length * 30 / 4  ) , y -20);
        }

    });

}

Events.on(render, "afterRender", ()=>{
    renderText(Composite.allBodies(world))
})

}

</script>



<canvas id="canvas"></canvas>