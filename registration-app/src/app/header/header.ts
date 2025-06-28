import { Component, inject } from "@angular/core";
import { HeaderDetailService } from "../shared/services/header-detail.service";

@Component({
    selector: "app-header",
    templateUrl: "header.html",
    styleUrl: "header.scss"
})
export class HeaderComponent {
    headerDetailService = inject(HeaderDetailService);
    
}