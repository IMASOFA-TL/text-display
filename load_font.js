var spritesWhite = {};
var spritesBlack = {};
var spritesLoaded = 0;

var backgroundImg = new Image();
backgroundImg.src = "./back.png";

function loadFont(sprites, imgsrc) {
    var imgWhite = new Image();
    imgWhite.onload = function() {
        Promise.all(fontdata.map(
            function (value){
            return createImageBitmap(imgWhite, 
                value.datax, 
                value.datay, 
                value.datawidth, 
                value.dataheight
            ).then(
                function (bitmap) {
                    return {
                        "key": value.key,
                        "bitmap": bitmap,
                        "offsetx": value.offsetx,
                        "offsety": value.offsety,
                        "width": value.width
                    };
                }
            )
            }
        )).then(function (result){
            spritesLoaded += 1;
            result.forEach(
                function (value) {
                    sprites[value.key] = {
                        "bitmap": value.bitmap,
                        "offsetx": value.offsetx,
                        "offsety": value.offsety,
                        "width": value.width
                    }
                }
            )
        })
    }
    imgWhite.src = imgsrc;
}

loadFont(spritesWhite, "./fontwhite.png");
loadFont(spritesBlack, "./fontwhite.png");
