// clasical mistake caused by using closures and not knowing how them works

const doAfter = (timeout, fn, ...fnargs) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(fn(...fnargs)), timeout);
});

const runExample = async () => {

    let arr;
    let logItems;

    // Esto funciona sin problema
    logItems = () => {
        arr = [];
        
        for (var i = 0; i<5; i++) {
            arr.push(i);
        }
        
        return arr;
    };
    console.log(logItems());


    // Sin embargo esto no funciona
    logItems = async () => {
        arr = [];
        
        for (var i = 0; i<5; i++) {
            // setTimeout(() => arr.push(i), 100);
            doAfter(100, () => arr.push(i));
        }
        
        await doAfter(300, () => {});
        return arr;
        // setTimeout(() => console.log(arr), 200);
    };
    console.log(await logItems());


    // Lo que pasa aqui es


    // arreglado con let
    logItems = async () => {
        arr = [];
        
        for (let i = 0; i<5; i++) {
            doAfter(100, () => arr.push(i));
        }
        
        await doAfter(300, () => {});
        return arr;
    };
    console.log(await logItems());


};
runExample();