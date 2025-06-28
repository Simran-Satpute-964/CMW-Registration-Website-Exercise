import { Component, inject } from "@angular/core";
import { HeaderDetailService } from "../shared/services/header-detail.service";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "login.html",
    styleUrl: "login.scss",
    imports: [ReactiveFormsModule]
})
export class LoginComponent {
    headerDetailService = inject(HeaderDetailService);
    password = new FormControl('', [Validators.required]);
    private router = inject(Router);

    constructor() {
        this.headerDetailService.pageTitle = "LOGIN";
    }

    validatePassword() {
        if (this.password.value?.trim() === "") return;
        else if (this.password.value === "here@june") {
            this.router.navigate(["/registration"]);
        }
        else {
            this.password.setErrors({incorrect: true});
            // this.password.markAsTouched();
        }
    }
}