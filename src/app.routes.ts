import { Routes } from '@angular/router';
import { LayoutComponent } from './app/components/layout/layout.component';
import { DashboardComponent } from './app/components/manager/page/dashboard/dashboard.component';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { CrudComponent } from './app/components/crud/crud.component';
import { ClientComponent } from './app/components/client/client/client.component';
import { DetailServiceComponent } from './app/components/client/page/detail-service/detail-service.component';
import { LoginComponent } from './app/components/auth/login/login.component';
import { InscriptionComponent } from './app/components/auth/inscription/inscription.component';
import { ListeStockComponent } from './app/components/manager/page/stock/liste-stock/liste-stock.component';
import { AvancementClientComponent } from './app/components/client/page/avancement-client/avancement-client.component';
import { DetailAvancementComponent } from './app/components/client/page/detail-avancement/detail-avancement.component';
import { CommandePiecesComponent } from './app/components/manager/page/stock/commande-pieces/commande-pieces.component';
import { DevisGeneralClientComponent } from './app/components/client/page/devis-general-client/devis-general-client.component';
import { PlanningRendezVousComponent } from './app/components/manager/component/planning-rendez-vous/planning-rendez-vous.component';
import { ListeRendezVousComponent } from './app/components/mecanicien/component/liste-rendez-vous/liste-rendez-vous.component';
import { PlaningMecanicienComponent } from './app/components/mecanicien/component/planing-mecanicien/planing-mecanicien.component';
import { DiagnosticClientComponent } from './app/components/client/page/diagnostic-client/diagnostic-client.component';
import { authGuard } from './app/guards/auth.guard';
import { ServiceComponent } from './app/components/manager/page/service/service.component';

export const appRoutes: Routes = [
    {
        path: 'manager',
        component: LayoutComponent,
        canActivate: [authGuard],
        data: { role: 'manager' },
        children: [
            { path: '', component: DashboardComponent },
            { path: 'crud', component: CrudComponent },
            { path: 'page/dashboard', component: DashboardComponent },
            { path: 'page/stock/liste-stock', component: ListeStockComponent },
            { path: 'page/stock/commande-pieces', component: CommandePiecesComponent },
            { path: 'page/planing/calendrier', component: PlanningRendezVousComponent },
            { path: 'page/service', component: ServiceComponent },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    {
        path: 'mecanicien',
        component: LayoutComponent,
        canActivate: [authGuard],
        data: { role: 'mecanicien' },
        children: [
            { path: '', component: ListeRendezVousComponent },
            { path: 'page/planing/liste-rendez-vous', component: ListeRendezVousComponent },
            { path: 'planing/rendez-vous/:id/:idrdv/:iddevis', component: PlaningMecanicienComponent }
        ]
    },
    { path: '',component: ClientComponent},
    { path: 'login', component: LoginComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'avancement', component: AvancementClientComponent
        , canActivate: [authGuard],data: { role: 'client' }
     },
    { path: 'diagnostic', component: DiagnosticClientComponent
        , canActivate: [authGuard],data: { role: 'client' }
     },
    { path: 'detailavancement/:id', component: DetailAvancementComponent
        , canActivate: [authGuard],data: { role: 'client' }
     },
    { path: 'devis/:categorieVehicule/:modeleVehicule', component: DevisGeneralClientComponent
        , canActivate: [authGuard],data: { role: 'client' }
     },
    { path: 'product/:id', component: DetailServiceComponent
        , canActivate: [authGuard],data: { role: 'client' }
     },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
