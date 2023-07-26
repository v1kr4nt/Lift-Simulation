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
    document.getElementById("floors").removeAttribute("hidden");
  }
};
