type windowType = {
  id: string;
  screenX: number;
  screenY: number;
  screenW: number;
  screenH: number;
  width: number;
  height: number;
  updated: number;
};
const text = document.querySelector<HTMLPreElement>(".main-text");
const but = document.querySelector<HTMLButtonElement>("#but");

const stats = document.querySelector<HTMLPreElement>(".stats");

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
const screenId = getScreenId();
console.log(screenId);

function setScreenData() {
  const windowData: windowType = {
    id: screenId,
    screenX: window.screenX,
    screenY: window.screenY,
    screenH: window.screen.availHeight,
    screenW: window.screen.availWidth,
    width: window.outerWidth,
    height: window.outerHeight,
    updated: Date.now(),
  };
  window.localStorage.setItem(screenId, JSON.stringify(windowData));
  // console.log(windowData)
  return windowData;
}

// console.log(getScreens());
// console.log(getScreenId());
console.log(setScreenData());
let screenData: windowType = setScreenData();
const newData = document.createElement("p");
text?.appendChild(newData);

// for(let i = 0; i < Object.keys(screenData).length; i++){
//   newData.innerText = parseInt(screenData.screenX)
//   text.appendChild(newData)

// }

but.addEventListener("click", () => {
  stats.innerHTML = ""
  screenData = setScreenData();
  newData.innerText = `X : ${screenData.screenX} | Y: ${screenData.screenY}`;
  console.log("ok");

  if (!stats) return;
  const existingScreens = Object.fromEntries(getScreens());
  for(let s in existingScreens){
    console.log(s)
    let stat = document.createElement("pre")
    stat.innerText = s + " ->" + JSON.stringify(existingScreens[s], null, 4)
    console.log(existingScreens)
    stats.appendChild(stat)
  }
  console.log(JSON.stringify(existingScreens, null, 4));
});
