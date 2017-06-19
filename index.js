// const listener = () => {
//   window.clearTimeout(timeout);
//   timeout = window.setTimeout(()=>{encodeToURL()},1000)
// }
// if (editable.addEventListener) {
//     editable.addEventListener("input", listener, false);
//     editable.addEventListener("DOMNodeInserted", listener, false);
//     editable.addEventListener("DOMNodeRemoved", listener, false);
//     editable.addEventListener("DOMCharacterDataModified", listener, false);
// }
// let timeout;
let current;
const theBigOleInput = document.getElementById("theBigOleInput");
const iframeEl = document.querySelector("iframe");
const formatiframe = () => {
  iframeEl.setAttribute("width",Math.min(650,document.body.clientWidth))
  iframeEl.setAttribute("height",iframeEl.width);
}

window.onload = function() {
  decodeURL();
  formatiframe();
};

function decodeURL() {
  const data = decodeURIComponent(atob(location.hash.slice(1)));
  theBigOleInput.innerHTML = data;
}


function encodeToURL(data) {
  const inputString = data;
  if (inputString !== current) {
    current = inputString;
    location.hash = btoa(encodeURIComponent(current));
  }
  console.log("saved");
}

function blobToiFrameSrc(code) {
  const codeBlob = new Blob([code], {type: 'text/HTML'});
  const blobURI = URL.createObjectURL(codeBlob);
  iframeEl.setAttribute("src",blobURI);
}


function  formatForBlob(funcs) {
  const funcsStr = `${funcs}`.replace(/^.+{|}$/g,``);
  const osciStr = `${oscilliscopeGlobal}`.replace(/^.+{|}$/g,``);
  return`
<canvas></canvas>
<script>
const canvas = document.querySelector("canvas");
const Circle = (i, width) => {
${funcsStr}
${osciStr}
</script>
<button onClick="toggleG()">toggle</button>
`
}
const sefsdfsdf= `
const w = width
const y = w*w*0.5;
const x = w*0.5;
const z = i*0.05
const diam = w*0.05*tan(z/2)/sin(2/z/0.00002)*normalS(cos(z))**0.01
const xz = z+(cos(z/10000)*10+(Math.tanh(z)));
const yz = z+(sin(z/200000)*10);
const xCo = f(x + (tan(xz**1.0001))*diam);
const yCo = f( y + (w * f((sin(yz**1.0001))*diam)));
return (xCo+yCo);
`

function run() {
  //send formula to HTMLblob, send HTMLblob URI to iframe;
  const textContent = theBigOleInput.innerText 
  const HTMLContent = formatForBlob(textContent);
  blobToiFrameSrc(HTMLContent);
  const autosave = document.getElementById("saveToURLCheck").checked;
  if (autosave) {
    toURL();    
  }
}
function toURL() {
    //send formula to URL for safe keeping;
  const innerHTML = theBigOleInput.innerHTML;
  encodeToURL(innerHTML);
}
function getURL() {
  document.getElementById("forURL").value = location.href;
}
function getFormula() {
  document.getElementById("forURL").value = theBigOleInput.textContent;
}









function oscilliscopeGlobal(canvas){
console.log("meme")
let gcontinue = true;
let pDraw = "";
let xyFunc = "";
const toggleG = () => {
    gcontinue =! gcontinue;
    if (gcontinue){ pDraw(); }
};


    const getX = (t) => {
        return wrap((1-t**2)/(1+t**2))
    }
    const getY = (t) => {
        return wrap((2*t)/(1+t**2))
    }

    const wrap = r => {
        return r
        const frac = (r+1)*0.5
        const normalized = normal(-1*frac);
        return normalized/0.5-1
    }
    const clamp = (num) => {
        if (num < 0){ return 0}
        else if (num > wh) {
            return wh
        }
        return num;
    }

    const f = a => Math.floor(a);
    const sin = a => Math.sin(a);
    const cos = a => Math.cos(a);
    const tan = a => Math.tan(a);
    const PI2sqrt = Math.sqrt(Math.PI*2);
    const normalS = x => (Math.E**-(0.5*(x**2)))/PI2sqrt;
    const normal = x => Math.E**-(Math.PI*x**2);
    const rand = (max, min=0) => Math.floor(Math.random()*(max - min)) + min;
    const norm = (val,max,min) =>(val-min)/(max-min);

    function drawPixel(p) {
        ctx.fillStyle = `rgba(0,0,0,${p.tail})`;
        ctx.fillRect(0,0,600,540);
        p.imageData = ctx.getImageData(0,0,600,540);
        p.data = p.imageData.data;

//         const Circle = (i) => {
//             eval
//             const w = p.width
//             const y = w*w*0.5;
//             const x = w*0.5;
//             const z = i*0.05
//             const diam = w*0.05*tan(z/2)/sin(2/z/0.00002)*normalS(cos(z))**0.01
//             const xz = z+(cos(z/10000)*10+(Math.tanh(z)));
//             const yz = z+(sin(z/200000)*10);
//             const xCo = f(x + (tan(xz**1.0001))*diam);
//             const yCo = f( y + (w * f((sin(yz**1.0001))*diam)));
//             return (xCo+yCo);
//         }
        const point = (px,coord,channel,strength,size) => {
            return [px]//,px+1,px+p.width,px+p.width+1]
        }
        for (let i=0; i < p.limit ;i++) {

            const px = Circle(p.i, p.width);
            const d = p.data;
            const thresher = 255//f(p.i/500) % 256;
            if (true){//d[px*4] <= thresher) {
                const map = (x,v) => { d[x] = v };
                point(px).map((val)=>{
                    val *= 4;
                    map(val,rand(255));
                    map(val+1,rand(255));
                    map(val+2,rand(255));
                    map(val+3,255);
                })
            }
            p.tapLog += 1;

            p.i++

        }
        ctx.putImageData(p.imageData,0,0);
        ctx.clearRect(0,540,600,100);
        p.isD++;
        p.now = performance.now();
        if (p.now > p.wait) {
            p.rate = p.rate ? p.isD - p.frameRate : performance.now() - (p.wait-1000);
            p.frameRate = p.isD.valueOf();
            p.wait = p.now + 1000;
        }

        ctx.fillStyle = gcontinue ? 'black' : 'red';

        ctx.fillText(`${p.rate}, ${p.isD}, ${p.i}`,0,canvas.height-40);
        if (gcontinue && p.i < p.bigLimit) {
            window.requestAnimationFrame(p.draw);
        }
    }
    function drawPixelParams(w,h) {
        this.tail = true;
        this.rate = 0;
        this.i = 0;
        this.width = w||canvas.width;
        this.height = h||this.width;
        this.limit = this.width*this.height;
        const imageData = ctx.createImageData(this.width,this.height);
        this.imageData = imageData;
        this.data = this.imageData.data;
        this.isD = 0;
        this.draw = () => {
            ctx.font = '20px roboto';
            drawPixel(this);
        };
        this.wait = performance.now() + 1000;
        this.frameRate = this.isD.valueOf();
    }

    const wh = document.body.clientWidth - 20;
    canvas.width = wh;
    canvas.height = wh;
    const ctx = canvas.getContext('2d');

    const p1 = new drawPixelParams(600);
    p1.limit= settings.limit //300;    // How many dots(3rd) are drawn per frame(2nd) (first number on display)
    p1.bigLimit = settings.bigLimit //600*10*10000;// How many frames are drawn altogether
    p1.tail = settings.tail//0.175
    p1.draw();
    pDraw = () => { p1.draw(); }

    // const CHANNELS_PER_PIXEL = 4; //rgba
    //
    // function drawCircle (radius) {
    // 	var x0 = radius;
    // 	var y0 = radius;
    // 	var w = wh;
    // 	var x = radius;
    // 	var y = 0;
    // 	var diameter = radius*2+1
    // 	var decisionOver2 = 1 - x;   // Decision criterion divided by 2 evaluated at x=r, y=0
    // 	var imageWidth = diameter;
    // 	var imageHeight = diameter;
    // 	var context = ctx;
    // 	var imageData = new ImageData(diameter,diameter)
    // 	var pixelData = imageData.data;
    // 	var makePixelIndexer = function (width) {
    // 		return function (i, j) {
    // 			var index = CHANNELS_PER_PIXEL * (j * width + i);
    // 			//index points to the Red channel of pixel
    // 			//at column i and row j calculated from top left
    // 			return index;
    // 		};
    // 	};
    // 	var pixelIndexer = makePixelIndexer(imageWidth);
    // 	var drawPixel = function (x, y) {
    // 		var idx = pixelIndexer(x,y);
    // 		pixelData[idx] = 255;	//red
    // 		pixelData[idx + 1] = 0;	//green
    // 		pixelData[idx + 2] = 255;//blue
    // 		pixelData[idx + 3] = 255;//alpha
    // 	};
    //
    // 	while (x >= y) {
    // 		drawPixel(x + x0, y + y0);
    // 		drawPixel(y + x0, x + y0);
    // 		drawPixel(-x + x0, y + y0);
    // 		drawPixel(-y + x0, x + y0);
    // 		drawPixel(-x + x0, -y + y0);
    // 		drawPixel(-y + x0, -x + y0);
    // 		drawPixel(x + x0, -y + y0);
    // 		drawPixel(y + x0, -x + y0);
    // 		y++;
    // 		if (decisionOver2 <= 0) {
    // 			decisionOver2 += 2 * y + 1; // Change in decision criterion for y -> y+1
    // 		} else {
    // 			x--;
    // 			decisionOver2 += 2 * (y - x) + 1; // Change for y -> y+1, x -> x-1
    // 		}
    // 	}
    // 	return (x,y) => {
    // 		context.putImageData(imageData, x, y);
    // 	}
    // }

    // function hslToRgb(h, s, l) {
    //   function hue2rgb(t) {
    //     if (t < 0) t += 1;
    //     if (t > 1) t -= 1;
    //     if (t < 1/6) return 6 * t;
    //     if (t < 1/2) return 1;
    //     if (t < 2/3) return (2/3 - t) * 6;
    //     return 0;
    //   }
    //   var r, g, b;
    //   if (s === 0) {
    //     r = g = b = l; // achromatic
    //   } else {
    //
    //     r = hue2rgb(h + 1/3);
    //     g = hue2rgb(h);
    //     b = hue2rgb(h - 1/3);
    //   }
    //
    //   return [ Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)];
    // }

}