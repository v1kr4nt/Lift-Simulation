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
    document.getElementById("backButton").removeAttribute("hidden");
    document.getElementById("main-box").removeAttribute("hidden");
    createFloor(floorCount, liftCount);
  }
};

const backButtonClick = () => {
  // document.getElementById("backButton").setAttribute("hidden", "hidden");
  // document.getElementById("form-container").style.display = "flex";
  window.location.reload();
};

const createFloor = (floorCount, liftCount) => {
  const numberOfFloors = document.getElementById("floors");
  numberOfFloors.innerHTML = "";
  for (let i = 0; i < floorCount; i++) {
    const innerBox = document.createElement("div");
    innerBox.className = "inner-box";
    if (i === floorCount - 1) {
      for (let j = 0; j < liftCount; j++) {
        const innerInnerBox = document.createElement("div");
        innerInnerBox.className = "inner-inner-box";
        innerBox.appendChild(innerInnerBox);
      }
    }
    numberOfFloors.appendChild(innerBox);
  }
};

const createLift = (liftCount) => {
  const numOfLifts = document.getElementById("lifts");
  numOfLifts.innerHTML = "";
  for (let i = 0; i < liftCount; i++) {
    const leftSide = document.createElement("div");
    leftSide.className = "left-side";
    numOfLifts.appendChild(leftSide);
  }
};
