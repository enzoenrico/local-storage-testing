let mainText= document.querySelector<HTMLPreElement>('.main-text') 


function getWindowData() :Window{
  return window.localStorage
}

const windowdata = getWindowData()
// console.log(mainText)
const penis = JSON.stringify(windowdata, null, 4)
console.log(penis)