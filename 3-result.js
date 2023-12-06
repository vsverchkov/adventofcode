const fs = require("fs")

const input = fs.readFileSync("3-input.txt", "utf8").split("\n").map((line) => line.split(""))

console.log("Part 1: " + partOne(input))
console.log("Part 2: " + partTwo(input))

function partOne(input) {
  var result = 0

  inputLen = input.length
  for (let i = 0; i < inputLen; i++) {
    line = input[i]
    lineLen = line.length

    var num = ""
    var start = -1
    var end = -1
    for (let j = 0; j < lineLen; j++) {
      cur = line[j]

      if (isNumber(cur)) {
        if (start == -1) start = j
        end = j
        num += cur
        if (j != lineLen - 1) continue
      }

      if (num != "") {
        if ((start > 0 && line[start - 1] != '.') || (end < lineLen - 1 && line[end + 1] != '.')) {
          result += parseInt(num)
          start = -1
          end = -1
          num = ""
          continue
        }

        for (let k = 0; k < end - start + 3; k++) {
          prevLineIdx = start - 1 + k
          if (i - 1 >= 0 && prevLineIdx >= 0 && prevLineIdx < lineLen) {
            prevSymbol = input[i - 1][prevLineIdx]
            if (!isNumber(prevSymbol) && prevSymbol != '.') {
              result += parseInt(num)
              start = -1
              end = -1
              num = ""
              break
            }
          }

          nextLineIdx = end + 1 - k
          if (i + 1 < inputLen && nextLineIdx < lineLen && nextLineIdx >= 0) {
            nextSymbol = input[i + 1][nextLineIdx]
            if (!isNumber(nextSymbol) && nextSymbol != '.') {
              result += parseInt(num)
              start = -1
              end = -1
              num = ""
              break
            }
          }
        }
        start = -1
        end = -1
        num = ""
      }
    }
  }
  return result
}

function partTwo(input) {
  var result = 0

  // inputLen = input.length
  // for (let i = 0; i < inputLen; i++) {
  //   line = input[i]
  //   lineLen = line.length

  //   for (let j = 0; j < lineLen; j++) {
  //     cur = line[j]

  //     if (cur == '*') {
  //       var curResult = 0
  //       if (j > 0 && isNumber(line[j - 1])) {
  //         var leftNum = ""
  //         for (let k = j - 1; k >= 0; k--) {
  //           prevSymbol = line[k]
  //           if (isNumber(prevSymbol)) {
  //             leftNum = prevSymbol + leftNum
  //             line[k] = '-'
  //             continue
  //           }
  //           break
  //         }
  //         curResult = parseInt(leftNum)
  //       }

  //       if (j < lineLen - 1 && isNumber(line[j + 1])) {
  //         var rightNum = ""
  //         for (let k = j + 1; k < lineLen; k++) {
  //           nextSymbol = line[k]
  //           if (isNumber(nextSymbol)) {
  //             rightNum += nextSymbol
  //             line[k] = '-'
  //             continue
  //           }
  //           break
  //         }

  //         if (curResult != 0) {
  //           result += curResult * parseInt(rightNum)
  //           continue
  //         }
  //         curResult = parseInt(rightNum)
  //       }

  //       for (let k = 0; k < 3; k++) {
  //         prevLineIdx = j - 1 + k
  //         if (i - 1 >= 0 && prevLineIdx >= 0 && prevLineIdx < lineLen) {
  //           prevSymbol = input[i - 1][prevLineIdx]
  //           if (isNumber(prevSymbol)) {
  //             var right = prevLineIdx
  //             var left = prevLineIdx
  //             var prevNum = prevSymbol
  //             while (left == -1 && right == -1) {

  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  return result
}

function isNumber(c) {
  return c >= '0' && c <= '9'
}
