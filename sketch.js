var plane,plane_Img,poisonApplesGroup;
var planeCrashed,planeCrashed_Img,bg_Image,bg,startStateBg,Island_Img,bg_infinite;
var player_standing1_img,player_running_img,player,poisonApple_img,fruit_img,hungerBar_Img,LifeBar_img;
var player_life = 200;
var player_hunger = 0;
var game_state = "start",fruitGroups;


var play,end;

function preload(){
  
  plane_Img = loadImage("Imgs/Plane.png");
  planeCrashed_Img = loadImage("Imgs/Plane_Crashed.png");
  bg_Image = loadImage("Imgs/plane bg.png");
  startStateBg = loadImage("Imgs/Plane_titlePage.png");
  Island_Img = loadImage("Imgs/Island.jpg");
  player_running_img = loadAnimation("Imgs/player_running1.png","Imgs/player_running2.png");
  player_standing1_img = loadImage("Imgs/player_standing.png");
  poisonApple_img = loadImage("Imgs/poision_fruit.png");
  fruit_img = loadImage("Imgs/fruit-removebg-preview.png");
  LifeBar_img = loadImage("Imgs/life_img.png");
  hungerBar_Img = loadImage ("Imgs/hunger_bar.png");

  player_running_img.looping = false;
  player_running_img.playing = true;
  player_standing1_img.playing = true;
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  form = new Start();

  //sprites

  bg_infinite = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  bg_infinite.addImage(Island_Img);
  bg_infinite.scale = 4.5;
  bg_infinite.velocityX = -3;
  bg_infinite.visible = false;

  plane = createSprite(950,350,15,15);
  plane.addImage(plane_Img);
  plane.scale = 0.5;
  plane.visible = false;

  player = createSprite(760,600);
  player.addImage("player",player_standing1_img);
  player.addAnimation("running",player_running_img);
  player.scale = 3;
  player.visible = false;

  //groups
  poisonApplesGroup = new Group();
  fruitGroups = new Group();
  

}

function draw(){
  background(0);
 
  imageMode(CENTER);

  //-----------------------------------START----------------------------
  if(game_state === "start"){
    image(startStateBg,windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    form.display()
  }
  //-----------------------------------PLANE CRASH----------------------------
  if(game_state === "planeCrash"){
    image(bg_Image,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

    //The aero-plane sprite
    plane.visible=true;
    plane.velocityX = -4;
    
    if(plane.x <= windowWidth/2){
     plane.addImage(planeCrashed_Img);
     plane.x = windowWidth/2;
     plane.velocityY += 0.2; //gravity
     plane.scale=1.1;
    }

    //change game state to play
    if(plane.y > windowHeight - 100){
      game_state = "play";      
    }
  }
  //-----------------------------------PLAY - (Island)----------------------------
  if(game_state === "play"){
    // infinite background
    // bg_infinite.visible = true;
    // if(bg_infinite.x < 0){
    //   bg_infinite.x = windowWidth/2-200;
    // }

    player.visible = true;

    // player movement
    if(keyDown("left_arrow")){
      player.x -= 8;
      player.changeAnimation("running");
      player.mirrorX(-1);
      player_running_img.looping = true;
    }

    if(keyDown("right_arrow")){
      player.x += 8;
      player.changeAnimation("running");
      player.mirrorX(1);
      player_running_img.looping = true;
    }

    if(!keyDown("right_arrow") && !keyDown("left_arrow")){
      player.changeAnimation("player");
      
    }
  
    spawnObstacles();
    spawnFruit();
    showHungerBar();
    showLifeBar();
    
    //reduction of life
    poisonApplesGroup.overlap(player,player_life_change);
    fruitGroups.overlap(player,player_hunger_change);
    
    if(player_life <= 0){
      game_state = "end";
    }
    if(player_hunger >=200){
      game_state = "win";
    }

  }
// 
  //---------------end----------------------
  if(game_state === "end"){
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }

  //---------------------win-----------------
  if(game_state === "win"){
    swal(
      {
        title: `YOU WIN !!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://www.123rf.com/photo_82262330_you-win-message-word-bubble-in-retro-pop-art-style-vector-illustration.html",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }

  drawSprites();

  //THE MOUSE CURSOR
  fill("white");
  text(mouseX + "," + mouseY, mouseX, mouseY);

}

function  player_hunger_change(){
  player_hunger +=40;
  fruitGroups[0].remove()
  
}
function  player_life_change(){
  player_life -=40;
  poisonApplesGroup[0].remove()
  
}

//obstacles
function spawnObstacles(){
  if(frameCount % 60 === 0){
    var poisonApples = createSprite(random(100, windowWidth-100), 0);
    poisonApples.addImage("obstacles",poisonApple_img);
    poisonApples.velocityY = 10;
    poisonApples.scale = 0.2;
    poisonApplesGroup.add(poisonApples);
  }
}


function spawnFruit(){
 if(frameCount % 180 === 0){
  var fruit = createSprite(random(90,windowWidth-150),0);
  fruit.addImage("fruit",fruit_img);
  fruit.velocityY = 10;
  fruit.scale = 0.2 ;
  fruitGroups.add(fruit);
 }

}



function showLifeBar(){
    push();
    image(LifeBar_img, 120, 60, 35,35);
    fill("white");
    rect(150, 50, 200, 20);
    fill("#4A7212");
    rect(150, 50, player_life , 20);
    pop();
}

function showHungerBar(){
    push();
    image(hungerBar_Img, 120, 120, 35,35);
    fill("white");
    rect(150, 110, 200, 20);
    fill("#ffc400");
    rect(150, 110, player_hunger, 20);
    pop();

}
  


  