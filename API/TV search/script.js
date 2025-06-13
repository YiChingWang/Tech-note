//form 要用preventsubmit
const form = document.querySelector(".form");
let keyword = "";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("SUBMIT!!!");
  console.log(form.elements.query.value);
  keyword = form.elements.query.value;
  showMovieList();
});

//api
//axios最原始的寫法
// axios
//   .get(`https://api.tvmaze.com/search/people?q=${keyword}`)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((e) => {
//     console.log("error: ", e);
//   });

//把axios寫成async function
const getMovieList = async () => {
  try {
    return await axios.get(`https://api.tvmaze.com/search/shows?q=${keyword}`);
  } catch (e) {
    console.log("Error: ", e.response.status);
  }
};

//把DOM操作變成一個分開的function，看起來比較clear
const movielist = document.querySelector(".movielist");
const showMovieList = async () => {
  const res = await getMovieList();
  const data = res.data;
  console.log(res.data);
  data.forEach((movie) => {
    //一定要記得清空不然新的資料會跑不出來
    // movielist.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <h2 class="card_name">Movie name : ${movie.show.name}</h2>
    <p class="card_time">Run Time : ${movie.show.runtime}</p>
    <p class="card_score">Score : ${movie.score}</p>
    <img class="card_img" src="${movie.show.image?.medium || ""}">
    `;
    movielist.appendChild(div);
  });
};
