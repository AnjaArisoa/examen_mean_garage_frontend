import { Routes } from '@angular/router';
import { LayoutComponent } from './app/components/layout/layout.component';
import { DashboardComponent } from './app/components/manager/page/dashboard/dashboard.component';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import {CrudComponent} from './app/components/crud/crud.component';
import { ClientComponent } from './app/components/client/client/client.component';
import { DetailServiceComponent } from './app/components/client/page/detail-service/detail-service.component';
import { LoginComponent } from './app/components/auth/login/login.component';
import { InscriptionComponent } from './app/components/auth/inscription/inscription.component';

export const appRoutes: Routes = [
    {
        path: 'manager',
        component: LayoutComponent,//sidebar
        children: [//content
            { path: '', component: DashboardComponent },
            { path: 'crud', component: CrudComponent },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: '', component: ClientComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'product/:id', component: DetailServiceComponent },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
