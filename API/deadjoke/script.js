const getJoke = async () => {
  try {
    const headers = { headers: { Accept: "application/json" } };
    const res = await axios.get("https://icanhazdadjoke.com/", headers);
    return res;
  } catch (e) {
    console.log(e.response.status);
  }
};

const addJoke = async () => {
  const res = await getJoke();
  const joke = res.data.joke;
  document.querySelector(".joke").innerHTML = joke;
};

document.querySelector(".button").addEventListener("click", () => {
  addJoke();
});
