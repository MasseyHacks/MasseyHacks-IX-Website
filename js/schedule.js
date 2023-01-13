const colAmt = 34;
const rowAmt = 4;
const eventStartTime = 9;
const lineHeight = "90px";
const scheduleSection = document.querySelector(".timeline-wrapper");
var evcln = 1;

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

        const divvy = document.createElement("div");
        divvy.className = "divvy";

        this.colContainerNodes[col].appendChild(colNode);
        this.colContainerNodes[col].appendChild(divvy);
        this.timeCellNodes[col].push(colNode);

        if(row==rowAmt-1&&col==colAmt-1){
          const d = document.createElement("div");
          d.className = "divvy";
          d.style.marginLeft = "calc(50% - 2px)";
          this.colContainerNodes[col].appendChild(d);
        }
      }
    }
  }

  addFirstCell(row, col, startGap, duration, title, description, colour, info) {
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
    lineNode.style.boxShadow = "0 3px 10px -8px rgb(0 0 0 / 0.3)";
    if (remainingGap == 1) {
      lineNode.style.marginLeft = "2px";
    }
    if (startGap == 0 && duration % 1 == 0) {
      lineNode.style.width = `calc(${lineNode.style.width} - 2px)`;
    }
    if (startGap == 0 && duration % 1 == 0.5) {
      lineNode.style.width = `calc(${lineNode.style.width} - 4px)`;
    }

    lineNode.onclick = function () {
      document.querySelectorAll("#myPopup").forEach(function (e) {
        e.classList.remove("show");
      });
      var popup = lineNode.querySelector("#myPopup");
      popup.classList.toggle("show");
    };
    lineNode.classList.add("popup");
    lineNode.classList.add("evcl");
    lineNode.setAttribute("data-evcl", ++evcln);

    const textSection = document.createElement("div");
    textSection.className = "timeline-text-section";

    const titleNode = document.createElement("h5");
    titleNode.style.color = "#434667";
    titleNode.innerHTML = title;

    const descriptionNode = document.createElement("p");
    const [a, b] = description.split(" | ");
    descriptionNode.innerHTML = a;
    descriptionNode.style.color = "#434667";
    const descriptionNode2 = document.createElement("p");
    descriptionNode2.innerHTML = b;
    descriptionNode2.style.color = "#434667";

    const infoNode = document.createElement("span");
    infoNode.id = "myPopup";
    infoNode.className = "popuptext";
    if(row==1||row==2){
      infoNode.style.bottom = "unset";
      infoNode.style.top = "0";
    }

    const infoDesc = document.createElement("p");
    infoDesc.innerHTML = info;

    const infoTitle = document.createElement("h2");
    infoTitle.innerHTML = title;

    const moreInfo = document.createElement("p");
    moreInfo.innerHTML = description;

    infoNode.appendChild(infoTitle);
    infoNode.appendChild(moreInfo);
    infoNode.appendChild(infoDesc);

    textSection.appendChild(titleNode);
    textSection.appendChild(descriptionNode);
    textSection.appendChild(descriptionNode2);

    lineNode.appendChild(textSection);
    lineNode.appendChild(infoNode);

    this.timeCellNodes[col - 1][row - 1].appendChild(lineNode);
    return [durationFilled, lineNode.querySelector("#myPopup")];
  }

  setTimeCell(row, col, startGap, duration, title, description, colour, info) {
    let f = this.addFirstCell(
      row,
      col,
      startGap,
      duration,
      title,
      description,
      colour,
      info
    );
    let time = f[0];
    let el = f[1];
    let colCounter = 1;
    while (time + 2 <= Math.floor(duration)) {
      const lineNode = document.createElement("div");
      lineNode.style.width = "100%";
      lineNode.style.height = lineHeight;
      lineNode.style.backgroundColor = colour;
      lineNode.classList.add("evcl");
      lineNode.setAttribute("data-evcl", evcln);
      lineNode.onclick = function () {
        document.querySelectorAll("#myPopup").forEach(function (e) {
          e.classList.remove("show");
        });
        el.classList.toggle("show");
      };
      this.timeCellNodes[col - 1 + colCounter][row - 1].appendChild(lineNode);
      time++;
      colCounter++;
    }

    // if there is a remainder at the end
    if (duration - time > 0.001 && time < duration) {
      const lineNode = document.createElement("div");
      lineNode.style.width = `${(duration - time) * 100 + 10}%`;
      lineNode.style.marginLeft = "-30px";
      lineNode.style.height = lineHeight;
      lineNode.style.backgroundColor = colour;
      lineNode.classList.add("evcl");
      lineNode.setAttribute("data-evcl", evcln);
      lineNode.onclick = function () {
        document.querySelectorAll("#myPopup").forEach(function (e) {
          e.classList.remove("show");
        });
        el.classList.toggle("show");
      };

      lineNode.style.boxShadow = "0 3px 10px -8px rgb(0 0 0 / 0.3)";
      lineNode.style.borderRadius = "10px";
      lineNode.style.position = "relative";
      if ((startGap + duration) % 1 != 0) {
        lineNode.style.width = `calc(${lineNode.style.width} - 4px)`;
      }
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
    4,
    1,
    0,
    1,
    "Check-In",
    "9:00AM - 10:00AM | Front Desk",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    1,
    2,
    0.5,
    0.75,
    "Opening Ceremonies",
    "10:30AM - 11:15AM | North Gym",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    1,
    3,
    0.75,
    1,
    "Workshop 1",
    "11:45AM - 12:45PM | Room 103",
    "#ABFF80",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    1,
    6,
    0.5,
    1,
    "Workshop 2",
    "2:30PM - 3:30PM | Room 102",
    "#ABFF80",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    1,
    11,
    0.5,
    1,
    "Activity 1",
    "7:30PM - 8:30PM | Cafeteria",
    "#9BA3FF",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    1,
    13,
    0,
    1,
    "Activity 2",
    "9:00PM - 10:00PM | Cafeteria",
    "#9BA3FF",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    1,
    14,
    0,
    0.5,
    "Check-Out",
    "10:00PM - 10:30PM | Front Desk",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    2,
    33,
    0,
    0.5,
    "Check-Out",
    "5:00PM - 5:30PM | Front Desk",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    1,
    24,
    0,
    1,
    "Check-In",
    "8:00AM - 9:00AM | Front Desk",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );

  timeLine.setTimeCell(
    1,
    32,
    0.5,
    0.5,
    "Closing Ceremonies",
    "4:30PM - 5:00PM | North Gym",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );

  timeLine.setTimeCell(
    2,
    1,
    0,
    1.25,
    "Breakfast Snacks",
    "9:00AM - 10:15AM | Cafeteria",
    "#FFA4D5",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    2,
    5,
    0,
    1.25,
    "Lunch",
    "1:00PM - 2:15PM | Cafeteria",
    "#FFA4D5",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    2,
    3,
    0.75,
    1,
    "Intro to Python I",
    "11:45AM - 12:45PM | Room 149",
    "#ABFF80",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    2,
    6,
    0.5,
    1,
    "Intro to Python II",
    "2:30PM - 3:30PM | Room 149",
    "#ABFF80",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    2,
    9,
    0,
    1,
    "Workshop 3",
    "5:00PM - 6:00PM | Room 103",
    "#ABFF80",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    2,
    10,
    0.25,
    1.25,
    "Dinner",
    "6:15PM - 7:30PM | Cafeteria",
    "#FFA4D5",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );

  timeLine.setTimeCell(
    2,
    24,
    0.5,
    1,
    "Breakfast",
    "8:30AM - 9:30AM | Cafeteria",
    "#FFA4D5",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );

  timeLine.setTimeCell(
    2,
    28,
    0.5,
    1.5,
    "Lunch",
    "12:30PM - 2:00PM | Cafeteria",
    "#FFA4D5",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );

  timeLine.setTimeCell(
    3,
    3,
    0,
    0.5,
    "Team Formation",
    "11:00AM - 11:30AM | North Gym",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    3,
    7,
    0.5,
    1.5,
    "Hackenger Hunt 1",
    "3:30PM - 5:00PM | Online",
    "#9BA3FF",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
  timeLine.setTimeCell(
    3,
    32,
    0,
    0.5,
    "Activity 3",
    "4:00PM - 4:30PM | Discord",
    "#9BA3FF",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );

  timeLine.setTimeCell(
    3,
    30,
    0,
    2,
    "Judging",
    "2:00PM - 4:00PM | Cafeteria",
    "#9EF1EB",
    "In this workshop, we’ll walk you through getting started with CockroachDB Serverless and provide an introduction to SQL and ORMs. Then you’ll learn from one of our many Waterloo alums how to build a RESTful API using Python. This workshop will be hands on, so bring your laptops. You’ll leave with a working API powered by CockroachDB Serverless! "
  );
};

window.onload = () => {
  const timeLine = new TimeLineGrid();
  initTimeLine(timeLine);

  var prev = undefined;
  document.body.addEventListener("click", function (e) {
    if (!e.target.classList.contains("evcl")) {
      var f = document.querySelector(".popuptext.show");
      if (f) {
        f.classList.remove("show");
      }
      prev = undefined;
    } else {
      if (prev)
        console.log(
          prev.getAttribute("data-evcl"),
          e.target.getAttribute("data-evcl")
        );
      if (
        prev &&
        prev.getAttribute("data-evcl") == e.target.getAttribute("data-evcl") &&
        document.querySelector(".popuptext.show")
      ) {
        document.querySelector(".popuptext.show").classList.remove("show");
        prev = undefined;
      } else {
        prev = e.target;
      }
    }
  });
};
