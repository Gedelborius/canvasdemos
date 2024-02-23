function getCanvas(){
    return document.getElementById('canvas');
}

function getContext(){
    return getCanvas()?.getContext('2d');
}