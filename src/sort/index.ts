//冒泡排序
function bubbleSort(array: number[]) {
  let i = 0,
    len = array.length,
    j, d;
  for (; i < len; i++) {
    for (j = 0; j < len; j++) {
      if (array[i] < array[j]) {
        d = array[j];
        array[j] = array[i];
        array[i] = d;
      }
    }
  }
  return array;
}

//快排

function quickSort(array: number[],start: number,end: number){

  if(start>=end) return array

  var start=start || 0,

    end=end || array.length-1;

  var base=array[end];

  var position=start

  for(let i=start;i<end;i++){

    if(array[i] < base) {

      swap(array, i, position);

      position++;

    }

  }

  swap(array,position,end)

  quickSort(array,start,position-1)

  quickSort(array,position+1,end)

  function swap(arr: number[], i: number, j:number) {

    var temp = arr[i];

    arr[i] = arr[j];

    arr[j] = temp;

  }

  return array

}