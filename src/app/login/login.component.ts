import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from '../common/app.constants';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {}
  isLoggedIn = false;
  isLoginFailed = false;
  currentUser: any;
  errorMessage = '';
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    const token: string = this.activatedRoute.snapshot.queryParamMap.get('token');
    const error: string = this.activatedRoute.snapshot.queryParamMap.get('error');
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorageService.getUser();
    }
    else if(token){
        this.tokenStorageService.saveToken(token);
        this.userService.getCurrentUser().subscribe( // this nested subscribe needs to be fixed.
              data => {
                this.login(data);
              },
              err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
              }
          );
    }
    else if(error){
        this.errorMessage = error;
        this.isLoginFailed = true;
    }
  }

  login(user): void {
    this.tokenStorageService.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorageService.getUser();
      window.location.reload();
    }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data)
        this.tokenStorageService.saveToken(data.accessToken);
        this.login(data.user)
        console.log(this.currentUser)

      },
      err => {
        this.errorMessage = err.error.errorMessage;
        this.isLoginFailed = true;
        console.log(this.currentUser)
      }
    )
  }
}
