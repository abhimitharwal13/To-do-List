var data=localStorage.getItem('todolist')?JSON.parse(localStorage.getItem('todolist')):{
    todo:[],
    done:[]
};

console.log(data);
var completeIcon="<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 426.667 426.667\" style=\"enable-background:new 0 0 426.667 426.667;\" xml:space=\"preserve\" width=\"512px\" height=\"512px\"><g><path d=\"M213.333,0C95.518,0,0,95.514,0,213.333s95.518,213.333,213.333,213.333  c117.828,0,213.333-95.514,213.333-213.333S331.157,0,213.333,0z M174.199,322.918l-93.935-93.931l31.309-31.309l62.626,62.622  l140.894-140.898l31.309,31.309L174.199,322.918z\" data-original=\"#6AC259\" class=\"fill\" /></g> </svg>\n";
var removeIcon="                    <svg  version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" width=\"512px\" height=\"512px\" viewBox=\"0 0 774.266 774.266\" style=\"enable-background:new 0 0 774.266 774.266;\" xml:space=\"preserve\"><g><g><g><path d=\"M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z\"  class=\"fill\"/><rect x=\"475.031\" y=\"286.593\" width=\"48.418\" height=\"396.942\" data-original=\"#000000\" class=\"fill\"/><rect x=\"363.361\" y=\"286.593\" width=\"48.418\" height=\"396.942\" data-original=\"#000000\" class=\"fill\" /><rect x=\"251.69\" y=\"286.593\" width=\"48.418\" height=\"396.942\" data-original=\"#000000\" class=\"fill\" /></g></g></g> </svg>\n";
renderList();
function renderList(){
  if(!data.todo.length&&!data.done.length)
  return;
  console.log('fdfdf');
  for(let i=0;i<data.todo.length;i++)
  {
    addItemToList(data.todo[i],false);
  }
  for(let i=0;i<data.done.length;i++)
  {
    addItemToList(data.done[i],true);
  }
}

document.getElementById('add').addEventListener('click',function (){
    var k=document.getElementById('item').value;
    if(k){
        addItemToList(k);
        data.todo.push(k);
        document.getElementById('item').value='';
        update_dataobj();
    }
});

document.getElementById('item').addEventListener('keydown',function (e){
  var k=this.value;
  if(e.code==='Enter')
  {
    addItemToList(k);
    data.todo.push(k);
    document.getElementById('item').value='';
    update_dataobj();
  }

});


function update_dataobj(){
  localStorage.setItem('todolist',JSON.stringify(data));
}
function removeItem(){
    var item=this.parentNode.parentNode;
    var parent=item.parentNode;
    parent.removeChild(item);
    var cn=parent.className;
    if(cn==='todo')
    {
        data.todo.splice(data.todo.indexOf(item.innerText),1);
    }
    else{
        data.done.splice(data.done.indexOf(item.innerText),1);
    }
    update_dataobj();
}

function completeItem(){
    var item=this.parentNode.parentNode;
    var parent=item.parentNode;
    parent.removeChild(item);
    var cn=parent.className;
    var target=(cn==='todo')?document.getElementsByClassName('done')[0]:document.getElementsByClassName('todo')[0];
    target.insertBefore(item,target.childNodes[0]);

    if(cn==='todo')
    {
        data.todo.splice(data.todo.indexOf(item.innerText),1);
        data.done.push(item.innerText);
    }
    else{
        data.done.splice(data.done.indexOf(item.innerText),1);
        data.todo.push(item.innerText);
    }
    update_dataobj();
}

function addItemToList(k,comp)
{
  console.log(comp);
    var parentList = comp?document.getElementsByClassName('done')[0]:document.getElementsByClassName('todo')[0];
    var item = document.createElement('li');
    item.innerText=k;
     var buttons=document.createElement('div');
     buttons.classList.add('buttons');
     var remove=document.createElement('button');
     var complete=document.createElement('button');
     remove.classList.add('remove');
     complete.classList.add('complete');
     remove.innerHTML=removeIcon;
    complete.innerHTML=completeIcon;
     buttons.appendChild(remove);
     buttons.appendChild(complete);
     item.appendChild(buttons);
    parentList.insertBefore(item,parentList.childNodes[0]) ;
    remove.addEventListener('click',removeItem);
    complete.addEventListener('click',completeItem)
}
