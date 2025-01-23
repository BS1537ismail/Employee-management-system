import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginOnj: any = {
      username: '',
      password: ''
    }
    constructor(private router : Router){}
    onLogin(){
      if(this.loginOnj.username == "admin" && this.loginOnj.password == "1234"){
          this.router.navigateByUrl('dashboard');
      }
      else {
        alert("Wrong Credential");
      }
    }
}
