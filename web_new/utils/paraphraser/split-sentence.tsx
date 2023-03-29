import { RemoveDuplicates } from "./remove-duplicates";

export function SplitSentence(
  text: string,
  minlength: number,
  maxLength: number
) {
  const sentences = [];
  var currentSentence = "";
  // loop over text
  text = text.replace("¬\n", "");

  for (let i = 0; i < text.length; i++) {
    var currentChar = text.charAt(i);
    currentSentence += currentChar;
    if (currentSentence.length >= minlength && currentChar.match(/[\r\n.?!]/)) {
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
    var extractN = sentences[i].split(/(\n)/g);
    for (let j = 0; j < extractN.length; j++) {
      if (extractN[j] === "\n") {
        res.push(extractN[j]);
      } else {
        res.push(extractN[j].trim());
      }
    }
  }
  return RemoveDuplicates(res.filter(Boolean));
}
