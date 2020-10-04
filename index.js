const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('This is working'));
app.use(express.static('public'));
app.use(express.json());




app.post('/subscribe', async function(request, response){

    var input = request.body;
    console.log(input.email);
    
    var database = fs.readFileSync(path.resolve(__dirname, 'email.json'));
    var rawData = JSON.parse(database);
    console.log(rawData);
    console.log(rawData.email.length);
    console.log(rawData.email[0]);


    var i = 0;
    var j = 0;

    while (i < rawData.email.length) {
        if (rawData.email[i] === input.email) {
            ++i;
            ++j;
        } else {
            ++i;
        }
    }

    if (j === 0) { // email is not in the list so we can add it

        rawData.email.push(input.email);
        console.log(rawData.email);
        response.json({
            status: 'sucess',
            code: 1
        })


        fs.writeFileSync(path.resolve(__dirname, 'email.json'), JSON.stringify(rawData));

        

        console.log('Parsing succeded!')

    } else {

        response.json({
            status: 'sucess',
            code: 2
        })
        console.log('Parsing failed!')
    }

        
})




app.post('/unsubscribe', async function(request, response){

    // Get the email written
    var input = request.body;
    
    // Read the email data file
    var database = fs.readFileSync(path.resolve(__dirname, 'email.json'));
    var rawData = JSON.parse(database);


    console.log(rawData);
    console.log(rawData.email.length);
    console.log(rawData.email[0]);


    var i = 0;
    var j = 0;

    while (i < rawData.email.length) {
        if (rawData.email[i] === input.email) {
            rawData.email.splice(i, 1);
            ++j;
        } else {
            ++i;
        }
    }

    if (j === 0) { // email is not in the list so we can add it
        response.json({
            status: 'sucess',
            code: 2
        })


        fs.writeFileSync(path.resolve(__dirname, 'email.json'), JSON.stringify(rawData));

        

        console.log('Deletion failed!')

    } else {

        response.json({
            status: 'sucess',
            code: 1
        })
        fs.writeFileSync(path.resolve(__dirname, 'email.json'), JSON.stringify(rawData));
        console.log('Deletion succeded')
    }   
})