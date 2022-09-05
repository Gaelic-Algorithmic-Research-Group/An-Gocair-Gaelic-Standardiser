

export function splitSentence(text, minlength, maxLength) {
    const sentences = [];
    var currentSentence = "";
    for (let i = 0; i < text.length; i++) {
      var currentChar = text.charAt(i);
      currentSentence += currentChar;
      if (currentSentence.length >= minlength && (currentChar.match(/[\r\n.?!]/))) {
        sentences.push(currentSentence);
        currentSentence = "";
      } else if (currentSentence.length >= maxLength) {
        var lastIndexOfSpace = currentSentence.lastIndexOf(" ");
        sentences.push(currentSentence.substring(0, lastIndexOfSpace));
        currentSentence = currentSentence.substring(lastIndexOfSpace + 1);
      }
    }
    if (currentSentence != "") {
        sentences.push(currentSentence);
    }
    const res = [];
    for (let i = 0; i < sentences.length; i++) {
        var extractN = sentences[i].split(/(?=\n)/g);
        for (let j = 0; j < extractN.length; j++) {
            if (extractN[j] === '\n'){
                res.push(extractN[j]);
            } else {
                res.push(extractN[j].trim());
            }
        }
    }
    return res.filter(Boolean);
  }
  
export function splitSentence1(text, minlength, maxLength) {	
    const res = [];	
    const length = text.length;	
    let start = 0;	
    for (let i = 0; i < length; i++) {	
        const element = text[i];
        if ((i - start) <= minlength){
            continue;
        } else if (element.match(/[\r\n.?!]/)) {	
            res.push(text.slice(start, i + 1));	
            start = i + 1;	
        } else if (i - start === maxLength) {	
            res.push(text.slice(start, i + 1));	
            start = i + 1;	
        }
    }	
    if (start != length) {	
        res.push(text.slice(start, length));	
    }	
    return res.filter(t => Boolean(t.trim()));	
}
