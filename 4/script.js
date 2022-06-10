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
      const result = xhr.response;
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
  resultNode.innerHTML = apiData;
}
// добавление слушателя событий на кнопку
btn.addEventListener("click", () => {
  const value1 = document.querySelector("#i-1").value;
  const value2 = document.querySelector("#i-2").value;
  if (
    value1 < 100 ||
    value1 > 300 ||
    value2 < 100 ||
    value2 > 300 ||
    isNaN(value1) ||
    isNaN(value2)
  ) {
    alert("Число вне диапазона от 100 до 300");
  } else {
    fetch(` https://picsum.photos/${value1}/${value2}`)
      .then((response) => {
        return response;
      })
      .then((data) => {
        const cardBlock = `
      <div class="card">
        <img
          src="${data.url}"
          class="card-image"
        />
      </div>
    `;
        resultNode.innerHTML = cardBlock;
      })
      .catch(() => {
        console.log("error");
      });
  }
});
