interface windowPosition {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  centerX: number;
  centerY: number;
}

let myId = Math.floor(Math.random() * 1000);
myId =  "funnywindow-" + myId
const text = document.querySelector(".write-here") as HTMLDivElement;
const pointer = document.querySelector(".dir") as SVGAElement;

let box = document.querySelector(".box") as HTMLDivElement;
let boxBoundingRect = box.getBoundingClientRect();
let boxCenter = {
  x: boxBoundingRect.left + boxBoundingRect.width / 2,
  y: boxBoundingRect.top + boxBoundingRect.height / 2,
};



window.addEventListener("load", async () => {
  while (true) {
    let posData = setLocalStoragePosition();
    if (text) {
      text.innerText = JSON.stringify(posData);
    }

    let targets: windowPosition[] = await getScreens();

    let degs = await targets.filter((val) => val.id != myId) as windowPosition
    // console.log(degs) 
    rotate(degs)

    await timer(1000);
  }
});

const rotate = (target: windowPosition) => {
  if (target[0] !== undefined){
  let angle =    Math.atan2(target[0].centerX - boxCenter.x, -(target[0].centerY - boxCenter.y)) *
    (180 / Math.PI);
    console.log(angle)
  box.style.transform = `rotate(${angle}deg)`;
  }
};

window.addEventListener("unload", () => {
  localStorage.clear();
});

const setLocalStoragePosition = () => {
  let pos: windowPosition = {
    id: myId,
    x: window.screenX,
    y: window.screenX,
    w: window.innerWidth,
    h: window.innerHeight,
  };
  pos.centerX = Math.abs(pos.x - (pos.w / 2))
  pos.centerY = Math.abs(pos.y - (pos.h / 2))

  localStorage.setItem( myId, JSON.stringify(pos));

  return pos;
};

const getScreens = async () => {
  return await Object.entries(window.localStorage)
    .filter(([key]) => key.startsWith("funnywindow-"))
    .map(([_, val]) => JSON.parse(val) as windowPosition); // ?
};

const timer = (delay: number) => new Promise((res) => setTimeout(res, delay));
