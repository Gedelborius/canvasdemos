console.log('test index');

const canvas = getCanvas();
const context = getContext();

console.log('canvas got: ', canvas!=null);
console.log('context got: ', context!=null);

// resizeCanvas();
fillCanvas();
drawCell(0, 0);

console.log('glider', glider);
const frontArray = convertArrayData(glider);
console.log('frontArray', frontArray);
drawArray(frontArray);

console.log('gosperGliderGun');
console.log(gosperGliderGun.length);
console.log(gosperGliderGun[0].length);