/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : Đảo ngược chuỗi
     */
export function reverse(string) {
  var strRev = "";

  for (var i = string.length - 1; i >= 0; i--) {
    strRev += string[i];
  }

  return strRev;
}


/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */
export function FormatMoney (dataFormat) {
      dataFormat = Number(dataFormat).toString()
      var result = "";
      let a = Math.floor(dataFormat.length / 3);
      let b = dataFormat.length % 3;
      let index = 1;
      while (a) {
        result +=
        dataFormat[dataFormat.length - index] +
        dataFormat[dataFormat.length - index - 1] +
        dataFormat[dataFormat.length - index - 2] +
          ".";
        index += 3;
        a--;
      }

      if (b == 0) {
        result = reverse(result.substr(0, result.length - 1));
      } else {
        while (b) {
          result += dataFormat[b - 1];
          b--;
        }
        result = reverse(result);
      }
      return result;
    
  }