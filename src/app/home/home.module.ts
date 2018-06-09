import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule} from "ng2-translate";

import { HomeComponent } from './home.component';

import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        TranslateModule.forRoot()
    ],
    declarations: [ HomeComponent ],
    exports:[ HomeComponent, TranslateModule ],
    providers: []
})
export class HomeModule { }
