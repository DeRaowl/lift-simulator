const userInput = document.querySelector("#user-input");
const floorContainer = document.querySelector(".floors-container");
const submit = document.querySelector(".submit");

/* Constants */

let floorCount = 0;
let maxFloor = 0;

/*Functions */

function addFloors() {
  floorContainer.innerHTML = null;
  maxFloor = floorCount + 2;
  floorCount = userInput.value;
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
    handleBtnClick();
  }
  userInput.value = null;
}

function floorChange(targetFloor) {
  reset();
  const elevatorEl = document.querySelector(".elevator");
  const currentFloor = +elevatorEl.dataset.currentfloor;
  targetFloor = +targetFloor;
  console.log(targetFloor, "target", currentFloor, "current");
  if (targetFloor < 0) {
    targetFloor = document.querySelectorAll(".floor-down").length;
  }

  let duration = 0;

  if (currentFloor < targetFloor) {
    duration = (targetFloor - currentFloor) * 2;
  } else {
    duration = (currentFloor - targetFloor) * 2;
  }
  console.log(duration, "1");
  elevatorEl.setAttribute("data-currentfloor", targetFloor);
  elevatorEl.style.transition = `bottom ${duration}s linear`;
  elevatorEl.style.bottom = targetFloor * 11 + "rem";
}

function handleBtnClick() {
  let up = document.querySelectorAll(".floor-up");
  let down = document.querySelectorAll(".floor-down");

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

function reset() {
  const elevatorEl = document.querySelector(".elevator");
  elevatorEl.setAttribute("data-currentfloor", 0);
}

/* Events*/
submit.addEventListener("click", addFloors);
