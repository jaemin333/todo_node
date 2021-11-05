import express, { json, urlencoded } from 'express';
const app = express();
const port = 3000;

let toDoLists = ["밥 먹기"];

app.set('view engine','pug');

app.use(json());
app.use(urlencoded({extended: true})); //객체 데이터에서 중첩된 객체 형태를 허용함



app.get('/', (req,res)=>{
    res.render('index',{toDoListTitle: '오늘의 할일 : ' + toDoLists.length,toDoLists:toDoLists});
});

app.post('/add_list', (req, res)=>{
    const newContent = req.body.content;
    toDoLists.push(newContent);
    res.redirect('/');
});

app.get('/delete_list/:id', (req,res)=> {
    const deleteContent = req.params.id;
    toDoLists = toDoLists.filter((value) => value != deleteContent);
    res.redirect('/');
});

app.get('/open_update/:id', (req,res)=>{
    res.render('update',{prevContent: req.params.id});
});

app.post('/update_list', (req,res)=>{
    let prevContent = req.body.prevContent;
    let newContent = req.body.newContent;
    let index = toDoLists.indexOf(prevContent);
    toDoLists.splice(index,1,newContent); //prevcontent의 인덱스를 삭제하고 newContent를 넣어준다    
    res.redirect('/');
});

app.listen(port,()=>{
    console.log('connected');
});