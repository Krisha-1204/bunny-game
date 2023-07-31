const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var rope2
var rope3
var fruit_con;
var fruit_con2;
var fruit_con3;

var bg_img;
var food;
var rabbit;

var button;
var button2;
var button3; 
var bunny;
var blink,eat,sad;

var bksound, cutsound, sadsound, eatingsound, airsound

var blower

var mutebutton 

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bksound = loadSound ("sound1.mp3");
  cutsound =loadSound ("rope_cut.mp3");
  sadsound = loadSound ("sad.wav");
  eatingsound = loadSound ("eating_sound.mp3");
  airsound = loadSound ("air.wav");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {

var isMobile =/iPhone| iPad | iPod | Android/i.test (navigator.userAgent);

  if (isMobile) {
    canW= displayWidth
    canH= displayHeight 
    createCanvas (displayWidth+80,displayHeight)
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas (windowWidth, windowHeight);
  }

 
  frameRate(80);

  bksound.play ()
  bksound.setVolume (0);

  mutebutton = createImg ("mute.png");
  mutebutton.position (450,20);
  mutebutton.size (50,50);
  mutebutton.mouseClicked(mute);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  
  rope = new Rope(7,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(7,{x:400,y:225});

  ground = new Ground(canW/2,canH,canW,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(140,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link (rope2,fruit);
  fruit_con3 = new Link (rope3,fruit);

  // blower = createImg ("balloon.png");
  // blower.position (10,250);
  // blower.size (150,100);
  // blower.mouseClicked (airBlow)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show ();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }
   
  if(fruit!=null&&fruit.position.y>650)
  {
     bunny.changeAnimation('crying');
     bksound.stop ()
     sadsound.play ()
     fruit = null;
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cutsound.play ();
}

function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
  cutsound.play ();
}

function drop3()
{
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 
  cutsound.play ();
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow () {
Matter.Body.applyForce (fruit,{x:0,y:0},{x:0.01,y:0})
airsound.play ()

}

function mute () {
  if (bksound.isPlaying()) {
    bksound.stop ()
  }
  else {
    bksound.play ()
  }
}
