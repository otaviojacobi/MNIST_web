let click = false;
let xCoord, yCoord = "";
let canvas = document.getElementById("canvas");
let cntx = canvas.getContext("2d");
cntx.strokeStyle = "black";
cntx.lineWidth = 4;
cntx.lineCap = "round";
cntx.fillStyle = "#fff";
cntx.fillRect(0, 0, canvas.width, canvas.height);

let button = document.getElementById("button");

document.addEventListener('mouseup', event => click = false);

button.addEventListener('click', event => cntx.clearRect( 0,0,canvas.width, canvas.height ));

canvas.addEventListener('mousedown', event => {
    click = true;
    cntx.save();
    xCoord = event.pageX - canvas.offsetLeft;
    yCoord = event.pageY - canvas.offsetTop
});

canvas.addEventListener('click', event => click = false);

canvas.addEventListener('mousemove', event => {
    if (click == true) {
        cntx.beginPath();
        cntx.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
        cntx.lineTo(xCoord, yCoord);
        cntx.stroke();
        cntx.closePath();
        xCoord = event.pageX - canvas.offsetLeft;
        yCoord = event.pageY - canvas.offsetTop
    }
});