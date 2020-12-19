//Create variables here

var dogImg,happydogImg;
var dog, database,foodRef,foodCount; 

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  happydogImg = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodRef = database.ref("food")
  foodRef.on("value",readData,showError);

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = .3;
}


function draw() {  
background(46,139,87);

if(foodCount!==undefined)
{
  textSize(25);
  fill("red")  
  text("food " + foodCount, width-100,height-50)
}

textSize(30);
fill("black")  
text("Press Up Arrow to Feed Bruno " ,50,50)


if(keyWentDown(UP_ARROW) && foodCount > 0)
{
  feedDog();
}

  drawSprites();
  //add styles here


}

function readData(data)
{
  foodCount = data.val();  
}
function writeData(count)
{
  database.ref("/").update({food:count})
  database.ref("/Test").update({count:count})
}

function showError(errMsg)
{
  console.log("Error " + errMsg)
}

function feedDog()
{
  if(keyCode===UP_ARROW)
  {
    foodCount-=1;
    dog.addImage(happydogImg);
    writeData(foodCount);
  }
}

function keyReleased()
{
  if(keyCode === (UP_ARROW) && foodCount > 0)
{
  dog.addImage(dogImg);
}
}


