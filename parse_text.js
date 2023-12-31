/**@type{string} */
var filename;
/**@type{string} */
var problem;
/**@type{number} */
var linenum;

/**
 * 
 * @param {string} text 
 */
function parseLine(text)
{
    var lines = text.split('\n');
    linenum = 1;
    problem = "";
    filename = getNonCommentLine(lines);
    var boxes = [];
    /**@type{string} */
    var line;
    var broken = false;
    while (lines && lines.length > 0) {
        var box = {};

        line = getNonCommentLine(lines);
        if (line == null) {
            problem = "Expected a number."
            broken = true;
            break;
        }
        box.id = parseInt(line, 10);
        if (isNaN(box.id)) {
            problem = "Expected a number.";
            broken = true;
            break;
        }

        line = getNonCommentLine(lines);
        if (line == null) {
            problem = "Expected a name.";
            broken = true;
            break;
        }
        box.speaker = line;
        
        line = getNonCommentLine(lines);
        if (line == null || line == "$") {
            problem = "Expected message text.";
            broken = true;
            break;
        }
        var message = line;
        
        /** @type{string} */
        var msgline;
        line = getNonCommentLine(lines);
        if (line == null) {
            problem = "Expected message text or $ symbol.";
            broken = true;
            break;
        }
        while ((msgline = line) != "$") {
            message += '\n' + msgline;
            line = getNonCommentLine(lines);
            if (line == null) {
                problem = "Expected message text or $ symbol.";
                broken = true;
                break;
            }
        }
        box.message = message;
        boxes.push(box);
    }
    if (broken)
        return null;
    else
        return boxes;
}

/**
 * 
 * @param {string[]} lines 
 */
function getNonCommentLine(lines)
{
    /** @type{string} */
    var line;
    do {
        linenum += 1;
        line = lines.shift();
    } while (!(line === undefined) && line.charAt(0) == "#");
    return line;
}

/**
 * 
 * @param {string} text 
 */
function encode(text) 
{
    var array = [];
    var next = 0;
    var prevk = 0;
    text.split("").forEach( function (char) {
        var k = char.codePointAt(0);
        if(k==92){
            return
        }
        array.push(k);
    });
    if (next != 0) {
        array.push(prevk * 256);
    }
    return array;
}