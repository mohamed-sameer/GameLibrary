import { GameDetails } from "./gameDetails.module.js";

export class GameUI {
  constructor() {
    this.getGames();
    this.changeCategory();
    const gameDetails = document.querySelector("#gameDetails");
    gameDetails.classList.add("hidden");
    document.addEventListener("scroll", function () {
      const navbar = document.querySelector("#navbar").closest(".container");
      let scrollDistance = Math.abs(document.body.getBoundingClientRect().top);

      scrollDistance >= navbar.getBoundingClientRect().bottom
        ? navbar.classList.add("nav-fixed")
        : navbar.classList.remove("nav-fixed");
    });
    this.showDetails();
  }

  changeCategory() {
    const navbar = document.querySelector("#navbar");
    navbar.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "li") {
        const categoryText = e.target.innerText;
        this.getGames(categoryText);
        navbar.querySelectorAll("li").forEach((el) => {
          el.classList.remove("active");
        });
        e.target.classList.add("active");
      }
    });
  }

  async getGames(category = "mmorpg") {
    const baseURL = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(baseURL, options);
      const data = await response.json();
      this.displayData(data);
      document.querySelector(".spinner").classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    } catch (error) {
      console.log(error);
    }
  }

  displayData(dataArr) {
    const gameCards = document.querySelector("#gameCards");
    let html = "";
    for (const item of dataArr) {
      // console.log(item);
      html += `
      <div class="border border-gray-900 text-white m-3 cursor-pointer flex flex-col justify-between " data-game-id=${item.id}>
      <div class="p-3">
              <div class="">
                <div class="mb-5">
                  <img class="w-full" src="${item.thumbnail}" alt="" />
                </div>
                <div class="flex justify-between items-center mb-5">
                  <h2>${item.title}</h2>
                  <p class="bg-[#3A497B] text-white py-1 px-4 rounded-full">
                    free
                  </p>
                </div>
                <p class="break-words text-center text-sm">
                  ${item.short_description}
                </p>
              </div>
              
            </div>
            <div class="py-2 px-3 flex justify-between items-center border-t-[1px] border-gray-900 ">
                <p
                  class="rounded-full bg-slate-700 text-white px-2 py-1 text-xs"
                >
                  ${item.genre}
                </p>
                <p
                  class="rounded-full bg-slate-700 text-white px-2 py-1 text-xs"
                >
                  ${item.platform}
                </p>
              </div>
            </div>
      `;
    }
    gameCards.innerHTML = html;
  }

  showDetails() {
    const gameCards = document.querySelector("#gameCards");
    gameCards.addEventListener("click", (e) => {
      const gameCard = e.target.closest("[data-game-id]");
      if (gameCard) {
        const gameId = gameCard.getAttribute("data-game-id");
        const gameDetails = new GameDetails(gameId);
      }
    });
  }
}
