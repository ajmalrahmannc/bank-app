class Bank{
   createAccount(){
        let name = document.getElementById("reg_name").value;
        let accno= document.getElementById("reg_accnum").value;
        let password= document.getElementById("reg_password").value;
        let balance=0

        let user={
            name,
            accno,
            password,
            balance 
        }

        localStorage.setItem(accno,JSON.stringify(user))
        alert("account created")
         location.href="index.html"
        
    }

    logout(){
        sessionStorage.clear();
        location.href="index.html"
    }

    validateAccount(accno) {
        return accno in localStorage ? true : false
    }

    authenticate() {
                let account_number = document.getElementById("login_accno").value
                let pword = document.getElementById("login_password").value
                console.log(account_number);
                if (this.validateAccount(account_number)) {
                    var data = JSON.parse(localStorage.getItem(account_number))
                    if (pword == data.password) {
                        sessionStorage.setItem('user', account_number)
                        location.href = 'home.html'
                    } else {
                        
                        swal("error", "invalid password", "warning");
                    }
                } else {
                    swal("error", "account not found", "warning");
                }
            }


        getBalance(){
        let account_number = JSON.parse(sessionStorage.getItem('user'))
        let data =  JSON.parse(localStorage.getItem(account_number))
        return Number(data.balance)
    }
    balanceEnquiry() {
        let bal = this.getBalance()
        result.innerHTML = `<p> Account balance is : ${bal} </p>`
    }

    deposit(){
        let account_number = JSON.parse(sessionStorage.getItem('user'))
        let data =  JSON.parse(localStorage.getItem(account_number))
        console.log(data);
        let amount = Number(deposit_amount.value)
        data.balance += amount
        
        localStorage.setItem(account_number,JSON.stringify(data))
        $('#depositModal').modal('hide')
        bank.balanceEnquiry()
        swal("Congratulations!", "Amount Deposited!", "success");
       
        
    }
    fundTransfer(){
        let to_accno = benf_acc.value
        let confirm_accno = cnfm_benf.value
        let amount = Number(tranfer_amount.value)

        if(to_accno == confirm_accno){
            if(this.validateAccount(to_accno)){
                if(amount < this.getBalance()){
                    let account_number = JSON.parse(sessionStorage.getItem('user'))
                    let data =  JSON.parse(localStorage.getItem(account_number))
                    data.balance -= amount;
                    localStorage.setItem(account_number,JSON.stringify(data))

                    let benf_data = JSON.parse(localStorage.getItem(to_accno))
                    benf_data.balance += amount
                    localStorage.setItem(to_accno,JSON.stringify(benf_data))

                    swal("Congratulations!", "Amount Deposited!", "success");


                }
                else{
                    swal("error", "insufficient balance", "warning");
                }

            }
            else{
                swal("error", "beneficiary account not found", "warning");
            }

        }
        else{
            swal("error", "account number does't match", "warning");
        }
    }

}
bank = new Bank();



