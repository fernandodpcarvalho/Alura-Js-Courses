import { NgModule } from '@angular/core';

import { PhotoModule } from './photo/photo.module';
import { PhotoListmodule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';

@NgModule({
    declarations: [ 
    ],
    imports: [ 
        PhotoModule,
        PhotoListmodule,
        PhotoFormModule
    ]
})
export class PhotosModule {

}