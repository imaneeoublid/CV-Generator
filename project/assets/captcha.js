
var captcha;
function generate() {
 

    document.getElementById("submit").value = "";

    captcha = document.getElementById("image");
    var uniquechar = "";
 
    const randomchar =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }
 
    captcha.innerHTML = uniquechar;
}
 
function login() {
    const usr_input = document
        .getElementById("submit").value;

    if (usr_input == captcha.innerHTML) {
        document.getElementById("tr_login").click();
    }
    else {
        var s = document.getElementById("key")
            .innerHTML = "Code Captcha Incorrect!";
        generate();
    }
}