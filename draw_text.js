
/**@type{HTMLCanvasElement} */
var canvas;
/**@type{CanvasRenderingContext2D} */
var ctx;
var canvasx;
var canvasy;

var ImgWhite=new Image();
ImgWhite.src = "./fontwhite.png";

var ImgBlack=new Image();
ImgBlack.src = "./fontblack.png";

function drawProvidedString() {
    drawString(document.getElementById("textinput").value, spritesWhite, 16);
}

/**
 * 
 * @param {string} text 
 * @param {number} posx
 */
function drawString(text, sprites, posx) {
        currentBoxes = null;
        disableButtons();
        document.getElementById("indexLabel").innerHTML = "-";
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasx = posx;
        canvasy = 32;
    if (spritesLoaded == 2) {
        var charArray = text.split("");
        charArray.forEach((char) => drawChar(char, sprites, posx));
        document.getElementById("problemLabel").innerHTML = "";
    }
}

/**
 * 
 * @param {string} char 
 * @param {number} posx
 */
function drawChar(char, sprites, posx) {
    drawNum(char.codePointAt(0), sprites, posx);
}


/**@type{number} */
var lineWidth;
/**
 * 
 * @param {number} n 
 * @param {number} posx
 */
function drawNum(n, sprites, posx, widthmax = Infinity) {
    if (n == 10) {
        lineWidth = 0;
        canvasx = posx;
        canvasy += 34;
    } else {
        var chardata = sprites[n];
        if (!chardata) {
            chardata = sprites[12539];
        }
        if (lineWidth + chardata.width > widthmax) {
            lineWidth = 0;
            canvasx = posx;
            canvasy += 34;
        }
        ctx.drawImage(chardata.bitmap, 
            canvasx + chardata.offsetx,
            canvasy + chardata.offsety);
        canvasx += chardata.width;
        lineWidth += chardata.width;
    }
}

/**
 * 
 * @param {number[]} array 
 * @param {boolean} clear 
 * @param {number} posx 
 * @param {number} posy 
 */
function drawNumArray(array, sprites, clear = true, posx = 32, posy = 32, widthmax = Infinity)
{
    canvasx = posx;
    canvasy = posy;
    lineWidth = 0;
    if (clear) {
        ctx.drawImage(backgroundImg, 0, 0);
    }
    array.forEach((n) => drawNum(n, sprites, posx, widthmax));  
}

/**@type{number} */
var currentIndex = 0;
/**@type{{id:number, speaker:string, message:string}[]} */
var currentBoxes = [];

function parseProvidedString()
{
    if (spritesLoaded == 2) {
        currentBoxes = parseLine(document.getElementById("textinput").value);
        if (currentBoxes == null || currentBoxes.length == 0) {
            document.getElementById("indexLabel").innerHTML = "Error parsing text!";
            document.getElementById("problemLabel").innerHTML = "Line " + linenum + ": " + problem;
        } else {
            currentIndex = 0;
            drawCurrentBox();
            document.getElementById("problemLabel").innerHTML = "";
        }
    }
}

function drawCurrentBox()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    drawBox(currentBoxes[currentIndex]);
    document.getElementById("indexLabel").innerHTML = currentBoxes[currentIndex].id;
    disableButtons();
}


function search(obj, key) {
    for (var prop of obj) {
      if (prop.key == key) {
        return prop;
      }
    }
  }

function createFontBitMap (bitmap,value) {
    return {
        "key": value.key,
        "bitmap": bitmap,
        "offsetx": value.offsetx,
        "offsety": value.offsety,
        "width": value.width
    };
}

function loadNeedFont(sprites, textcodes, isWhite) {
    textcodes.forEach(function(code){
        if(typeof(sprites[code])!="undefined"){
            return
        }
        let value=search(fontdata,code);
        if(typeof(value)=="undefined"){
            return
        }
        if(isWhite){
            createImageBitmap(ImgWhite, 
                value.datax, 
                value.datay, 
                value.datawidth, 
                value.dataheight
            ).then(
                function (ImageBitmap) {
                    sprites[value.key] = {
                        "bitmap": ImageBitmap,
                        "offsetx": value.offsetx,
                        "offsety": value.offsety,
                        "width": value.width
                    }
                }
            )  
        }else{
            createImageBitmap(ImgBlack, 
                value.datax, 
                value.datay, 
                value.datawidth, 
                value.dataheight
            ).then(
                function (ImageBitmap) {
                    sprites[value.key] = {
                        "bitmap": ImageBitmap,
                        "offsetx": value.offsetx,
                        "offsety": value.offsety,
                        "width": value.width
                    }
                }
            )  
        }
    })
}

/**
 * 
 * @param {{id: number, speaker: string, message: string}} box 
 */
async function drawBox(box)
{
    var speakcode=encode(box.speaker).slice(0, 12);
    var textcode=encode(box.message).slice(0, 63);
    await loadNeedFont(spritesWhite, speakcode,true)
    await loadNeedFont(spritesBlack, textcode,false)
    await drawNumArray(speakcode, spritesWhite, true, 52, 34);
    await drawNumArray(textcode, spritesBlack, false, 64, 86, 834);
}



function disableButtons()
{
    document.getElementById("btnPrev").disabled = !(currentBoxes && currentIndex - 1 >= 0 && currentIndex - 1 < currentBoxes.length);
    document.getElementById("btnNext").disabled = !(currentBoxes && currentIndex + 1 >= 0 && currentIndex + 1 < currentBoxes.length);
}

function prevBox()
{
    if (currentBoxes && currentIndex - 1 >= 0 && currentIndex - 1 < currentBoxes.length) {
        currentIndex -= 1;
        drawCurrentBox();
    } else {
        disableButtons();
    }
}

function nextBox()
{
    if (currentBoxes && currentIndex + 1 >= 0 && currentIndex + 1 < currentBoxes.length) {
        currentIndex += 1;
        drawCurrentBox();
    } else {
        disableButtons();
    }
}

disableButtons();