let liftData = [];
let requestQueue = [];
const validateInput = (floorCount, liftCount) => {
  if (floorCount < 0 || liftCount < 0) {
    alert("Enter a positive number.");
    return false;
  } else if (floorCount == 0 || liftCount == 0) {
    alert("Please enter a value");
    return false;
  } else if (floorCount < liftCount) {
    alert(
      "Number of lifts cannot be greater than number of floors in the building"
    );
    return false;
  } else {
    return true;
  }
};

const submitClick = () => {
  const groundFloor = document.getElementById("floors");
  groundFloor.innerHTML = "";
  const floorCount = document.getElementById("floorCount").value;
  const liftCount = document.getElementById("liftCount").value;
  const validation = validateInput(floorCount, liftCount);
  if (validation) {
    document.getElementById("form-container").style.display = "none";
    document
      .getElementById("backButton")
      .setAttribute("style", "visibility:visible");
    document.getElementById("floors").removeAttribute("hidden");
    createFloor(floorCount, liftCount);
  }
};

const backButtonClick = () => {
  window.location.reload();
};

const createFloor = (floorCount, liftCount) => {
  for (idx = 1; idx <= floorCount; idx++) {
    const floors = document.getElementById("floors");
    let floorIdx = floors.childElementCount;
    let currentFloor = floorIdx + 1;

    const floor = creatFloorSkeleton(currentFloor);
    floors.insertBefore(floor, floors.firstChild);
    if (floorIdx === 0) {
      floors.setAttribute("class", "floors-border");
      createLift(liftCount);
    }
  }
  floors.lastChild.children[0].children[1].children[1].setAttribute(
    "style",
    "visibility:hidden"
  );
  floors.firstChild.children[0].children[1].children[0].setAttribute(
    "style",
    "visibility:hidden"
  );
};

const createLift = (liftCount) => {
  const groundFloor = document.getElementById("lifts-container-1");
  for (idx2 = 1; idx2 <= liftCount; idx2++) {
    const lift = document.createElement("div");
    const leftDoor = document.createElement("div");
    const rightDoor = document.createElement("div");

    lift.setAttribute("class", "lift");
    lift.setAttribute("id", "lift-" + idx2);
    leftDoor.setAttribute("class", "leftDoor");
    rightDoor.setAttribute("class", "rightDoor");
    lift.appendChild(leftDoor);
    lift.appendChild(rightDoor);
    groundFloor.appendChild(lift);
    liftData.push({
      id: "lift-" + idx2,
      floor: 1,
      inTransition: false,
    });
  }
};

const creatFloorSkeleton = (id) => {
  const floor = document.createElement("div");
  floor.setAttribute("class", "floor");
  floor.setAttribute("id", id);

  // Floor Details
  const floorDetails = document.createElement("div");
  floorDetails.setAttribute("class", "floorDetails");

  const liftsContainer = document.createElement("div");
  liftsContainer.setAttribute("class", "lifts-container");
  liftsContainer.setAttribute("id", "lifts-container-" + id);

  const floorName = document.createElement("div");
  floorName.innerHTML = "Floor " + id;

  const floorButtons = document.createElement("div");
  floorButtons.setAttribute("class", "floorButtons");

  const upButton = document.createElement("input");
  upButton.setAttribute("type", "button");
  upButton.setAttribute("id", "up");
  upButton.setAttribute("value", "up");
  upButton.setAttribute("onclick", "moveButtonClick(" + id + ")");
  const downButton = document.createElement("input");
  downButton.setAttribute("type", "button");
  downButton.setAttribute("id", "down");
  downButton.setAttribute("value", "down");
  downButton.setAttribute("onclick", "moveButtonClick(" + id + ")");

  floorButtons.appendChild(upButton);
  floorButtons.appendChild(downButton);

  floorDetails.appendChild(floorName);
  floorDetails.appendChild(floorButtons);

  floor.appendChild(floorDetails);
  floor.appendChild(liftsContainer);

  return floor;
};

const openLift = (lift, floorNumber, time) => {
  setTimeout(() => {
    lift.children[0].setAttribute("style", "width:0px");
    lift.children[1].setAttribute("style", "width:0px");
  }, time);
};

const closeLift = (lift, floorNumber, time) => {
  setTimeout(() => {
    lift.children[0].setAttribute("style", "width:30px");
    lift.children[1].setAttribute("style", "width:30px");
    setTimeout(() => {
      liftData.forEach((l) => {
        if (l.id == lift.id) {
          l.floor = floorNumber;
          l.inTransition = false;
        }
      });
      if (requestQueue.length != 0) {
        let requestQueuelift = requestQueue.shift();
        moveButtonClick(requestQueuelift);
      }
    }, 2500);
  }, time + 2500);
};

const moveButtonClick = (floorNumber) => {
  const liftId = calculateLiftMovement(floorNumber);
  const lift = document.getElementById(liftId);
  liftData.forEach((l) => {
    if (l.id == liftId) {
      l.inTransition = true;
    }
  });
  if (lift == undefined) {
    requestQueue.push(floorNumber);
    return null;
  }
  movelift(lift, floorNumber);
};

const movelift = (lift, floorNumber) => {
  let time = 0;
  let diff = 0;
  liftData.forEach((l) => {
    if (l.id == lift.id) {
      diff = Math.abs(l.floor - floorNumber);
      time = diff * 2000;
    }
  });

  lift.setAttribute(
    "style",
    "transform: translateY(-" +
      (floorNumber - 1) * 116 +
      "px); transition: transform " +
      time +
      "ms linear;"
  );
  openLift(lift, floorNumber, time);
  closeLift(lift, floorNumber, time);
};

const calculateLiftMovement = (floorNumber) => {
  liftId = findClosestLift(floorNumber);
  return liftId;
};

const findClosestLift = (floorNumber) => {
  let diff = Infinity;
  let closestLift;
  liftData.forEach((l) => {
    let subtract = floorNumber - l.floor;
    if (diff * diff > subtract * subtract && !l.inTransition) {
      diff = Math.abs(subtract);
      closestLift = l.id;
    }
  });

  return closestLift;
};
