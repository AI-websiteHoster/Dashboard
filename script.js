document.getElementById("input-btn").addEventListener("click",inputBtnClick);
document.getElementById("delete-btn").addEventListener("dblclick",deleteBtnClick);
document.getElementById("tab-btn").addEventListener("click",saveCurrentTab);
const input = document.getElementById("input-el");
const ULEL = document.getElementById("ul-el");
var listArray = []

//save results
let listFromLocalStorage = JSON.parse( localStorage.getItem("listArray"))

if ( listFromLocalStorage ){
  listArray = listFromLocalStorage
  renderArray(listArray)
}
console.log(listFromLocalStorage)
console.log(listArray)


input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("input-btn").click();
    }
  });

function inputBtnClick(){
  if(input.value != "" && listArray.length < 7){
      listArray.push(input.value)
      //once new value is inputted, updates ul-container
      updateUlContainer()
      console.log(listArray)
      //reset input box
      input.value = "";
      //local storage
      localStorage.setItem("listArray", JSON.stringify(listArray))
      renderArray(listArray)
  }else{
    console.log("limit reached / empty input")
  }
}

function deleteBtnClick(){
    localStorage.clear();
    location.reload();
}

function saveCurrentTab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    listArray.push(tabs[0].url)
    updateUlContainer()
    localStorage.setItem("listArray", JSON.stringify(listArray))
    renderArray(listArray)
  })
}

function updateUlContainer(){
  if(listArray[0] == null){
    let ulContainer = document.getElementById("ul-container")
    ulContainer.style.display = "none"
  }else{
    let ulContainer = document.getElementById("ul-container")
    ulContainer.style.display = "block"
  }
}
//default state when reloaded(listArray is empty) -> updates the state
updateUlContainer()

//rendering array
function renderArray(arrays){
  //reset to prevent overlapping
  ULEL.innerHTML = "";
  for(let i=0;i<arrays.length;i++){
    //prevent re-inputing same link
    let j = i - 1;
    if(arrays[j] == arrays[i]){
      arrays.pop()
      return;
    }
    ULEL.innerHTML += `<li> <a target='_blank' href='${arrays[i]}'> ${arrays[i]}</a></li>`
  }
}





