// src/app/registration/reset-password/reset-password.component.ts

import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
// import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token!: string;
  isSubmitting: boolean = false; // To handle loading state
  authService: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
   
  ) {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Retrieve the token from the query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        console.error('Invalid or missing token.');
        this.router.navigate(['/']);
      }
    });

    // Redirect to homepage if user is already logged in
    const localToken = localStorage.getItem('token');
    if (localToken) {
      this.router.navigate(['home/homepage']);
    }
  }

  // Custom validator to ensure passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    if (!password || !confirmPassword) {
      return null;  // Valid for now, or handle incomplete form as per requirements
    }
  
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Handle form submission
  
  submitForm(): void {
    if (this.resetForm.valid && this.token) {
      this.isSubmitting = true;
      
      this.authService.resetPassword({
        password: this.resetForm.get('password')?.value,
        token: this.token
      }).subscribe({
        next: (res: any) => {
          // Password reset was successful
          this.isSubmitting = false;
          alert('Password reset successful!');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error('Password reset failed', err);
          this.isSubmitting = false;
        }
      });
    }
  }
}
