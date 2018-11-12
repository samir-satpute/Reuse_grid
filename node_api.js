var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var sql = require("mssql");
// config for your database
var config = {
    server: 'localhost',
    database: 'angular_practice',
    user: 'sa',
    password: 'database@1'
};

// connect to your database
sql.connect(config, function (err) {
    if (err) {
        console.log(err);
    } else {
        // var request = new sql.Request();
        // request.query('select * from Users', function(error, result){
        //     console.log(result);

        // })
        console.log("Connected..")
    }
});

// --------------------------------Datatable API-------------------

exports.allEmployee = app.post('/getAllEmployee', function (req, res) {
    var request1 = new sql.Request();
    var queryallEmployee = `select * from Employee`;
    // var queryallEmployee = `select * from users`;

    request1.query(queryallEmployee, function (error, result2) {
        if (error)
            console.log(error);
        else {
            console.log("shdfkasdgfkasgfkaaka", result2)
            res.send(result2);
        }
    })
});


exports.searchEmployee = app.post('/searchEmployee', function (req, res) {
    console.log('req', req);
    var searchKey = req.body.searchKey;
    console.log("Request search value", searchKey);
    var request1 = new sql.Request();
    // var qusearchquery = `select * from users where CONCAT (Id, '',Username, '',Firstname, '',Lastname, '',Pword) LIKE '%${searchKey}%'`;
    var qusearchquery = `SELECT * FROM Employee WHERE CONCAT(Id, '', Firstname, '', Lastname, '',DId,'', DOJ, '', Skill,'',Mobileno,'', Email) LIKE '%${searchKey}%'`;
    request1.query(qusearchquery, function (error, result2) {
        if (error)
            console.log(error);
        else {
            console.log("search rows", result2)
            res.send(result2);
        }
    })
});

exports.ascorder = app.post('/ascorder', function (req, res) {
    console.log('req', req);
    var headername = req.body.headername;
    console.log(headername);
    var request1 = new sql.Request();
    // var queryAscorder = `select * from users order by '${headername}'`;
    var queryAscorder = `select * from Employee order by '${headername}' `;
    request1.query(queryAscorder, function (error, result3) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("SuccessFully Asc..");
            res.send(result3);
        }
    })
});

exports.descorder = app.post('/descorder', function (req, res) {
    console.log('req', req);
    var headername = req.body.headername;
    console.log(headername);
    var request1 = new sql.Request();
    // var queryDescorder = `select * from users order by '${headername}' DESC`;
    var queryDescorder = `select * from Employee order by '${headername}' DESC `;
    request1.query(queryDescorder, function (error, result3) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("SuccessFully Desc..");
            res.send(result3);
        }
    })
});

var server = app.listen(8080, function () {
    console.log('Server is running..');
}); 



// exports.login = app.post('/loginPage', function (req, res) {
//     var email = req.body.email;
//     var password = req.body.password;
//     console.log(email);
//     console.log(password);
//     var request1 = new sql.Request();
//     var query1 = `select * from Users WHERE Username = '${email}' AND Pword = '${password}' `;
//     request1.query(query1, function (error, result1) {
//         if (error) {
//             console.log(error);
//         }
//         if (result1.recordset.length < 1) {
//             var errorMsg = "User name and password are incorect.. ";
//             res.send(errorMsg);
//             console.log(errorMsg);
//         }
//         else {
//             console.log(result1);
//             res.send(result1);
//         }
//     })

// });

// exports.addEmployee = app.post('/addEmployee', function (req, res) {
//     var Id = req.body.Id;
//     var Firstname = req.body.Firstname;
//     var Lastname = req.body.Lastname;
//     var DId = req.body.DId;
//     var DOJ = req.body.DOJ;
//     var DOB = req.body.DOB;
//     var Skill = req.body.Skill;
//     var Mobileno = req.body.Mobileno;
//     var Email = req.body.Email;
//     console.log(Id)
//     var request1 = new sql.Request();
//     var query2 = `INSERT INTO Employee (Id, Firstname, Lastname, DId, DOJ, DOB, Skill, Mobileno, Email)
//         VALUES (${Id},'${Firstname}','${Lastname}',${DId},'${DOJ}','${DOB}','${Skill}','${Mobileno}','${Email}' )`;
//     request1.query(query2, function (error, result3) {
//         if (error)
//             console.log(error);
//         else {
//             console.log(result3);
//             res.send(result3);
//         }
//     })
// });

// exports.delete = app.post('/delete', function (req, res) {

//     console.log('req', req);
//     var Id = req.body.Id;
//     console.log(Id);
//     var request1 = new sql.Request();
//     var query3 = `DELETE FROM Employee WHERE Id = '${Id}' `;
//     // console.log(result1);
//     request1.query(query3, function (error, result3) {
//         if (error) {
//             console.log(error);
//         }
//         else {
//             console.log("SuccessFully Deleted..");
//             // var msg = "SuccssFully Deleted";
//             res.send(result3);
//         }
//     })


// });

// exports.edit = app.post('/edit', function (req, res) {
//     var Id = req.body.Id;

//     console.log(Id);

//     var request1 = new sql.Request();
//     var query4 = `select * from Employee WHERE Id = '${Id}' `;
//     request1.query(query4, function (error, result1) {
//         if (error)
//             console.log(error);
//         else {
//             console.log(result1);
//             res.send(result1);
//         }
//     })

// });

// exports.updateEmployee = app.post('/updateEmployee', function (req, res) {
//     var Id = req.body.Id;
//     var Firstname = req.body.Firstname;
//     var Lastname = req.body.Lastname;
//     var DId = req.body.DId;
//     var DOJ = req.body.DOJ;
//     var DOB = req.body.DOB;
//     var Skill = req.body.Skill;
//     var Mobileno = req.body.Mobileno;
//     var Email = req.body.Email;
//     console.log("in Update.. ", Id)
//     var request1 = new sql.Request();
//     var query5 = `UPDATE Employee set Firstname = '${Firstname}', Lastname = '${Lastname}',
//      DId = ${DId} , DOJ ='${DOJ}', DOB ='${DOB}', Skill = '${Skill}', Mobileno = '${Mobileno}' , Email ='${Email}' where Id = ${Id}; `;
//     console.log("Update Query..", query5)
//     request1.query(query5, function (error, result3) {
//         if (error)
//             console.log(error);
//         else {
//             console.log(result3);
//             res.send(result3);
//         }
//     })
// });