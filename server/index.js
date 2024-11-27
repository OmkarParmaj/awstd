import express, { query } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const json = bodyParser.json;
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connect } from 'http2';
import nodemailer from 'nodemailer';


import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // Use a more secure key in production
const JWT_EXPIRES_IN = '20m'; // Token expiration time


const port = 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
        credentials: true
    }
));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({

    secret: 'hiomkar parmaj', // Generating a random secret key
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 20,

    }
}));



const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "textilediwanji",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connection to database successful");
    }
});


app.all('/customer', (req, res) => {
    const { Name, Email, Password, mobileno } = req.body;

    // Check for duplicate email
    const sqlDuplicate = "SELECT * FROM customer WHERE Email = ?";
    connection.query(sqlDuplicate, [Email], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.json({ message: "Internal server error" });
        }

        if (result.length > 0) {
            return res.json({ message: "Duplicate data" });
        }

        // Insert new customer
        const sqlInsert = "INSERT INTO `customer` (`Name`, `Email`, `Password`, `phoneno`) VALUES (?, ?, ?, ?)";
        connection.query(sqlInsert, [Name, Email, Password, mobileno], (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.json({ message: "Internal server error" });
            }

            return res.json({ message: "Data inserted successfully" });
        });
    });
});



app.post('/googleauth', (req, res) => {
    const { email, name, uid, phonenumber } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sqlSelect = "SELECT * FROM `customer` WHERE Email = ?";
    
    connection.query(sqlSelect, [email], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (result.length > 0) {
            console.log("User email exists!");
           
            req.session.user = email;
            req.session.uemail = email;
            req.session.yesmail = email;
            req.session.omkar = email;

            const token = jwt.sign({  email: email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });     
            res.cookie('token', token, {
               httpOnly: true,
             
               maxAge: 1000 * 60 * 20 
           });
    

            console.log(`session email set ${req.session.uemail}`)

            return res.json({ message: "done" });
        } else {

            const name2 = req.body.name;
            const uid2 = req.body.uid;
            const phonenumber2 = req.body.phonenumber; 


            const name = name2;
            const password = uid2;
            const phonenumber = phonenumber ? phonenumber : 0;
            const sqlInsert = "INSERT INTO `customer` (`Name`, `Email`, `Password`, `phoneno`) VALUES (?, ?, ?, ?)";

            connection.query(sqlInsert, [name, email, password, phonenumber], (err, result) => {
                if (err) {
                    console.error('Error executing insert query:', err);
                    return res.status(500).json({ error: 'Database insert error' });
                }
                
                    req.session.user = email;
                    req.session.uemail = email;
                    req.session.yesmail = email;
                    req.session.omkar = email;
        
                    const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });   
                      
                    res.cookie('token', token, {
                       httpOnly: true,
                     
                       maxAge: 1000 * 60 * 20 
                   });

                   console.log("Google auth user created!");
                   return res.json({ message: "done" });

                
               
            });
        }
    });
});







// Login endpoint
app.post('/login', (req, res) => {
    const { Email, Password } = req.body;

    // Check if the email exists in the database
    const sqlQuery = "SELECT * FROM customer WHERE Email = ? AND Password = ?";
    connection.query(sqlQuery, [Email, Password], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
            return res.json({ message: "User not found" });
        }


        // Compare the provided password with the stored password
        const user = result[0];
        if (user.Password !== Password) {
            return res.json({ message: "Incorrect password" });
        }





        // Store user data in session
        req.session.user = result[0];
        req.session.uemail = result[0].Email;
        req.session.yesmail = result[0].Email;
        req.session.omkar = result[0].Email;


        const token = jwt.sign({ userId: user.Id, email: user.Email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie

            maxAge: 1000 * 60 * 20 // Token expiration time in milliseconds
        });

        //console.log(req.session.uemail);

        // Redirect user to dashboard component
        return res.json({ redirectTo: "/dashboard" });

    });
});

app.use((req, res, next) => {

    next();
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



function authenticateJWT(req, res, next) {
    const token = req.cookies['token'];

    const key = 'your_jwt_secret_key'
    if (token) {
        jwt.verify(token, key, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ Auth: "You are unauthorized" });
    }
}




app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout error' });
        }

        // Clear the session cookie (connect.sid is the default cookie name)
        res.clearCookie('connect.sid');

        // Clear the token cookie
        res.clearCookie('token');

        res.json({ message: 'Logged out successfully' });
    });
});






app.get('/datewisebeaminwardreport/data', authenticateJWT, (req, res) => {
    const datewisebeaminwardreportmail = req.session.uemail;

    const startdate = req.query.startdate;
    const enddate = req.query.enddate;

    const sql = "SELECT * FROM beaminward WHERE Date >= ? AND Date <= ? AND Email = ?";

    connection.query(sql, [startdate, enddate, datewisebeaminwardreportmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.get('/beaminwardreport', authenticateJWT, (req, res) => {

    // const report = req.session.uemail;
    // const umail = req.session.yesmail;
    const umail = req.session.omkar;
    //console.log(umail);

    const sql = "SELECT * FROM `beaminward` WHERE `Email` =?";

    connection.query(sql, [umail], (err, result) => {
        if (err) return res.json("err in the internal server", err);
        return res.json(result);
    })
})





//mail recovery code start
app.post("/", (req, res) => {
    const { email } = req.body;


    // Check if email exists in MySQL database
    connection.query('SELECT * FROM `customer` WHERE Email = ?', email, (error, results) => {
        if (error) {
            console.error('Error querying MySQL: ' + error.stack);
            return res.status(500).send('Something went wrong!');
        }

        if (results.length === 0) {
            return res.status(404).send('Email not found in the database');
        }

        // Email found, retrieve password and send email
        const password = results[0].Password;
        sendEmail({ email, password })
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message));
    });
});

function sendEmail({ email, password }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "textilediwanji@gmail.com",
                pass: "cyuf nyev sugk tqos",
            },
        });

        const mailConfigs = {
            from: "textilediwanji@gmail.com",
            to: email,
            subject: "Email recovery",
            html: `
          <p>This mail is for email recovery </p>
          <p>Password: ${password}</p>
          <p>Best Regards</p>
        `
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if (error) {
                console.error(error);
                return reject({ message: `An error occurred while sending email` });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}


//mail recovery code ends









// Dashboard endpoint
// app.get('/dashboard', authenticateJWT, (req, res) => {
//     // Check if user is logged in
//     const umail = req.session.yesmail;
//     if (!req.session.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Render dashboard component
//     return res.json({ message: "Welcome to the dashboard!" });
// });


// app.get('/sidebar', authenticateJWT, (req, res) => {
//     const usermail = req.session.uemail;

//     const sql = "SELECT * FROM `customer` WHERE Email = ?";

//     connection.query(sql, [usermail], (err, result) => {
//         if (err) return res.json({ message: "err inside server" });
//         return res.json(result);
//     })
// })


const designpaperStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './designpaper');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Define storage for jacquardfile
const jacquardStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './jacquardfiles');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});





// Initialize multer with both storage configurations
const upload2 = multer({
    storage: {
        _handleFile: (req, file, cb) => {
            if (file.fieldname === 'designfile') {
                designpaperStorage._handleFile(req, file, cb);
            } else if (file.fieldname === 'jacquardfile') {
                jacquardStorage._handleFile(req, file, cb);
            } else {
                cb(new multer.MulterError('Unexpected field'));
            }
        },
        _removeFile: (req, file, cb) => {
            // Optionally implement removal logic here
            cb(null);
        }
    }
});


app.post('/beaminward', upload2.fields([
    { name: 'designfile', maxCount: 1 },
    { name: 'jacquardfile', maxCount: 1 }
]), authenticateJWT, (req, res) => {
    const user = req.session.uemail;
    var umail = req.session.uemail;

    // Extract file paths
    const designfilePath = req.files['designfile'] ? req.files['designfile'][0].path.replace('designpaper/', '') : 0;
    const jacquardfilePath = req.files['jacquardfile'] ? req.files['jacquardfile'][0].path.replace('jacquardfiles/', '') : 0;
    var values = [
        umail,
        req.body.Date,
        req.body.uid,
        req.body.SetNo,
        req.body.DesignNo,
        req.body.WarpCount,
        req.body.WeftCount,
        req.body.Reed,
        req.body.Pick,
        req.body.SizingName,
        req.body.SizingMtr,
        req.body.Count1 ? parseInt(req.body.Count1, 10) : null, // Ensure numeric or null
        req.body.Count2 ? parseInt(req.body.Count2, 10) : 0, // Ensure numeric or null
        req.body.Count3 ? parseInt(req.body.Count3, 10) : 0, // Ensure numeric or null
        req.body.Count4 ? parseInt(req.body.Count4, 10) : 0, // Ensure numeric or null
        req.body.Count5 ? parseInt(req.body.Count5, 10) : 0, // Ensure numeric or null
        req.body.Countwt1 ? parseFloat(req.body.Countwt1) : 0, // Ensure numeric or null
        req.body.Countwt2 ? parseFloat(req.body.Countwt2) : 0, // Ensure numeric or null
        req.body.Countwt3 ? parseFloat(req.body.Countwt3) : 0, // Ensure numeric or null
        req.body.Countwt4 ? parseFloat(req.body.Countwt4) : 0, // Ensure numeric or null
        req.body.Countwt5 ? parseFloat(req.body.Countwt5) : 0, // Ensure numeric or null
        req.body.selectCompany,
        req.body.selectParty,
        req.body.width,
        req.body.selectdesignpapertype,
        req.body.barcodevalue,
        req.body.beamstatus,
        designfilePath,  // Add design file path if present
        jacquardfilePath, // Add jacquard file path if present,
        req.body.jobrate ? parseFloat(req.body.jobrate) : 0,
    ];

    if (designfilePath) {


        // SQL statement with correct column count
        const sql = `
            INSERT INTO beaminward (
                Email, Date, UID, SetNo, DesignNo, WarpCount, WeftCount, Reed, Pick, 
                SizingName, SizingMtr, Count1, Count2, Count3, Count4, Count5, 
                Countwt1, Countwt2, Countwt3, Countwt4, Countwt5, company, party, 
                width, drawinprice, reedprice, note, club, barcodevalue, beamstatus, designfile, JobRate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database insertion failed', error: err });
            }
            return res.json({ message: 'Inserted successfully' });
        });

    }
    else if (jacquardfilePath) {


        // SQL statement with correct column count
        const sql = `
            INSERT INTO beaminward (
                Email, Date, UID, SetNo, DesignNo, WarpCount, WeftCount, Reed, Pick, 
                SizingName, SizingMtr, Count1, Count2, Count3, Count4, Count5, 
                Countwt1, Countwt2, Countwt3, Countwt4, Countwt5, company, party, 
                width, club, barcodevalue, beamstatus, jacquardfile, JobRate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database insertion failed', error: err });
            }
            return res.json({ message: 'Inserted successfully' });
        });

    }
    else {

        // SQL statement with correct column count
        const sql = `
            INSERT INTO beaminward (    
                Email, Date, UID, SetNo, DesignNo, WarpCount, WeftCount, Reed, Pick, 
                SizingName, SizingMtr, Count1, Count2, Count3, Count4, Count5, 
                Countwt1, Countwt2, Countwt3, Countwt4, Countwt5, company, party, 
                width, club, barcodevalue, beamstatus, JobRate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database insertion failed', error: err });
            }
            return res.json({ message: 'Inserted successfully' });
        });
    }

    // Define values for the SQL query

});


app.get('/handleeditfetchdata/:srno', authenticateJWT, (req, res) => {
    const handleeditfetchdatamail = req.session.uemail;

    const srno = req.params.srno;

    const sql = "SELECT * FROM `companyreg` WHERE `srno` = ? AND `Email` = ?";
    connection.query(sql, [srno, handleeditfetchdatamail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})




app.delete('/delete/:id', authenticateJWT, (req, res) => {

    const mail = req.session.uemail;
    const id = req.params.id;

    //console.log(id);
    //console.log(mail);

    const sql = "DELETE FROM `beaminward` WHERE Email =? AND srno =?";

    connection.query(sql, [mail, id], (err, result) => {
        if (err) return res.json({ message: "err in the internal server" })
        return res.json(result);
    })
})


// app.get('/beaminwardprint/:id1/:id2', authenticateJWT, (req, res) => {
//     const maild = req.session.uemail;
//     const { id1, id2 } = req.params; // Destructure id1 and id2 from req.params

//     //console.log(maild);
//     //console.log(id1); // Use id1 instead of DesignNo
//     //console.log(id2); // Use id2 instead of srno

//     const sql = "SELECT * FROM `beaminward` WHERE Email = ? AND DesignNo = ? AND srno = ?";

//     connection.query(sql, [maild, id1, id2], (err, result) => {
//         if (err) return res.json({ message: "err in the internal server" })
//         return res.json(result);
//     });
// });

app.get('/beaminwardeditchange/:id', authenticateJWT, (req, res) => {
    const beaminwardeditchangemail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `beaminward` WHERE `Email`=? AND `srno`=?";

    connection.query(sql, [beaminwardeditchangemail, id], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    });
});

app.get('/headerinfo', authenticateJWT, (req, res) => {
    const headermail = req.session.uemail;
    // //console.log(`header connected ${headermail}`);

    const sql = "SELECT * FROM `customer` WHERE `Email` =?";

    connection.query(sql, [headermail], (err, result) => {
        if (err) return res.json({ message: "fail to connect to database" })
        return res.json(result);
    })
})





const designpaperStorage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './designpaper');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Define storage for jacquardfile
const jacquardStorage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './jacquardfiles');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});





// Initialize multer with both storage configurations
const upload3 = multer({
    storage: {
        _handleFile: (req, file, cb) => {
            if (file.fieldname === 'designfile') {
                designpaperStorage2._handleFile(req, file, cb);
            } else if (file.fieldname === 'jacquardfile') {
                jacquardStorage2._handleFile(req, file, cb);
            } else {
                cb(new multer.MulterError('Unexpected field'));
            }
        },
        _removeFile: (req, file, cb) => {
            // Optionally implement removal logic here
            cb(null);
        }
    }
});



app.all('/beaminwardedit/:id', upload2.fields([
    { name: 'designfile', maxCount: 1 },
    { name: 'jacquardfile', maxCount: 1 }
]), authenticateJWT, (req, res) => {

    const idmail = req.session.uemail;
    const idedit = req.params.id;

    // Use `let` for variables that will be reassigned
    let designfilePath = req.files['designfile'] ? req.files['designfile'][0].path : null;
    let jacquardfilePath = req.files['jacquardfile'] ? req.files['jacquardfile'][0].path : null;

    if (designfilePath) {
        designfilePath = designfilePath.replace('designfiles/', '');
    }

    if (jacquardfilePath) {
        jacquardfilePath = jacquardfilePath.replace('jacquardfiles/', '');
    }

    var values = [
        req.body.Date,
        req.body.uid,
        req.body.SetNo,
        req.body.DesignNo,
        req.body.WarpCount,
        req.body.WeftCount,
        req.body.Reed,
        req.body.Pick,
        req.body.SizingName,
        req.body.SizingMtr,
        req.body.Count1 ? parseInt(req.body.Count1, 10) : 0, // Ensure numeric or null
        req.body.Count2 ? parseInt(req.body.Count2, 10) : 0, // Ensure numeric or null
        req.body.Count3 ? parseInt(req.body.Count3, 10) : 0, // Ensure numeric or null
        req.body.Count4 ? parseInt(req.body.Count4, 10) : 0, // Ensure numeric or null
        req.body.Count5 ? parseInt(req.body.Count5, 10) : 0, // Ensure numeric or null
        req.body.Countwt1 ? parseFloat(req.body.Countwt1) : 0, // Ensure numeric or null
        req.body.Countwt2 ? parseFloat(req.body.Countwt2) : 0, // Ensure numeric or null
        req.body.Countwt3 ? parseFloat(req.body.Countwt3) : 0, // Ensure numeric or null
        req.body.Countwt4 ? parseFloat(req.body.Countwt4) : 0, // Ensure numeric or null
        req.body.Countwt5 ? parseFloat(req.body.Countwt5) : 0, // Ensure numeric or null
        req.body.width,
        req.body.selectdesignpapertype,
        designfilePath,
        req.body.jobrate ? parseFloat(req.body.jobrate) : 0,
        idmail,
        idedit,

    ];

    var values3 = [
        req.body.Date,
        req.body.uid,
        req.body.SetNo,
        req.body.DesignNo,
        req.body.WarpCount,
        req.body.WeftCount,
        req.body.Reed,
        req.body.Pick,
        req.body.SizingName,
        req.body.SizingMtr,
        req.body.Count1 ? parseInt(req.body.Count1, 10) : 0, // Ensure numeric or null
        req.body.Count2 ? parseInt(req.body.Count2, 10) : 0, // Ensure numeric or null
        req.body.Count3 ? parseInt(req.body.Count3, 10) : 0, // Ensure numeric or null
        req.body.Count4 ? parseInt(req.body.Count4, 10) : 0, // Ensure numeric or null
        req.body.Count5 ? parseInt(req.body.Count5, 10) : 0, // Ensure numeric or null
        req.body.Countwt1 ? parseFloat(req.body.Countwt1) : 0, // Ensure numeric or null
        req.body.Countwt2 ? parseFloat(req.body.Countwt2) : 0, // Ensure numeric or null
        req.body.Countwt3 ? parseFloat(req.body.Countwt3) : 0, // Ensure numeric or null
        req.body.Countwt4 ? parseFloat(req.body.Countwt4) : 0, // Ensure numeric or null
        req.body.Countwt5 ? parseFloat(req.body.Countwt5) : 0, // Ensure numeric or null
        req.body.width,
        req.body.selectdesignpapertype,
        req.body.jobrate ? parseFloat(req.body.jobrate) : 0,
        // designfilePath,  
        idmail,
        idedit,

    ];

    let values2 = [
        req.body.Date,
        req.body.uid,
        req.body.SetNo,
        req.body.DesignNo,
        req.body.WarpCount,
        req.body.WeftCount,
        req.body.Reed,
        req.body.Pick,
        req.body.SizingName,
        req.body.SizingMtr,
        req.body.Count1 ? parseInt(req.body.Count1, 10) : 0, // Ensure numeric or null
        req.body.Count2 ? parseInt(req.body.Count2, 10) : 0, // Ensure numeric or null
        req.body.Count3 ? parseInt(req.body.Count3, 10) : 0, // Ensure numeric or null
        req.body.Count4 ? parseInt(req.body.Count4, 10) : 0, // Ensure numeric or null
        req.body.Count5 ? parseInt(req.body.Count5, 10) : 0, // Ensure numeric or null
        req.body.Countwt1 ? parseFloat(req.body.Countwt1) : 0, // Ensure numeric or null
        req.body.Countwt2 ? parseFloat(req.body.Countwt2) : 0, // Ensure numeric or null
        req.body.Countwt3 ? parseFloat(req.body.Countwt3) : 0, // Ensure numeric or null
        req.body.Countwt4 ? parseFloat(req.body.Countwt4) : 0, // Ensure numeric or null
        req.body.Countwt5 ? parseFloat(req.body.Countwt5) : 0, // Ensure numeric or null
        req.body.width,
        req.body.selectdesignpapertype,
        jacquardfilePath,
        req.body.jobrate ? parseFloat(req.body.jobrate) : 0,
        idmail,
        idedit,

    ];
    let sqlput1;
    let sqlput2;
    let sqlput;

    if (designfilePath) {
        sqlput1 = "UPDATE `beaminward` SET `Date` = ?, `UID` = ?, `SetNo` = ?, `DesignNo` = ?, `WarpCount` = ?, `WeftCount` = ?, `Reed` = ?, `Pick` = ?, `SizingName` = ?, `SizingMtr` = ?, `Count1` = ?, `Count2` = ?, `Count3` = ?, `Count4` = ?, `Count5` = ?, `Countwt1` = ?, `Countwt2` = ?, `Countwt3` = ?, `Countwt4` = ?, `Countwt5` = ?, width =?, `club`= ?, `designfile`= ?, `JobRate` = ? WHERE `Email` = ? AND `srno` = ?";
        connection.query(sqlput1, values, (err, result) => {
            if (err) return res.json({ message: "Error in the internal server" });
            return res.json({ message: "Added successfully" });
        });
    } else if (jacquardfilePath) {
        sqlput2 = "UPDATE `beaminward` SET `Date` = ?, `UID` = ?, `SetNo` = ?, `DesignNo` = ?, `WarpCount` = ?, `WeftCount` = ?, `Reed` = ?, `Pick` = ?, `SizingName` = ?, `SizingMtr` = ?, `Count1` = ?, `Count2` = ?, `Count3` = ?, `Count4` = ?, `Count5` = ?, `Countwt1` = ?, `Countwt2` = ?, `Countwt3` = ?, `Countwt4` = ?, `Countwt5` = ?, width =?, `club`= ?, `jacquardfile`= ?, `JobRate` = ? WHERE `Email` = ? AND `srno` = ?";
        connection.query(sqlput2, values2, (err, result) => {
            if (err) return res.json({ message: "Error in the internal server" });
            return res.json({ message: "Added successfully" });
        });
    } else {
        sqlput = "UPDATE `beaminward` SET `Date` = ?, `UID` = ?, `SetNo` = ?, `DesignNo` = ?, `WarpCount` = ?, `WeftCount` = ?, `Reed` = ?, `Pick` = ?, `SizingName` = ?, `SizingMtr` = ?, `Count1` = ?, `Count2` = ?, `Count3` = ?, `Count4` = ?, `Count5` = ?, `Countwt1` = ?, `Countwt2` = ?, `Countwt3` = ?, `Countwt4` = ?, `Countwt5` = ?, width =?, `club`= ?, `JobRate` = ? WHERE `Email` = ? AND `srno` = ?";
        connection.query(sqlput, values3, (err, result) => {
            if (err) return res.json({ message: "Error in the internal server" });
            return res.json({ message: "Added successfully" });
        });
    }
});



app.get('/productiondashboard', authenticateJWT, (req, res) => {
    const productiondashmail = req.session.uemail;

    const sql = `
WITH daily_totals AS (
    SELECT 
        DATE(date) AS date,
        ROUND(AVG(avrageeff), 0) AS aeff,
        ROUND(SUM(totalprice), 0) AS bill, 
        SUM(avragemtr) AS avragemtr
    FROM production
    WHERE MONTH(date) = MONTH(CURRENT_DATE())
      AND YEAR(date) = YEAR(CURRENT_DATE())
      AND Email = ?
    GROUP BY DATE(date)
)


SELECT 
    date,
    aeff, 
    bill, 
    avragemtr 
FROM daily_totals
ORDER BY date;`;

    connection.query(sql, [productiondashmail], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })
})





app.post("/sendotp", (req, res) => {
    const { email, newPin } = req.body;

    sendEmail7({ email, newPin })
        .then(response => res.json({message: "send"}))
        .catch(error => res.status(500).send(error.message));
});

function sendEmail7({ email, newPin }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "textilediwanji@gmail.com",
                pass: "cyuf nyev sugk tqos",
            },
        });

        const mailOptions = {
            from: "textilediwanji@gmail.com",
            to: email,
            subject: "OTP for Email Verification",
            html: `
                <p>This email contains an OTP for email verification.</p>
                <p>Your One Time Password (OTP) is: <strong>${newPin}</strong></p>
                <p>Best Regards</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return reject({ message: "An error occurred while sending the email" });
            }
            return resolve({ message: "send" });
        });
    });
}







app.get('/totalmtrinproduction', authenticateJWT, (req, res) => {
    const totalmtrpromail = req.session.uemail;

    const sql = `SELECT SUM(avragemtr) AS Totalmeter, SUM(totalprice) AS Totalprice FROM production WHERE MONTH(date) = MONTH(CURRENT_DATE())
    AND YEAR(date) = YEAR(CURRENT_DATE()) AND Email =?`;

    connection.query(sql, [totalmtrpromail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/billpending', authenticateJWT, (req, res) => {
    const billpendingmail = req.session.uemail;

    const sql = "SELECT * FROM `billing` WHERE Email =?";
    connection.query(sql, [billpendingmail], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })

})

app.post('/billpendingupdate', authenticateJWT, (req, res) => {
    const billpendingupdatemail = req.session.uemail;

    const { billNo, status } = req.body;

    const sql = "UPDATE `billing` SET status = ? WHERE billNo = ? AND Email =?";

    connection.query(sql, [status, billNo, billpendingupdatemail], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "updated" })
    })
})


app.get('/loomstatusdataforproduction', (req, res) => {
    const loomstatusemail = req.session.uemail;
    const sql = `SELECT *
FROM beaminward
INNER JOIN loomstatus
ON beaminward.DesignNo = loomstatus.designno 
WHERE beaminward.Email = ?`;

    connection.query(sql, [loomstatusemail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })

})



app.post('/packislipbeam', authenticateJWT, (req, res) => {
    const packslipbeaminfomail = req.session.uemail;
    const { designno } = req.body;

    const sql = `SELECT EXISTS(SELECT 1 FROM beaminward WHERE DesignNo =? AND Email =?) AS yes`;

    connection.query(sql, [designno, packslipbeaminfomail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.post('/billingdesignnofetch', authenticateJWT, (req, res) => {
    const packslipbeaminfomail = req.session.uemail;
    const { designNo } = req.body;

    const sql = `SELECT EXISTS(SELECT 1 FROM beaminward WHERE DesignNo =? AND Email =?) AS yes`;

    connection.query(sql, [designNo, packslipbeaminfomail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.post('/packslip', authenticateJWT, (req, res) => {
    const { date, packno, setno, designno, uid, rows, totalmtr, totalwt, totalrolls } = req.body;
    const mailpack = req.session.uemail;

    // Convert rows array to JSON string
    const packingdata = JSON.stringify(rows);

    // Insert the rows data into the database
    const sql = 'INSERT INTO `packingslip`(`Packingslipno`, `uid`, `Email`, `date`, `SetNo`, `DesignNo`, `packingdata`, `toalmtr`, `totalwt`, `totalrolls`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [packno, uid, mailpack, date, setno, designno, packingdata, totalmtr, totalwt, totalrolls], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Failed to insert data into database' });
            return;
        }
        //console.log('Data inserted successfully:', result);
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});


app.use(express.json()); // Middleware to parse JSON bodies

app.post('/loomstatus', authenticateJWT, (req, res) => {
    const loomstatusmail = req.session.uemail; // Assuming you have session handling middleware
    //console.log(`status done ${loomstatusmail}`);

    const { loomno, designno, uid, date } = req.body;

    const sql = "INSERT INTO `loomstatus`(`date`, `loomno`, `designno`, `uid`, `email`) VALUES (?, ?, ?, ?, ?)";

    connection.query(sql, [date, loomno, designno, uid, loomstatusmail], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err); // Return error response
        }
        return res.status(200).json({ message: "loomstatus" }); // Return success response
    });
});


app.get('/packslipnofetch', authenticateJWT, (req, res) => {
    const packslipnofetchmail = req.session.uemail;

    const sql = "SELECT * FROM `packingslip` WHERE Email =?";

    connection.query(sql, [packslipnofetchmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.get('/packingslipreport', authenticateJWT, (req, res) => {

    const packreportmail = req.session.uemail;
    //console.log(packreportmail);

    const sql = "SELECT * FROM `packingslip` WHERE `Email` =?";

    connection.query(sql, [packreportmail], (err, result) => {
        if (err) return res.json({ message: "err in the internal server" })
        return res.json(result);
    })
})

app.get('/getshiftdata', authenticateJWT, (req, res) => {
    const fetchshiftmail = req.session.uemail;

    const sql = "SELECT * FROM `shift` WHERE `Email` = ?";

    connection.query(sql, [fetchshiftmail], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(result);
    });
});

app.delete('/shiftdelete', authenticateJWT, (req, res) => {
    const shiftDeleteEmail = req.session.uemail;
    const srno = req.body.srno;
    const sql = "DELETE FROM `shift` WHERE Email = ? AND srno = ?";

    connection.query(sql, [shiftDeleteEmail, srno], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "shift deleted" });
    });
});

app.get('/shiftnumber', authenticateJWT, (req, res) => {
    const shiftnumbermail = req.session.uemail;

    const sql = "SELECT COUNT(sname) AS totalshift FROM shift WHERE Email = ?";

    connection.query(sql, [shiftnumbermail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
}
)

app.get('/loomstatusdata', authenticateJWT, (req, res) => {
    const loomstatusdatamail = req.session.uemail;

    const sql = `WITH indices AS (
    SELECT 0 AS idx UNION ALL 
    SELECT 1 UNION ALL 
    SELECT 2 UNION ALL 
    SELECT 3 UNION ALL 
    SELECT 4  
),


extracted_data AS (
    SELECT 
        JSON_UNQUOTE(JSON_EXTRACT(production.productiontable, CONCAT('$[', indices.idx, '].designno'))) AS extracted_designno,
        JSON_UNQUOTE(JSON_EXTRACT(production.productiontable, CONCAT('$[', indices.idx, '].mtr'))) AS extracted_mtr
    FROM 
        production
    JOIN 
        indices
    ON 
        production.Email = ?
    WHERE 
        JSON_EXTRACT(production.productiontable, CONCAT('$[', indices.idx, ']')) IS NOT NULL
)


SELECT 
    beaminward.*, 
    loomstatus.*, 
    SUM(CAST(extracted_data.extracted_mtr AS DECIMAL(10, 2))) AS totalmtr
FROM 
    beaminward
JOIN 
    loomstatus ON beaminward.DesignNo = loomstatus.designno
LEFT JOIN 
    extracted_data ON loomstatus.designno = extracted_data.extracted_designno
    AND extracted_data.extracted_designno IS NOT NULL  
WHERE 
    beaminward.Email = ? 
    AND loomstatus.email = ?
GROUP BY 
    beaminward.DesignNo, 
    loomstatus.designno`;

    connection.query(sql, [loomstatusdatamail, loomstatusdatamail, loomstatusdatamail], (err, result) => {
        if (err) return res.json({ message: "fail to connect with database" })
        return res.json(result);
    })


})

app.get('/beaminward', (req, res) => {

    const mymail = req.session.uemail;


    const sql = 'SELECT * FROM `beaminward` WHERE Email = ?';

    connection.query(sql, [mymail], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.put('/handleeditedsubmit/:srno', authenticateJWT, (req, res) => {
    const handleeditedsubmitmail = req.session.uemail;

    const srno = req.params.srno;

    const sql = "UPDATE `companyreg` SET `companyname`= ?,`personname`= ?,`companyaddress`= ?,`phoneno`= ?,`emailid`= ?,`gst`= ? WHERE `srno` = ? AND `Email` = ?";

    connection.query(sql, [req.body.name, req.body.person, req.body.address, req.body.phone, req.body.cemail, req.body.gst, srno, handleeditedsubmitmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "updated success" });
    })
})


app.put('/employeeattendanceedit/:srno', authenticateJWT, (req, res) => {
    const employeeattendanceeditmail = req.session.uemail;

    const srno = req.params.srno;

    const sql = "UPDATE `attendance` SET `date`= ?,`ename`= ?,`presentdays`= ?,`absentdays`= ?,`halfdays`= ? WHERE `srno` = ? AND `email` = ?";

    connection.query(sql, [req.body.date, req.body.name, req.body.presentdays, req.body.absentdays, req.body.halfdays, srno, employeeattendanceeditmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "employee attendance updated" })
    })
})




app.get('/getdesignnumber/data', authenticateJWT, (req, res) => {
    const getdesignnumbermail = req.session.uemail;

    const designnumber = req.query.dn

    const sql = "SELECT * FROM `beaminward` WHERE DesignNo = ? AND Email = ?";

    connection.query(sql, [designnumber, getdesignnumbermail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


app.get('/getdesignnumber2/data', authenticateJWT, (req, res) => {
    const getdesignnumbermail = req.session.uemail;

    const designnumber = req.query.dn

    const sql = "SELECT * FROM `beaminward` WHERE SetNo = ? AND Email = ?";

    connection.query(sql, [designnumber, getdesignnumbermail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.get('/getloomnumber/data', authenticateJWT, (req, res) => {
    const getloomnumbermail = req.session.uemail;

    const loomnumber = req.query.loomnumber;

    const sql = "SELECT * FROM `loomstatus` WHERE `loomno` = ? AND `email` = ?";

    connection.query(sql, [loomnumber, getloomnumbermail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})



app.put('/putbillnumberinpackingslip', authenticateJWT, (req, res) => {
    const putbillnumberinpackingslipmail = req.session.uemail;

    const srno = req.body.srno;
    const billnumber = req.body.billnumber;

    const status = "bill generated"

    const sql = "UPDATE `packingslip` SET `billstatus`= ?,`billnumber`= ? WHERE `serialno` =? AND `Email` = ?";

    connection.query(sql, [status, billnumber, srno, putbillnumberinpackingslipmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "bill status updated" })
    })
})


app.get('/fetchattendancedataforedit/:srno', authenticateJWT, (req, res) => {
    const fetchattendancedataforeditmail = req.session.uemail;

    const srno = req.params.srno;

    const sql = "SELECT * FROM `attendance` WHERE `srno` = ? AND `email` = ?"
    connection.query(sql, [srno, fetchattendancedataforeditmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

app.get('/packingprint/:id1/:id2', authenticateJWT, (req, res) => {
    const packingprintmail = req.session.uemail;
    const { id1, id2 } = req.params;

    const sql = `SELECT *
    FROM packingslip
    JOIN beaminward ON packingslip.Email = beaminward.Email
    JOIN companyreg ON beaminward.company = companyreg.companyname
    JOIN partyentry ON beaminward.party = partyentry.partyname
    WHERE packingslip.Packingslipno = ? AND beaminward.UID = ? AND beaminward.Email =? AND partyentry.Email=?`;

    connection.query(sql, [id1, id2, packingprintmail, packingprintmail], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});


app.get('/beaminward/:uid', authenticateJWT, (req, res) => {
    const { uid } = req.params;
    const selfemail = req.session.uemail; // Assuming uemail is the key for user's email in the session

    const query = `SELECT * FROM beaminward WHERE Email = ? AND UID = ?`;
    connection.query(query, [selfemail, uid], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});



// send packing slip to mail starts

// Backend Code
// const nodemailer = require("nodemailer");

app.post("/mailpackslip", authenticateJWT, (req, res) => {
    const sendmailpack = req.session.uemail;
    const { yesurl } = req.body;


    const maid = req.body.maid;


    sendPackmail({ recipientEmail: maid, yesurl })
        .then(() => res.send({ message: "Email sent successfully" }))
        .catch((error) => res.status(500).send({ message: "Failed to send email" }));
});

function sendPackmail({ recipientEmail, yesurl }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "textilediwanji@gmail.com",
                pass: "cyuf nyev sugk tqos",
            },
        });

        // Inline CSS styles for email body
        const emailStyle = `
        <style>
          /* Your CSS styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px;
          }
          .button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
          }
        </style>
      `;

        const mailConfigs = {
            from: "textilediwanji@gmail.com",
            to: recipientEmail,
            subject: "Packing slip",
            html: `
          <html>
            <head>
              <title>Packing Slip</title>
              ${emailStyle} <!-- Include inline CSS styles -->
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Packing Slip</h1>
                </div>
                <div class="content">
                  <p>This mail is for Downloading Packing slip</p>
                  <p>Url to download Packing slip: ${yesurl}</p>
                  <p>Best Regards</p>
                  <a href="${yesurl}" class="button">Download Packing Slip</a>
                </div>
              </div>
            </body>
          </html>
        `
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if (error) {
                console.error(error);
                return reject({ message: `An error occurred while sending email` });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}

// send packing slip to mail ends


// send bill starts here

app.post("/mailbill", authenticateJWT, (req, res) => {
    const sendmailpack = req.session.uemail;
    const { heyurl } = req.body;

    const sendmail = req.body.sendmail

    sendbill({ recipientEmail: sendmail, heyurl })
        .then(() => res.send({ message: "Email sent successfully" }))
        .catch((error) => res.status(500).send({ message: "Failed to send email" }));
});


function sendbill({ recipientEmail, heyurl }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "textilediwanji@gmail.com",
                pass: "cyuf nyev sugk tqos",
            },
        });

        // Inline CSS styles for email body
        const emailStyle = `
          <style>
            /* Your CSS styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 10px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .button {
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              display: inline-block;
              border-radius: 5px;
            }
          </style>
        `;

        const mailConfigs = {
            from: "textilediwanji@gmail.com",
            to: recipientEmail,
            subject: "Reconsilation slip",
            html: `
            <html>
              <head>
                <title>Reconsilation Slip</title>
                ${emailStyle} <!-- Include inline CSS styles -->
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Reconsilation Slip</h1>
                  </div>
                  <div class="content">
                    <p>This mail is for Downloading Reconsilation slip</p>
                    <p>Url to download Reconsilation slip: ${heyurl}</p>
                    <p>Best Regards</p>
                    <a href="${heyurl}" class="button">Download Reconsilation Slip</a>
                  </div>
                </div>
              </body>
            </html>
          `
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if (error) {
                console.error(error);
                return reject({ message: `An error occurred while sending email` });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}


// send bill ends here


// send reconsilation to mail starts

app.post("/mailreconsile", authenticateJWT, (req, res) => {
    const sendmailpack = req.session.uemail;
    const { heyurl } = req.body;

    const sendmail = req.body.sendmail

    sendReconsilemail({ recipientEmail: sendmail, heyurl })
        .then(() => res.send({ message: "Email sent successfully" }))
        .catch((error) => res.status(500).send({ message: "Failed to send email" }));
});

function sendReconsilemail({ recipientEmail, heyurl }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "textilediwanji@gmail.com",
                pass: "cyuf nyev sugk tqos",
            },
        });

        // Inline CSS styles for email body
        const emailStyle = `
          <style>
            /* Your CSS styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .header {
              background-color: #007bff;
              color: #fff;
              padding: 10px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .button {
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              display: inline-block;
              border-radius: 5px;
            }
          </style>
        `;

        const mailConfigs = {
            from: "textilediwanji@gmail.com",
            to: recipientEmail,
            subject: "Reconsilation slip",
            html: `
            <html>
              <head>
                <title>Reconsilation Slip</title>
                ${emailStyle} <!-- Include inline CSS styles -->
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Reconsilation Slip</h1>
                  </div>
                  <div class="content">
                    <p>This mail is for Downloading Reconsilation slip</p>
                    <p>Url to download Reconsilation slip: ${heyurl}</p>
                    <p>Best Regards</p>
                    <a href="${heyurl}" class="button">Download Reconsilation Slip</a>
                  </div>
                </div>
              </body>
            </html>
          `
        };

        transporter.sendMail(mailConfigs, function (error, info) {
            if (error) {
                console.error(error);
                return reject({ message: `An error occurred while sending email` });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}





// send reconsilation to mail ends



app.get('/reconsilation/:id', authenticateJWT, (req, res) => {

    const reconsilemail = req.session.uemail;

    const sql = "SELECT * FROM `beaminward` WHERE Email =? AND SetNo =?";

    connection.query(sql, [reconsilemail, req.params.id], (err, result) => {
        if (err) return res.json({ message: "err in the sql" })
        return res.json(result);
    })
})


// app.get('/packslip/:id', (req,res) => {

//     const paprintemailid = req.session.uemail;

//     const sql = "SELECT * FROM packingslip WHERE Email =? AND SetNo =?";

//     connection.query(sql, [paprintemailid, req.session.id], (err,result) => {
//         if(err) return res.json({message: "err in the database"})
//         return res.json(result);
//     })
// })



app.get('/packslip/:id/:id1', authenticateJWT, (req, res) => {
    //reconsilation packing slip data
    const packmail = req.session.uemail;

    const sql = "SELECT * FROM packingslip WHERE Email =? AND SetNo =? AND DesignNo =?";

    connection.query(sql, [packmail, req.params.id, req.params.id1], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.get('/packslip2/:id/:id1', authenticateJWT, (req, res) => {
    //reconsilation packing slip data
    const packmail = req.session.uemail;

    const sql = "SELECT * FROM packingslip WHERE Email =? AND SetNo =? ";

    connection.query(sql, [packmail, req.params.id], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.get('/packingslipedit/:id', authenticateJWT, (req, res) => {
    const packingslipeditmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `packingslip` WHERE Email =? AND Packingslipno =?";

    connection.query(sql, [packingslipeditmail, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})



const yarnstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './yarninwardimages');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});




const yarnupload = multer({ storage: yarnstorage });

app.post('/yarninward', yarnupload.single('file'), authenticateJWT, (req, res) => {
    const { setnumber, designnumber, date, yarnparty, count, party, weight } = req.body;
    const mailpack = req.session.uemail;

    const values = [
        setnumber,
        designnumber,
        date,
        yarnparty,
        count,
        party,
        weight,
        mailpack
    ];

    const fileValue = req.file ? req.file.filename : null;

    let sql;
    if (fileValue) {
        sql = 'INSERT INTO yarninward (setNo, Designno, date, yarnParty, count, party, weight, Email, filename) VALUES (?)';
        values.push(fileValue);
    } else {
        sql = 'INSERT INTO yarninward (setNo, Designno, date, yarnParty, count, party, weight, Email) VALUES (?)';
    }

    connection.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Failed to insert data into database' });
            return;
        }
        //console.log('Data inserted successfully:', result);
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.get('/yarninward/:id', authenticateJWT, (req, res) => {
    const yarnmail = req.session.uemail;

    const sql = "SELECT * FROM yarninward WHERE Email =? AND setNo =?";

    connection.query(sql, [yarnmail, req.params.id], (err, result) => {
        if (err) return res.json({ message: "database connection problem" })
        return res.json(result);
    })
})


app.get('/beaminwarduniqueidno', authenticateJWT, (req, res) => {
    const beaminwarduniqueidnomail = req.session.uemail;

    const sql = "SELECT * FROM `beaminward` WHERE Email = ? ";

    connection.query(sql, [beaminwarduniqueidnomail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.get('/billingprefixdata', authenticateJWT, (req, res) => {
    const billingprefixdatamail = req.session.uemail;

    const sql = "SELECT * FROM `billsetting` WHERE `date` <= CURDATE() AND `email` = ? ORDER BY `date` DESC LIMIT 1";

    connection.query(sql, [billingprefixdatamail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })


})

app.post('/billingsetting', authenticateJWT, (req, res) => {
    const billingsettingmail = req.session.uemail;

    const prefix = req.body.prefix;
    const suffix = req.body.suffix;
    const date = req.body.date;

    const sql = "INSERT INTO `billsetting`(`date`, `prefix`, `suffix`, `email`) VALUES (?, ?, ?, ?)";

    connection.query(sql, [date, prefix, suffix, billingsettingmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "data added" })
    })

})

app.get('/getprefix', authenticateJWT, (req, res) => {
    const getprefixmail = req.session.uemail;

    const sql = "SELECT * FROM `billsetting` WHERE `email` = ?";

    connection.query(sql, [getprefixmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.get('/billingreport/:id/:id1', authenticateJWT, (req, res) => {

    //this route is for reconsilation billing 
    const billreportemail = req.session.uemail;

    const sql = "SELECT * FROM `billing` WHERE Email =? AND setNo =? AND DesignNo =?";

    connection.query(sql, [billreportemail, req.params.id, req.params.id1], (err, result) => {
        if (err) return res.json({ message: "database connection problem" })
        return res.json(result);
    })
})









app.get('/setnumberwisereco/data', authenticateJWT, (req, res) => {
    const setnumberwiserecomail = req.session.uemail;

    const setnumber = req.query.setnumber;


    const sql = `SELECT b.*, 
       Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5 AS sum_of_countwt,
       ((Countwt1 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100) AS countwt1perc,
       ((Countwt2 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100) AS countwt2perc,
       ((Countwt3 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100) AS countwt3perc,
       ((Countwt4 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100) AS countwt4perc,
       ((Countwt5 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100) AS countwt5perc,

       COALESCE((((((b.Pick * b.width)/(b.Count1 * 1693.33)) + ((((b.Pick * b.width)/(b.Count1 * 1693.33)) / 100) * 5)) / 100) * (((Countwt1 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) AS totalwtforcount1,
       COALESCE((((((b.Pick * b.width)/(b.Count2 * 1693.33)) + ((((b.Pick * b.width)/(b.Count2 * 1693.33)) / 100) * 5)) / 100) * (((Countwt2 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) AS totalwtforcount2,
       COALESCE((((((b.Pick * b.width)/(b.Count3 * 1693.33)) + ((((b.Pick * b.width)/(b.Count3 * 1693.33)) / 100) * 5)) / 100) * (((Countwt3 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) AS totalwtforcount3,
       COALESCE((((((b.Pick * b.width)/(b.Count4 * 1693.33)) + ((((b.Pick * b.width)/(b.Count4 * 1693.33)) / 100) * 5)) / 100) * (((Countwt4 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) AS totalwtforcount4,
       COALESCE((((((b.Pick * b.width)/(b.Count5 * 1693.33)) + ((((b.Pick * b.width)/(b.Count5 * 1693.33)) / 100) * 5)) / 100) * (((Countwt5 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) AS totalwtforcount5,

       COALESCE((((((b.Pick * b.width)/(b.Count1 * 1693.33)) + ((((b.Pick * b.width)/(b.Count1 * 1693.33)) / 100) * 5)) / 100) * (((Countwt1 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) +
       COALESCE((((((b.Pick * b.width)/(b.Count2 * 1693.33)) + ((((b.Pick * b.width)/(b.Count2 * 1693.33)) / 100) * 5)) / 100) * (((Countwt2 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) +
       COALESCE((((((b.Pick * b.width)/(b.Count3 * 1693.33)) + ((((b.Pick * b.width)/(b.Count3 * 1693.33)) / 100) * 5)) / 100) * (((Countwt3 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) +
       COALESCE((((((b.Pick * b.width)/(b.Count4 * 1693.33)) + ((((b.Pick * b.width)/(b.Count4 * 1693.33)) / 100) * 5)) / 100) * (((Countwt4 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) +
       COALESCE((((((b.Pick * b.width)/(b.Count5 * 1693.33)) + ((((b.Pick * b.width)/(b.Count5 * 1693.33)) / 100) * 5)) / 100) * (((Countwt5 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) AS totalwt,
       SUM(p.toalmtr) AS totalmtrpack,

       COALESCE((((((b.Pick * b.width)/(b.Count1 * 1693.33)) + ((((b.Pick * b.width)/(b.Count1 * 1693.33)) / 100) * 5)) / 100) * (((Countwt1 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) *  SUM(p.toalmtr)  +
        COALESCE((((((b.Pick * b.width)/(b.Count2 * 1693.33)) + ((((b.Pick * b.width)/(b.Count2 * 1693.33)) / 100) * 5)) / 100) * (((Countwt2 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) *  SUM(p.toalmtr )  +
         COALESCE((((((b.Pick * b.width)/(b.Count3 * 1693.33)) + ((((b.Pick * b.width)/(b.Count3 * 1693.33)) / 100) * 5)) / 100) * (((Countwt3 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) *  SUM(p.toalmtr)  +
          COALESCE((((((b.Pick * b.width)/(b.Count4 * 1693.33)) + ((((b.Pick * b.width)/(b.Count4 * 1693.33)) / 100) * 5)) / 100) * (((Countwt4 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) *  SUM(p.toalmtr)  +
           COALESCE((((((b.Pick * b.width)/(b.Count5 * 1693.33)) + ((((b.Pick * b.width)/(b.Count5 * 1693.33)) / 100) * 5)) / 100) * (((Countwt5 / (Countwt1 + Countwt2 + Countwt3 + Countwt4 + Countwt5)) * 100))) , 0) *  SUM(p.toalmtr) AS alltotalwt5

FROM beaminward b
LEFT JOIN packingslip p ON b.DesignNo = p.DesignNo
WHERE b.Email = ? AND b.SetNo = ?
GROUP BY b.DesignNo, b.Email, b.SetNo, b.Countwt1, b.Countwt2, b.Countwt3, b.Countwt4, b.Countwt5, b.Pick, b.width`;


    connection.query(sql, [setnumberwiserecomail, setnumber], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })
})


























app.get('/reconsilationbeaminward/:id/:id1', authenticateJWT, (req, res) => {
    //this route id reconsilation beaminward summary route 
    const reconsilationbeaminwardmailsummary = req.session.uemail;
    const { id, id1 } = req.params;

    const sql = "SELECT * FROM `beaminward` WHERE Email =? AND SetNo =?  AND DesignNo =? "

    connection.query(sql, [reconsilationbeaminwardmailsummary, id, id1], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.get('/get_productiondata_for_edit/data', authenticateJWT, (req, res) => {
    const getproeditmail = req.session.uemail;

    const date = req.query.date;

    const sql = "SELECT * FROM `production` WHERE Email = ? AND date = ?";

    connection.query(sql, [getproeditmail, date], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


app.get('/getbeaminwarddatafordrawin', authenticateJWT, (req, res) => {
    const getbeaminwarddatafordrawinmail = req.session.uemail;

    const setnumber = req.query.setnumber;
    const designnumber = req.query.designnumber;


    const sql = "SELECT * FROM `beaminward` WHERE `SetNo` = ? AND `DesignNo` = ?  AND `Email` = ?";

    connection.query(sql, [setnumber, designnumber, getbeaminwarddatafordrawinmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


app.get('/get_productiondata_editone/:id', authenticateJWT, (req, res) => {
    const getprodonedednjkmail = req.session.uemail;

    const id = req.params.id;

    const sql = "SELECT * FROM `production` WHERE Email = ? AND srno = ?";

    connection.query(sql, [getprodonedednjkmail, id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})



app.delete('/bankdetaildelete/:id', authenticateJWT, (req, res) => {
    const bankdedelemail = req.session.uemail;



    const companyde = req.params.id;

    const sql = "DELETE FROM `companybankdetails` WHERE `srno` = ? AND `Email` = ?";

    connection.query(sql, [companyde, bankdedelemail], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "bank details deleted" })
    })
})

app.get("/attendancedata/data", authenticateJWT, (req, res) => {
    const attendancedatamail = req.session.uemail;

    const startdate = req.query.startdate;
    const enddate = req.query.enddate;

    const sql = "SELECT * FROM attendance WHERE date >= ? AND date <= ? AND email = ?";

    connection.query(sql, [startdate, enddate, attendancedatamail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })
})



app.post('/billingpost', authenticateJWT, (req, res) => {
    const { date } = req.body;
    const userDate = new Date(date);
    const billingFetchEmail = req.session.umail;

    const sql = "SELECT `date` FROM `billing` WHERE Email = ?";
    connection.query(sql, [billingFetchEmail], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database query error' });
        }

        const isInvalidDate = results.some(bill => new Date(bill.date) >= userDate);
        if (isInvalidDate) {
            return res.status(400).json({ message: "Date cannot be earlier than or equal to existing record dates" });
        }





        const { billno, setNo, designno, rows, Uid, selectedOption, totalmtr, totalquantity, billpackingslipno, cgst, sgst, othergst, bankselected, prefix, suffix } = req.body;
        const mailpack = req.session.uemail;




        const sqlInsert = 'INSERT INTO `billing` (`billNo`, `SetNo`, `DesignNo`, `tableData`, `Email`, `date`, `UID`, `partyname`, `totalmeters`, `totalquantity`, `billpackingslipno`, `Totalcgst`, `Totalsgst`, `Totaligst`, `bankname`, `prefix`, `suffix`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const tableDataString = JSON.stringify(rows); // Convert rows data to JSON string

        const values = [billno, setNo, designno, tableDataString, mailpack, date, Uid, selectedOption, totalmtr, totalquantity, billpackingslipno, cgst, sgst, othergst, bankselected, prefix, suffix];

        connection.query(sqlInsert, values, (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting data:', insertErr);
                return res.status(500).json({ message: 'Failed to insert data into database' });
            }
            res.status(200).json({ message: 'Data inserted successfully' });
        });

    });
});






app.post('/employee', authenticateJWT, (req, res) => {
    const employeemail = req.session.uemail;

    const { Date, Employeename, Employeenumber, Designation, Employeefunction, Location, Gender, Address, Phoneno, Salaryday, Salaryhour, Monthsalaryfix } = req.body;

    const sql = "INSERT INTO `employee`(`date`, `ename`, `enumber`, `designation`, `efunction`, `location`, `gender`, `address`, `phoneno`, `salaryday`, `salaryhour`, `monthsalaryfix`, `email`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(sql, [Date, Employeename, Employeenumber, Designation, Employeefunction, Location, Gender, Address, Phoneno, Salaryday, Salaryhour, Monthsalaryfix, employeemail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "employee added" })
    })
})

app.get('/getemployee', authenticateJWT, (req, res) => {
    const getemployeemail = req.session.uemail;

    const sql = `SELECT 
    e.*, 
    COALESCE(SUM(a.advanceamount) - SUM(a.receivedamount), 0) AS Advance
FROM 
    employee e
LEFT JOIN 
    employeeadvance a 
ON 
    e.enumber = a.employeesrno
    AND e.email = a.email  
WHERE 
    e.email = ?
GROUP BY 
    e.enumber;`;

    connection.query(sql, [getemployeemail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.post('/addattendance', authenticateJWT, (req, res) => {
    const addattendancemail = req.session.uemail;

    const { Date, option, present, absent, half } = req.body;

    const sql = "INSERT INTO `attendance`(`date`, `ename`, `presentdays`, `absentdays`, `halfdays`, `email`) VALUES (?,?,?,?,?,?)";

    connection.query(sql, [Date, option, present, absent, half, addattendancemail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "attendance added" });

    })
})





app.delete('/billdelete/:id', authenticateJWT, (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM `billing` WHERE srno =?";

    connection.query(sql, [id], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "bill deleted" })
    })
});



app.get('/billing', authenticateJWT, (req, res) => {

    const billmail = req.session.uemail;

    const sql = "SELECT * FROM billing WHERE Email =?";

    connection.query(sql, [billmail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })

        return res.json(result);


    })
})


app.get('/packdatafetch', authenticateJWT, (req, res) => {
    const packdataquerymail = req.session.uemail;

    const { query1, query2 } = req.query;

    if (!query1 || !query2) {
        return res.status(400).json({ error: 'Both query1 and query2 are required.' });
    }

    const sql = "SELECT * FROM packingslip WHERE Email =? AND Packingslipno =? AND uid =?";

    connection.query(sql, [packdataquerymail, query1, query2], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })
})

app.get('/packingdata', authenticateJWT, (req, res) => {
    const pppdata = req.session.uemail;
    const { query1, query2 } = req.query;

    const sql = "SELECT * FROM packingslip WHERE Packingslipno = ? AND uid = ? AND Email = ? ";

    connection.query(sql, [query1, query2, pppdata], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});


app.get('/billedit/:id', authenticateJWT, (req, res) => {


    const { id } = req.params;

    const sql = "SELECT * FROM `billing` WHERE `srno` =?";

    connection.query(sql, [id], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.put('/updatestatus', authenticateJWT, (req, res) => {
    const updatestatusmail = req.session.uemail;

    const srnumber = req.query.srnumber;
    const status = req.body.status;



    const sql = "UPDATE `beaminward` SET `beamstatus`= ? WHERE `srno` = ? AND Email = ?";

    connection.query(sql, [status, srnumber, updatestatusmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "updated status" });
    })

})



app.put('/packslipstatus', authenticateJWT, (req, res) => {
    const packslipstatusmail = req.session.uemail;

    const status = req.body.status;

    const setnumber = req.query.setnumber;
    const designnumber = req.query.designnumber;

    const sql = "UPDATE `beaminward` SET `beamstatus`= ? WHERE `SetNo` = ? AND `DesignNo` = ? AND Email = ?";

    connection.query(sql, [status, setnumber, designnumber, packslipstatusmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "status updated" })
    })
})

app.put('/dispatchedstatus', authenticateJWT, (req, res) => {
    const dispatchedstatusmail = req.session.uemail;

    const status = req.body.status;
    const setnumber = req.query.setnumber;
    const designnumber = req.query.designnumber;

    const sql = "UPDATE `beaminward` SET `beamstatus`= ? WHERE `SetNo` = ? AND `DesignNo` = ? AND Email = ?";

    connection.query(sql, [status, setnumber, designnumber, dispatchedstatusmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "status updated" })
    })
})


app.get('/loomstatusget/:id', authenticateJWT, (req, res) => {
    const loomstatusgetmail = req.session.uemail;

    const { id } = req.params;

    const sql = "SELECT * FROM `loomstatus` WHERE `email` = ? AND `designno` = ?"

    connection.query(sql, [loomstatusgetmail, id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

app.put('/loomstatusupdate/:id', authenticateJWT, (req, res) => {
    const loomstatusupdatemail = req.session.uemail;

    const { id } = req.params;

    const { loom, design, ud, loomindate } = req.body;


    const sql = "UPDATE `loomstatus` SET `loomno`= ?,`designno`= ?,`uid`= ?, `date` = ? WHERE `designno` = ? and `email` = ?"

    connection.query(sql, [loom, design, ud, loomindate, id, loomstatusupdatemail], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "loom status updated" })
    })
})

app.put('/billingedit/:id', authenticateJWT, (req, res) => {

    const { id } = req.params;

    const {
        newdate,
        billNo,
        designno,
        setNo,

        tabledata,
        Uid,
        selectedOption,
        totalmtr,
        totalquantity,
        billpackingslipno,
        cgst,
        sgst,
        othergst,
        bankselect
    } = req.body;

    const tabledata1 = JSON.stringify(tabledata);

    const sql = "UPDATE `billing` SET  `billNo`= ?, `SetNo`= ?, `DesignNo`= ?, `tableData`= ?,  `date`= ?, `UID`= ?, `partyname`= ?, `totalmeters`= ? ,`totalquantity`= ? ,`billpackingslipno`= ? ,`Totalcgst`= ? ,`Totalsgst`= ? ,`Totaligst`= ?, `bankname` = ?  WHERE srno =? ";

    connection.query(sql, [billNo, setNo, designno, tabledata1, newdate, Uid, selectedOption, totalmtr, totalquantity, billpackingslipno, cgst, sgst, othergst, bankselect, id], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "bill updated" })
    })

})


app.get('/bankdetailsforbill', authenticateJWT, (req, res) => {
    const bankdebill = req.session.uemail;

    const mybank = req.query.bankname

    // const { banks } = req.body;
    //console.log(mybank)


    const sql = "SELECT * FROM `companybankdetails` WHERE `bankname` = ? AND `Email` = ?";

    connection.query(sql, [mybank, bankdebill], (err, result) => {
        if (err) return res.json({ message: "fail to connect with database" })
        return res.json(result);
    })
})

app.post('/companybankdetails', authenticateJWT, (req, res) => {
    const companybankdemail = req.session.uemail;

    const {
        bankname,
        accountno,
        branch,
        ifsccode,
        bankaddress
    } = req.body;

    const sql = "INSERT INTO `companybankdetails`(`bankname`, `accountno`, `branch`, `ifsccode`, `bankaddress`, `Email`) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(sql, [bankname, accountno, branch, ifsccode, bankaddress, companybankdemail], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "data submmited" })
    })

})


app.get('/companybankdetails', authenticateJWT, (req, res) => {
    const companyfetchbankmail = req.session.uemail;

    const sql = "SELECT * FROM `companybankdetails` WHERE Email =?";

    connection.query(sql, [companyfetchbankmail], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })


})

app.get('/companybankedit/:id', authenticateJWT, (req, res) => {
    const companyeditbankmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `companybankdetails` WHERE Email =? AND srno =?";

    connection.query(sql, [companyeditbankmail, id], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })
})


app.put('/companybanked/:id', authenticateJWT, (req, res) => {
    const { id } = req.params;

    const { bankname, accountno, branch, ifsccode, bankaddress } = req.body;

    const sql = "UPDATE `companybankdetails` SET `bankname`=? ,`accountno`=? ,`branch`=? ,`ifsccode`=? ,`bankaddress`=?  WHERE srno =?";

    connection.query(sql, [bankname, accountno, branch, ifsccode, bankaddress, id], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "Bank details updated" });
    })
})


app.get('/partyedit/:id', authenticateJWT, (req, res) => {
    const getpartyeditmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `partyentry` WHERE Email =? AND srno =?";

    connection.query(sql, [getpartyeditmail, id], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    })
})

app.put('/partyedit/:id', authenticateJWT, (req, res) => {
    const putpartyeditmail = req.session.uemail;
    const { partyname, personname, address, gst, phoneno } = req.body;
    const { id } = req.params;

    const sql = "UPDATE `partyentry` SET `partyname`=?,`personname`=?,`address`=?,`gst`=?,`phoneno`=? WHERE Email =? AND srno =?";

    connection.query(sql, [partyname, personname, address, gst, phoneno, putpartyeditmail, id], (err, result) => {
        if (err) return res.json(err)

        return res.json({ message: "party updated" })
    })
})

app.delete('/partydelete/:id', authenticateJWT, (req, res) => {
    const partydeletemail = req.session.uemail;
    const { id } = req.params;

    const sql = "DELETE FROM `partyentry` WHERE Email =? AND srno =?";

    connection.query(sql, [partydeletemail, id], (err, result) => {
        if (err) return res.json(err)

        return res.json({ message: "party deleted" });
    })

})

app.get('/getpassword', authenticateJWT, (req, res) => {
    const getpasswordmail = req.session.uemail;

    const sql = "SELECT * FROM `customer` WHERE Email =?"

    connection.query(sql, [getpasswordmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.put('/recoverpassword', authenticateJWT, (req, res) => {
    const recoverypassmail = req.session.uemail;
    const { password } = req.body;

    const sql = "UPDATE `customer` SET `Password` =? WHERE Email =?";
    connection.query(sql, [password, recoverypassmail], (err, result) => {
        if (err) return res.json(err)

        return res.json({ message: "Password changed" })
    })
})


app.get('/billingreport', authenticateJWT, (req, res) => {

    const billreportemail = req.session.uemail;

    const sql = "SELECT * FROM `billing` WHERE `Email` =?";


    connection.query(sql, [billreportemail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })



})

app.post('/production', authenticateJWT, (req, res) => {
    const productionmail = req.session.uemail;

    const {
        date,
        rows,
        avpick,
        avgwarpbr,
        avgweftbr,
        avrageeff,
        avragejobrate,
        avragemtr,
        totalprice
    } = req.body;

    const prodata = JSON.stringify(rows);

    const sql = "INSERT INTO `production`(`date`, `productiontable`, `Email`, `avragepick`, `avragewarpbreak`, `avrageweftbreak`, `avrageeff`, `avragejobrate`, `avragemtr`, `totalprice`) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?, ? )";

    connection.query(sql, [date, prodata, productionmail, avpick, avgwarpbr, avgweftbr, avrageeff, avragejobrate, avragemtr, totalprice], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: "production inserted" })
    })



})

app.get('/production', (req, res) => {

    const prodmail = req.session.uemail;

    const sql = "SELECT * FROM `production` WHERE Email = ?"

    connection.query(sql, [prodmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


app.put('/productioneditput/:id', authenticateJWT, (req, res) => {
    const productioneditputmail = req.session.uemail;

    const id = req.params.id;

    const {
        date,
        rows,
        avpick,
        avgwarpbr,
        avgweftbr,
        avrageeff,
        avragejobrate,
        avragemtr,
        totalprice
    } = req.body;

    const prodata = JSON.stringify(rows);

    const sql = "UPDATE `production` SET `date`= ?,`productiontable`= ?, `avragepick`= ?,`avragewarpbreak`= ?,`avrageweftbreak`= ?,`avrageeff`= ?,`avragejobrate`= ?,`avragemtr`= ? ,`totalprice`= ? WHERE srno = ? AND Email = ?";


    connection.query(sql, [date, prodata, avpick, avgwarpbr, avgweftbr, avrageeff, avragejobrate, avragemtr, totalprice, id, productioneditputmail], (err, result) => {
        if (err) return res.json(err)
        //console.log("production updated")
        return res.json({ message: "production updated" });

    })
})


app.post('/production2', authenticateJWT, (req, res) => {
    const production2mail = req.session.uemail;
    const { date, rows } = req.body;

    // Example: Insert data into MySQL table
    const sql = 'INSERT INTO `production2` (date, shift, loomno, setno, designno, pick, wpbr, wfbr, eff, jobrate, price, mtr, totalprice, email) VALUES ?';

    // Format rows data into an array of arrays for bulk insert
    const values = rows.map(row => [
        date,
        row.shift,
        row.loomno,
        row.setno,
        row.designno,
        row.pick,
        row.wpbr,
        row.wfbr,
        row.eff,
        row.jobrate,
        row.price,
        row.mtr,
        row.totalprice,
        production2mail

    ]);

    // Execute the SQL query
    connection.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }

        //console.log('Data inserted successfully');
        res.json({ message: "data insrted" });
    });
});


app.post('/updatePackingslipStatus', authenticateJWT, (req, res) => {

    const updatepackingslipstatusmail = req.session.uemail;
    const { billpackingslipno } = req.body;

    // Check if billpackingslipno is provided
    if (!billpackingslipno) {
        return res.status(400).json({ message: "billpackingslipno is required" });
    }

    // Update the packingslip status to 'yes' for the provided billpackingslipno
    connection.query('UPDATE packingslip SET status = ? WHERE Packingslipno = ? AND Email =?', ['yes', billpackingslipno, updatepackingslipstatusmail], (error, results) => {
        if (error) {
            console.error("Error updating packingslip status:", error);
            return res.status(500).json({ message: "Error updating packingslip status" });
        }

        //console.log("Packingslip status updated successfully!");
        return res.status(200).json({ message: "Packingslip status updated successfully!" });
    });
});

app.get('/designwisemtr', authenticateJWT, (req, res) => {
    const designwisemtrmail = req.session.uemail;

    const sql = "SELECT * FROM  production WHERE Email =?";

    connection.query(sql, [designwisemtrmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/api/production/reports', authenticateJWT, (req, res) => {
    const dailypromail = req.session.uemail;

    const { date } = req.query;

    const sql = "SELECT * FROM `production` WHERE Email =? AND date =?";
    connection.query(sql, [dailypromail, date], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/payroll/report', authenticateJWT, (req, res) => {
    const payrollmail = req.session.uemail;
    const { startdate, enddate } = req.query;

    const sql = `SELECT 
    a.srno, a.date, a.ename, a.presentdays, a.absentdays, a.halfdays, a.email,
    e.srno AS employee_srno, e.enumber, e.designation, e.efunction, e.location, e.gender, e.address, e.phoneno, e.salaryday, e.salaryhour, e.monthsalaryfix, 
    a.presentdays * e.salaryday AS total_salary, e.monthsalaryfix AS totalfixsalary,
    COALESCE(SUM(adv.advanceamount), 0) AS total_advance_amount,
    COALESCE(SUM(adv.receivedamount), 0) AS total_received_amount,
    COALESCE(SUM(adv.advanceamount), 0) - COALESCE(SUM(adv.receivedamount), 0) AS balance_amount

FROM attendance a
JOIN employee e ON a.ename = e.ename
LEFT JOIN employeeadvance adv ON e.srno = adv.employeesrno
WHERE a.date >= ? AND a.date <= ?
AND a.email = ?
GROUP BY a.srno, a.date, a.ename, a.presentdays, a.absentdays, a.halfdays, a.email,
         e.srno, e.enumber, e.designation, e.efunction, e.location, e.gender, e.address, e.phoneno, e.salaryday, e.salaryhour, e.monthsalaryfix, total_salary, totalfixsalary`;

    connection.query(sql, [startdate, enddate, payrollmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.get('/payslip/:id/:id1/:id2', authenticateJWT, (req, res) => {
    const payslipmail = req.session.uemail;



    const id = req.params.id;
    const id1 = req.params.id1;
    const id2 = req.params.id2;

    const sql = `SELECT 
    a.srno, a.date, a.ename, a.presentdays, a.absentdays, a.halfdays, a.email,
    e.srno AS employee_srno, e.enumber, e.designation, e.efunction, e.location, e.gender, e.address, e.phoneno, e.salaryday, e.salaryhour, e.monthsalaryfix, 
    a.presentdays * e.salaryday AS total_salary, e.monthsalaryfix AS totalfixsalary,
    COALESCE(SUM(adv.advanceamount), 0) AS total_advance_amount,
    COALESCE(SUM(adv.receivedamount), 0) AS total_received_amount,
    COALESCE(SUM(adv.advanceamount), 0) - COALESCE(SUM(adv.receivedamount), 0) AS balance_amount

FROM attendance a
JOIN employee e ON a.ename = e.ename
LEFT JOIN employeeadvance adv ON e.srno = adv.employeesrno
WHERE a.date >= ? AND a.date <= ?
AND a.email = ? AND e.enumber = ?
GROUP BY a.srno, a.date, a.ename, a.presentdays, a.absentdays, a.halfdays, a.email,
         e.srno, e.enumber, e.designation, e.efunction, e.location, e.gender, e.address, e.phoneno, e.salaryday, e.salaryhour, e.monthsalaryfix, total_salary, totalfixsalary;`;

    connection.query(sql, [id1, id2, payslipmail, id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.get('/employeeedit/:id', authenticateJWT, (req, res) => {
    const employeditmail = req.session.uemail;
    const id = req.params.id;

    const sql = "SELECT * FROM `employee` WHERE `srno` =? AND `email` =?"

    connection.query(sql, [id, employeditmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })


})

app.put('/employeeeditput/:id', authenticateJWT, (req, res) => {
    const emeditputmail = req.session.uemail;
    const id = req.params.id;

    const {
        date,
        employeename,
        employeenumber,
        designation,
        efunction,
        location,
        gender,
        address,
        phoneno,
        salaryday,
        salaryhour,
        monthsalaryfix
    } = req.body;

    const sql = "UPDATE `employee` SET `date`= ?, `ename`= ?, `enumber`= ?, `designation`= ?, `efunction`= ?, `location`= ?, `gender`= ?, `address`= ?, `phoneno`= ?, `salaryday`= ?, `salaryhour`= ?, `monthsalaryfix`= ? WHERE `srno` = ? AND `email` = ?";


    connection.query(sql, [date, employeename, employeenumber, designation, efunction, location, gender, address, phoneno, salaryday, salaryhour, monthsalaryfix, id, emeditputmail], (err, result) => {
        if (err) {
            //console.log(err);
            return res.status(500).json(err); // Handle errors properly
        }
        return res.json({ message: "Employee data updated" });
    });
});


app.delete('/employeedelete/:id', authenticateJWT, (req, res) => {
    const employeedeletemail = req.session.uemail;

    const id = req.params.id;

    const sql = "DELETE FROM `employee` WHERE `srno` =? AND `email` =? ";

    connection.query(sql, [id, employeedeletemail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "employee deleted" })
    })
})


app.delete('/employeeadvancedelete/:id', authenticateJWT, (req, res) => {
    const employeeaddelete = req.session.uemail;

    const id = req.params.id;

    const sql = "DELETE FROM `employeeadvance` WHERE `advancestno` =? AND `email` =?";

    connection.query(sql, [id, employeeaddelete], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "deleted" })
    })
})




app.post('/giveadvance', authenticateJWT, (req, res) => {
    const giveadvancemail = req.session.uemail;

    const { advancedate, esrno, adamount } = req.body;

    const sql = "INSERT INTO `employeeadvance`(`employeesrno`, `advanceamount`, `date`, `email`) VALUES (?,?,?,?)";

    connection.query(sql, [esrno, adamount, advancedate, giveadvancemail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "advance given" })
    })
})


app.post('/receivedamount', authenticateJWT, (req, res) => {
    const giveadvancemail = req.session.uemail;

    const { receivedate, esrno, reamount } = req.body;

    const sql = "INSERT INTO `employeeadvance`(`employeesrno`, `receivedamount`, `date`, `email`) VALUES (?,?,?,?)";

    connection.query(sql, [esrno, reamount, receivedate, giveadvancemail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "amount received" })
    })
})

app.get('/datewisebillingreport/data', authenticateJWT, (req, res) => {
    const datewisebillingreportmail = req.session.uemail;

    const startdate = req.query.startdate;
    const enddate = req.query.enddate;

    const sql = "SELECT * FROM billing WHERE date >= ? AND date <= ? AND Email = ?"

    connection.query(sql, [startdate, enddate, datewisebillingreportmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

app.get('/advancereport/data', authenticateJWT, (req, res) => {
    const advancereportmail = req.session.uemail;



    const id = req.query.id;
    const startdate = req.query.startdate;
    const enddate = req.query.enddate;

    const sql = `SELECT * FROM employeeadvance WHERE date >= ? AND date <= ? AND email = ? AND employeesrno = ?`;

    connection.query(sql, [startdate, enddate, advancereportmail, id], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })

})


app.post('/drawinpost', authenticateJWT, (req, res) => {
    const drawinpostmail = req.session.uemail;


    const {
        date,
        setno,
        designno,
        drawinprice,
        reedpprice,
        note
    } = req.body



    const sql = "UPDATE `beaminward` SET `drawindate`= ?,`drawinprice`= ?,`reedprice`= ?, `note` = ? WHERE `SetNo` =? AND `DesignNo` =? AND `Email` =? ";

    connection.query(sql, [date, drawinprice, reedpprice, note, setno, designno, drawinpostmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "drawin added successfully" })
    })
})


app.get('/getdrawindata/data', authenticateJWT, (req, res) => {
    const drawindatamail = req.session.uemail;

    const startdate = req.query.startdate;
    const enddate = req.query.enddate;

    const sql = "SELECT * FROM `beaminward` WHERE drawindate >= ? AND drawindate <= ? AND Email = ?";

    connection.query(sql, [startdate, enddate, drawindatamail], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});




app.get('/getemployeedetails/:id', authenticateJWT, (req, res) => {
    const getemployeemail = req.session.uemail;

    const { id } = req.params;

    const sql = "SELECT * FROM `employee` WHERE `srno` = ? AND email = ?";

    connection.query(sql, [id, getemployeemail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

app.get('/productionmonthly/reports', authenticateJWT, (req, res) => {
    const monthlypromail = req.session.uemail;

    const { startdate, enddate } = req.query;

    const sql = `SELECT AVG(avragepick) AS avg_pick, AVG(avragewarpbreak) AS avragewarp, AVG(avrageweftbreak) AS avrageweft, AVG(avrageeff) AS avrageeff, AVG(avragejobrate) AS avragejobrate, SUM(totalprice) AS totalPrice 
FROM production
WHERE date >= ? AND date <= ? 
AND email = ?`;

    connection.query(sql, [startdate, enddate, monthlypromail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

app.get('/bankdetails', authenticateJWT, (req, res) => {
    const bankdetailsmail = req.session.uemail;

    const sql = "SELECT * FROM `companybankdetails` WHERE Email =?";

    connection.query(sql, [bankdetailsmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/billreport2', authenticateJWT, (req, res) => {
    const breportmail2 = req.session.uemail;
    const sql = 'SELECT SUM(Amount) AS total_amount FROM billing  WHERE `Email` =? AND MONTH(`Date`) = MONTH(CURRENT_DATE())';

    connection.query(sql, [breportmail2], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })

})

app.get('/totalcompany', authenticateJWT, (req, res) => {
    const totalcompanymail = req.session.uemail;

    const sql = `SELECT COUNT(companyname) AS totalcompany FROM companyreg WHERE Email = ?`;

    connection.query(sql, [totalcompanymail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/totalbanks', authenticateJWT, (req, res) => {
    const totalbanksmail = req.session.uemail;

    const sql = "SELECT COUNT(ifsccode) AS totalbanks FROM companybankdetails WHERE Email = ?";

    connection.query(sql, [totalbanksmail], (err, result) => {
        if (err) return res.json({ message: "fail to connect with database" })
        return res.json(result);
    })
})


app.get('/totalparty', authenticateJWT, (req, res) => {
    const totalpartymail = req.session.uemail;

    const sql = `SELECT COUNT(partyname) AS totalparty FROM partyentry WHERE Email = ?`;

    connection.query(sql, [totalpartymail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.get('/billingbankdetails', authenticateJWT, (req, res) => {
    const billingbankdetailmail = req.session.uemail;

    const sql = "SELECT * FROM `companybankdetails` WHERE `Email` =?";

    connection.query(sql, [billingbankdetailmail], (err, result) => {
        if (err) return res.json({ message: "fail to connection with database" })
        return res.json(result);
    })
})


app.post('/addshift', authenticateJWT, (req, res) => {
    const addshiftmail = req.session.uemail;
    const { shiftname } = req.body;

    const sql = "INSERT INTO `shift`(`sname`, `Email`) VALUES (? ,? )";

    connection.query(sql, [shiftname, addshiftmail], (err, result) => {
        if (err) return res.json(err)

        return res.json({ message: "shift added" })


    })
})


app.get('/totaladvancetaken/:id', authenticateJWT, (req, res) => {
    const totaladvancetakenmail = req.session.uemail;
    const id = req.params.id;


    const sql = "SELECT SUM(advanceamount) AS totaladvance, SUM(receivedamount) AS receivedadvance FROM employeeadvance WHERE employeesrno = ? AND email = ?"

    connection.query(sql, [id, totaladvancetakenmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })


})


app.get('/fabricpendingreportdata', authenticateJWT, (req, res) => {
    const mail = req.session.uemail;

    const sql = `SELECT  b.*,
    COALESCE(SUM(p.toalmtr), 0) AS Dispatchedmtr,
    COALESCE((SUM(p.toalmtr) / NULLIF(b.SizingMtr, 0)) * 100, 0) AS fabricpercentage,
    DATEDIFF(CURDATE(), b.Date) AS datediff
FROM 
    beaminward b
LEFT JOIN 
    packingslip p
ON 
    b.SetNo = p.SetNo 
    AND b.DesignNo = p.DesignNo
WHERE 
    b.Email = ?
GROUP BY 
    b.SetNo, b.DesignNo;`

    connection.query(sql, [mail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/readytodispatchmis', authenticateJWT, (req, res) => {
    const readytodispatchmail = req.session.uemail;

    const sql = `
    SELECT * 
FROM beaminward 
WHERE beamstatus IN ("Ready to dispatch", "Under mending") 
  AND Email = ?

    `;

    connection.query(sql, [readytodispatchmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})











app.get('/beamstatusreportmis', authenticateJWT, (req, res) => {
    const beamdrawinpending = req.session.uemail;

    const sql = "SELECT * FROM beaminward WHERE Email = ? AND beamstatus IN ('on floor', 'under drawin', 'drawin completed')";

    connection.query(sql, [beamdrawinpending], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.get('/beamdrawinpending', authenticateJWT, (req, res) => {
    const beamdrawinpending = req.session.uemail;

    const sql = "SELECT * FROM `beaminward` WHERE (`drawinprice` < 1 OR `drawinprice` IS NULL) AND `Email` = ? AND `club` = 'nonclub'";

    connection.query(sql, [beamdrawinpending], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.get('/bill2', authenticateJWT, (req, res) => {
    const bill2mail = req.session.uemail;

    const sql = `SELECT COUNT(status) AS pending 
    FROM billing 
    WHERE status = 'unpaid' AND Email =?;`;

    connection.query(sql, [bill2mail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

app.get('/billprint/:id', authenticateJWT, (req, res) => {
    const billprintemailid = req.session.uemail;

    const sql = "SELECT * FROM billing WHERE Email =? AND billNo =?";

    connection.query(sql, [billprintemailid, req.params.id], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })

})

app.get('/billprint2/:srno', authenticateJWT, (req, res) => {
    const billprintemailid = req.session.uemail;

    const sql = "SELECT * FROM billing WHERE Email =? AND srno =?";

    connection.query(sql, [billprintemailid, req.params.srno], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })

})





app.get('/companyreport', authenticateJWT, (req, res) => {
    const comrepoemail = req.session.uemail;

    const sql = "SELECT * FROM `companyreg` WHERE Email =?";

    connection.query(sql, [comrepoemail], (err, result) => {
        if (err) return res.json({ message: "Err in the database connection" })
        // res.send(result);
        return res.json(result);
    })

})

app.get('/companyedit/:id', authenticateJWT, (req, res) => {
    const comeditemail = req.session.uemail;


    const sql = "SELECT * FROM `companyreg` WHERE Email =? AND companyname =?";

    connection.query(sql, [comeditemail, req.params.id], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})


app.post('/party', authenticateJWT, (req, res) => {
    const pertyemailid = req.session.uemail;
    const values = [
        pertyemailid,
        req.body.partyname,
        req.body.personname,
        req.body.address,
        req.body.gst,
        req.body.phoneno
    ];

    const sql = "INSERT INTO `partyentry` (`Email`, `partyname`, `personname`, `address`, `gst`, `phoneno`) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, values, (err, result) => {
        if (err) {
            //console.log(err);
            return res.json({ message: "Error in the database connection" });

        }
        return res.json({ message: "Data inserted" });
    });
});



app.get('/party', authenticateJWT, (req, res) => {
    const partemailid = req.session.uemail;
    // const selectedOption = req.query.selectedOption;

    const sql = "SELECT * FROM partyentry WHERE Email =?";

    connection.query(sql, [partemailid], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.get('/party', authenticateJWT, (req, res) => {
    const partyname = req.query.partyname;
    //console.log(partyname);
    let query = 'SELECT * FROM partyentry';
    if (partyname) {
        // Use parameterized query to prevent SQL injection
        query += ' WHERE partyname = ?';
        db.query(query, [partyname], (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching party data' });
            } else {
                res.json(results);
            }
        });
    } else {
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Error fetching party data' });
            } else {
                res.json(results);
            }
        });
    }
});



app.get('/billprint', authenticateJWT, (req, res) => {
    const partyname = req.query.partyname;
    const emailpartycompany = req.session.uemail;
    if (!partyname) {
        res.status(400).json({ message: 'Party name is required' });
        return;
    }

    const query = 'SELECT * FROM `partyentry` WHERE partyname =? AND Email =?';
    connection.query(query, [partyname, emailpartycompany], (err, results) => {
        if (err) {
            console.error('Error fetching bill print company data:', err);
            res.status(500).json({ message: 'Error fetching bill print company data' });
        } else {

            return res.json(results);
        }
    });
});



app.get('/billamountinmonth', authenticateJWT, (req, res) => {
    const billamountmail = req.session.uemail;

    const sql = `SELECT SUM(totalmeters) AS totalbillingincurrentmonth FROM billing WHERE YEAR(date) = YEAR(CURRENT_DATE()) AND MONTH(date) = MONTH(CURRENT_DATE()) AND Email= ?`;

    connection.query(sql, [billamountmail], (err, result) => {
        if (err) return req.json({ message: "fail to connection with database" })
        return res.json(result);
    })
})

app.get('/billsinmonth', authenticateJWT, (req, res) => {
    const billsinmonthmail = req.session.uemail;

    const sql = `SELECT COUNT(billNo) AS billsinmonth FROM billing WHERE YEAR(date) = YEAR(CURRENT_DATE()) AND MONTH(date) = MONTH(CURRENT_DATE()) AND Email= ?`;
    connection.query(sql, [billsinmonthmail], (err, result) => {
        if (err) return res.json({ message: "fail to connect with database" })
        return res.json(result);
    })
})

app.get('/billamountinfinancialyear', authenticateJWT, (req, res) => {
    const billamountyear = req.session.uemail;

    const sql = `SELECT SUM(totalmeters) AS billamountinfinancialyear 
FROM billing 
WHERE (
    (YEAR(date) = YEAR(CURRENT_DATE()) AND MONTH(date) >= 4) 
    OR
    (YEAR(date) = YEAR(CURRENT_DATE()) + 1 AND MONTH(date) <= 3) 
)
AND Email = ?`;

    connection.query(sql, [billamountyear], (err, result) => {
        if (err) return res.json({ message: "fail to connect with database" })
        return res.json(result);
    })
})

app.get('/totalbillsinyear', authenticateJWT, (req, res) => {
    const totalbillsinyear = req.session.uemail;

    const sql = `SELECT COUNT(totalmeters) AS totalbillsinyear 
FROM billing 
WHERE (
    (YEAR(date) = YEAR(CURRENT_DATE()) AND MONTH(date) >= 4) 
    OR
    (YEAR(date) = YEAR(CURRENT_DATE()) + 1 AND MONTH(date) <= 3) 
)
AND Email = ?`;

    connection.query(sql, [totalbillsinyear], (err, result) => {
        if (err) return res.json({ message: "fail to connect with database" })
        return res.json(result);
    })
})


app.get('/billdisplaydashboard', authenticateJWT, (req, res) => {
    const billdisplay = req.session.uemail;

    const sql = `SELECT COUNT(totalmeters) AS totalbills 
FROM billing 
WHERE (
    (YEAR(date) = YEAR(CURRENT_DATE()) AND MONTH(date) >= 4) 
    OR
    (YEAR(date) = YEAR(CURRENT_DATE()) + 1 AND MONTH(date) <= 3) 
)
AND Email = ?`;

    connection.query(sql, [billdisplay], (err, result) => {
        if (err) return res.json({ message: "fail to connect with database" })
        return res.json(result);
    })
})

app.get('/totalpaidbillsdashboard', authenticateJWT, (req, res) => {
    const paidbillsdas = req.session.uemail;
    const pa = "paid";


    const sql = `SELECT COUNT(totalmeters) AS totalpaid
FROM billing 
WHERE (
    (YEAR(date) = YEAR(CURRENT_DATE()) AND MONTH(date) >= 4) 
    OR
    (YEAR(date) = YEAR(CURRENT_DATE()) + 1 AND MONTH(date) <= 3) 
)
AND Email = ? AND status = ?`;

    connection.query(sql, [paidbillsdas, pa], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })
})



app.get('/yarninwardreport', authenticateJWT, (req, res) => {
    const yarnreportmail = req.session.uemail;


    const sql = "SELECT * FROM `yarninward` WHERE Email =?";

    connection.query(sql, [yarnreportmail], (err, result) => {
        if (err) return res.json({ message: "fail to connection with database" })
        return res.json(result);
    })
})



app.get('/partybillpending', authenticateJWT, (req, res) => {
    const partybillpendingmail = req.session.uemail;

    const sql = "SELECT * FROM `partyentry` WHERE `Email` = ?";

    connection.query(sql, [partybillpendingmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


app.get('/partywisebillpending/:id', authenticateJWT, (req, res) => {
    const partywisebillpendingmail = req.session.uemail; // Assuming uemail is stored in session
    const id = req.params.id;

    const sql = `SELECT 
    *,
    DATEDIFF(CURDATE(), date) AS datediff
FROM 
    billing
WHERE 
    partyname = ? 
    AND status = 'unpaid' 
    AND Email = ?`;
    connection.query(sql, [id, partywisebillpendingmail], (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Error fetching data" });
        }
        res.json(result);
    });
});


app.get('/daterangeyarnreport/data', authenticateJWT, (req, res) => {
    const daterangeyarnreportmail = req.session.uemail;

    const startdate = req.query.startdate;
    const enddate = req.query.enddate;

    const sql = "SELECT * FROM `yarninward` WHERE date >= ? AND date <= ? AND Email = ?";

    connection.query(sql, [startdate, enddate, daterangeyarnreportmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.get('/board2', authenticateJWT, (req, res) => {
    const yesmail = req.session.uemail;

    const sql = "SELECT * FROM `beaminward` WHERE `Email` =?";

    connection.query(sql, [yesmail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.get('/sizingmtr', authenticateJWT, (req, res) => {
    const sizingmtrmail = req.session.uemail;

    const sql = `SELECT SUM(Sizingmtr) AS sizingmeter, COUNT(DesignNo) AS designno FROM beaminward WHERE MONTH(Date) = MONTH(CURRENT_DATE())
    AND YEAR(Date) = YEAR(CURRENT_DATE()) AND club = "nonclub" AND Email = ?`;

    connection.query(sql, [sizingmtrmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})


app.get('/party', authenticateJWT, (req, res) => {
    const partymailfetch = req.session.uemail;

    const sql = "SELECT * FROM `partyentry` WHERE `Email` =?";

    connection.query(sql, [partymailfetch], (err, result) => {
        if (err) return res.json({ message: "err in the database conenction" })
        return res.json(result);
    })


})

app.get('/companyregister/:id', authenticateJWT, (req, res) => {
    const companyreemail = req.session.uemail;

    const sql = "SELECT * FROM `companyreg` WHERE `Email` =?";

    connection.query(sql, [companyreemail], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        return res.json(result);
    })
})

app.put('/beamsolved', authenticateJWT, (req, res) => {
    const beamsolvedmail = req.session.uemail;

    const solve = req.body.solve;

    const setnumber = req.body.setnumber;
    const designnumber = req.body.designnumber;




    const sql = "UPDATE `beaminward` SET `designsolved`= ? WHERE `SetNo` =? AND `DesignNo` =? AND `Email` = ?";

    connection.query(sql, [solve, setnumber, designnumber, beamsolvedmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "solved" })
    })
})


// Route to handle POST request from React frontend
app.post('/cost', authenticateJWT, (req, res) => {
    // Extract data from the request body sent by the frontend
    const costemail = req.session.uemail;
    const { number, Description, date, reed, pick, width, totalmtr, sizingprice, weavingjob, profit, gst, rows } = req.body;

    // Prepare SQL query to insert main data
    const query = `
  INSERT INTO fabric (Email, number, Description, date, reed, pick, width, totalMtr, sizingPrice, weavingJob, profit, GST, countData)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;




    // Stringify the rows array to insert it as JSON
    const rowsJSON = JSON.stringify(rows);

    // Execute the SQL query to insert data into the "fabric" table
    connection.query(query, [costemail, number, Description, date, reed, pick, width, totalmtr, sizingprice, weavingjob, profit, gst, rowsJSON], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Error inserting data into fabric table' });
            return;
        }
        //console.log('Data inserted successfully');
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.get('/company', authenticateJWT, (req, res) => {
    const companymail = req.session.uemail;

    const sql = "SELECT * FROM `companyreg` WHERE Email =?";

    connection.query(sql, [companymail], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.get('/partyname', authenticateJWT, (req, res) => {
    const partyemailid = req.session.uemail;

    const sql = "SELECT * FROM `partyentry` WHERE Email =?";

    connection.query(sql, [partyemailid], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})


app.get('/beaminwardcompany/:id1/:id2', authenticateJWT, (req, res) => {
    const companyemailid = req.session.uemail;
    const { id1, id2 } = req.params;

    const sql = `
        SELECT 
            beaminward.*,
            companyreg.*
        FROM
            beaminward
        JOIN
            companyreg ON beaminward.company = companyreg.companyname
        WHERE
            beaminward.DesignNo = ? AND beaminward.srno = ?`;

    connection.query(sql, [id1, id2], (err, result) => {
        if (err) return res.json(err);

        return res.json(result);
    });
});


app.get('/beaminwardparty/:id1/:id2', authenticateJWT, (req, res) => {
    const { id1, id2 } = req.params;

    const sql = `SELECT 
    beaminward.*,
    partyentry.*
  FROM
     beaminward
  JOIN
      partyentry ON beaminward.party = partyentry.partyname
  WHERE
    beaminward.DesignNo =? AND beaminward.srno= ?;`;
    connection.query(sql, [id1, id2], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})


app.get('/yarninwardedit/:id', authenticateJWT, (req, res) => {
    const yarninwardeditmail = req.session.uemail;
    const { id } = req.params;

    const sql = "SELECT * FROM `yarninward` WHERE Email =? AND srnoyarn =?";

    connection.query(sql, [yarninwardeditmail, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})


const yarneditstorage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './yarninwardimages'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const yarneditupload2 = multer({ storage: yarneditstorage2 });

app.put('/yarninwardedit/:id', yarneditupload2.single('file'), authenticateJWT, (req, res) => {
    var yarneditmail = req.session.uemail;
    var id22 = req.params.id;
    var { date, setnumber, designnumber, yarnparty, count, party, weight } = req.body;

    // Check if file is uploaded
    var fileomkar = req.file ? req.file.filename : null;


    var queryParams1 = [setnumber, designnumber, yarnparty, count, party, weight, fileomkar, yarneditmail, id22];
    var queryParams2 = [setnumber, designnumber, date, yarnparty, count, party, weight, yarneditmail, id22];
    var queryParams3 = [setnumber, designnumber, yarnparty, count, party, weight, yarneditmail, id22];



    if (fileomkar) {
        let sql1 = "UPDATE `yarninward` SET `setNo` = ?, `Designno` = ?, `yarnParty` = ?, `count` = ?, `party` = ?, `weight` = ?, `filename` = ? WHERE Email = ? AND srnoyarn = ?";
        connection.query(sql1, queryParams1, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database query failed', error: err });
            }
            return res.json({ message: "Updated" });
        });

    }

    else if (date) {
        let sql2 = "UPDATE `yarninward` SET `setNo` = ?, `Designno` = ?, `date` = ?, `yarnParty` = ?, `count` = ?, `party` = ?, `weight` = ? WHERE Email = ? AND srnoyarn = ?";
        connection.query(sql2, queryParams2, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database query failed', error: err });
            }
            return res.json({ message: "Updated" });
        });

    }

    else {
        let sql3 = "UPDATE `yarninward` SET `setNo` = ?, `Designno` = ?, `yarnParty` = ?, `count` = ?, `party` = ?, `weight` = ? WHERE Email = ? AND srnoyarn = ?";
        connection.query(sql3, queryParams3, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database query failed', error: err });
            }
            return res.json({ message: "Updated" });
        });
    }




});


app.get('/reconsilecompany/:id', authenticateJWT, (req, res) => {
    const recomail = req.session.uemail;
    const id = req.params.id;

    const sql = `SELECT
    beaminward.*,
    companyreg.*
  FROM
    beaminward
  JOIN
     companyreg ON beaminward.company = companyreg.companyname
  WHERE
   beaminward.Email = ? AND SetNo =?;`;

    connection.query(sql, [recomail, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.delete('/packingdelete/:id', authenticateJWT, (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM `packingslip` WHERE  serialno =?";

    connection.query(sql, [id], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "deleted" });
    })
})

app.get('/beaminwardprintnew/:id1/:id2', authenticateJWT, (req, res) => {
    const beaminwardprintnewmail = req.session.uemail;
    const { id1, id2 } = req.params;

    const sql = `SELECT *
   FROM beaminward
 
   JOIN companyreg ON beaminward.company = companyreg.companyname
   JOIN partyentry ON beaminward.party = partyentry.partyname
   WHERE beaminward.DesignNo = ? AND beaminward.srno = ? AND beaminward.Email = ? AND partyentry.Email= ? AND companyreg.Email = ?;`;

    connection.query(sql, [id1, id2, beaminwardprintnewmail, beaminwardprintnewmail, beaminwardprintnewmail], (err, result) => {
        if (err) return res.json(err)

        return res.json(result);
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './companyimage');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});




const upload = multer({ storage: storage });


app.post('/companyregister', upload.single('file'), authenticateJWT, (req, res) => {
    const cregistrymail = req.session.uemail;
    // //console.log(`companyre ${cregistrymail}`);

    const values = [
        req.body.companyname,
        req.body.personname,
        req.body.companyaddress,
        req.body.phoneno,
        req.body.emailid,
        req.body.gst,
        cregistrymail,
        req.file.filename
    ];

    const sql = "INSERT INTO `companyreg`(`companyname`, `personname`, `companyaddress`, `phoneno`, `emailid`, `gst`, `Email`, `filenameas`) VALUES (?)";

    connection.query(sql, [values], (err, result) => {
        if (err) return res.json({ message: "err in the database connection" })
        //console.log(err);

        return res.json({ message: "data inserted successfully" });
    })

})





app.delete('/companydelete/:id', authenticateJWT, (req, res) => {
    const companydelemail = req.session.uemail;
    const companyName = req.params.id;

    const sql = "DELETE FROM `companyreg` WHERE `companyname` = ? AND Email =?";

    connection.query(sql, [companyName, companydelemail], (err, result) => {
        if (err) {
            console.error('Error deleting company:', err);
            res.status(500).json({ message: 'Failed to delete company' });
            return;
        }

        //console.log('Company deleted successfully:', result);
        res.status(200).json({ message: 'Company deleted successfully' });
    });
});

app.put('/companyedit/:id', upload.single('file'), authenticateJWT, (req, res) => {
    const companyId = req.params.id;
    const companyediteditmail = req.session.uemail;


    const { companyname, personname, companyaddress, phoneno, emailid, gst } = req.body;

    let file = null;
    if (req.file) {
        file = req.file.filename;
    }

    let sql = "UPDATE companyreg SET companyname = ?, personname = ?, companyaddress = ?, phoneno = ?, emailid = ?, gst = ?, filenameas = ? WHERE companyname = ? AND Email =?";
    let values = [companyname, personname, companyaddress, phoneno, emailid, gst, file, companyId, companyediteditmail];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating company details:', err);
            res.status(500).json({ message: 'Failed to update company details in database' });
            return;
        }

        //console.log('Company details updated successfully:', result);
        res.status(200).json({ message: 'Company details updated successfully' });
    });
});

app.put('/profileedit', authenticateJWT, (req, res) => {
    const profileeditmail = req.session.uemail;

    const Name = req.body.Name
    const Email = req.body.Email
    const PhoneNo = req.body.PhoneNo

    // const myname = req.params.id

    const sql = "UPDATE `customer` SET `Name`= ?, `Email`= ?,`phoneno`= ? WHERE `Email` = ?";

    connection.query(sql, [Name, Email, PhoneNo, profileeditmail], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "profile updated" })
    })
})


app.get('/profilesetting', authenticateJWT, (req, res) => {
    const profilesettingmail = req.session.uemail;

    const sql = "SELECT * FROM `customer` WHERE Email = ?";

    connection.query(sql, [profilesettingmail], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})

app.put('/packingslipedit/:id', authenticateJWT, (req, res) => {
    const packingeditslipmail = req.session.uemail;
    const { id } = req.params;

    const
        { packingslipno,
            uid,
            date,
            SetNo,
            DesignNo,
            packingrowdata,
            totalmtr,
            totalwt,
            wt,
            totalrolls,

        } = req.body;

    const packdata = JSON.stringify(packingrowdata);





    const sql = "UPDATE `packingslip` SET `Packingslipno`= ?, `uid`= ?, `date`= ?, `SetNo`= ?, `DesignNo`= ?, `packingdata`= ?, `toalmtr`= ?, `totalwt`= ?, `totalrolls`= ? WHERE Email = ? AND Packingslipno = ?";


    connection.query(sql, [packingslipno, uid, date, SetNo, DesignNo, packdata, totalmtr, totalwt, totalrolls, packingeditslipmail, id], (err, result) => {
        if (err) return res.json(err);
        //console.log(err);
        return res.json({ message: "data updated" })
    })
})


app.delete('/yarninwarddelete/:sryarn', authenticateJWT, (req, res) => {
    const yarndeletemail = req.session.uemail;
    const { sryarn } = req.params;

    const sql = "DELETE FROM `yarninward` WHERE Email =? AND srnoyarn =?";

    connection.query(sql, [yarndeletemail, sryarn], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "message deleted" });
    })
})



app.get('/datewisepackingreport/data', authenticateJWT, (req, res) => {
    const datewisepackingreportmail = req.session.uemail;

    const startdate = req.query.startdate;
    const enddate = req.query.enddate;


    const sql = "SELECT * FROM packingslip WHERE date >= ? AND date <= ? AND Email = ?";

    connection.query(sql, [startdate, enddate, datewisepackingreportmail], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})




app.get('/tablepagination', authenticateJWT, (req, res) => {


    const sql = "SELECT * FROM `production`";

    connection.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})



app.get('/omkarsample/data', authenticateJWT, (req, res) => {

    const uid = req.query.uid;

    const sql = "SELECT SetNo, DesignNo FROM beaminward WHERE UID = ?";

    connection.query(sql, [uid], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })
})






app.use('/companyimage', express.static(path.join(__dirname, 'companyimage')));

app.use('/yarninwardimages', express.static(path.join(__dirname, 'yarninwardimages')));

app.use('/designpaper', express.static(path.join(__dirname, 'designpaper')));

app.use('/jacquardfiles', express.static(path.join(__dirname, 'jacquardfiles')));





app.listen(port, () => {
    //console.log(`Server is running on port ${port}`);
});
