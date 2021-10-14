var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombie_img, zombieGroup;
var bullet, bullet_img;
var blast;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var winSound, loseSound;
var flag=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombie_img = loadImage("assets/zombie.png"); 
  bgImg = loadImage("assets/bg.jpeg")
  bullet_img = loadImage("assets/bullet.png");
  blast = loadSound("assets/explosion.mp3");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  winSound = loadSound("assets/win.mp3");
  loseSound = loadSound("assets/lose.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

 //creating the player sprite
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.35
  //player.debug = true
  player.setCollider("rectangle",0,0,300,300);

  heart1 = createSprite(displayWidth-150,50,20,20)
  heart1.visible = false;
  heart1.addImage("heart1",heart1Img);
  heart1.scale = 0.42;

  heart2 = createSprite(displayWidth-108,50,20,20)
  heart2.visible = false;
  heart2.addImage("heart2",heart2Img);
  heart2.scale = 0.42;

  heart3 = createSprite(displayWidth-150,50,20,20)
  heart3.visible = true;
  heart3.addImage("heart3",heart3Img);
  heart3.scale = 0.42;

  zombieGroup = new Group();

  createZombies();
  createBullets();
}

function draw() {
  background(0); 

 if(World.frameCount % 50 == 0){
  createZombies();
 }

  //moving the player up and down and making the game mobile compatible using touches
 if(keyDown("UP_ARROW")||touches.length>0){
   player.y = player.y-30
  }

 if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }


  //release bullets and change the image of shooter to shooting position when space is pressed
 if(keyWentDown("space")){
   player.addImage(shooter_shooting);
   createBullets();
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
   player.addImage(shooterImg);
  }

 if(bullet.isTouching(zombieGroup)){
   bullet.destroy();
   zombie.destroy();
   blast.play();
  }

  if (zombieGroup.isTouching(player)) {
    
    heart3.visible = false;
    heart2.visible = true;
    
    
  }

  if(zombieGroup.isTouching(player) && (heart2.visible = true) )
{
 
  heart1.visible = true;
  heart2.visible = false;

}

 
 drawSprites();

}

function createBullets(){
  bullet = createSprite(player.x + 65, player.y - 25 , 50 , 50);
  bullet.addImage(bullet_img) ;
  bullet.scale = 0.09;
  bullet.velocityX = 20;
  bullet.lifetime = 80;
  //bullet.debug = true;
  bullet.setCollider("rectangle",0,0,10,10);
}

function createZombies(){
  zombie = createSprite(windowWidth-100,random(200,400), 50 , 50);
  zombie.addImage(zombie_img);
  zombie.velocityX = -17;
  zombie.scale = random(0.20,0.25);
  zombie.lifetime = 80;
  //zombie.debug = true;
  zombie.setCollider("rectangle",-20,40,200,1000);
  zombieGroup.add(zombie);
}

