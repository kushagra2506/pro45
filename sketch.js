const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
const Body=Matter.Body;
const Constraint=Matter.Constraint;
const MouseConstraint=Matter.MouseConstraint;

var bg;
var ground,ground_img;
var player;
var obstacle;
var obstaclesGroup;

var coin, coin_img;
var coinGroup;
var pillar1, pillar2,pillar1_img,pillar2_img;
var pillarGroup;
var player_walk;
var INITIAL;
var START=1
var PLAY=2;
var END=0;
var gameState=START;
var score=0;
var player_health=3;
var player_collide,player_jump;

var groundobs,groundobs_img,groundobsGroup;
var coinsound,diesound,jumpsound,gameOverSound,healing_sound,mushroomJump_sound;

var obstacle_img1,obstacle_img2,obstacle_img3,obstacle_img4,obstacle_img5;
var powerups,powerups_img,powerupsGroup;
var groundjump,groundjump_img,groundjumpGroup;

var howtoplay, play,howtoplay_img,play_img;


function preload()
{
  bg=loadImage("image1.png");
  ground_img=loadImage("baseimage.png");
  /*obstacle_img1=loadImage("airbase1.png");
  coin_img=loadImage("coin.png");
  pillar1_img=loadImage("airobs.png");
  pillar2_img=loadImage("image3.png");*/
  player_walk=loadAnimation("BlueWizardAnim/BlueWizard/Walk/1.png","BlueWizardAnim/BlueWizard/Walk/2.png","BlueWizardAnim/BlueWizard/Walk/3.png",
  "BlueWizardAnim/BlueWizard/Walk/4.png",
  "BlueWizardAnim/BlueWizard/Walk/5.png","BlueWizardAnim/BlueWizard/Walk/6.png","BlueWizardAnim/BlueWizard/Walk/7.png",
  "BlueWizardAnim/BlueWizard/Walk/8.png","BlueWizardAnim/BlueWizard/Walk/9.png",
  "BlueWizardAnim/BlueWizard/Walk/10.png","BlueWizardAnim/BlueWizard/Walk/11.png","BlueWizardAnim/BlueWizard/Walk/12.png",
  "BlueWizardAnim/BlueWizard/Walk/13.png","BlueWizardAnim/BlueWizard/Walk/14.png",
  "BlueWizardAnim/BlueWizard/Walk/15.png","BlueWizardAnim/BlueWizard/Walk/16.png","BlueWizardAnim/BlueWizard/Walk/17.png",
  "BlueWizardAnim/BlueWizard/Walk/18.png","BlueWizardAnim/BlueWizard/Walk/19.png",
  "BlueWizardAnim/BlueWizard/Walk/20.png");
  player_jump=loadAnimation("BlueWizardAnim/BlueWizard/2BlueWizardJump/1.png","BlueWizardAnim/BlueWizard/2BlueWizardJump/2.png",
  "BlueWizardAnim/BlueWizard/2BlueWizardJump/3.png","BlueWizardAnim/BlueWizard/2BlueWizardJump/4.png"
  ,"BlueWizardAnim/BlueWizard/2BlueWizardJump/5.png","BlueWizardAnim/BlueWizard/2BlueWizardJump/6.png"
  ,"BlueWizardAnim/BlueWizard/2BlueWizardJump/7.png","BlueWizardAnim/BlueWizard/2BlueWizardJump/8.png");
 // player_img=loadImage("BlueWizardAnim/BlueWizard/Walk/1.png");

  player_collide=loadAnimation("BlueWizardAnim/BlueWizard/collide/1.png","BlueWizardAnim/BlueWizard/collide/2.png");
 /* obstacle_img2=loadImage("airbase2.png");
  obstacle_img3=loadImage("airbase4.png");
  obstacle_img4=loadImage("airbase5.png");
  obstacle_img5=loadImage("airbase6.png");*/

  groundobs_img=loadImage("SlimeOrange.png");
  coinsound=loadSound("checkPoint.mp3");
  jumpsound=loadSound("jump.mp3");
  diesound=loadSound("die.mp3");
  gameOverSound=loadSound("gameOver.mp3");
  healing_sound=loadSound("healing_sound.wav");
  mushroomJump_sound=loadSound("mushroom_jump.mp3");

  powerups_img=loadImage("Powerup.png");
  groundjump_img=loadImage("baseobsjump.png");

  howtoplay_img=loadImage("howtoplay.png");
  play_img=loadImage("playbutton4.png");



}

function setup() {
  createCanvas(800,600);
  //createSprite(400, 200, 50, 50);

  engine=Engine.create();
  world=engine.world;

 ground=createSprite(800,670,800,20);

 ground.addImage(ground_img);
 ground.scale=3.25;
 ground.x=ground.width/2;

 player=createSprite(30,380,50,50);
 player.addAnimation("walk",player_walk);
 player.setCollider("rectangle",0,0,100,200);
 player.addAnimation("collide",player_collide);
 player.addAnimation("jump",player_jump);
 
  obstaclesGroup=new Group();
  coinGroup=new Group();
  pillarGroup=new Group();
  groundobsGroup=new Group();
  powerupsGroup=new Group();
  groundjumpGroup=new Group();

  player.scale=0.3;

  howtoplay=createSprite(150,100,10,10);
  howtoplay.addImage(howtoplay_img);
  howtoplay.scale=0.4;

  play=createSprite(400,500,10,10);
  play.addImage(play_img);
  play.scale=0.08;
  
}

function draw() {
  Engine.update(engine);
  background(bg);  

  textSize(20);
  fill("black");
  text("Health: "+player_health,650,30);
  text("Score: "+score,50,30);

  

  if(gameState===START)
  {
    background("black");
    fill("white");
    push();
    strokeWeight(1.5);
    stroke("yellow");
    textAlign(CENTER);
    textSize(35);
    text("Flying Ghost",380,50);
    pop();
    textSize(20);
    //text("Read all the instructions carefully before playing the game",50,100);
    textSize(18);
    text("1. Press UP_ARROW to jump & LEFT_Arrow to move left",30,100+50);
    text("2. Press RIGHT_ARROW to move right",30,150+30);
    text("3. Try to collect healing flower to increase your health",30,180+30);
    text("4. Try to avoid pointy bushes and SlimeOrange",30,210+30);
    text("5. To jump high use blue mushroom",30,240+30);
    text("6. Collect more and more coins to increase your score",30,270+30);
    text("7. Don't let player go out of the game from left side otherwise game will get over",30,300+30);
    text("8. Health must not turn ZERO otherwise game will get over",30,330+30);
    text("9. Avoid touching the toxic plants from left side otherwise player will move backward",30,390);
    text("10. Click on the play button to start the game or press space bar",30,420);
    
    
    if(mousePressedOver(play)||(keyDown("space")))
    {
      gameState=PLAY;
    }
   
    

    /*if(keyDown("space"))
    {
      gameState=PLAY;
    }*/

    ground.visible=false;
    player.visible=false;

  }
  else if(gameState===PLAY)
  {
    howtoplay.visible=false;
    play.visible=false;
    ground.visible=true;
    player.visible=true;
    player.changeAnimation("walk");
    ground.velocityX=-5;

    
    if(ground.x<0)
    {
      ground.x=ground.width/2;
    }

    if(keyDown(UP_ARROW))
    {
      player.velocityY=-10;
      player.changeAnimation("jump");
    }

    //console.log(player_health);

    if(player.y>=448&&keyDown(UP_ARROW))
    {
      jumpsound.play();
    }
    if(keyDown(LEFT_ARROW)&&player.x>30)
    {
      player.x=player.x-5;
    }

    if(keyDown(RIGHT_ARROW)&&player.x<700)
    {
      player.x+=5;
    }
    player.velocityY=player.velocityY+0.8;
   
    player.collide(obstaclesGroup);

    if(coinGroup.isTouching(player))
    {
      coinGroup.destroyEach();
      score=score+Math.round(random(1,5));
      coinsound.play();
    }

    
    if(pillarGroup.collide(player))
    {
     player_health-=1;
     pillarGroup.destroyEach();
     diesound.play();
     //gameState=END;
    }

    //calling function
    spawnblocks();

    if(player_health===0)
    {
      gameState=END;
      gameOverSound.play();
    }

    if(player.x<0)
    {
      gameState=END;
    }

    if(groundobsGroup.isTouching(player))
    {
      player_health-=1;
      groundobsGroup.destroyEach();
      diesound.play();
    }

    if(powerupsGroup.isTouching(player))
    {
      player_health+=1;
      powerupsGroup.destroyEach();
      healing_sound.play();
    }

    //groundjumpGroup.collide(player);
    console.log(player.velocityX);
    
    if(groundjumpGroup.isTouching(player))
    {
      player.velocityY=-(player.velocityY+random(4,10));
     // console.log("Jump");
      mushroomJump_sound.play();
    }

  }
  else
  {
    howtoplay.visible=false;
    play.visible=false;
   
    player.changeAnimation("collide");
    ground.velocityX=0;
    player.velocityX=0;
    player.velocityY=0;
    coinGroup.setVelocityEach(0);
    obstaclesGroup.setVelocityEach(0);
    coinGroup.destroyEach();
    groundjumpGroup.destroyEach();
    groundobsGroup.destroyEach();
    powerupsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    pillarGroup.destroyEach();

    fill("red");
    textSize(65);
    text("GAME OVER",200,250);

    
  }
 
  player.collide(ground);



  drawSprites();
}

function spawnblocks()
{
  if(frameCount%250===0)
  {
    obstacle=createSprite(800,random(100,420),100,10);
    obstacle.velocityX=random(-1,-3);
    obstacle.shapeColor="black";
   // obstacle.addImage(obs_img);
    obstacle.scale=0.1;

    var rand=Math.round(random(1,5));
    /*switch(rand)
    {
      case 1: obstacle.addImage(obstacle_img1);
      break;
      case 2: obstacle.addImage(obstacle_img2);
      break;
      case 3: obstacle.addImage(obstacle_img3);
              coin.scale=0.03;
      break;
      case 4: obstacle.addImage(obstacle_img4);
              coin.scale=0.03;
      break;
      case 5: obstacle.addImage(obstacle_img5);
              coin.scale=0.03;
    
      default: break;
    }*/

    coin=createSprite(obstacle.x,obstacle.y-40,10,10);
    coin.addImage(coin_img);
    coin.velocityX=obstacle.velocityX;
    coin.scale=0.07;

    if(rand===1)
    {
      obstacle.addImage(obstacle_img1);
    }
    else if(rand===2)
    {
      obstacle.addImage(obstacle_img2);
    }
    else if(rand===3)
    {
      obstacle.addImage(obstacle_img3);
      coin.scale=0.03;
      coin.y=coin.y+20;
    }
    else if(rand===4)
    {
      obstacle.addImage(obstacle_img4);
      coin.scale=0.03;
      coin.y=coin.y+20;
    }
    else
    {
      obstacle.addImage(obstacle_img5);
      coin.scale=0.03;
      coin.y=coin.y+20;
    }
  

  groundobs=createSprite(800,470,10,10);
  groundobs.addImage(groundobs_img);
  groundobs.scale=0.2;
  groundobs.velocityX=-2.5;
  groundobs.lifetime=320;
  groundobs.debug=true;
  groundobs.setCollider("rectangle",0,0,400,200);
  groundobsGroup.add(groundobs);
  groundobs.collide(ground);


   pillar1=createSprite(800,random(-100,0),10,10);
   pillar1.velocityX=-3;
   pillar1.scale=0.25;
   pillar1.lifetime=400;
   pillar1.addImage(pillar1_img);
   pillarGroup.add(pillar1);

   powerups=createSprite(random(600,800),random(200,400),10,10);
   powerups.velocityX=random(-3,-5);
   powerups.addImage(powerups_img);
   powerups.scale=0.09;
   powerups.lifetime=Math.round(random(80,150));
   powerupsGroup.add(powerups);

   groundjump=createSprite(random(700,800),random(200,450),10,10);
   groundjump.velocityX=random(-2.5,-4);
   groundjump.lifetime=groundjump.x/groundjump.velocityX;
   groundjump.addImage(groundjump_img);
   groundjump.scale=0.2;
   groundjumpGroup.add(groundjump);
   groundjump.debug=true;
   groundjump.setCollider("rectangle",0,0,300,300);


  /* pillar2=createSprite(800,random(600,850),10,10);
   pillar2.velocityX=-2;
   pillar2.scale=1;
   pillar2.addImage(pillar2_img);*/
    
    obstaclesGroup.add(obstacle);
    coinGroup.add(coin);
  }
 

}