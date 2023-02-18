const listContent = document.querySelector(".list-content");
const regions = document.getElementById("regions");

// ========================
//     Namaz times
// ========================

// const regions = [
//   'Tashkent',
//   'Xiva'
// ]
regions.addEventListener("change", (e) => {
  displayDaily(regions.value);
});

// todays namaz
const toDaysNamaz = async (region) => {
  const toDays = await fetch(
    `https://islomapi.uz/api/present/day?region=${region}`
  );
  const dayJson = await toDays.json();

  return dayJson;
};

// weekly namaz

const weeklyNamaz = async () => {
  const weekly = await fetch(
    "https://islomapi.uz/api/present/week?region=Toshkent"
  );
  const json = await weekly.json();

  return json;
};

// display daily

const displayDaily = async (region) => {
  let li = "";
  const dayData = await toDaysNamaz(region);
  const dayDateTime = dayData.times;
  console.log(dayData);

  li += `
  <li class="region-box">
            <span>Joyi: </span> <span class="location">${dayData.region}</span>
          </li>
          <li class="weekday-box">
            <span class="when">Hafta kuni:</span>
            <span class="when">${dayData.weekday}</span>
          </li>
          <li class="today-box">
            <span class="today">Bugungi sana:</span>
            <span class="todayTime">${dayData.date}</span>
          </li>
          <li class="namozTime-box">
            <ul class="namozTime">
              <li class="break-line"></li>
              <li class="bomdot"><span>Bomdot</span> <span>${dayDateTime.tong_saharlik}</span></li>
              <li class="peshin"><span>Peshin</span> <span>${dayDateTime.peshin}</span></li>
              <li class="asir"><span>Asir</span> <span> ${dayDateTime.asr}</span></li>
              <li class="shom"><span>Shom</span> <span> ${dayDateTime.shom_iftor}</span></li>
              <li class="hufton"><span>Hufton</span> <span>${dayDateTime.hufton}</span></li>
              
            </ul>
          </li>
  
  
  `;

  listContent.innerHTML = li;
};

// display weekly

const displayWeekly = async () => {
  let li = "";
  const weekData = await weeklyNamaz();
  weekData.forEach((item) => {
    // console.log(item.weekday);
    // li += `
    //         <li>${item.weekday}</li>
    //     `;
  });
  // weekly.innerHTML = li;
  // console.log(data.weekday);
};

document.onload = (() => {
  displayDaily("Toshkent");
  displayWeekly();
})();

// display monthly;
