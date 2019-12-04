var selectedValue="전체";
function select() {
  selectedValue="전체";
  var selected=document.getElementById('typeselect');
  selectedValue = selected.options[selected.selectedIndex].text;
  console.log(selectedValue);
  var all=document.getElementsByName('글');
  if(selectedValue=="전체"){
    for(var i=0;i<all.length;i++){
        all[i].style.display="block";
    }
  }
  else if(selectedValue=="잡담"){
    for(var i=0;i<all.length;i++){
      if(all[i].id=="잡담"){
        all[i].style.display="block";
      }
      else{
        all[i].style.display="none";
      }
    }
  }
  else if(selectedValue=="정보"){
    for(var i=0;i<all.length;i++){
      if(all[i].id=="정보"){
        all[i].style.display="block";
      }
      else{
        all[i].style.display="none";
      }
    }
  }
  else if(selectedValue=="긴급"){
    for(var i=0;i<all.length;i++){
      if(all[i].id=="긴급"){
        all[i].style.display="block";
      }
      else{
        all[i].style.display="none";
      }
    }
  }
  
}
