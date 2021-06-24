const express=require('express');
const http=require('http')
const app=express();
const cors=require('cors');
const server=http.createServer(app)
const io=require('socket.io')(server,{cors:{
    origin:"*"
}});
const fileUpload = require('express-fileupload')
const route=require('./src/routes')
const db =require('./src/cofig/db')

const {updateRate}=require('./src/app/controller/ProductCtrl')
const getData=require('./src/app/controller/ContentRomProductCtrl')
const contentRoom =require('./src/app/controller/ContentRomProductCtrl')
db.connect();
app.use(fileUpload({
    useTempFiles: true
}))
app.use(cors());
app.use(express.json())


route(app);

io.on('connection',socket=>{
    console.log('new user connect')
    socket.on('join-room',room=>{
        socket.join(room)
        
        contentRoom.getData(room).then(data=>socket.emit('getContentComment',data))
      
    })
    socket.on('clientSendData',data=>{
        contentRoom.setData(data.room,data);
        io.to(data.room).emit('severSendData',data)
    })
    socket.on('updateRate',data=>
    {
        updateRate(data.id,Number(data.rate))
    })
})

const PORT=5000;


server.listen(process.env.PORT||PORT,()=>console.log('server start'))