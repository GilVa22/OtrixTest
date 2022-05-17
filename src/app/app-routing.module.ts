import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MetricasComponent } from './metricas/metricas.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ListaBotComponent } from './lista-bot/lista-bot.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { PreciosComponent } from './precios/precios.component';
import { ListaListaPreciosComponent } from './lista-lista-precios/lista-lista-precios.component';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import {MatIconModule} from '@angular/material/icon';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'lista-bot', component: ListaBotComponent },
  { path: 'metricas', component: MetricasComponent },
  { path: 'chatBot/:param', component: ChatBotComponent },
  { path: 'precios/:param', component: PreciosComponent },
  { path: 'precios', component: ListaListaPreciosComponent },
  { path: 'configuracion', component: BotConfigComponent },
  { path: 'pedidos', component: PedidosComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
