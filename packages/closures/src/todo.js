// Todo list example
const bar = 'bar';

const todoAppFactory = () => {
    const todos = [];

    const add = todo => todos.push(todo);
    const counter = () => todos.length;
    const foo = () => bar;

    return { add, counter, foo };
};

module.exports = todoAppFactory;

// add, counter and foo are closures from the moment they were defined inside another function (todoAppFactory)
// everyone of them has access to todoAppFactory's local scope (which is `todos` var). 
// In fact they have access to all todoAppFactory scope, which includes also `bar`

// add and counter functions use their privileged access to `todos` var
// foo is not making use of `todos` but is accessing module global scope instead
// for external users of todoAppFactory, `todos` and `bar` are private state accessible through the privileged methods it exposes add, counter and foo