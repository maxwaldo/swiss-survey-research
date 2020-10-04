
var subInputContent = document.createElement('p');
var unsubInputContent = document.createElement('p');
var subBox = document.getElementById('subscribe_box');
var unsubBox = document.getElementById('unsubscribe_box');
subBox.appendChild(subInputContent);
unsubBox.appendChild(unsubInputContent);
var subscribe = document.getElementById('subscribe_input');
var unsubscribe = document.getElementById('unsubscribe_input');

var subscribeButton = document.getElementById('confirm_sub');
var unsubscribeButton = document.getElementById('confirm_unsub');

subscribeButton.addEventListener('click', async function() {

    console.log(subscribe.value);
    var data = subscribe.value;

    
    if(data === '' ) {

        subInputContent.innerHTML = 'Hum... It seems you forgott to write your email!';

    } else if (data.includes('@') === false) {

        subInputContent.innerHTML = 'Hum... It seems you did not provid a correct email addresse.';

    } else if (data.includes(' ') === true) {

        subInputContent.innerHTML = 'Hum... It seems you did not provid a correct email addresse.';

    } else {

        data = { email: data };
        console.log(data);

        const option = {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        const response = await fetch('/subscribe', option);
        const json = await response.json();
        console.log(json);
        /*
        fetch('/subscribe', option).then(response=>{
            console.log(response);
        });

        const json = await response.json();
        console.log(json);
        */


        if (json.code === 1) {

            subInputContent.innerHTML = 'Thanks you very much for your participation to our surveys! Your email has been deleted from our list!';
            subscribe.value = '';

        } else {

            subInputContent.innerHTML = 'This email already exists in the email-list';

        }
            
        
        
        
    }

});


unsubscribeButton.addEventListener('click', async function() {
    console.log(unsubscribe.value);
    var data = unsubscribe.value;
    if(data === '' ) {

        unsubInputContent.innerHTML = 'Hum... It seems you forgott to write your email!';

    } else if (data.includes('@') === false) {

        unsubInputContent.innerHTML = 'Hum... It seems you did not provid a correct email addresse.';

    } else if (data.includes(' ') === true) {

        unsubInputContent.innerHTML = 'Hum... It seems you did not provid a correct email addresse.';

    } else {

        data = { email: data };
        console.log(data);

        const option = {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        
        const response = await fetch('/unsubscribe', option);
        const json = await response.json();
        console.log(json);

        if (json.code === 2) {

            unsubInputContent.innerHTML = 'This email is not in our email list.'

        } else {

            unsubInputContent.innerHTML = 'Thanks you very much for your participation to our surveys! Your email has been deleted from our list!';
            unsubscribe.value = '';

        }

        
    }

});
