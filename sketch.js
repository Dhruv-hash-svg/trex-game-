var trex, trex_running, edges;
var groundImage;
var gameState = "play";
var score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1Image = loadImage("obstacle1.png")
  obstacle2Image = loadImage("obstacle2.png")
  obstacle3Image = loadImage("obstacle3.png")
  obstacle4Image = loadImage("obstacle4.png")
  obstacle5Image = loadImage("obstacle5.png")
  obstacle6Image = loadImage("obstacle6.png")
  trex_collided = loadAnimation("trex_collided.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  dieSound = loadSound("die.mp3")
  jumpSound = loadSound("jump.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  edges = createEdgeSprites();
  ground = createSprite(0, 180, 600, 20);
  ground.addImage(groundImage);
  ground.velocityX = -3;
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImage)
  restart = createSprite(300, 140);
  restart.addImage(restartImage);
  //adding scale and position to trex
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  trex.scale = 0.5;
  trex.x = 50
  //trex.debug = "true";
  trex.setCollider("circle", 0, 0, 50);
  invisibleGround = createSprite (0, 190, 600, 10);
  invisibleGround.visible = false;
  cloudGroup = new Group();
  cactusGroup = new Group();
  
}



function draw(){
  //set background color 
  background("white");
  text("Score: " + score, 500, 50);
  if(gameState === "play"){
    gameOver.visible = false;
    restart.visible = false;
    score = score + Math.round(getFrameRate()/60);
    if(score > 0  && score%100 === 0){
      checkPointSound.play();
    }
  if(keyDown("space")){
    trex.velocityY = -10;
   jumpSound.play();
  }
  if(ground.x < 0)
  {ground.x = ground.width/2} 
  trex.velocityY = trex.velocityY + 0.5;  
  spawnClouds();
  spawnCactus();  
  if(cactusGroup.isTouching(trex)){
    gameState = "end";
    dieSound.play();
  }
  }
  else if(gameState === "end"){
    gameOver.visible = true;
    restart.visible = true; 
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach(0);  
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    cactusGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided);
    trex.velocityY = 0;
    if(mousePressedOver(restart)){
      reset()
    }

  }
  //logging the y position of the trex
  //console.log(trex.y)
  
  //jump when space key is pressed
  
  
  //stop trex from falling down
  trex.collide(invisibleGround)
  drawSprites();
 
  
}
function reset(){
  gameState = "play"
  gameOver.visible = false;
  restart.visible = false;
  cactusGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
}


function spawnClouds(){
  
  if(frameCount%60 === 0){
  cloud = createSprite(600, 100, 30, 10);
  cloud.velocityX = -4;
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;
  var rand = Math.round(random(60,100));
    cloud.y = rand;
    console.log(cloud.depth);
    console.log(trex.depth);
    cloud.depth = trex.depth;
    trex.depth++
    cloudGroup.add(cloud);
    cloud.lifetime = 150;
    
  }
}


function spawnCactus(){
  if(frameCount%50 === 0){
    cactus = createSprite(600, 160, 10, 30);
    cactus.velocityX = -4;
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1:cactus.addImage(obstacle1Image);
      break;
      case 2:cactus.addImage(obstacle2Image);
      break;
      case 3:cactus.addImage(obstacle3Image);
      break;
     case 4:cactus.addImage(obstacle4Image);
      break;
      case 5:cactus.addImage(obstacle5Image);
      break;
      case 6:cactus.addImage(obstacle6Image);
      break;
      default:break;
      
    }
 cactus.scale = 0.5;
    cactus.lifetime = 150;
    cactusGroup.add(cactus);
  }
}