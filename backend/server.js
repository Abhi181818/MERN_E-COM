const app=require('./app.js')
const dotenv=require('dotenv/config')
const connectDb=require('./config/db.js')
const cors=require('cors')

app.use(cors())
connectDb()
app.listen(4000,()=>{
    console.log(`Server is running on port 4000`);
})
