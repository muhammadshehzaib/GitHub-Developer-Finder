document.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    // Fetch data from the API
    const username = document.getElementById("default_search").value;

    const response = await fetch(`https://api.github.com/users/${username}`);
    console.log(username);
    const data = await response.json();

    console.log(data);
    const dateStringFromAPI = data.created_at;
    const dateObject = new Date(dateStringFromAPI);

    // Options for formatting the date
    const options = { year: "numeric", month: "long", day: "numeric" };

    // Format the date using toLocaleDateString
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    console.log(formattedDate); // Output: December 9, 2010

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = `<div class="bg-[#FEFEFE] mt-10 max-w-[90%] mx-auto p-4 flex rounded-2xl">
      <div class="text w-full">
        <div class="top-text flex">
          <div class="img h-full mr-4 max-w-[20%]">
            <img src=${data.avatar_url} class="rounded-full" alt=""  />
          </div>

          <div class="md:flex-row w-full m-auto">
          <div class="md:flex justify-between">
            <h2 class="font-semibold color-[#2C3543]">${
              data.name === null ? username : data.name
            }</h2>
            <p class="text-xs text-[#8F91A0] mt-1">
            Joined ${formattedDate}
          </p>
        </div>
            <div class="">
            <p class="text-xs text-[#0079FF] mb-1 mt-1">${data.login}</p>
            <p class="text-sm text-[#BEC9DB] mt-2">${data.bio}</p>
          </div>
            </div>
        </div>

        <div
          class="middle-text flex justify-between mt-4 bg-[#F6F8FF] p-4 md:max-w-[80%] md:mx-auto md:ml-36"
        >
          <div>
            <p class="text-[#6374A5] text-sm">Repos</p>
            <p class="font-semibold">${data.public_repos}</p>
          </div>
          <div>
            <p class="text-[#6374A5] text-sm">Followers</p>
            <p class="font-semibold">${data.followers}</p>
          </div>
          <div>
            <p class="text-[#6374A5] text-sm">Following</p>
            <p class="font-semibold">${data.following}</p>
          </div>
        </div>

        <div class="bottom-text mt-6 md:max-w-[75%] md:mx-auto md:ml-36">
          <ul class=" grid md:grid-cols-2 md:grid-rows-2 md:gap-x-64 gap-y-5">
            <li class="flex mt-3">
              <img
                src="./images/location-pin-alt-1-svgrepo-com.svg"
                alt=""
                class="mr-2"
              />
              <p class="text-sm text-[#4B6A9B]">${data.location}</p>
            </li>
            <li class="flex mt-3">
              <img
                src="./images/twitter-154-svgrepo-com.svg"
                alt=""
                class="mr-2"
              />
              <p class="text-sm text-[#AEBCD2]">${data.twitter_username}</p>
            </li>
        
        
            <li class="flex items-center">
              <img
                src="./images/chain-svgrepo-com.svg"
                alt=""
                class="mr-2"
              />
              <p class="text-sm text-[#4B6A9B]">${data.html_url}</p>
            </li>
            <li class="flex mt-2 md:mt-0 items-center">
              <img
                src="./images/building-svgrepo-com.svg"
                alt=""
                class="mr-2"
              />
              <p class="text-sm text-[#4B6A9B]">${data.company}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>`;
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

//Icons
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
const dark = document.querySelector(".dark-mode-text");
const light = document.querySelector(".light-mode-text");

//Theme Vars
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;

//Icon toggling
const iconToggle = () => {
  moonIcon.classList.toggle("display-none");
  sunIcon.classList.toggle("display-none");
  dark.classList.toggle("display-none");
  light.classList.toggle("display-none");
};

//Initial Theme Check
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("display-none");
    dark.classList.toggle("display-none");

    return;
  }
  sunIcon.classList.add("display-none");
  light.classList.toggle("display-none");
};

//Manual Theme Switch

const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};

//call theme switch on clicking buttons

//invoke theme check on initial load
themeCheck();

sunIcon.addEventListener("click", () => {
  themeSwitch();
});
moonIcon.addEventListener("click", () => {
  themeSwitch();
});
