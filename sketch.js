var trex,ground,invisibleGround,gameover,restart,clouds,cactuses,cloud,cactus,select;

var cloudimage,groundimage,ob1image,ob2image,ob3image,ob4image,ob5image,ob6image,trexrunning,trexcolliding,gameoverimage,restartimage;

var play=1;
var gamestate=play
var end=0;
var score=0;
function preload(){
  cloudimage=loadImage("cloud.png")
  groundimage=loadImage("ground2.png")
  ob1image=loadImage("obstacle1.png")
  ob2image=loadImage("obstacle2.png")
ob3image=loadImage("obstacle3.png")
ob4image=loadImage("obstacle4.png")
  ob5image=loadImage("obstacle5.png")
  ob6image=loadImage("obstacle6.png")
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  trexcolliding=loadAnimation("trex_collided.png")
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
}
function setup(){
createCanvas(400,400);
  //create a trex sprite
 trex = createSprite(200,380,20,50);
trex.addAnimation("trex",trexrunning);
  trex.addAnimation("colliding",trexcolliding);
//trex.debug=true
//trex.setCollider("rectangle",0,0,trex.width,trex.height)
//trex.setCollider("circle",0,0,40)
//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
 ground = createSprite(200,380,400,20);
ground.addImage(groundimage);
ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;
 
  gameover=createSprite(200,200)
gameover.addImage(gameoverimage)
gameover.scale=0.5
  
gameover.visible=false

 restart=createSprite(200,250)
restart.addImage(restartimage)
restart.scale=1
restart.visible=false


 clouds = createGroup();
 cactuses=createGroup();
}
 function draw() {
  //set background to white
  background("white");
 if (gamestate==play) {
 ground.velocityX = -(2+score/100);  
  score=score+Math.round(getFrameRate()/60);
   
   if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
     if(keyDown("space") && trex.y >= 359){
    trex.velocityY = -12 ;
    //playSound("sound://category_hits/vibrant_game_dirty_desolve_2.mp3")
  }
 
    trex.velocityY = trex.velocityY + 0.6;
  
 if(score%100==0&&score>0){
  // playSound("sound://category_alerts/airy_bell_notification.mp3")
 }
   cloudy();
  cacti();
  
  if(trex.isTouching(cactuses)){
//trex.velocityY=-12
cactuses.destroyEach();
    trex.changeAnimation("colliding",trexcolliding)
 gamestate=end
  cactuses.setVelocityXEach(0)
  // playSound("sound://category_alerts/comedy_game_over_1.mp3")
  }
 } else  if(gamestate==end){
    ground.velocityX = 0;
trex.velocityY=0 

   gameover.visible=true
 
   restart.visible=true
 }
 if(mousePressedOver(restart)){
   score=0;
   gamestate=play
   gameover.visible=false;
   restart.visible =false;
   trex.changeAnimation("trex",trexrunning)
 }
 
  fill("black")
  text("score= "+ score,325,179);
 
  
 // console.log("hello"+randomNumber(10,100));
  
  
  //jump when the space key is pressed
 
  
  //add gravity
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function cloudy() {



if( frameCount%60==0){
 cloud = createSprite(400, Math.round(random(50,200)));
 cloud.addImage(cloudimage);
   cloud.scale =0.5  
   cloud.velocityX=-(3+score/100)
// life time =diatance/speed
cloud .lifetime=134;
 clouds.add(cloud);
   
}
}
function cacti() {


if(frameCount%120==0){
 cactus = createSprite(400,370);
 select=Math.round(random(1,6))
  switch(select){
    case 1:cactus.addImage(ob1image);
    break;
    case 2:cactus.addImage(ob2image);
    break;
    case 3:cactus.addImage(ob3image);
    break;
    case 4:cactus.addImage(ob4image);
    break;
    case 5:cactus.addImage(ob5image);
    break;
    case 6:cactus.addImage(ob6image);
    break;
    default:break;
  }
    cactus.scale =0.5  
   cactus.velocityX=-(3+score/100)
cactus.lifetime=134
cactuses.add(cactus)
//console .log(trex.depth)  
cactus .depth=trex.depth
 trex.depth=trex.depth+5 
}
}