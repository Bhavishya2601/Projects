function next_page(){
    let a = prompt("Place your Bid");
    let b = confirm("The Amount entered is " + a + "\nDo you wanna Continue?");
    if (b){
        window.location.href="confirmation.html";
    }
}

function check_Password() {
    let a = document.getElementById("password1").value;
    let b = document.getElementById("confirm_password1").value;
    if (a == b) {
        window.location.href = "3_main.html";
    } else {
        alert("Password and confirm password does not match.");
    }
}