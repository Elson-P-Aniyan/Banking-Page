function register(){
    accountDetails={
        acno : regAcno.value,
        name : regAcname.value,
        paswrd : regPass.value,
        balance : 0
    }

    if(regAcno.value==""||regAcname.value==""||regPass.value==""){
        alert("Holder name, Account number and Password cannot be Empty")
    }
    else{
        if(regAcno.value in localStorage){
            alert("User already Registered")
        }
        else{
            localStorage.setItem(accountDetails.acno , JSON.stringify(accountDetails))
            alert("Registration Successfull")
            localStorage.setItem("currentUsername", accountDetails.name);
            window.location = './login.html'           
        }
    }
}

function login(){
    let acno = loginAcno.value;
    let pass = loginPswrd.value;
    
    
    if(acno == "" || pass==""){
        alert("Account Number and Password cannot be Empty")
    }else{
        if(acno in localStorage){
            accountDetails = JSON.parse(localStorage.getItem(acno))
            if(pass === accountDetails.paswrd){

                alert("Login Successfull")

                localStorage.setItem("currentUsername", accountDetails.name);
                localStorage.setItem("currentAcno", accountDetails.acno);
                
                window.location = './home.html'
                    
            }else{
                alert("Incorrect Password")
            }
        }else{
            alert("Invalid Username")
        } 
    }
    }


    function verifyAcnt(){
        let name = document.getElementById("forgotName").value;
        let acno = document.getElementById("forgotAcno").value;

        if(acno in localStorage){
            accountDetails = JSON.parse(localStorage.getItem(acno))
            if(name == accountDetails.name){
                alert("Account Number and Name Verified")
                passWrd.innerHTML = `<input id="newPass" class="form-control mb-4" type="text" placeholder="New Password">`
                butn.innerHTML = `<button onclick="changePass()" class="btn btn-danger mb-3 ps-4 pe-4">Change Password</button>`
                                  
            }else{
                alert("Incorrect Name")
            }
        }else{
            alert("Invalid Account Number")
        } 
    }

    function changePass(){
        let acno = document.getElementById("forgotAcno").value;
        let newPass = document.getElementById("newPass").value

        accountDetails = JSON.parse(localStorage.getItem(acno))

        if(accountDetails.paswrd==newPass){
            alert("Please Enter a New Password")
        }else{
            accountDetails.paswrd = newPass;
            console.log(accountDetails);
            localStorage.setItem(accountDetails.acno , JSON.stringify(accountDetails))
            alert("Password Successfully reset. Please login again")
            window.location = './login.html'
        }
         
    }
    

    let amnt = 0
    let withdraw = 0
    let totalBalance = 0


function depositMny(){

    amnt = depositAmnt.value
    acno = depositAcno.value
    amnt = Math.floor(amnt)
    console.log(amnt);

    if(acno in localStorage){
        accountDetails = JSON.parse(localStorage.getItem(acno));
    if(acno == accountDetails.acno && amnt <=0){
        alert('Amount cannot be empty or negative')
    }
    else{
        accountDetails.balance += amnt;
        localStorage.setItem(acno, JSON.stringify(accountDetails));

        alert("Amount deposited Sucessfully")
        document.getElementById("balance_amount").innerHTML = `<div class="mt-4 text-warning bg">Your current balance is ${accountDetails.balance}</div>`
    }
    }
    else{
        alert("Incorrect account no")
    }

}

function Withdraw(){
    amnt = withAmnt.value
    acno = withAcno.value
    amnt =Math.floor(amnt)

    if(acno in localStorage){
        accountDetails = JSON.parse(localStorage.getItem(acno));
        if(acno == accountDetails.acno && amnt<=0){
            alert("Amount cannot be empty or negative")  
        } else if(amnt > accountDetails.balance){
            alert("Insufficient Balance!")
        } else{
            alert('Bank Balance before Withdrawal: ' +accountDetails.balance)

            alert('Withdrawal Amount: ' +amnt)

            accountDetails.balance -= amnt
            alert('Your Amount is Successfully Withdrawn')
            localStorage.setItem(acno,JSON.stringify(accountDetails))

            alert('Current Balance after Withdrawal: ' +accountDetails.balance)
            document.getElementById("withdrw_amount").innerHTML = `<div class="mt-4 text-warning">Your current balance is ${accountDetails.balance}</div>`
        }
    }else{
      alert('Incorrect account no')  
    }
}

function detailsShow(){
    const currentAcno = localStorage.getItem("currentAcno");
    accountDetails = JSON.parse(localStorage.getItem(currentAcno));
    // console.log(accountDetails);
    acntDet.innerHTML = `<div class="card" style="width: 18rem;">
    <div class="card-header text-center">
      Account Details:
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Account Holder : ${accountDetails.name}</li>
      <li class="list-group-item">Account Number : ${accountDetails.acno}</li>
      <li class="list-group-item">Current Balance: ${accountDetails.balance}</li>
      <button onclick="detailsShow()" class="btn btn-primary">Refresh</button>
    </ul>
  </div>`




}

function logout(){
    let logOut = confirm("Are you sure you want to Logout?")
    if(logOut===true){
        localStorage.removeItem("currentUsername")
        localStorage.removeItem("currentAcno")
        window.location = './index.html'
    }else{
        return;
    }
}
