// clasical mistake caused by using closures and not knowing how them works

const doAfter = (timeout, fn, ...fnargs) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(fn(...fnargs)), timeout);
  });

const runExample = async () => {
  let arr;
  let logItems;

  // Esto funciona sin problema
  logItems = () => {
    arr = [];

    for (var i = 0; i < 5; i++) {
      arr.push(i);
    }

    return arr;
  };
  console.log(logItems());

  // Sin embargo esto no funciona
  logItems = async () => {
    arr = [];

    for (var i = 0; i < 5; i++) {
      // setTimeout(() => arr.push(i), 100);
      doAfter(100, () => arr.push(i));
    }

    await doAfter(300, () => {});
    return arr;
    // setTimeout(() => console.log(arr), 200);
  };
  console.log(await logItems());

  // Lo que pasa aqui es que el cb que se le pasa a doAfter es una closure que cierra sobre la variable i
  // Al haber creado esta variable usando var, la variable i es la misma para todas las iteraciones del
  // bucle for, por lo tanto cuando se van a ejecutar los callbacks, el bucle for ya ha terminado y el
  // valor de i es el mismo (5) para cada uno de los callbacks, ya que todos referencian la misma variable

  // Si utilizamos let en lugar de var, tenemos una variable i distinta para cada iteracion, por lo tanto
  // la closure cierra sobre variables distintas, es por eso que estamos "capturando" el valor correcto de
  // cada variable

  // arreglado con let
  logItems = async () => {
    arr = [];

    for (let i = 0; i < 5; i++) {
      doAfter(100, () => arr.push(i));
    }

    await doAfter(300, () => {});
    return arr;
  };
  console.log(await logItems());
};

runExample();
