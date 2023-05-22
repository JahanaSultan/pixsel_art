let artSize = 0;
let colorcount = Math.floor(document.querySelector('.color').clientWidth / 20) * 2 
let artheight = 0
if (document.documentElement.clientWidth <= 500) {
    artSize = 20;
    artheight = 30
}
else if (document.documentElement.clientWidth <= 768) {
    artSize = 40;
    artheight = 40
}
else if (document.documentElement.clientWidth <= 1024) {
    artSize = 60;
    artheight = 50
}
else if (document.documentElement.clientWidth > 1024) {
    artSize = 80;
    artheight = 26
}

const fetchColors = async () => {
    const response = await fetch(`https://x-colors.yurace.pro/api/random?number=${colorcount}`)
    const data = await response.json();
    codes(data);
}


fetchColors();
let tools = document.querySelector('.toolbar .color');
var container = document.querySelector('.art');
var squareSize = 100 / artSize;

const createPixelArt = () => {
    container.innerHTML = '';
    for (var i = 0; i < artSize; i++) {
        for (var j = 0; j < 26; j++) {
            var square = document.createElement('div');
            square.style.width = squareSize + '%';
            container.appendChild(square);
        }
    }
    changeColor();
}

const changeColor = (color = 'rgb(0,0,0)') => {
    [...document.querySelectorAll('.art div')].map(square => {
        square.addEventListener('click', () => {
            square.style.backgroundColor = color
        });
    });
    scroll(color);
}

const codes = (codes) => {
    tools.innerHTML = '';

    codes.map(color => {
        let div = document.createElement('div');
        div.addEventListener('click', () => {
            document.querySelectorAll('.toolbar .color div').forEach(div => {
                div.style.border = '1px solid #000'
                div.style.borderRadius = '0'
            })
            changeColor(color.rgb)
            div.style.border = '2px solid #fff'
            div.style.borderRadius = '50%'
        })
        div.style.backgroundColor = color.rgb;
        tools.appendChild(div);
    })
}

const selectColor = () => {
    [...document.querySelectorAll('.toolbar .color div')].map(div => {
        div.addEventListener('click', () => {
            changeColor(div.style.backgroundColor)
        })
    })
}
selectColor();




const scroll = (color) => {
    var divs = [...document.querySelectorAll('.art div')];
    let mouseDown = false;

    divs.map(div => div.onmousedown = () => {
        mouseDown = true;
    })

    divs.map(div => div.onmouseup = () => {
        mouseDown = false;
    })

    divs.map(div => div.onmouseover = () => {
        if (mouseDown) {
            div.style.backgroundColor = color;
        }
    })

}

const reset = () => {
    document.querySelectorAll('.art div').forEach(div => {
        div.style.backgroundColor = 'rgb(255,255,255)'
    })
    changeColor();
}

const save = () => {
    html2canvas(container).then(function (canvas) {
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = 'pixel-art.png';
        link.href = canvas.toDataURL();
        link.target = '_blank';
        link.click();
    });
}

const random = async () => {
    const response = await fetch('https://x-colors.yurace.pro/api/random')
    const data = await response.json();
    changeColor(data.rgb);
}


createPixelArt();
window.addEventListener('resize', createPixelArt);