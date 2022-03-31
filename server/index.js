const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;

const { encrypt, decrypt } = require("./encryptionHandler.js");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "PasswordManager",
})

app.post('/addpassword', (req, res) => {
    const { password, title } = req.body;

    const hashedPassword = encrypt(password);

    db.query(
        "INSERT INTO passwords (password, title, iv) VALUES (?,?, ?)", [hashedPassword.password, title, hashedPassword.iv], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Success");
            }
        }
    )
})

app.get('/showpasswords', (req, res) => {
    db.query('SELECT * FROM passwords;', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.post('/decryptpassword', (req, res) => {
    res.send(decrypt(req.body));
})

app.post('/register', (req, res) => {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    // const hashedPassword = encrypt(password);

    db.query(
        "INSERT INTO users (firstName, lastName, email, password, passwordConfirm) VALUES (?,?,?,?,?)", [firstName, lastName, email, password, passwordConfirm], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Success");
            }
        }
    )
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // const hashedPassword = encrypt(password);

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
            if (err) {
                console.log(err);
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong email/password combination!" });
            }

        }
    )
})

app.listen(PORT, () => {
    console.log('Server is running');
})