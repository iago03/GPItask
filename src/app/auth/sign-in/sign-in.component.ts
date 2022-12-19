import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AuthInterface } from 'src/app/shared/interface/auth-interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInform!: FormGroup;
  error = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpAuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.signInFormBuilder();
  }

  signInFormBuilder() {
    this.signInform = this.fb.group({
      userName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  signIn() {
    if (this.signInform.valid) {
      const formValue = this.signInform.value;
      this.httpAuthService.signIn(formValue).subscribe((res: AuthInterface) => {
        this.httpAuthService.isUserLoggedIn$.next(true);
        this.httpAuthService.seToken(res);
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.markFormAsDirty(this.signInform);
    }
  }

  markFormAsDirty(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.get(key)?.markAsDirty();
    });
  }
}
