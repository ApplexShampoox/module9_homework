//поиск кнопки и контейнера для вывода изображений и вывод их в константы
const btn = document.querySelector(".button");
const resultNode = document.querySelector(".req-result");

// выведение изображений на страницу
function displayResult(apiData) {
  let cards = "";
  apiData.forEach((item) => {
    localStorage.clear();
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
    localStorage.setItem("cards", cards);
  });
  resultNode.innerHTML = cards;
}
// добавление слушателя событий на кнопку
btn.addEventListener("click", () => {
  const value1 = document.querySelector("#i-1").value;
  const value2 = document.querySelector("#i-2").value;
  if (
    ((value1 < 1 || value1 > 10) && (value2 < 1 || value2 > 10)) ||
    (isNaN(value1) && isNaN(value2))
  ) {
    resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
  } else if (value1 < 1 || value1 > 10 || isNaN(value1)) {
    resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10";
  } else if (value2 < 1 || value2 > 10 || isNaN(value2)) {
    resultNode.innerHTML = "Лимит вне диапазона от 1 до 10";
  } else {
    fetch(` https://picsum.photos/v2/list?page=${value1}&limit=${value1}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayResult(data);
      })
      .catch(() => {
        console.log("error");
      });
  }
});
// добавление слушателя событий на 'перезагрузку страницы'
document.addEventListener("DOMContentLoaded", () => {
  let images = localStorage.getItem("cards");
  if (images) {
    resultNode.innerHTML = images;
  }
});
