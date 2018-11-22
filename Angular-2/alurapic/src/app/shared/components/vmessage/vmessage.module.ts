import { NgModule } from '@angular/core';
import { VMessageComponent } from './vmessage.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        VMessageComponent
    ],
    exports: [
        VMessageComponent
    ]
})
export class VMessageModule {

}