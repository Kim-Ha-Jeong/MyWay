
var selectedValue="전체";
function select() {
  selectedValue="전체";
  var selected=document.getElementById('typeselect');
  selectedValue = selected.options[selected.selectedIndex].text;
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

function buttonsearch(){
  var text=document.getElementById("input").value;
  var all=document.getElementsByName('글');
  var getTitle=document.getElementsByName('title');
  var getDesc=document.getElementsByName('desc');
  for(var i=0;i<getTitle.length;i++){
    var title=getTitle[i].innerHTML;
    var desc=getDesc[i].innerHTML;
    if((text==title)||(text==desc)){
      all[i].style.display="block";
    }
    else{
      all[i].style.display="none";
    }
  }
}

function like(){
  var like=document.getElementsByName('like');
  var likenum=new Array();
  var likeorder=new Array();
  for(var i=0;i<like.length;i++){
    var likestring=like[i].innerHTML.substring(3);
    likenum[i]=likestring*1;
    likeorder[i]=likenum[i];
  }
  for(var i=0;i<likenum.length;i++){
    var key=likenum[i];
    var a=i;
    var j;
    for(j=i-1;j>=0 && likenum[i]>key;j--){
      likenum[j+1]=likenum[j];
    }
    likenum[j+1]=key;
    likeorder[j+1]=a;
  }

  var list=document.getElementsByName('글');
  for(var i=0;i<like.length;i++){
    console.log(likeorder[i]);
  }
}