

export function splitSentence(text, minlength, maxLength) {	
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