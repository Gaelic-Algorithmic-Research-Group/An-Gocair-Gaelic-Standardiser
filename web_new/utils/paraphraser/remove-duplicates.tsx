export function RemoveDuplicates(arr: string | any[]) {
  let isduplicate = 0;
  let out = [];
  let len = arr.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    let item = arr[i];
    if (item === "\n" && arr[i + 1] === "\n") {
      isduplicate += 1;
      if (isduplicate >= 2) {
        out[j++] = item;
      }
    } else {
      isduplicate = 0;
      out[j++] = item;
    }
  }
  return out;
}
