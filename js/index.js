
var uncheck_day_item = 0;
var uncheck_task_item = 0;
var showcontentdiv;
var newdatefortaskid;
var enabledarkmode;

function increase(){

  let pgload = localStorage.getItem('on_load_counter');
  let dt = new Date();

  if (pgload === null) {
    pgload = 0;
    window.localStorage.setItem('Date_sm',dt.getDate());
    window.localStorage.setItem('Date_lg',dt.getDate()+'-'+(dt.getMonth()+1)+'-'+dt.getFullYear());
    let taskcontainer = new Array();
    let task_followup = new Array();
    window.localStorage.setItem('setID', 1);
    window.localStorage.setItem('task_container', JSON.stringify(taskcontainer));
    window.localStorage.setItem('task_follow_up', JSON.stringify(task_followup));
    window.localStorage.setItem('dark-mode',1);
  }

  if (dt.getDate() != localStorage.getItem('Date_sm')) {
    tasktransfer(JSON.parse(localStorage.getItem('task_container')), localStorage.getItem('Date_lg'));
    localStorage.setItem('Date_sm',dt.getDate());
    localStorage.setItem('Date_lg',dt.getDate()+'-'+(dt.getMonth()+1)+'-'+dt.getFullYear());
    let newtaskarray = new Array();
    localStorage.setItem('task_container', JSON.stringify(newtaskarray));
  }

  if (localStorage.getItem('dark-mode') == 0) {
    toggledarkmode(1);
  }
  else {
    toggledarkmode(0);
  }

  let itembucket = JSON.parse(localStorage.getItem('task_container'));

  if (itembucket.length > 0) {
    for (let i = 0; i < itembucket.length; i++) {
      if (!(itembucket[i]['checked'])) {
        let newlistitem = document.createElement('li');
        if (enabledarkmode == 1) {
          newlistitem.setAttribute('style','border-bottom: grey solid 2px');
          console.log('dark mode enabled');
        }
        else {
          newlistitem.setAttribute('style','border-bottom: black solid 2px');
          console.log('dark mode disabled');
        }
        newlistitem.setAttribute('id',itembucket[i].id);
        document.getElementById("myday-container").appendChild(newlistitem);
        newiteminput = document.createElement('input');
        newiteminput.setAttribute('type','checkbox');
        newiteminput.setAttribute('onclick','isChecked(this)');
        task_list.lastElementChild.appendChild(newiteminput);
        newspanelement = document.createElement('span');
        newspanelement.setAttribute('class','mydaytextspan');
        newspanelement.appendChild(document.createTextNode(itembucket[i]['task']));
        task_list.lastElementChild.appendChild(newspanelement);
        newdeletebutton = document.createElement('button');
        newdeletebutton.setAttribute('class','task-delete');
        newdeletebutton.setAttribute('onclick','deletetask(this)');
        if (enabledarkmode == 0) {
          newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:block" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:none" src="img/round-remove-button-inverted.png">';
        }
        else {
          newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:none" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:block" src="img/round-remove-button-inverted.png">';
        }
        task_list.lastElementChild.appendChild(newdeletebutton);
        uncheck_day_item++;
        document.getElementById('day_unchecked').innerHTML = '•  ' + uncheck_day_item;
      }
    }
  
    for (let i = 0; i < itembucket.length; i++) {
      if (itembucket[i]['checked']) {
        let newlistitem = document.createElement('li');
        if (enabledarkmode == 1) {
          newlistitem.setAttribute('style','border-bottom: grey solid 2px');
        }
        else {
          newlistitem.setAttribute('style','border-bottom: black solid 2px');
        }
        newlistitem.setAttribute('id',itembucket[i].id);
        document.getElementById("myday-container").appendChild(newlistitem);
        newiteminput = document.createElement('input');
        newiteminput.setAttribute('type','checkbox');
        newiteminput.setAttribute('onclick','isChecked(this)');
        newspanelement = document.createElement('span');
        newspanelement.setAttribute('class','mydaytextspan');
        newspanelement.appendChild(document.createTextNode(itembucket[i]['task']));
        newdeletebutton = document.createElement('button');
        newdeletebutton.setAttribute('class','task-delete');
        newdeletebutton.setAttribute('onclick','deletetask(this)');
        if (enabledarkmode == 0) {
          newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:block" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:none" src="img/round-remove-button-inverted.png">';
        }
        else {
          newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:none" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:block" src="img/round-remove-button-inverted.png">';
        }
        task_list.lastElementChild.appendChild(newiteminput);
        task_list.lastElementChild.appendChild(newspanelement);
        task_list.lastElementChild.childNodes[0].checked = true;
        task_list.lastElementChild.childNodes[1].style.textDecoration = 'line-through black solid';
        task_list.lastElementChild.appendChild(newdeletebutton);
      }
      
    }
  }
  else {
    hidecontentdiv(itembucket);
  }

  load_task_content(JSON.parse(localStorage.getItem('task_follow_up')));

  pgload++;
  localStorage.setItem("on_load_counter", pgload);

}

window.onload = increase;

var task_list = document.getElementById("myday-container");

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault();

  if (document.getElementById('task-input-box').value.trim() !== '') {
    newlistitem = document.createElement('li');
    newiteminput = document.createElement('input');
    newspanelement = document.createElement('span');
    newdeletebutton = document.createElement('button');
    newiteminput.setAttribute('type','checkbox');
    newiteminput.setAttribute('onclick','isChecked(this)');
    if (enabledarkmode == 1) {
      newlistitem.setAttribute('style','border-bottom: grey solid 2px');
    }
    else {
      newlistitem.setAttribute('style','border-bottom: black solid 2px');
    }
    newspanelement.setAttribute('class','mydaytextspan');
    newdeletebutton.setAttribute('class','task-delete');
    newdeletebutton.setAttribute('onclick','deletetask(this)');
    if (enabledarkmode == 0) {
      newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:block" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:none" src="img/round-remove-button-inverted.png">';
    }
    else {
      newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:none" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:block" src="img/round-remove-button-inverted.png">';
    }
    node = {};
    node.id = localStorage.getItem('setID');
    node.task = document.getElementById('task-input-box').value;
    node.checked = false;

    newlistitem.setAttribute('id', node.id);

    node_insert(newlistitem);

    newspanelement.appendChild(document.createTextNode(node.task));
    
    document.getElementById(node.id).appendChild(newiteminput);
    document.getElementById(node.id).appendChild(newspanelement);
    document.getElementById(node.id).appendChild(newdeletebutton);

    container = JSON.parse(localStorage.getItem('task_container'));
    container.push(node);
    window.localStorage.setItem('task_container',JSON.stringify(container));

    document.getElementById(node.id).scrollIntoView();

    window.localStorage.setItem('setID', parseInt(window.localStorage.getItem('setID')) + 1);

    document.getElementById('task-input-box').value = '';

    uncheck_day_item++;
    document.getElementById('day_unchecked').innerHTML = '•  ' + uncheck_day_item;

    if (showcontentdiv == 0) {
      document.getElementsByClassName('new-day-image-div')[0].style.display = 'none';
      document.getElementsByClassName('myday-task-container-section')[0].style.display = 'block';
      showcontentdiv = 1;
    }
  }
});

function node_insert(new_node) {
  try {
    last_item_pos = task_list.childElementCount - 1;
    while (task_list.childNodes[last_item_pos].childNodes[0].checked) {
      last_item_pos--;
    }
      task_list.insertBefore(new_node,task_list.childNodes[last_item_pos+1]);
  } catch (error) {
    task_list.appendChild(new_node);
  }
}

function isChecked(reference) {
  if (reference.parentNode.tagName == 'LI') {
    let itembucket = JSON.parse(localStorage.getItem('task_container'));
    for (let i = 0; i < itembucket.length; i++) {
      if (itembucket[i].id == reference.parentNode.id) {
        if (reference.checked) {
          itembucket[i].checked = true;
          navigator.vibrate(50);
          reference.parentNode.childNodes[1].style.textDecoration = 'line-through black solid';
          task_list.appendChild(reference.parentNode);
          uncheck_day_item--;
          if (uncheck_day_item != 0) {
            document.getElementById('day_unchecked').innerHTML = '•  ' + uncheck_day_item;
          }
          else {
            document.getElementById('day_unchecked').innerHTML = '• ✔';
          }
          break;
        }
        else {
          itembucket[i].checked = false;
          reference.parentNode.childNodes[1].style.textDecoration = 'none';
          let node = reference.parentNode;
          node_recovery(node);
          uncheck_day_item++;
          document.getElementById('day_unchecked').innerHTML = '•  ' + uncheck_day_item;
          break;
        }
      }
    }
    localStorage.setItem('task_container',JSON.stringify(itembucket));
  }
  else {
    let taskbucket = JSON.parse(localStorage.getItem('task_follow_up'));
    for (let i = 0; i < taskbucket.length; i++) {
      if (taskbucket[i].id == reference.parentNode.id) {
        if (reference.checked) {
          taskbucket[i].checked = true;
          navigator.vibrate(50);
          reference.parentNode.childNodes[1].style.textDecoration = 'line-through black solid';
          uncheck_task_item--;
          if (uncheck_task_item != 0) {
            document.getElementById('task_unchecked').innerHTML = '•  ' + uncheck_task_item;
          }
          else {
            document.getElementById('task_unchecked').innerHTML = '• ✔';
          }
          break;
        }
        else {
          taskbucket[i].checked = false;
          reference.parentNode.childNodes[1].style.textDecoration = 'none';
          uncheck_task_item++;
          document.getElementById('task_unchecked').innerHTML = '•  ' + uncheck_task_item;
          break;
        }
      }
    }
    localStorage.setItem('task_follow_up',JSON.stringify(taskbucket));
  }
}

function node_recovery(node){
  let childpos = 0;
  while ( ((task_list.childNodes[childpos].id) < node.id) && !(task_list.childNodes[childpos].childNodes[0].checked) ) {
    childpos++;
  }
  task_list.insertBefore(node,task_list.childNodes[childpos]);
}

document.getElementById('nav-button').addEventListener('click',()=>{
  document.getElementById('nav-bar').style.width = '48%';
  document.getElementById('nav-bar').style.display = 'block';
  document.getElementsByClassName('nav-container')[0].style.opacity = '1';
  document.getElementsByClassName('nav-container')[0].style.transitionDelay = '0.2s';
});

document.getElementById('nav-button1').addEventListener('click',()=>{
  document.getElementById('nav-bar').style.width = '48%';
  document.getElementById('nav-bar').style.display = 'block';
  document.getElementsByClassName('nav-container')[0].style.opacity = '1';
  document.getElementsByClassName('nav-container')[0].style.transitionDelay = '0.2s';
});

window.addEventListener('click', function(e){
  if (document.getElementsByClassName('nav-container')[0].style.opacity == '1'){
    if (((e.target.className != 'side-nav') && (e.target.className != 'menu-hamburger') && (e.target.id != 'dark-mode-button')) || (e.target.id == 'nav-close-btn')){
      document.getElementsByClassName('nav-container')[0].style.opacity = '0';
      document.getElementsByClassName('nav-container')[0].style.transitionDelay = '0s';
      document.getElementById('nav-bar').style.width = '0px';
    }
  }
});

function showmyday() {
  document.getElementsByClassName('my-day-section')[0].style.display = 'block';
  document.getElementsByClassName('task-section')[0].style.display = 'none';
}

function showmytask() {
  document.getElementsByClassName('task-section')[0].style.display = 'block';
  document.getElementsByClassName('my-day-section')[0].style.display = 'none';
}

function tasktransfer(container_item, date_log) {
  let dt = new Date();
  let oldtaskarray = JSON.parse(localStorage.getItem('task_follow_up'));
  if (container_item.length > 0) {
    for (let i = (container_item.length - 1); i >= 0; i--) {
      oldtaskarray.push(container_item[i]);
    }
    let newdate = {'date':date_log};
    oldtaskarray.push(newdate);
    localStorage.setItem('task_follow_up',JSON.stringify(oldtaskarray));
    for (let i = 0; i < JSON.parse(localStorage.getItem('task_follow_up')).length; i++) {
    }
  }
}

function deletetask(reference) {
  navigator.vibrate(50);
  if (reference.parentNode.tagName == 'LI') {
    reference.parentNode.parentNode.removeChild(reference.parentNode)
    let itembucket = JSON.parse(localStorage.getItem('task_container'))
    for (let i = 0; i < itembucket.length; i++) {
      if (itembucket[i].id == reference.parentNode.id) {
        itembucket.splice(i,1);
        localStorage.setItem('task_container',JSON.stringify(itembucket));
        if (reference.parentNode.childNodes[0].checked == false) {
          uncheck_day_item--;
          document.getElementById('day_unchecked').innerHTML = '•  ' + uncheck_day_item;
        }
        if (itembucket.length == 0) {
          hidecontentdiv(itembucket);
          document.getElementById('day_unchecked').innerHTML = '';
        }
        break;
      }
    }
  }
  else {
    let refgrandparent = reference.parentNode.parentNode;
    reference.parentNode.parentNode.removeChild(reference.parentNode);
    let taskbucket = JSON.parse(localStorage.getItem('task_follow_up'));
    for (let i = 0; i < taskbucket.length; i++) {
      if (taskbucket[i].id == reference.parentNode.id) {
        taskbucket.splice(i,1);
        localStorage.setItem('task_follow_up',JSON.stringify(taskbucket));
        if (reference.parentNode.childNodes[0].checked == false) {
          uncheck_task_item--;
          document.getElementById('task_unchecked').innerHTML = '•  ' + uncheck_task_item;
        }
        if (refgrandparent.childElementCount == 1) {
          for (let i = 0; i < taskbucket.length; i++) {
            if (Object.values(taskbucket[i])[0] == refgrandparent.id) {
              taskbucket.splice(i,1);
              localStorage.setItem('task_follow_up',JSON.stringify(taskbucket));
            }
          }
          refgrandparent.parentNode.removeChild(refgrandparent);
          for(let i = 0; i < document.getElementById('selectdate').options.length; i++) {
            if (document.getElementById('selectdate').options[i].text == refgrandparent.id) {
              document.getElementById('selectdate').remove([i]);
            }
          }
        }
        break;
      }
    }
  }
}

function hidecontentdiv(itembucket) {
  if (itembucket.length == 0) {
    if (enabledarkmode == 1) {
      document.getElementsByClassName('new-day-img')[0].style.display = 'none';
      document.getElementsByClassName('new-day-img')[1].style.display = 'block';
    }
    else {
      document.getElementsByClassName('new-day-img')[0].style.display = 'block';
      document.getElementsByClassName('new-day-img')[1].style.display = 'none';
    }
    document.getElementsByClassName('new-day-image-div')[0].style.display = 'block';
    document.getElementsByClassName('myday-task-container-section')[0].style.display = 'none';
    showcontentdiv = 0;
  }
}

function load_task_content(taskbucket) {
  if (taskbucket.length > 0) {
    for (let i = taskbucket.length-1; i >= 0; i--) {
      if (Object.keys(taskbucket[i])[0] == 'id') {
        newchild = document.createElement('div');
        newchild.setAttribute('class', 'newtaskelement');
        newchild.setAttribute('id',taskbucket[i].id)
        document.getElementById(newdatefortaskid).appendChild(newchild);
        newcheckbox = document.createElement('input');
        newcheckbox.setAttribute('type', 'checkbox');
        newcheckbox.setAttribute('onclick', 'isChecked(this)');
        newtextspan = document.createElement('span');
        newtextspan.setAttribute('class','tasktextspan');
        newtextspan.appendChild(document.createTextNode(taskbucket[i].task));
        newdeletebutton = document.createElement('button');
        newdeletebutton.setAttribute('class','task-delete');
        newdeletebutton.setAttribute('onclick','deletetask(this)');
        if (enabledarkmode == 0) {
          newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:block" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:none" src="img/round-remove-button-inverted.png">';
        }
        else {
          newdeletebutton.innerHTML = '<img class="delete-logo-img" style="display:none" src="img/round-remove-button.png"><img class="delete-logo-inverted-img" style="display:block" src="img/round-remove-button-inverted.png">';
        }
        document.getElementById(taskbucket[i].id).appendChild(newcheckbox);
        document.getElementById(taskbucket[i].id).appendChild(newtextspan);
        document.getElementById(taskbucket[i].id).appendChild(newdeletebutton);
        if (taskbucket[i].checked == true) {
          document.getElementById(taskbucket[i].id).childNodes[0].checked = true;
          document.getElementById(taskbucket[i].id).childNodes[1].style.textDecoration = 'line-through black solid';
        }
        else {
          uncheck_task_item++;
        }
      }
      else {
        newchilddiv = document.createElement('div');
        newchilddiv.setAttribute('id',taskbucket[i].date);
        newdatefortaskid = taskbucket[i].date;
        newchilddiv.setAttribute('class','newtaskdaydiv');
        document.getElementById('task-container').appendChild(newchilddiv);
        headerdate = document.createElement('h3');
        headerdatespan = document.createElement('span');
        headerdatespan.setAttribute('class','datelinearspan');
        headerdatespan.appendChild(document.createTextNode(' ~~~~~~~~~~~'));
        headerdate.setAttribute('class','taskheaderdate');
        headerdate.innerHTML = '‣ ' + taskbucket[i].date;
        headerdate.appendChild(headerdatespan);
        document.getElementById(taskbucket[i].date).appendChild(headerdate);
  
        load_date_selector(taskbucket[i].date);
      }
    }
    document.getElementById('task_unchecked').innerHTML = '•  ' + uncheck_task_item;
  }
}

function load_date_selector(date_load) {
  datecontainer = document.getElementById('selectdate');
  newdate = document.createElement('option');
  newdate.text = date_load;
  datecontainer.add(newdate,datecontainer[1]);
}

document.getElementById('selectdate').addEventListener('change', (e)=> {
  console.log(e.target.options[e.target.selectedIndex].text);
  document.getElementById(e.target.options[e.target.selectedIndex].text).scrollIntoView();
});

window.addEventListener('dblclick',(event)=>{
  navigator.vibrate(50);
  if (event.target.className == 'mydaytextspan' || event.target.className == 'tasktextspan') {
    let task = prompt('Edit Task: ',event.target.parentNode.childNodes[1].textContent);
    if (task == ''){
      event.target.parentNode.childNodes[1].textContent = event.target.parentNode.childNodes[1].textContent;
    }
    else if (task === null) {
      event.target.parentNode.childNodes[1].textContent = event.target.parentNode.childNodes[1].textContent;
    }
    else
    {
      event.target.parentNode.childNodes[1].textContent = task;
      task_edit(event.target,task);
    }
  }
});

function task_edit(target,newtask) {
  if (target.parentNode.parentNode.id == 'myday-container') {
    let item_container = JSON.parse(localStorage.getItem('task_container'));
    for (let i = 0; i < item_container.length; i++) {
      if (target.parentNode.id == item_container[i].id) {
        item_container[i].task = newtask;
        localStorage.setItem('task_container',JSON.stringify(item_container));
        break;
      }
    }
  }
  else {
    let item_container = JSON.parse(localStorage.getItem('task_follow_up'));
    for (let i = 0; i < item_container.length; i++) {
      if (target.parentNode.id == item_container[i].id) {
        item_container[i].task = newtask;
        localStorage.setItem('task_follow_up',JSON.stringify(item_container));
        break;
      }
    }
  }
}

document.getElementById('dark-mode-button').addEventListener('click',()=>{
  if (localStorage.getItem('dark-mode') == 0) {
    toggledarkmode(localStorage.getItem('dark-mode'));
    localStorage.setItem('dark-mode',1);
    enabledarkmode = 0;
  }
  else {
    toggledarkmode(localStorage.getItem('dark-mode'));
    localStorage.setItem('dark-mode',0);
    enabledarkmode = 1;
  }
});

function toggledarkmode(dark_mode_status) {
  enabledarkmode = dark_mode_status;
  if ((dark_mode_status != 0)) {
    enabledarkmode = 1;
    document.getElementById('dark-mode-button').innerHTML = 'Dark Mode : ON';
    document.getElementsByClassName('header')[0].style.color = '#fffbab';
    document.getElementsByClassName('header')[1].style.color = '#fffbab';
    document.getElementsByTagName('body')[0].style.backgroundColor = 'black';
    document.getElementsByTagName('body')[0].style.borderRight = '#fffbab solid 0.5px';
    document.getElementById('nav-bar').style.backgroundColor = 'black';
    document.getElementById('nav-bar').style.borderColor = 'white';
    document.getElementsByClassName('nav-container-item')[0].style.color = '#fffbab';
    document.getElementsByClassName('nav-container-item')[1].style.color = '#fffbab';
    document.getElementById('dark-mode-button').style.color = '#fffbab';
    document.getElementById('myday-container').style.color = '#fffbab';
    document.getElementById('task-input-box').style.backgroundColor = 'black';
    document.getElementById('task-input-box').style.color = '#ffe7e6';
    document.getElementById('task-input-box').style.borderColor = 'white';
    document.getElementById('task-container').style.color = '#fffbab';
    document.getElementsByClassName('new-day-img')[0].style.display = 'none';
    document.getElementsByClassName('new-day-img')[1].style.display = 'block';

    for (let i=0; i < document.getElementsByTagName('li').length; i++) {
      document.getElementsByTagName('li')[i].style.borderBottom = '2px solid grey';
    }
    for (let i = 0; i < document.getElementsByClassName('datelinearspan').length; i++) {
      document.getElementsByClassName('datelinearspan')[i].style.color = '#fffbab';
    }
    for (let i = 0; i < document.getElementsByClassName('delete-logo-img').length; i++) {
      document.getElementsByClassName('delete-logo-img')[i].style.display = 'none';
      document.getElementsByClassName('delete-logo-inverted-img')[i].style.display = 'block';
    }
    document.getElementById('nav-end-title').style.color = 'grey';
    document.getElementById('watermark-header').style.color = 'white';
  }
  else {
    document.getElementById('dark-mode-button').innerHTML = 'Dark Mode : off';
    document.getElementsByClassName('header')[0].style.color = 'black';
    document.getElementsByClassName('header')[1].style.color = 'black';
    document.getElementsByTagName('body')[0].style.backgroundColor = 'rgb(239, 255, 170)';
    document.getElementsByTagName('body')[0].style.borderRight = 'black solid 1px';
    document.getElementById('nav-bar').style.backgroundColor = 'rgb(247, 255, 170)';
    document.getElementById('nav-bar').style.borderColor = 'black';
    document.getElementsByClassName('nav-container-item')[0].style.color = 'black';
    document.getElementsByClassName('nav-container-item')[1].style.color = 'black';
    document.getElementById('dark-mode-button').style.color = 'black';
    document.getElementById('myday-container').style.color = 'black';
    document.getElementById('task-input-box').style.backgroundColor = 'rgb(239, 255, 170)';
    document.getElementById('task-input-box').style.color = 'black';
    document.getElementById('task-input-box').style.borderColor = 'rgb(224, 146, 146)';
    document.getElementById('task-container').style.color = 'black';
    document.getElementsByClassName('new-day-img')[0].style.display = 'block';
    document.getElementsByClassName('new-day-img')[1].style.display = 'none';
    for (let i=0; i < document.getElementsByTagName('li').length; i++) {
      document.getElementsByTagName('li')[i].style.borderBottom = '2px solid black';
    }
    for (let i = 0; i < document.getElementsByClassName('datelinearspan').length; i++) {
      document.getElementsByClassName('datelinearspan')[i].style.color = 'rgb(119, 119, 17)';
    }
    for (let i = 0; i < document.getElementsByClassName('delete-logo-img').length; i++) {
      document.getElementsByClassName('delete-logo-img')[i].style.display = 'block';
      document.getElementsByClassName('delete-logo-inverted-img')[i].style.display = 'none';
    }
    document.getElementById('nav-end-title').style.color = 'black';
    document.getElementById('watermark-header').style.color = 'black';
  }
}
