//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImage1, dogImage2;

function preload()
{
  //load images here
  dogImage1=loadImage("images/dogImg.png");
  dogImage2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog=createSprite(250,250,15,15);
  dog.addImage(dogImage1);
  dog.scale=0.3;

  database=firebase.database();

  foodStock= database.ref('milk');
  foodStock.on('value', readStock);
}


function draw() {  
  background(46,139,87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage2);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("red");
  stroke("white");
  strokeWeight(4);
  text(foodS,250,400);
  text("Click up arrow to feed the dog milk", 150,100);

}

function readStock(data){
   foodS=data.val();
}

function writeStock(x){

  if(x<=0){
     x=0;
  }  
  else
     x=x-1;

    database.ref('/').update({
      milk:x
    })
}