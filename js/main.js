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
    var offdiv = document.getElementById("offset");
    div.innerHTML = "";
    offdiv.innerHTML = "";
    reader.onload = function(){
      var buffer = this.result;
      var arr = new Uint8Array(buffer);
      var byte, ul, li;
      var space = 0;
      var line = 0;
      var array = [];
      var file = [];
      var str = "";

      for(var i = 0; i < arr.length; i++){
        byte = arr[i].toString(16);
        if(byte.length < 2) byte = "0" + byte;
        if(space == 4){
          space = 0;
          line++;
          array.push(str);
          str = "";
        }

        if(line == 4){
          line = 0;
          file.push(array);
          array = [];
        }

        str += byte;
        space++;
      }

      for(var i = 0; i < file.length; i++){
        var ul = document.createElement("ul");
        ul.setAttribute("class", "line");
        var tb = document.createElement("table");
        ul.appendChild(tb);
        var row = tb.insertRow(-1);
        var offnum = (i * 16).toString(16);
        while(offnum.length < 6){
          offnum = "0" + offnum;
        }
        offnum = "0x" + offnum;
        var line = document.createElement("li");
        line.textContent = offnum;
        offdiv.appendChild(line);

        for(var k = 0; k < file[i].length; k++){
          var cell = row.insertCell(-1);
          cell.textContent = file[i][k];
        }

        div.appendChild(ul);
      }
    }
  });

  chooser.click();
}
