//поиск кнопки и контейнера для вывода изображений и вывод их в константы
const btn = document.querySelector(".button");
const resultNode = document.querySelector(".req-result");
//создание XHR запроса
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };
  xhr.send();
}
// выведение изображений на страницу
function displayResult(apiData) {
  let cards = "";
  apiData.forEach((item) => {
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
  });
  resultNode.innerHTML = cards;
}
// добавление слушателя событий на кнопку
btn.addEventListener("click", () => {
  const value = document.querySelector(".input").value;
  if (value < 1 || value > 10 || isNaN(value)) {
    alert("Число вне диапазона от 1 до 10");
  } else {
    useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
  }
});
