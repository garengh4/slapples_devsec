import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isLoginFailed = false; // why?
  currentUser: any;
  errorMessage = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
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

}
