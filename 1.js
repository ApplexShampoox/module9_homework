//получаем XML, который нужно обработать
const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;
//создаем парсер и передаем ему XML
const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
//получаем всех студентов
const studentsNode = xmlDOM.querySelectorAll("student");
//создаем заготовку для JS объекта
let result = {
  list: [],
};
//перебираем всех студентов
studentsNode.forEach((student) => {
  const nameNode = student.querySelector("name");
  const firstNameNode = student.querySelector("first");
  const secondNameNode = student.querySelector("second");
  const ageNode = student.querySelector("age");
  const profNode = student.querySelector("prof");
  const langAttr = nameNode.getAttribute("lang");
  //создаем объект для каждого студента
  let arr = {
    name: `${firstNameNode.textContent} ${secondNameNode.textContent}`,
    age: ageNode.textContent,
    prof: profNode.textContent,
    lang: langAttr,
  };
  //добавляем объект в массив
  result.list.push(arr);
});
//выводим в консоль
console.log(result);
