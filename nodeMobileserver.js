let express = require("express");
let app = express();
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD");
    res.header(
        "Access-Control-Allow-headers",
        "Origin,K-requested-With,Content-Type,Accept");
    next();
});
const port = 2410;
app.listen(port, () => console.log(`Listening on port ${port} !`));
let mysql = require("mysql");
let connData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "testDB",
};
app.get("/svrr/mobile", function(req, res) {
    let brand = req.query.brand;
    let RAM = req.query.RAM;
    let ROM = req.query.ROM;
    let OS = req.query.OS;
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobileapptable ";
    connection.query(sql, function(err, result) {
        if (err) console.log("Error in database", err.message);
        else {
            let data1 = result;
            data1 = filterParam(data1, "brand", brand);
            data1 = filterParam(data1, "RAM", RAM);
            data1 = filterParam(data1, "ROM", ROM);
            data1 = filterParam(data1, "OS", OS);
            res.send(data1);
        }

    })

});
let filterParam = (arr, name, values) => {
    if (!values) return arr;
    let valuesArr = values.split(",");
    let arr1 = arr.filter((a1) => valuesArr.find((val) => val === a1[name]));
    return arr1;
};
app.get("/svrr/mobile/brand/:brand", function(req, res) {
    let brand = req.params.brand;
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobileapptable WHERE brand=?";
    connection.query(sql, brand, function(err, result) {
        if (err) console.log("Error in database", err.message);
        else {
            res.send(result);
        }
    });
});
app.get("/svrr/mobile/RAM/:RAM", function(req, res) {
    let RAM = req.params.RAM;
    console.log(RAM);
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobileapptable WHERE RAM=?";
    connection.query(sql, RAM, function(err, result) {
        if (err) console.log("Error in database", err.message);
        else {
            res.send(result);
        }
    });
});
app.get("/svrr/mobile/ROM/:ROM", function(req, res) {
    let ROM = req.params.ROM;
    console.log(ROM);
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobileapptable WHERE ROM=?";
    connection.query(sql, ROM, function(err, result) {
        if (err) console.log("Error in database", err.message);
        else {
            res.send(result);
        }
    });
});
app.get("/svrr/mobile/OS/:OS", function(req, res) {
    let OS = req.params.OS;
    console.log(OS);
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobileapptable WHERE OS=?";
    connection.query(sql, OS, function(err, result) {
        if (err) console.log("Error in database", err.message);
        else {
            res.send(result);
        }
    });
});

app.get("/svrr/mobile/name/:name", function(req, res) {
    let name = req.params.name;
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobileapptable WHERE name=?";
    connection.query(sql, name, function(err, result) {
        if (err) console.log("Error in database", err.message);
        else {
            res.send(result);
        }
    });
});

app.post("/svrr/mobile", function(req, res) {
    let body = req.body;
    console.log(body);
    let connection = mysql.createConnection(connData);
    let sql = "Insert INTO mobileapptable(name,brand,price,RAM,ROM,OS)  VALUES (?,?,?,?,?,?)";
    connection.query(sql, body, function(err, result) {
        if (err) console.log(err);
        else res.send(result);
    });
});
app.put("/svrr/mobile/:name", function(req, res) {
    let body = req.body;
    let name = req.params.name;
    console.log(body);
    let ec = body.name;
    let na = body.brand;
    let dp = body.price;
    let ds = body.RAM;
    let sl = body.ROM;
    let gn = body.OS;
    let arr = [ec, na, dp, ds, sl, gn];
    console.log(ec, na, dp, ds, sl, gn);
    let connection = mysql.createConnection(connData);
    let sql = "UPDATE mobileapptable SET name=?,brand=?,price=?,RAM=?,ROM=?,OS=? WHERE name=?";
    connection.query(sql, [ec, na, dp, ds, sl, gn, name], function(err, result) {
        if (err) console.log(err);
        else res.send(result);
    });
});
app.delete("/svrr/mobile/delete/:name", function(req, res) {
    let name = req.params.name;
    let connection = mysql.createConnection(connData);
    let sql = "DELETE FROM mobileapptable WHERE name=?";
    connection.query(sql, name, function(err, result) {
        if (err) console.log(err);
        else res.send(result);
    });
});
app.get("/svr/resetData", function(req, res) {
    let connection = mysql.createConnection(connData);
    let sql = "SELECT * FROM mobiledata";
    let data;
    connection.query(sql, function(err, result) {
        if (err) console.log(err);
        else {
            data = result;
            console.log(data);
            let sql1 = "DELETE FROM mobiledata";
            connection.query(sql1, function(err, result) {
                if (err) console.log(err);
                else {
                    console.log("Successfully deleted", result.affectedRows);
                    let arr = data.map(p => [p.brand, p.model, p.price]);
                    let sql2 = "INSERT INTO mobiledata(brand,model,price) VALUES ?";
                    connection.query(sql2, [arr], function(err, result) {
                        if (err) console.log(err);
                        else res.send("Successfully inserted");

                    });
                }
            });
        }
    });

});