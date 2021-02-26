
var loginStatus = FALSE;

var button = document.getElementById("mca");
button.onclick = function(){
    if(loginStatus == TRUE){
        alert("login");
        return true;
    } else {
        alert("Please login first");
        return false;
    }
}

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');

    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

function stopMoving(){
    var add = document.getElementsByClassName('moving_content');
    var addAttribute = document.createAttribute('scrollamount');
    addAttribute.value = 0;
    add.setAttributeNode(addAttribute);
}

function studentLogin(){
    
    var givenUserId = document.getElementById("exampleInputEmail1").value;
    var givenPassword = document.getElementById("exampleInputPassword1").value;

    var emailId = window.localStorage.getItem("Email");
    var password = window.localStorage.getItem("Password");

    if(givenPassword == '' && givenUserId == ''){
        alert("Blank userid and password not allowed");

    } else if(givenUserId == emailId && givenPassword == password ){    
        var name = window.localStorage.getItem("Name");
        alert("Welcome "+name);
        loginStatus = TRUE;
        //document.getElementById("welcome_msg").innerHTML="Welcome "+name;

    } else {
        alert("Incorrect userId or password");
    }

    
    console.log(userId, password);
}

function studentRegister(){
    var name = document.getElementById("exampleInputName").value;
    var dept = document.getElementById("exampleInputDept").value;
    var course = document.getElementById("exampleInputCourse").value;
    var email = document.getElementById("exampleInputEmail").value;
    var password = document.getElementById("exampleInputPassword").value;
    var confirmPassword = document.getElementById("exampleInputConfirmPassword1").value;

    if(password == confirmPassword){
        window.localStorage.setItem("Name",name);
        window.localStorage.setItem("Course",course);
        window.localStorage.setItem("Email",email);
        window.localStorage.setItem("Password",password);
        window.localStorage.setItem("Department",dept);
    } else {
        alert("Password and Confirm password should be same");
        //document.getElementById("msg").innerHTML="Password and Confirm password should be same";
    }
    
}
