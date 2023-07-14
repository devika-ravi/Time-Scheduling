var data = [
  { start: 0, duration: 15, title: "Exercise" },
  { start: 25, duration: 30, title: "Travel to work" },
  { start: 30, duration: 30, title: "Plan day" },
  { start: 60, duration: 15, title: "Review yesterday's commits" },
  { start: 100, duration: 15, title: "Code review" },
  { start: 180, duration: 90, title: "Have lunch with John" },
  { start: 360, duration: 30, title: "Skype call" },
  { start: 370, duration: 45, title: "Follow up with designer" },
  { start: 400, duration: 30, title: "Push up branch" }
];

let mainContainer = document.querySelector(".main");

let timeSection = document.createElement("div");
timeSection.classList.add("timeSectionStyle");

let firstPart = document.createElement("div");
firstPart.classList.add("firstPartStyle", "d-flex");

let timeContent = document.createElement("div");
timeContent.classList.add("timeContentStyle");

firstPart.appendChild(timeContent);
timeSection.appendChild(firstPart);
mainContainer.appendChild(timeSection);

// main > timeSection > firstPart > timeContent

let timeStartHour = 60 * 8; //480
let timeStartHalfHour = ((60 * 8) + 30);  //510

//Loop for 8am-6pm
for (let i = 0; i <= 10; i++) {
  let currentTopHour = ((i * 120) + 60);
  let currentTopHalfHour = ((i * 120) + 120);

  //Hour Divisions (8:00, 9:00, ......)

  let hour = Math.floor ((timeStartHour + i * 60) / 60);

  if (hour > 12) {
    hour = hour - 12;
  }

  let minute = ((timeStartHour + i * 60) % 60);

  let hourElement = document.createElement("span");
  hourElement.classList.add("timeLabelHour");
  hourElement.style.left = "140px";
  hourElement.style.top = currentTopHour + "px";
  hourElement.textContent = hour + ":" + minute + "0";
  firstPart.appendChild(hourElement);

  //Half Hour Divisions (8:30, 9:30, ......)

  let minuteOfHalfHour = ((timeStartHalfHour + i * 60) % 60);

  let halfHourElement = document.createElement ("span");
  halfHourElement.classList.add("timeLabelHalfHour");
  halfHourElement.style.left = "140px";
  halfHourElement.style.top = currentTopHalfHour + "px";
  halfHourElement.textContent = hour + ":" + minuteOfHalfHour;
  firstPart.appendChild(halfHourElement);

  // Hour Separator (Horizontal line (<hr>))
  let currentHrTagTop = ((i * 120) + 60) - 5;

  let hrElement = document.createElement("hr");
  hrElement.classList.add("horizontalHourSeparator");
  hrElement.style.top = currentHrTagTop + "px";
  timeSection.appendChild(hrElement);
  
}

// Code for checking overlapping events
for (let i = 0 ; i < data.length; i++) {
  
  console.log ("i = " + i)

  // Since there are no previous events to compare with skip i = 0.
  if (i > 0) {

    // To compare the current event with all the previous events.
    for (let j = 0; j < i; j++) {
      
      console.log ("j = " + j)

      let currentEventStart = data[i].start;
      
      let isOverlapping = currentEventStart - (data[j].start + data[j].duration);

      console.log ("isOverlapping at i " + i + " & j " + j + "=" + isOverlapping)

      if (isOverlapping < 0) {
        data[i].overlapped = "moveLeft"; 

        if (data[j].overlapped === "moveLeft") {
          data[i].overlapped = "moveRight"; 
          break; 
        }

        data[j].overlapped = "moveRight"; //The overlapped property of the event at index j is set to "moveRight"
        
      }
    }
  }    
}

for (let i = 0; i < data.length; i++) {

  // alert (data[i].overlapped)
  
  let currentEventAtTop = data[i].start * 2;
  let currentEventHeight = (data[i].duration * 2) + "px";
  let addTitleBlock;
  
  if (data[i].overlapped === "moveRight") {
    addTitleBlock = `<div class="titleBlockStyle" style="height:${currentEventHeight}; width:46%;top:${currentEventAtTop}px; left:46%">${data[i].title}<div>`;
  } else if (data[i].overlapped === "moveLeft"){
    addTitleBlock = `<div class="titleBlockStyle" style="height:${currentEventHeight}; width:46%; top:${currentEventAtTop}px">${data[i].title}</div>`
  } else {
    addTitleBlock = `<div class="titleBlockStyle" style="height:${currentEventHeight}; width:92%; top:${currentEventAtTop}px">${data[i].title}</div>`
  }

  timeContent.insertAdjacentHTML("beforeend", addTitleBlock);

}