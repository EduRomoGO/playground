// Todo list example
const todoAppFactory = () => {
    const todos = [];

    const add = todo => todos.push(todo);
    const counter = () => todos.length;

    return { add, counter };
};

const myTodoApp = todoAppFactory();

console.log(myTodoApp)