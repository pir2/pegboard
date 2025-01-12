import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { SessionComponent } from './session/session.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'session', component: SessionComponent },
  { path: 'import', component: ImportComponent },
  { path: '**', redirectTo: 'session' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
