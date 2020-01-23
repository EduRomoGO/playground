// Configurador de casas

// Tratar de hacerlo con clases y objetos cada uno con su estado

// Despues tratar de hacerlo de una manera mas 'funcional' tratando de usar el menor estado posible, usar funciones puras y limitar al maximo los sitios donde se manipula el estado

// Siempre va a haber estado. Tratar de simplificar el problema usando funciones puras cuando tenga sentido, simplificara el programa, pero no eliminara la necesidad de almacenar un estado



class Garage {
    constructor() {
        this.size = 'big';
    }

    changeSize(newSize) {
        this.size = newSize;
    }
}

class Kitchen {
    constructor() {
        this.aisle = true;
        this.fridge = {
            size: 'big',
            combi: true,
        };
    }

    removeAisle() {
        this.aisle = false;
    }
}

class House {
    constructor() {
        this.config = {
            global: {
                style: 'modern',
            },
            garage: new Garage(),
            kitchen: new Kitchen(),
        };
    }

    changeStyle(newStyle) {
        this.config.global.style = newStyle;
        this.config.garage.changeSize('bigger');
        this.config.kitchen.removeAisle();
    }

    renderHouse() {
        console.log(this.config);
    }
}

const myHouse = new House();

myHouse.renderHouse();
myHouse.changeStyle('classic');
myHouse.renderHouse();


const kitchen = { aisle: true, fridge: { size: 'big', combi: true } };
const garage = { size: 'big' };
const myOtherHouse = {
    global: { style: 'modern' },
    garage: { ...garage},
    kitchen: { ...kitchen},
};

const renderHouse = house => console.log(house);

const changeStyle = (house, newStyle) => {
    const newHouse = { ...house};

    newHouse.global = newStyle;

    if (newStyle === 'classic') {
        newHouse.garage = { ...garage, size: 'bigger' };
        newHouse.kitchen = { ...kitchen, aisle: false };
    }

    return newHouse;
};

renderHouse(myOtherHouse);
const updatedHouse = changeStyle(myOtherHouse, 'classic');
renderHouse(updatedHouse);