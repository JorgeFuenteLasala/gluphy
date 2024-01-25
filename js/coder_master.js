/* GENERATE URL WITH PARAMETERS (HIDDEN BY NOW)
const url = new URL("file:///Users/jorgefuente/Desktop/brain%20cards/index.html?masterCode="+ textEncoded);
document.getElementById("testbutton").addEventListener("click",openurl);
function openurl() {
    window.open(url);
}
*/

/* LOAD TEXT FROM URL PARAMETERS (HIDDEN BY NOW)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const textToDecode = urlParams.get('masterCode');
*/

/* DETECT LANGUAGE AND INCLUDE TRASNCRIPTIONS */
function languageDetector() {
    const languageDetected = navigator.language;
    const languageValidated = languageDetected.startsWith('es');
    const titleEs = "Descrifra tu mensaje";
    const subtitleEs = "Cada símbolo se puede traducir de tres formas diferentes";
    const titleEn = "Decode your message";
    const subtitleEn = "Each glyph can be translated in three different ways";
    const ctaEs = "Envía un mensaje";
    const ctaEn = "Send a message";
            

    if (languageValidated == true) {
        document.getElementById('mainTitle').innerHTML = titleEs;
        document.getElementById('subTitle').innerHTML = subtitleEs;
        document.getElementById('ctaTop').innerHTML = ctaEs;
    }
    else {
        document.getElementById('mainTitle').innerHTML = titleEn;
        document.getElementById('subTitle').innerHTML = subtitleEn;
        document.getElementById('ctaTop').innerHTML = ctaEn;
    }
}

/* HARDCODED ENTRIES */
const textBase = "No saber lo que ha sucedido antes de nosotros es como ser incesantemente niños.";

/* TEXT ENCODER & PARSER */
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 
let plainText = removeAccents(textBase);
/* if texString is based on textBase will include special characters, ñ, accents etc, but is it's based on plainText will be normalized */
let textString = textBase.replace(/\s+/g, '_').toLowerCase();
let punctuationLess = textString.replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g,"");
let textNormalized = punctuationLess.replace(/\s{2,}/g," ");

const codeBase = {q: "w", w: "e",  e: "r", r: "t", t: "y", y: "u", u: "i", i: "o", o: "p", p: "q", l: "a", k: "l", j: "k",  h: "j",  g: "h", f: "g",  d: "f", s: "d", a: "s", z: "x", x: "c", c: "v", v: "b", b: "n", n: "m", m: "z" 
};

function textEncoder() {
    textEncoded = textNormalized.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, function(matched){
        return codeBase[matched];
    });
    console.log(textEncoded);
}

/* TEXT DECODER & PARSER */
const decodeBase = {w: "q", e: "w",  r: "e", t: "r", y: "t", u: "y",
    i: "u", o: "i", p: "o", q: "p", a: "l", l: "k", k: "j",  j: "h",  h: "g",
    g: "f",  f: "d", d: "s", s: "a", x: "z", c: "x", v: "c", b: "v", n: "b", m: "n", z: "m" 
};

function textDecoder() {
    textDecoded = textEncoded.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, function(matched){
        return decodeBase[matched];
    });
    console.log(textDecoded);
    breakWords();
}

const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

function syllabify(words) {
    return words.match(syllableRegex);
}

function breakWords() {
    textInArrays = textDecoded.split("_");
    textInSyllabes = textInArrays.map(syllabify);
    textSplit = textInSyllabes.flat();
}

/* TOOLS FOR MANAGING ARRAYS */

/* Array order randomizer */
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

/* Get all the indexes for a given value getAllIndexes(ArrayName,value); */

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

/* SYLLABE COUNT AND SYMBOL SELECTION */

/* Generate symbol arrays */


function selectSymbols() {

    let syllabesQuantity = textSplit.length;
    let syllabesArray = new Array(syllabesQuantity).fill(0);
    let syllabesConsumed = 0;
    let nextGlyph = 0;
    let safeTrigger = false;


    for (var i = 0; i < syllabesQuantity; i++) {

        if (syllabesQuantity - syllabesConsumed >= 3) {
            let position1 = syllabesArray.indexOf(0);
            let value1 = textSplit[position1];
            syllabesArray[position1] = 1;
            syllabesConsumed++;

            let availableArray2 = getAllIndexes(syllabesArray,0);
            let random2 = Math.floor(Math.random() * availableArray2.length);
            let position2 = availableArray2[random2];
            let value2 = textSplit[position2];
            syllabesArray[position2] = 1;
            syllabesConsumed++;

            let availableArray3 = getAllIndexes(syllabesArray,0);
            let random3 = Math.floor(Math.random() * availableArray3.length);
            let position3 = availableArray3[random3];
            let value3 = textSplit[position3];
            syllabesArray[position3] = 1;
            syllabesConsumed++;

            eval("blockArray"+position1+ "= new Array(position1, value1, nextGlyph, value2, value3);");
            eval("blockArray"+position2+ "= new Array(position2, value2, nextGlyph, value1, value3);");
            eval("blockArray"+position3+ "= new Array(position3, value3, nextGlyph, value1, value2);");

            nextGlyph++;

        }

        else if (syllabesQuantity - syllabesConsumed > 0) {
            let position4 = syllabesArray.indexOf(0);
            let value4 = textSplit[position4];
            syllabesArray[position4] = 1;
            syllabesConsumed++;

            let position5 = Math.floor(Math.random() * textSplit.length);
            let value5 = textSplit[position5];

            let position6 = Math.floor(Math.random() * textSplit.length);
            let value6 = textSplit[position6];
            
            eval("blockArray"+position4+ "= new Array(position4, value4, nextGlyph, value5, value6);");

            nextGlyph++;

        }

        else if (safeTrigger == false) {
            console.log(blockArray0);
            console.log(blockArray1);
            console.log(blockArray2);
            console.log(blockArray3);
            console.log(blockArray4);
            console.log(blockArray5);
            console.log(blockArray6);
            console.log(blockArray7);
            console.log(blockArray8);
            console.log(blockArray9);
            console.log(blockArray10);
            safeTrigger = true;
            drawBlocks();
        }
    }
    

}

/* BUILDING THE INTERFACE */

function drawBlocks() {
    syllabesQuantity = textSplit.length;
    let glyphsList = document.getElementById('glyphs--list');
    let spaceCounter = -1;
    

    /* Create blocks of glyphs */
    for (var i = 0; i < syllabesQuantity; i++) {

        /* Unit container */
        let unitContainer = document.createElement("div");
        unitContainer.classList.add("glyph--container");
        unitContainer.style.order = i;

        /* Main glyph */
        let glyphSelector = document.createElement("input");
        glyphSelector.setAttribute("id","glyph"+i);
        glyphSelector.setAttribute('type',"radio");
        glyphSelector.setAttribute('name',"glyph-list");
        glyphSelector.classList.add("glyph-selector");
        let labelGlyph = document.createElement('label');
        labelGlyph.setAttribute('for',"glyph"+i);
        labelGlyph.classList.add("glyph");
        labelGlyph.classList.add("glyph-type"+eval("blockArray"+i+"[2]"));

        /* Text display */
        let textDisplay = document.createElement("div");
        textDisplay.setAttribute("id","display"+i);

        /* Selector of choices */
        let selectorContainer = document.createElement("ul");

        let subordinate1 = document.createElement("li");
        let selector1 = document.createElement("input");
        selector1.setAttribute("id","symbol"+i+"radio1");
        selector1.setAttribute('type',"radio");
        selector1.setAttribute('name',"symbol"+i);
        selector1.setAttribute('value',eval("blockArray"+i+"[1]"));
        selector1.classList.add("glyph-input");
        let label1 = document.createElement('label');
        label1.setAttribute('for',"symbol"+i+"radio1");
        label1.textContent = eval("blockArray"+i+"[1]");
        let subordinate2 = document.createElement("li");
        let selector2 = document.createElement("input");
        selector2.setAttribute("id","symbol"+i+"radio2");
        selector2.setAttribute('type',"radio");
        selector2.setAttribute('name',"symbol"+i);
        selector2.setAttribute('value',eval("blockArray"+i+"[3]"));
        selector2.classList.add("glyph-input");
        let label2 = document.createElement('label');
        label2.setAttribute('for',"symbol"+i+"radio2");
        label2.textContent = eval("blockArray"+i+"[3]");
        let subordinate3 = document.createElement("li");
        let selector3 = document.createElement("input");
        selector3.setAttribute("id","symbol"+i+"radio3");
        selector3.setAttribute('type',"radio");
        selector3.setAttribute('name',"symbol"+i);
        selector3.setAttribute('value',eval("blockArray"+i+"[4]"));
        selector3.classList.add("glyph-input");
        let label3 = document.createElement('label');
        label3.setAttribute('for',"symbol"+i+"radio3");
        label3.textContent = eval("blockArray"+i+"[4]");

        let randomOrder = [1,2,3];
        shuffle(randomOrder);

        selectorContainer.classList.add("translation--list");

        subordinate1.appendChild(selector1);
        subordinate1.appendChild(label1);
        subordinate1.style.order = randomOrder[0];
        subordinate2.appendChild(selector2);
        subordinate2.appendChild(label2);
        subordinate2.style.order = randomOrder[1];
        subordinate3.appendChild(selector3);
        subordinate3.appendChild(label3);
        subordinate3.style.order = randomOrder[2];

        selectorContainer.appendChild(subordinate1);
        selectorContainer.appendChild(subordinate2);
        selectorContainer.appendChild(subordinate3);

        /* Include everything in the container */

        glyphsList.appendChild(unitContainer);
        unitContainer.appendChild(glyphSelector);
        unitContainer.appendChild(labelGlyph);
        unitContainer.appendChild(textDisplay);
        unitContainer.appendChild(selectorContainer);
    }

    /* Generate the blank spaces */
    totalWords = textInSyllabes.length;
    for (var i = 0; i < totalWords; i++) {
        let blockSpace = document.createElement("li");
        blockSpace.classList.add("glyph-space");
        spaceCounter = spaceCounter + textInSyllabes[i].length;
        blockSpace.style.order = spaceCounter;
        glyphsList.appendChild(blockSpace);
    }

    /* Load listeners */
    listenSelection();
    listenReset();
}

/* REGISTER THE SELECTION AND TEST THE RESULT */




/* Write the text in the input and check result*/
function listenSelection() {
    document.querySelectorAll('.glyph-input').forEach(item => {
        item.addEventListener('click', event => {
            let optionName = item.id.replace("symbol", "");
            let glyphId = optionName.slice(0, optionName.indexOf('r'));
            let optionValue = item.value;
            let inputField = document.getElementById("display"+glyphId);
            inputField.innerHTML = optionValue;
            let glyphsCompleted = [];
            for (var i = 0; i < syllabesQuantity; i++) {
                selectionString = document.getElementById("display"+i).innerHTML;
                glyphsCompleted.push(selectionString);
            }
            if (glyphsCompleted.join("") === textInArrays.join("")) {
                alert("muy bien!");
            }  
          
        })
    })
}

/* Reset the glyph selection */
function listenReset() {

    let glyphsList = document.getElementById('glyphs--list');
            let glyphReset = document.createElement("input");
            glyphReset.setAttribute("id","resetGlyph");
            glyphReset.setAttribute('type',"radio");
            glyphReset.setAttribute('name',"glyph-list");
            glyphsList.appendChild(glyphReset);

    document.querySelectorAll('.glyph-space').forEach(item => {
        item.addEventListener('click', event => {
            document.getElementById("resetGlyph").checked = true;
        })
    })
    document.getElementById('resetLayer').onclick = function () {
        document.getElementById("resetGlyph").checked = true;
    }
}



window.onload = languageDetector();
window.onload = textEncoder();
window.onload = textDecoder();
window.onload = selectSymbols();
