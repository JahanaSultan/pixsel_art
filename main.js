// let neon_colors_codes = [
// "rgb(17, 240, 253)",
// "rgb(188, 20, 254)",
// "rgb(138, 42, 227)",
// "rgb(255, 49, 48)",
// "rgb(253, 93, 1)",
// "rgb(87, 125, 255)",
// "rgb(141, 168, 255)",
// "rgb(121, 248, 255)",
// "rgb(214, 117, 255)",
// "rgb(140, 75, 225)",
// "rgb(204, 255, 1)",
// "rgb(128, 255, 1)",
// "rgb(59, 254, 20)",
// "rgb(18, 239, 253)",
// "rgb(29, 81, 252)",
// "rgb(181, 37, 195)",
// "rgb(239, 65, 255)",
// ]

function fetchColors() {
    fetch(
        'https://x-colors.yurace.pro/api/random?number=116'
    ).then(
        response => response.json()
    ).then(
        data => {
            codes(data)
        }
    )
}
fetchColors();
let tools = document.querySelector('.toolbar .color');
var container = document.querySelector('.art');
var artSize = 80;
var squareSize = 100 / artSize;

function createPixelArt() {
    container.innerHTML = '';
    for (var i = 0; i < artSize; i++) {
        for (var j = 0; j < artSize; j++) {
            var square = document.createElement('div');
            square.style.width = squareSize + '%';
            container.appendChild(square);
        }
    }
    changeColor();
}

function changeColor(color = 'rgb(0,0,0)') {
    document.querySelectorAll('.art div').forEach(function (square) {
        square.addEventListener('click', function () {
            square.style.backgroundColor = color
        });
    });
    scroll(color);
}

function codes(codes) {
    tools.innerHTML = '';
    codes.map(color => {
        let div = document.createElement('div');
        div.setAttribute('onclick', `changeColor("${color.rgb}")`);
        div.style.backgroundColor = color.rgb;
        tools.appendChild(div);
    })
}

function selectColor() {
    document.querySelectorAll('.toolbar .color div').forEach(div => {
        div.onclick = function () {
            changeColor(div.style.backgroundColor)
        }
    })
}
selectColor();


createPixelArt();
window.addEventListener('resize', createPixelArt);

function scroll(color) {
    var divs = [...document.querySelectorAll('.art div')];
    let mouseDown = false;

    divs.map(div => div.onmousedown = function () {
        mouseDown = true;
    })

    divs.map(div => div.onmouseup = function () {
        mouseDown = false;
    })

    divs.map(div => div.onmouseover = function () {
        if (mouseDown) {
            div.style.backgroundColor = color;
        }
    })

}

function reset() {
    document.querySelectorAll('.art div').forEach(div => {
        div.style.backgroundColor = 'rgb(255,255,255)'
    })
    changeColor();
}

function eraser() {
    changeColor('rgb(255,255,255)')
}

function save() {
    html2canvas(container).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL();
        link.target = '_blank';
        link.click();
    });
}

function random() {
    fetch('https://x-colors.yurace.pro/api/random')
        .then(response => response.json())
        .then(data => {
            changeColor(data.rgb)
        }
        )
}