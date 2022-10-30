const expres = require('express');
const app = express();

let
const todoList = [{
    id:1,
    text: '할일 1',
    done: false,
}];

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/api/todo', () => {
    return todoList;
})

app.post('/api/todo', () => {
    //const
})

app.listen(3000, () => {
    console.log('server start!!')
})