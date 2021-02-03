var canvas,context;
var dragging=false;
var dragStartlocation;
var sanphot;

function getCanvasCoordinates(event){
    var x=event.clientX-canvas.getBoundingClientRect().left;
    var y=event.clientY-canvas.getBoundingClientRect().top;
    return{
        x:x,y:y
    };

}
function takeSnapShot(){
    sanphot=context.getImageData(0,0,canvas.width,canvas.height);
}
var colorArray=[
    '#1380ed',
    '#030842',
    '#00ff00',
    '#6b3410',
    '#ff1100'
]
function restoreSnapShot(){
    context.putImageData(sanphot,0,0);
}
function drawLine(position){if(re){
   context.fillRect(dragStartlocation.x,dragStartlocation.y,position.x-dragStartlocation.x,position.y-dragStartlocation.y);}
   
}
function dragStart(event){
    dragging=true;
    dragStartlocation=getCanvasCoordinates(event);
    takeSnapShot();
}
function drag(event){
 var position;
 if(dragging===true){
     restoreSnapShot();
     position=getCanvasCoordinates(event);
     drawLine(position); 
 }
}var re=false;
function fun(){
re=true;

}
var i=1;
function dragStop(event){
    dragging=false;
    restoreSnapShot();
    var position=getCanvasCoordinates(event); 
    drawLine(position);
    if(i>4){i=1;}
    context.fillStyle=colorArray[i];
    i++;
}



function init(){
 canvas=document.getElementById('canvas');
 window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth-50;
    canvas.height=innerHeight-100;
})

canvas.width=window.innerWidth-50;
canvas.height=innerHeight-100;
 context=canvas.getContext('2d');
 context.lineWidth=6;
 context.lineCap='round';
 canvas.addEventListener('mousedown',dragStart,false);
 canvas.addEventListener('mousemove',drag,false);
 canvas.addEventListener('mouseup',dragStop,false);
 
}
window.addEventListener('load',init,false);