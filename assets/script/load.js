function downLoad(){
  if (document.all){
      document.all["layer1"].style.visibility="hidden";
      document.all["layer2"].style.visibility="visible";
  } else if (document.getElementById){
      node = document.getElementById("layer1").style.visibility='hidden';
      node = document.getElementById("layer2").style.visibility='visible';
  }
}
