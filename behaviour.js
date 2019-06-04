var img = document.getElementById("imageCol");
var set = document.getElementById("settingsTab");
var cont = document.getElementById("cont");

set.addEventListener("mouseenter", function(event){
    img.classList.toggle("imageToggle");
    set.classList.toggle("settingToggle");
});

set.addEventListener("mouseleave", function(event){
    img.classList.toggle("imageToggle");
    set.classList.toggle("settingToggle");
});

var isAdvancedUpload = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

var $hodl = $("#imageCol");

if(isAdvancedUpload){
    var droppedFiles = false;

    $hodl.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    })
    .on('dragover dragenter', function() {
        $hodl.addClass('dragOn');
    })
    .on('dragleave dragend drop', function() {
        $hodl.removeClass('dragOn');
    })
    .on('drop', function(e) {
        droppedFiles = e.originalEvent.dataTransfer.files;
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(droppedFiles[0]);
        displaySettings();
    });
}

var x = document.getElementById("picA1");
var y = document.getElementById("picA2");
function addPics1(){
    var image = document.getElementById('output');
    if ('files' in x) {
        if (x.files.length == 0) {
          //failiure
        }else if(x.files.length == 1 ){
            image.src = URL.createObjectURL(x.files[0]);
            if(document.getElementById("cont").childNodes.length == 0){
                displaySettings();
            }
            // imgItem[0].firstChild.firstChild.src = URL.createObjectURL(x.files[0]);
            createMiniImage(image.src, x.files[0].name, true);
            firstCheck();
        } else {
            image.src = URL.createObjectURL(x.files[0]);
            if(document.getElementById("cont").childNodes.length == 0){
                displaySettings();
            }
            createMiniImage(image.src, x.files[0].name, true);
            firstCheck();
            for (var i = 1; i < x.files.length; i++) {
                //success
                createMiniImage(URL.createObjectURL(x.files[i]), x.files[i].name, false);
            }
        }
    }
    x.value = null;
    // if(image){
    //     getSpace(image);
    // }
}
function addPics2(){
    if ('files' in y) {
        if (y.files.length == 0) {
          //failiure
        }else if(y.files.length == 1 ){
            // imgItem[0].firstChild.firstChild.src = URL.createObjectURL(y.files[0]);
            createMiniImage(URL.createObjectURL(y.files[0]), y.files[0].name, false);
        } else {
            for (var i = 0; i < y.files.length; i++) {
              //success
              createMiniImage(URL.createObjectURL(y.files[i]), y.files[i].name, false);
            }
        }
    }
    y.value = null;
    // if(image){
    //     getSpace(image);
    // }
}

function addPics3(){
    var image = document.getElementById('output');
    var linkIn = document.getElementById("linkIn");
    var error = document.getElementById("errorMessage");
    if(linkIn.value == ""){
        error.classList.toggle("hidden");
    }else{
        image.crossOrigin = "Anonymous";
        image.src = linkIn.value;
        if(document.getElementById("cont").childNodes.length == 0){
            displaySettings();
        }
        var name = linkIn.value.substring(linkIn.value.lastIndexOf('/')+1);
        if(name.length > 10){
            name = name.substring(0, 10) + "...";
        }
        createMiniImage(image.src, name, true);
        firstCheck();
    }
}

function displaySettings(){
    var plch = document.getElementById('placeholder');
    var sets = document.getElementById('settings');
    var upl = document.getElementById('uploadCont');
    var img = document.getElementById("output");
    plch.classList.toggle("hidden");
    sets.classList.toggle("hidden");
    upl.classList.toggle("hidden");
    upl.classList.toggle("d-inline-block");
    img.classList.toggle("hidden");
}

function hideSettings(){
    if(cont.childNodes.length == 0){
        displaySettings();
    }
}

function getSpace(file){
    steg.getHidingCapacity(file);
}

function createMiniImage(image, name, isFocus) {
    var img = document.createElement("img");
    var imgHolder = document.createElement("div");
    var nameHolder = document.createElement("div");
    var collumn = document.createElement("div");
    var button = document.createElement("button");

    imgHolder.classList = "row imgItem justify-content-center align-items-center mx-auto";
    if(isFocus){
        imgHolder.classList ="row imgItem imgFocus justify-content-center align-items-center mx-auto" ;
    }
    collumn.classList = "col-4";
    img.classList = "img-fluid";
    img.src = image;
    nameHolder.classList = "col p-0 ml-1";
    nameHolder.innerHTML = name;
    button.innerHTML = "X";
    button.classList = "remove";
    button.setAttribute("onclick","removeDiv(this); changeFocus(event); setSize(); hideSettings();");
    imgHolder.setAttribute("onclick","setFocus(this); setSize();");

    collumn.appendChild(img);
    imgHolder.appendChild(collumn);
    imgHolder.appendChild(nameHolder);
    imgHolder.appendChild(button);

    cont.appendChild(imgHolder);
}

function removeDiv(btn){
    ((btn.parentNode).parentNode).removeChild(btn.parentNode);
    img.classList.toggle("imageToggle");
    set.classList.toggle("settingToggle");
}

function setFocus(img){
    hide();
    var image = document.getElementById('output');
    for(var i = 0; i < cont.childNodes.length; i++){
        if(cont.childNodes[i].classList.contains("imgFocus")){
            cont.childNodes[i].firstChild.firstChild.src = image.src;
            cont.childNodes[i].classList.toggle("imgFocus");
        }
    }
    image.src = img.firstChild.firstChild.src;
    img.classList.toggle("imgFocus");
    read();
}

function firstCheck(){
    updateCapacity();
}

function setSize(){
    var size = document.getElementById("sizeCount");
    var image = document.getElementById('output');
}

function updateCapacity() {
    var img = document.getElementById('output');
    var textarea = document.getElementById('messageEnc');
    document.getElementById('spaceCount').innerHTML='('+textarea.value.length + '/' + steg.getHidingCapacity(img) +' chars)';
}

function hide() {
    var img = document.getElementById("output");
    var textarea = document.getElementById("messageEnc");
    img.src = steg.encode(textarea.value, img);
    updateCapacity();
}

function read() {
    var img = document.getElementById("output");
    var textarea = document.getElementById("messageEnc");
    textarea.value = steg.decode(img);
    updateCapacity();
}

function SaveToDisk(fileURL, fileName) {
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
}

function changeFocus(event){
    event.stopPropagation();
    hide();
    var image = document.getElementById('output');
    if( cont.childNodes.length != 0){
        var hasFocus = false;
        for(var i = 0; i < cont.childNodes.length; i++){
            if(cont.childNodes[i].classList.contains("imgFocus")){
                hasFocus = true;
            }
        }
        if(!hasFocus){
            cont.firstChild.classList.toggle("imgFocus");
            image.src = cont.firstChild.firstChild.firstChild.src;
            read();
        }
    } 
}