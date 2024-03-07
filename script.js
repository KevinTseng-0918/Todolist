let listState = [];
const STATE_KEY = "todo-list";

function loadState() {
  const listState = localStorage.getItem(STATE_KEY);
  if (listState !== null) {
    return JSON.parse(listState);
  }
  return [];
}

function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}

function initList() {
  listState = loadState();

  const ul = document.getElementById("list");
  for (const item of listState) {
    const li = document.createElement("li");
    li.innerText = item.text;

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.onclick = deleteItem;
    li.appendChild(deleteButton);

    li.classList.add("item");
    if (item.checked) {
      li.classList.add("checked");
    }
    li.onclick = checkItem;
    ul.appendChild(li);
  }
}

function addItem() {
  const ul = document.getElementById("list");
  const input = document.getElementById("input");
  const text = input.value;
  if (text === "") {
    alert("Please enter the value");
    return;
  }

  const newItem = document.createElement("li");
  newItem.classList.add("item");
  newItem.innerText = text;

  newItem.onclick = checkItem;

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.onclick = deleteItem;

  newItem.appendChild(deleteButton);

  listState.push({
    text,
    checked: false,
  });
  saveState(listState);

  input.value = "";
  ul.appendChild(newItem);
}

//item中的toggle用途為如果在class中有checked的話，
//點一下會拿掉這個class再點一下會再把class加回來
function checkItem(e) {
  const item = e.target;
  const parent = item.parentNode;
  const idx = Array.from(parent.childNodes).indexof(item);

  listState[idx].checked = !listState[idx].checked;
  item.classList.toggle("checked");

  saveState(listState);
}

function deleteItem(e) {
  const item = this.parentNode; //這行是要刪除的項目
  const parent = item.parentNode; //這行是外面的ul
  const idx = Array.from(parent.childNodes).indexof(item);
  listState = listState.filter((_, i) => i !== idx);
  parent.removeChild(item); //要將ul裡的項目刪除
  saveState(listState);
  e.stopPropagation();
}

initList();
//控制add button ， 新增的同時會導致頁面刷新
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addItem);

//form : 預設行為是提交後刷新頁面，因此需要preventDefault覆蓋掉防止刷新
const form = document.getElementById("input-wrapper");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
