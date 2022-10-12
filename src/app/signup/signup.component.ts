import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  form:any = {};
  isSuccessful = false;
  isSignupFailed = false;
  errorMessage = "";
  selected = 'option2';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.signup(this.form).subscribe(
      data => {
        console.log(data)
        this.isSuccessful = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
      }
    )
  }

}
