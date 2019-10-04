import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardsGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardsGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'promesas', component: PromesasComponent },
            { path: 'rxjs', component: RxjsComponent },
            { path: 'account-settings', component: AccountsSettingsComponent },
            { path: 'profile', component: ProfileComponent,data:{titulo:'Perfil'} },

            //Mantenimiento
            { path: 'usuarios', component: UsuariosComponent,data:{titulo:'Mantenimiento de usuarios'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
