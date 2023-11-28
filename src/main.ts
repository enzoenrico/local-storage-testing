type windowType = {
  screenX: number;
  screenY: number;
  screenW: number;
  screenH: number;
  width: number;
  height: number;
  updated: number;
};
const text = document.querySelector<HTMLPreElement>(".main-text");

function getScreens(): [string, windowType][] {
  return Object.entries(window.localStorage)
    .filter(([key]) => key.startsWith("screen-"))
    .map(([key, value]: [string, string]) => [
      key,
      JSON.parse(value) as windowType,
    ]);
}
function getScreenId() {
  const existingScreens = Object.keys(window.localStorage)
    .filter((key) => key.startsWith("screen-"))
    .map((key) => parseInt(key.replace("screen-", "")))
    .sort((a, b) => a - b);
  return existingScreens.at(-1) + 1 || 1;
}
const screenId = `screen-${getScreenId()}`;
console.log(screenId);

function setScreenData() {
  const windowData: windowType = {
    screenX: window.screenX,
    screenY: window.screenY,
    screenH: window.screen.availHeight,
    screenW: window.screen.availWidth,
    width: window.outerWidth,
    height: window.outerHeight,
    updated: Date.now()
  };
  window.localStorage.setItem(screenId, JSON.stringify(windowData))
  // console.log(windowData)
  return windowData
}

// console.log(getScreens());
// console.log(getScreenId());
console.log(setScreenData())
let screenData: windowType = setScreenData()
const newData = document.createElement('p')

// for(let i = 0; i < Object.keys(screenData).length; i++){
//   newData.innerText = parseInt(screenData.screenX)
//   text.appendChild(newData)

// }

text.addEventListener("click", () =>{
  screenData = setScreenData()
  // newData.innerText = `X: ${screenData.screenX} | Y: ${screenData.screenY}`  
  alert(JSON.stringify(screenData))
})
window.addEventListener("drag", () => {
  screenData = setScreenData()
  newData.innerText = `X : ${screenData.screenX} | Y: ${screenData.screenY}`
})