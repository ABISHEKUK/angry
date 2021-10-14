const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint=Matter.Constraint;
const Mouse=Matter.Mouse;
const MouseConstraint=Matter.MouseConstraint;
var gameState="onsling";
var engine, world;
var box1, pig1;
var slingshot;
var sling1,sling2;
var mconstraint;
var backgroundImg;
var score;

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    sling1= loadImage("sprites/sling1.png");
    sling2= loadImage("sprites/sling2.png");
    getBackgroundImage(); 
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(600,590,1200,20);
    platform=new Ground(150,475,300,240)
    
    box1 = new Box(800,540,70,70);
    box2 = new Box(1000,540,70,70);
    pig1 = new Pig(900, 540);
    log1 = new Log(900,500,280, PI/2);

    box3 = new Box(800,450,70,70);
    box4 = new Box(1000,450,70,70);
    pig2 = new Pig(900, 450);

    log3 =  new Log(900,410,280, PI/2);

    box5 = new Box(900,360,70,70);
    log4 = new Log(840,360,150, PI/7);
    log5 = new Log(960,360,150, -PI/7);
   
    bird = new Bird(270,170);
    score = 0;
    
    slingshot = new Slingshot(bird.body,{x:270,y:170});
    var canvasMouse=Mouse.create(canvas.elt);
    var options={
        mouse:canvasMouse
    }
    mconstraint=MouseConstraint.create(engine,options);
    World.add(world,mconstraint);
}

function draw(){
   //if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);
    textSize(35);
    fill("white");
    text("score"+score,width-200,50);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
    image(sling1,270,160);
    bird.display();
    image(sling2,245,160);
    platform.display();

    slingshot.display();
    pig1.score();
    pig2.score();
}
//use it for projects when not using MouseConstrint
//function mouseDragged(){
  //  Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})

//}
//use it for project mouseConstrint
//function mouseReleased(){
  //  slingshot.fly()
//}
function mouseReleased(){
    setTimeout(function(){
    slingshot.fly()
    },150)
    gameState="launched";
    World.remove(world,mconstraint); 
}
function keyPressed(){
    if(keyCode === 32){
        //bird.trajectory=[]
        World.remove(world,bird.body);
        bird= new Bird(270,170);
        //Matter.Body.setVelocity(bird.body,{x:0,y:0});
        //Matter.Body.setPosition(bird.body,{x:270,y:170});
        slingshot.attach(bird.body);
        //Matter.Body.setAngle(bird.body,0);
        gameState="onSling";
        World.add(world,mconstraint);
    }
}
async function getBackgroundImage(){
    var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJson=await response.json();
    var datetime=responseJson.datetime;
    var hour=datetime.slice(11,13);
    let bg;
    if(hour>6 && hour<18){
    bg="sprites/bg.png";
    }
    else{
    bg="sprites/bg2.jpg";    
    }
    backgroundImg=loadImage(bg);
    console.log(hour);

}