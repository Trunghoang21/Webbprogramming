console.log("Hello from another file");
const elem = document.getElementById("my-div");
elem.innerHTML = "<h1>Hello DOM</h1>";
const formInput = '<img src="x" onerror="alert(\'your page has been hacked\');" alt="broken image">';
elem.innerHTML = formInput;
/*
an image with a broken link is inserted into the page, and an alert is triggered when the image fails to load.
the code illustrates a how code injection can be used to exploit a website.
*/

