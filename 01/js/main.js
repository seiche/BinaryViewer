document.addEventListener("DOMContentLoaded", main);

var ui = {};

function main(){
  //get elements
  var header = {
    open : document.getElementById("btn_open")
  };

  //add events
  header.open.addEventListener("click", file_select);
}

function file_select(){
  var chooser = document.getElementById("fileDialog");
  chooser.addEventListener("change", display_hexidecial);
  chooser.click();

  function display_hexidecial(evt){
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function(){
      var buffer = this.result;
      var array = new Uint8Array(buffer);

      var byte;
      var num = 0;
      var digit;
      var offset = "";
      var binary = "";

      for(var i = 0; i < array.length; i++){
        byte = array[i].toString(16);
        if(byte.length < 2) byte = "0" + byte;

        if(num == 0){
          binary += "<li><table><tr><td>";
          digit = i.toString(16);
          while(digit.length < 6){
            digit = "0" + digit;
          }
          offset += "<li>0x" + digit + "</li>";
        }

        binary += byte;

        if(num == 3 || num == 7 || num == 11){
          binary += "</td><td>";
        }

        num++;

        if(num == 16){
          num = 0;
          binary += "</td></tr></table></li>";
        }

      }
      console.log(binary);
      document.getElementById("viewer").innerHTML = binary;
      document.getElementById("offset").innerHTML = offset;
    }
  }

}

function open_toolkit(){
  if(ui.toolkit.animate){
    return;
  }

  var id = this.getAttribute("data-id");
  id = parseInt(id);

  if(ui.toolkit.active === id){
    return;
  }

  ui.toolkit.elements.areas[ui.toolkit.active].style.maxHeight = 0;
  ui.toolkit.active = id;
  ui.toolkit.elements.areas[ui.toolkit.active].style.maxHeight = "100%";
}
