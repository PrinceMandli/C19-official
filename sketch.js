var spaceImg, space;
var bombImg, bomb, bombsGroup;
var climberImg, climber, climbersGroup;
var MrBeast, MrBeastImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

var score = 0;

function preload(){
  spaceImg = loadImage("space.png");
  bombImg = loadImage("bomb.png");
  climberImg = loadImage("climber.png");
  MrBeastImg = loadImage("MrBeast.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 1;
  
  bombsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();

  MrBeast = createSprite(200,200,50,50);
  MrBeast.scale=0.2;
  MrBeast.addImage(MrBeastImg);
}

function draw() {
  background("white");
  if (gameState==="end")
  textSize(20);
  stroke("Blue")
  fill("Blue")
  text("Score: "+ score,30,50);{
    

    if(keyDown("left_arrow")){
      MrBeast.x=MrBeast.x-3;
    }
    
    if(keyDown("right_arrow")){
      MrBeast.x=MrBeast.x+3;
    }

    if(keyDown("enter")){
      MrBeast.velocityY=-10;
    }
    if(keyDown("ecs")){
      (restartGame);   
     }

     MrBeast.velocityY = MrBeast.velocityY + 0.8;

    if(space.y > 400){
      space.y = 300
    }

    spawnBombs();
    
    if(climbersGroup.isTouching(MrBeast)){
      MrBeast.destroy();
    gameState="end";
    }

    if(invisibleBlockGroup.isTouching(MrBeast) || MrBeast.y>600){
      MrBeast.destroy();
      gameState="end";
    }
    
    drawSprites();
  }

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
    playSound("spookey.wav");
  }
}

function spawnBombs() {
  //write code here to spawn the bombs in the space
  if (frameCount % 240 === 0) {
    var bomb = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    bomb.scale=0.2
    
    bomb.x = Math.round(random(120,400));
    climber.x = bomb.x;
    invisibleBlock.x = bomb.x;
    
    bomb.addImage(bombImg);
    climber.addImage(climberImg);
    
    bomb.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    MrBeast.depth = bomb.depth;
    MrBeast.depth +=1;
   
    //assign lifetime to the variable
    bomb.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each bomb to the group
    bombsGroup.add(bomb);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}