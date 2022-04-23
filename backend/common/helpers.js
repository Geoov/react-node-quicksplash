const Color = {
  0: "darkcyan",
  1: "darkkhaki",
  2: "darkred",
  3: "limegreen",
  4: "darkgoldenrod",
  5: "darkviolet",
  6: "darkorange",
  7: "darkgrey",
  8: "blue",
  9: "red",
};

exports.getNextColor = async (currentIndex) => {
  let color = Color[currentIndex];
  console.log(color);
  return color;
};
