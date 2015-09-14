document.addEventListener("DOMContentLoaded", main);

function main(){
  var btns = {};
  btns.open = document.getElementById("btn_open");

  btns.open.addEventListener("click", file_select);
}

function file_select(){
  var chooser = document.getElementById("fileDialog");
  chooser.addEventListener("change", function(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    var div = document.getElementById("viewer");
    reader.onload = function(){
      var buffer = this.result;
      var arr = new Uint8Array(buffer);
      var byte, ul, li;
      var space = 0;
      div.innerHTML = "";
      for(var i = 0; i < arr.length; i++){
        byte = arr[i].toString(16);
        if(byte.length < 2) byte = "0" + byte;
        if(space == 0){
          ul = document.createElement("ul");
          ul.setAttribute("class", "line");
        }
        if(space % 4 == 0){
          ul.appendChild(li);
        }
      }
    }
  });

  chooser.click();
}
