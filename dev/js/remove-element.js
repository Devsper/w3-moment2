document.getElementsByClassName("btn-remove")[0].addEventListener('click', removeElement);

function removeElement(){

    var elParent = document.getElementsByClassName("rec-container")[0];

    if(elParent.children.length > 3){
        elParent.removeChild(elParent.lastChild);
    }
}
