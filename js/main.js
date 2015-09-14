document.addEventListener("DOMContentLoaded", main);

function main(){
  var btns = {};
  btns.open = document.getElementById("btn_open");

  btns.open.addEventListener("click", file_select);
}

function file_select(){
  var chooser = document.getElementById("fileDialog");
  chooser.addEventListener("change", function(evt) {
    console.log(this.value);
  });

  chooser.click();
}
