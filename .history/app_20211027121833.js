const express = require('express');
const app = express();
const port = 3000;

const toDoLists = ["밥 먹기"];


app.set('views','/views');
app.set('view engine','pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', (req,res)=>{
    res.render('index',{toDoListTitle: '오늘의 할일 : ' + toDoLists.length,toDoLists:toDoLists});
});

app.post('/add_list', (req, res)=>{
    const newContent = req.body.content;
    toDoLists.push(newContent);
    res.redirect('/');
});

app.listen(port,()=>{
    console.log('connected');
});