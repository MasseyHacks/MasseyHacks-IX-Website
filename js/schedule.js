const colAmt = 32;
const rowAmt = 3;
const eventStartTime = 9;
const lineHeight = "90px";
const scheduleSection = document.querySelector(".timeline-wrapper");

class TimeLineGrid {
  timeCellNodes = [];
  colContainerNodes = [];

  constructor() {
    this.setupColContainer();
    this.generateLabel();
    for (let row = 0; row < rowAmt; row++) {
      for (let col = 0; col < colAmt; col++) {
        const colNode = document.createElement("div");
        colNode.className = "timeline-cell";

        this.colContainerNodes[col].appendChild(colNode);
        this.timeCellNodes[col].push(colNode);
      }
    }
  }

  addFirstCell(row, col, startGap, duration, title, description, colour) {
    const lineNode = document.createElement("div");
    const remainingGap = 1 - startGap - Math.floor(startGap);
    let durationFilled;
    if (duration <= remainingGap) {
      durationFilled = duration;
      lineNode.style.width = `${duration * 100}%`;
    } else {
      durationFilled = remainingGap;
      lineNode.style.width = `${remainingGap * 100}%`;
    }

    lineNode.style.left = `${(startGap - Math.floor(startGap)) * 100}%`;

    lineNode.style.height = lineHeight;
    lineNode.style.backgroundColor = colour;
    lineNode.style.position = "absolute";

    const textSection = document.createElement("div");
    textSection.className = "timeline-text-section";

    const titleNode = document.createElement("h5");
    titleNode.style.color = "#434667";
    titleNode.innerHTML = title;

    const descriptionNode = document.createElement("p");
    descriptionNode.innerHTML = description;
    descriptionNode.style.color = "#434667";

    textSection.appendChild(titleNode);
    textSection.appendChild(descriptionNode);
    lineNode.appendChild(textSection);

    this.timeCellNodes[col - 1][row - 1].appendChild(lineNode);
    return durationFilled;
  }

  setTimeCell(row, col, startGap, duration, title, description, colour) {
    let time = this.addFirstCell(
      row,
      col,
      startGap,
      duration,
      title,
      description,
      colour
    );
    let colCounter = 1;
    while (time + 1 <= Math.floor(duration)) {
      const lineNode = document.createElement("div");
      lineNode.style.width = "100%";
      lineNode.style.height = lineHeight;
      lineNode.style.backgroundColor = colour;
      this.timeCellNodes[col - 1 + colCounter][row - 1].appendChild(lineNode);
      time++;
      colCounter++;
    }

    if (duration - time > 0.001 && time < duration) {
      const lineNode = document.createElement("div");
      lineNode.style.width = `${(duration - time) * 100}%`;
      lineNode.style.height = lineHeight;
      lineNode.style.backgroundColor = colour;
      lineNode.style.position = "relative";
      this.timeCellNodes[col - 1 + colCounter][row - 1].appendChild(lineNode);
    }
  }

  generateLabel() {
    for (let col = 0; col < colAmt; col++) {
      const timeLineLabel = document.createElement("div");
      timeLineLabel.className = "timeline-label";
      timeLineLabel.innerHTML = `${((eventStartTime + col - 1) % 12) + 1}:00 ${
        (eventStartTime + col) % 24 >= 12 ? "PM" : "AM"
      }`;
      this.colContainerNodes[col].appendChild(timeLineLabel);
    }
    rootNode.style.setProperty(
      "--last-timeline-label-content",
      `"${((eventStartTime + colAmt - 1) % 12) + 1}:00 ${
        (eventStartTime + colAmt) % 24 >= 12 ? "PM" : "AM"
      }"`
    );
  }

  setupColContainer() {
    for (let col = 0; col < colAmt; col++) {
      this.timeCellNodes.push([]);
      const colContainerNode = document.createElement("div");
      colContainerNode.className = "timeline-col-container";
      scheduleSection.appendChild(colContainerNode);
      this.colContainerNodes.push(colContainerNode);
    }
  }
}

const initTimeLine = (timeLine) => {
  timeLine.setTimeCell(
    1,
    1,
    0,
    1,
    "Check In (IP)",
    "9:00AM - 10:00AM | Front Desk",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    1,
    2,
    0.5,
    0.5,
    "Opening Ceremonies",
    "10:30AM - 11:00AM | North Gym",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    1,
    5,
    0.5,
    1,
    "Computer Vision",
    "1:30PM - 2:30PM | Room 103",
    "#ABFF80"
  );
  timeLine.setTimeCell(
    1,
    6,
    0.75,
    1,
    "React.js Workshop",
    "2:45PM - 3:45PM | Room 102",
    "#ABFF80"
  );
  timeLine.setTimeCell(
    1,
    9,
    0,
    0.75,
    "!Light (IP)",
    "5:00PM - 5:45PM | Cafeteria",
    "#9BA3FF"
  );
  timeLine.setTimeCell(
    1,
    11,
    0.5,
    0.75,
    "Cup Stacking (IP)",
    "7:30PM - 8:15PM | Cafeteria",
    "#9BA3FF"
  );
  timeLine.setTimeCell(
    1,
    12,
    0.5,
    0.5,
    "Check-Out (IP)",
    "8:30PM - 9:00PM | Front Desk",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    1,
    24,
    0,
    1,
    "Check-In (IP)",
    "8:00AM - 9:00AM | Front Desk",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    1,
    27,
    0.75,
    0.1,
    "Late Submission Deadline",
    "11:45AM",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    1,
    32,
    0.5,
    0.5,
    "Closing Ceremonies",
    "4:30PM - 5:00PM | North Gym",
    "#9EF1EB"
  );

  timeLine.setTimeCell(
    2,
    1,
    0,
    1.25,
    "Breakfast Snacks (IP)",
    "9:00AM - 10:15AM | Cafeteria",
    "#FFA4D5"
  );
  timeLine.setTimeCell(2, 3, 0, 0.1, "Hacking Starts", "11:00AM", "#9EF1EB");
  timeLine.setTimeCell(
    2,
    4,
    0,
    1.5,
    "Lunch (IP)",
    "12:00PM - 1:30PM | Cafeteria",
    "#FFA4D5"
  );
  timeLine.setTimeCell(
    2,
    5,
    0.75,
    1,
    "Intro to Python I",
    "1:45PM - 2:45PM | Room 149",
    "#ABFF80"
  );
  timeLine.setTimeCell(
    2,
    7,
    0,
    1,
    "Intro to Python II",
    "3:00PM - 4:00PM | Room 149",
    "#ABFF80"
  );
  timeLine.setTimeCell(
    2,
    8,
    0.25,
    1,
    "Github",
    "4:15PM - 5:15PM | Room 103",
    "#ABFF80"
  );
  timeLine.setTimeCell(
    2,
    10,
    0,
    1.5,
    "Dinner (IP)",
    "6:00PM - 7:30PM | Cafeteria",
    "#FFA4D5"
  );
  timeLine.setTimeCell(
    2,
    14,
    0.5,
    8.5,
    "Hackenger Hunt 2",
    "10:30PM - 7:00AM | Online",
    "#9BA3FF"
  );
  timeLine.setTimeCell(
    2,
    24,
    0.5,
    1,
    "Breakfast (IP)",
    "8:30AM - 9:30AM | Cafeteria",
    "#FFA4D5"
  );
  timeLine.setTimeCell(
    2,
    27,
    0,
    0.1,
    "Devpost Deadline",
    "11:00 AM",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    2,
    28,
    0.5,
    1.5,
    "Lunch (IP)",
    "12:30PM - 2:00PM | Cafeteria",
    "#FFA4D5"
  );

  timeLine.setTimeCell(
    3,
    1,
    0,
    2.5,
    "Team Formation",
    "9:00AM - 11:30AM",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    3,
    6,
    0,
    4,
    "Hackenger Hunt 1",
    "2:00PM - 6:00PM | Online",
    "#9BA3FF"
  );
  timeLine.setTimeCell(
    3,
    14,
    0.5,
    1,
    "Skribbl.io",
    "10:30PM - 11:30PM | Discord",
    "#9BA3FF"
  );
  timeLine.setTimeCell(
    3,
    16,
    0,
    1,
    "Escape Room",
    "12:00AM - 1:00AM | Discord",
    "#9BA3FF"
  );
  timeLine.setTimeCell(
    3,
    17,
    0.5,
    1,
    "Speaking Points",
    "1:30AM - 2:30AM | Discord",
    "#9BA3FF"
  );
  timeLine.setTimeCell(
    3,
    28,
    0,
    0.1,
    "Final Submission Deadline",
    "12:00PM | Devpost",
    "#9EF1EB"
  );
  timeLine.setTimeCell(
    3,
    30,
    0,
    2,
    "Judging",
    "2:00PM - 4:00PM | Cafeteria",
    "#9EF1EB"
  );
};

window.onload = () => {
  const timeLine = new TimeLineGrid();
  initTimeLine(timeLine);
};
