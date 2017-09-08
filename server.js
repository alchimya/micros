var express=require('express'),
    bodyParser = require('body-parser'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    server = null;




    if (cluster.isMaster) {

        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker %d died with code/signal %s. Restarting worker...',  worker.process.pid, signal || code);
            cluster.fork();
        });

    } else {
        var app=express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        var http = require('http');
        server = http.createServer(app).listen(9090, null, function(){
            console.log("CONNECTED");
        });

        //load API route(s)
        app.use("/api/account/balance", require('./balance'));

    }
