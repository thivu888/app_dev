
const ContentRomProduct = require('../models/ContentRomProduct')
const getData=async (room)=>{
    console.log(room)
   const data=await ContentRomProduct.findOne({name:room});
   if(!data){
       const newRoom=new ContentRomProduct({name:room})
       await newRoom.save()
       return {content:[]}
   }
   return data
}

const setData=async (room,data)=>{
    const rom=await ContentRomProduct.findOne({name:room});
  
    if(rom){
     const state=  await ContentRomProduct.findOneAndUpdate({name:room},{content:[...rom.content,data]})
    }
  return {room}
}

module.exports={getData,setData};