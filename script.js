const userInput = document.querySelector("#user-input");
const floorContainer = document.querySelector(".floors-container");
const submit = document.querySelector(".submit");

/* Constants */

let floorCount = 0;
let maxFloor = 0;
let queue = [];

/*Functions */

function addFloors() {
  floorContainer.innerHTML = null;
  floorCount = +userInput.value;
  maxFloor = +floorCount + 2;

  const topFloorEl = document.createElement("div");
  topFloorEl.classList.add("top-floor");
  topFloorEl.classList.add("static-floor");
  topFloorEl.innerHTML = `
                <button class="floor floor-down floor-btn top-floor-btn" data-floor=${
                  maxFloor - 1
                }>Down</button>
                <p>Top Floor</p>
            `;
  floorContainer.append(topFloorEl);
  for (let i = 0; i < floorCount; i++) {
    const floorEl = document.createElement("div");
    floorEl.classList.add("dynamic-floor");
    floorEl.innerHTML = `
                    <div class="btn-container">
                        <button class="floor floor-up" data-floor=${
                          floorCount - i
                        }>Up</button>
                        <button class="floor floor-down" data-floor=${
                          floorCount - i
                        }>Down</button>
                    </div>
                    <p>Floor ${floorCount - i}</p>
                `;
    floorContainer.appendChild(floorEl);
    const topFloor = document.querySelector(".top-floor-btn");
    handleBtnClick();
  }
  userInput.value = null;
}

function floorChange(targetFloor) {
  let duration = 0;
  const elevatorEl = document.querySelector(".elevator");
  const currentFloor = +elevatorEl.dataset.currentfloor;
  if (!elevatorEl.classList.contains("busy")) {
    elevatorEl.classList.add("busy");
    duration =
      (targetFloor - currentFloor) * 2 < -1
        ? (targetFloor - currentFloor) * 2 * -1
        : (targetFloor - currentFloor) * 2;
    elevatorEl.setAttribute("data-currentfloor", targetFloor);
    elevatorEl.style.transition = `bottom ${duration}s linear`;
    elevatorEl.style.bottom = targetFloor * 11.1 + "rem";

    setTimeout(() => {
      elevatorEl.classList.remove("busy");
      if (queue.length) {
        let queuedFloor = queue.shift();
        floorChange(queuedFloor);
      }
    }, duration * 2000);
  } else {
    queue.push(targetFloor);
  }
}

function handleBtnClick() {
  let up = document.querySelectorAll(".floor.floor-up");
  let down = document.querySelectorAll(".floor.floor-down");
  up.forEach((upBtn) => {
    upBtn.addEventListener("click", () => {
      let targetFloor = upBtn.dataset.floor;
      floorChange(targetFloor);
    });
  });

  down.forEach((downBtn) => {
    downBtn.addEventListener("click", () => {
      let targetFloor = downBtn.dataset.floor;
      floorChange(targetFloor);
    });
  });
}

/* Events*/
submit.addEventListener("click", addFloors);
