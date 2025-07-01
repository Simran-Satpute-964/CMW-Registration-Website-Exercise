import { Component, inject, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatStepper, MatStepperModule } from "@angular/material/stepper";
import { HeaderDetailService } from "../shared/services/header-detail.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: "app-registration",
    templateUrl: "registration.html",
    styleUrl: "registration.scss",
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule
    ]
})
export class RegistrationComponent {
    private _formBuilder = inject(FormBuilder);
    headerDetailService = inject(HeaderDetailService);
    private http = inject(HttpClient);

    isLinear = true;
    states = ['MH', 'PJ', 'RJ', 'TN'];
    showServerError = false;
    showSpinner = false;

    @ViewChild('stepper') stepper!: MatStepper;
    @ViewChild('secondStep') secondStep!: any;

    formGroup = this._formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        state: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        subscribe: [false]
    }, { validators: this.emailMissmatchValidator });

    constructor() {
        this.headerDetailService.pageTitle = "CONTACT INFORMATION";
    }

    ngAfterViewInit(): void {
        // Automatically move to second step after view initializes
        setTimeout(() => {
            this.stepper.selectedIndex = 1;
        });
    }

    emailMissmatchValidator(group: AbstractControl): ValidationErrors | null {
        const email = group.get('email')?.value;
        const confirmEmail = group.get('confirmEmail')?.value;

        return email && confirmEmail && email !== confirmEmail ? { emailMissmatch: true } : null;
    }

    getControlValidity(control: string) {
        return this.formGroup.get(control)?.invalid && 
            (this.formGroup.get(control)?.dirty || this.formGroup.get(control)?.touched);
    }

    changeState(e: any) {
        this.formGroup.get('state')?.setValue(e.target.value, {
            onlySelf: true
        })
    }

    submitInfo() {
        if (this.formGroup.valid) {
            this.showSpinner = true;
            const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '**');
            let params = new HttpParams();
            params = params.set('key', 'simransatpute96@gmail.com');

            const request = {
                firstName: this.formGroup.get('firstName')?.value,
                lastName: this.formGroup.get('lastName')?.value,
                state: this.formGroup.get('state')?.value,
                email: this.formGroup.get('email')?.value,
                subscribe: this.formGroup.get('subscribe')?.value ?? false
            };

            const api = "/api/registrations";
            
            this.showServerError = false;
            this.http.post(api, request, {headers: headers, params: params}).subscribe(result => {
                this.showSpinner = false;
                console.log(result);
                this.stepper.next();
            },
            (error) => {
                this.showSpinner = false;
                this.showServerError = true;
                console.log(error);
            });
        }
    }
}