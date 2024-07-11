export class GameDetails {
  constructor(gameId) {
    // this.gameId = gameId;
    const gameDetails = document.querySelector("#gameDetails");
    const gameSection = document.querySelector("#gameSecion");
    const btnClose = document.querySelector(".btn-close");
    const gameContainer = document.querySelector("#gameDetails .container");

    gameSection.classList.add("hidden");
    gameDetails.classList.remove("hidden");
    btnClose.addEventListener("click", () => {
      gameSection.classList.remove("hidden");
      gameDetails.classList.add("hidden");

      const existingDetails = gameContainer.querySelector(".grid");
      if (existingDetails) {
        existingDetails.remove();
      }
    });

    document.querySelector(".spinner").classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    this.getGameDetail(gameId);
  }

  async getGameDetail(id) {
    const baseURL = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
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

  displayData(game) {
    const gameContainer = document.querySelector("#gameDetails .container");
    let html = "";

    html += `
      <div class="grid grid-cols-1 gap-5 md:grid-cols-[30%_minmax(0,1fr)]">
            <div>
              <img class="w-full" src="${game.thumbnail}" alt="${game.title}" />
            </div>
            <div>
              <h2>Title: ${game.title}</h2>
              <ul class="flex flex-col justify-between gap-4">
                <li>
                  categry:
                  <span
                    class="rounded-full bg-slate-700 text-white px-2 py-1 text-xs"
                    >${game.genre}</span
                  >
                </li>
                <li>
                  Platform:
                  <span
                    class="rounded-full bg-slate-700 text-white px-2 py-1 text-xs"
                    >${game.platform}</span
                  >
                </li>
                <li>
                  Status:
                  <span
                    class="rounded-full bg-slate-700 text-white px-2 py-1 text-xs"
                    >${game.status}</span
                  >
                </li>
              </ul>

              <div class="mt-5">
                <p class="decoration">${game.description}</p>
              </div>
              <div class="mt-5">
                <button
                  class="border rounded-full border-yellow-500 py-2 px-3 transition duration-300 hover:bg-yellow-500 hover:text-black"
                >
                  <a href="${game.game_url}" target="_blank">Show Game</a>
                </button>
              </div>
            </div>
          </div>
    `;
    gameContainer.querySelector(".head").insertAdjacentHTML("afterend", html);
  }
}
