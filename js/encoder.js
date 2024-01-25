/* DETECT LANGUAGE AND INCLUDE TRASNCRIPTIONS */
function languageDetector() {
    const languageDetected = navigator.language;
    const languageValidated = languageDetected.startsWith('es');
    const titleEs = "Transforma tus mensajes en puzzles";
    const subtitleEs = "Gluphy es la herramienta gratuita que convierte cualquier texto en un juego de ingenio";
    const textLabelEs = "Introduce un texto de entre 40 y 140 caracteres";
    const textLabelExampleEs = "Ejemplo: Tu regalo se encuentra dentro del árbol hueco del jardín.";
    const whatsappButtonEs = "Envíalo por Whatsapp";
    const telegramButtonEs = "Envíalo por Telegram";
    const mailButtonEs = "Envíalo por email";
    const previewButtonEs = "Previsualiza tu puzzle";
    const conditionsLinkTextEs = "Condiciones de servicio";
    const conditionsLinkEs = "http://gluphy.com/conditions_es.html";

    const titleEn = "Translate your messages into puzzles";
    const subtitleEn = "Gluphy is the free web tool that turns any text into a game of logic";
    const textLabelEn = "Insert a text between 40 and 200 characters";
    const textLabelExampleEn = "Example: Your gift is hidden in the hollow trunk of the garden.";
    const whatsappButtonEn = "Send it via Whatsapp";
    const telegramButtonEn = "Send it via Telegram";
    const mailButtonEn = "Send it via email";
    const previewButtonEn = "Preview your puzzle";
    const conditionsLinkTextEn = "Terms of use";
    const conditionsLinkEn = "http://gluphy.com/conditions_en.html";
            

    if (languageValidated == true) {
        document.getElementById('mainTitle').innerHTML = titleEs;
        document.getElementById('subTitle').innerHTML = subtitleEs;
        document.getElementById('textLabel').innerHTML = textLabelEs;
        document.getElementById('textEntry').setAttribute("placeholder", textLabelExampleEs);
        document.getElementById('whatsappButton').innerHTML = whatsappButtonEs;
        document.getElementById('telegramButton').innerHTML = telegramButtonEs;
        document.getElementById('mailButton').innerHTML = mailButtonEs;
        document.getElementById('previewButton').innerHTML = previewButtonEs;
        document.documentElement.lang = "es";
        document.querySelector('meta[name="description"]').setAttribute("content", "Gluphy es la herramienta gratuita que convierte cualquier texto en un juego de ingenio");
        document.title = "Gluphy: Transforma tus mensajes en puzzles";
        document.getElementById('conditionsLink').innerHTML = conditionsLinkTextEs;
        document.getElementById('conditionsLink').setAttribute("href", conditionsLinkEs);
    }
    else {
        document.getElementById('mainTitle').innerHTML = titleEn;
        document.getElementById('subTitle').innerHTML = subtitleEn;
        document.getElementById('textLabel').innerHTML = textLabelEn;
        document.getElementById('textEntry').setAttribute("placeholder", textLabelExampleEn);
        document.getElementById('whatsappButton').innerHTML = whatsappButtonEn;
        document.getElementById('telegramButton').innerHTML = telegramButtonEn;
        document.getElementById('mailButton').innerHTML = mailButtonEn;
        document.getElementById('previewButton').innerHTML = previewButtonEn;
        document.documentElement.lang = "en";
        document.querySelector('meta[name="description"]').setAttribute("content", "Gluphy is the free online tool that turns any message into a logic game");
        document.title = "Gluphy: Turn your messages into puzzles";
        document.getElementById('conditionsLink').innerHTML = conditionsLinkTextEn;
        document.getElementById('conditionsLink').setAttribute("href", conditionsLinkEn);
    }
}

/* BLOCK FUNCTIONALITY UNTIL REQUIREMENTS MET */
function blockButtons() {
    document.getElementById('whatsappButton').disabled = true;
    document.getElementById('telegramButton').disabled = true;
    document.getElementById('mailButton').disabled = true;
    document.getElementById('previewButton').disabled = true;
}

/* HARDCODED ENTRIES 
const textBase = "No saber lo que ha sucedido antes de nosotros es como ser incesantemente niños.";*/

/* CHARACTER LIMITATION IN FORM */
let limitChar = (element) => {
    const minChar = 40;
    const maxChar = 140;
    
    let ele = document.getElementById(element.id);
    let charLen = ele.value.length;
    
    let p = document.getElementById('charCounter');
    p.innerHTML = maxChar - charLen + ' / 140';
    
    if (charLen > maxChar) 
    {
        ele.value = ele.value.substring(0, maxChar);
        p.innerHTML = 0 + ' / 140'; 
    }

    if (charLen > minChar) 
    {
        document.getElementById('whatsappButton').disabled = false;
        document.getElementById('telegramButton').disabled = false;
        document.getElementById('mailButton').disabled = false;
        document.getElementById('previewButton').disabled = false;
    }
}

/* TEXT ENCODER & PARSER */

function textProcessing() {
    let textBase = document.getElementById("textEntry").value;
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      } 
    let plainText = removeAccents(textBase);
    /* if texString is based on textBase will include special characters, ñ, accents etc, but is it's based on plainText will be normalized */
    let textString = textBase.replace(/\s+/g, '_').toLowerCase();
    let punctuationLess = textString.replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g,"");
    var mapAccents = {
        á:"a",
        é:"e",
        í:"i",
        ó:"o",
        ú:"u"
     };
    let accentLess = punctuationLess.replace(/á|é|í|ó|ú/gi, function(matched){
        return mapAccents[matched];
      });
    let textNormalized = accentLess.replace(/\s{2,}/g," ");
    
    if (textNormalized.slice(-1) == "_") {
        textNormalized = textNormalized.slice(0, -1); 
    }

    
    const codeBase = {q: "w", w: "e",  e: "r", r: "t", t: "y", y: "u", u: "i", i: "o", o: "p", p: "q", l: "a", k: "l", j: "k",  h: "j",  g: "h", f: "g",  d: "f", s: "d", a: "s", z: "x", x: "c", c: "v", v: "b", b: "n", n: "m", m: "z" 
    };
    
    function textEncoder() {
        textEncoded = textNormalized.replace(/a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi, function(matched){
            return codeBase[matched];
        });
    }
    textEncoder();
}

/* LAUNCH SHARING OPTIONS */

function openWhatsapp() {
        const whatsappUrl = new URL("whatsapp://send?text=http://gluphy.com/decoder.html?textEncoded="+textEncoded);
        window.open(whatsappUrl);
}

function openTelegram() {
    const telegramUrl = new URL("tg://msg_url?url=http://gluphy.com/decoder.html?textEncoded="+textEncoded);
    window.open(telegramUrl);
}

function openMail() {
    const mailUrl = new URL("mailto:?subject=Gluphy&body=http://gluphy.com/decoder.html?textEncoded="+textEncoded);
    window.open(mailUrl);
}

function openPreview() {
    const previewUrl = new URL("http://gluphy.com/decoder.html?textEncoded="+textEncoded);
    window.open(previewUrl);
}


document.getElementById("whatsappButton").addEventListener("click",textProcessing);
document.getElementById("whatsappButton").addEventListener("click",openWhatsapp);
document.getElementById("telegramButton").addEventListener("click",textProcessing);
document.getElementById("telegramButton").addEventListener("click",openTelegram);
document.getElementById("mailButton").addEventListener("click",textProcessing);
document.getElementById("mailButton").addEventListener("click",openMail);
document.getElementById("previewButton").addEventListener("click",textProcessing);
document.getElementById("previewButton").addEventListener("click",openPreview);

window.onload = languageDetector();
window.onload = blockButtons();
