const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;



const uri = `mongodb+srv://simpleCRUDUser:gJeBvty3tMUu64QE@cluster0.epzzkkw.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async() =>{
    try{
       await client.connect();

       const db = client.db("simpleCRUD");
       const userCollection = db.collection("users")

       app.get('/users', async(req, res) =>{
              const cursor = userCollection.find();
              const result = await cursor.toArray();
              res.send(result);
       })

       app.get('/users/:id', async(req,res) =>{
        const id = req.params.id;
        const query = {
            _id: new ObjectId(id)
        }
        const user = await userCollection.findOne(query)
        console.log(id)
        res.send(user)
       })

       await client.db("admin").command({ ping: 1 });
       console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    finally{
            //    await client.close();
    }
};

run().catch(console.dir);

// gJeBvty3tMUu64QE 
// simpleCRUDUser
// mongodb+srv://simpleCRUDUser:gJeBvty3tMUu64QE@cluster0.epzzkkw.mongodb.net/?appName=Cluster0
// mongodb+srv://<db_username>:<db_password>@cluster0.epzzkkw.mongodb.net/?appName=Cluster0

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("hello any");
})


app.listen(port, () =>{
      console.log(`Example app listening on port ${port}`)
})