var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection
db.on('error', (err) => console.error("Error in Connecting to Database:", err))
db.once('open', () => console.log("Connected to Database"))

app.post("/sign_up", async (req, res) => {
    try {
        var name = req.body.name
        var userId = req.body.userId
        var phoneNumber = req.body.phoneNumber
        var password = req.body.password

        // Simple validation
        if (!name || !userId || !phoneNumber || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        var data = {
            "name": name,
            "userId": userId,
            "phoneNumber": phoneNumber,
            "password": password,
        }

        // Use async/await for better readability
        await db.collection('users').insertOne(data);
        console.log("Record Inserted Successfully");

        // Redirect to signup_success.html
        return res.redirect('Signup_success.html');
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('Register.html')
}).listen(3000);

console.log("Listening on port 3000");
