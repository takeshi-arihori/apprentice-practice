export class HelperFunctions{
  // 数値で構成される配列を受け取り、最大値のインデックスを返す
  static maxInArrayIndex(intArr){
    let maxIndex = 0;
    let maxValue = intArr[0];

    for(let i = 0; i < intArr.length; i++){
      if(intArr[i] > maxValue){
        maxValue = intArr[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }
}