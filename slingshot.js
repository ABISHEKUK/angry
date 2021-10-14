class Slingshot{
    constructor(body1,point2){
    var option={
bodyA:body1,
pointB:point2,
length:15,
stiffness:0.04

    }
    this.sling3= loadImage("sprites/sling3.png");
    this.sling=Constraint.create(option);
World.add(world,this.sling);    
}
display(){
    if(this.sling.bodyA){
    var pointA=this.sling.bodyA.position;
    var pointB=this.sling.pointB;
    stroke(48,22,8);
    if(pointA.x<265){

    
    strokeWeight(7);
    line(pointA.x-20,pointA.y,pointB.x-20,pointB.y+15);
    line(pointA.x-20,pointA.y,pointB.x+20,pointB.y+15);  
    image(this.sling3,pointA.x-30,pointA.y-10,15,30) 
}
else if(pointA.x>275){
    strokeWeight(3);
    line(pointA.x+20,pointA.y+5,pointB.x-10,pointB.y+15);
    line(pointA.x+20,pointA.y+5,pointB.x+30,pointB.y+15);  
    image(this.sling3,pointA.x+20,pointA.y-10,15,30)
}
}
}
fly() {
    this.sling.bodyA=null;
}

attach(body1){
    this.sling.bodyA=body1;
}
}