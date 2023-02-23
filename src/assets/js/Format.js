/**
     * create by : MF1270
     * create day : 19/02/2023
     * ham : định dạng tiền
     */
export const FormatData =(dataFormat)=> {
      
      var result = "";
      let a = Math.floor(dataFormat.length / 3);
      let b = this.valueInput.length % 3;
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
        result = this.reverse(result.substr(0, result.length - 1));
      } else {
        while (b) {
          result += dataFormat[b - 1];
          b--;
        }
        result = this.reverse(result);
      }
      return result;
    
  }