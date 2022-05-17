import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './productos/productos.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { ClientesComponent } from './clientes/clientes.component';
import { MetricasComponent } from './metricas/metricas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ListaBotComponent } from './lista-bot/lista-bot.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BotsCardComponent } from './bots-card/bots-card.component';
import {MatSelectModule} from '@angular/material/select';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountUpModule } from 'ngx-countup';
import { NbThemeModule, NbLayoutModule, NbChatModule, NbChatComponent, NbChatMessageComponent, NbChatCustomMessageDirective, NbChatFormComponent, NbChatCustomMessageService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { PreciosComponent } from './precios/precios.component';
import { PedidoCartaComponent } from './pedido-carta/pedido-carta.component';
import { ListaListaPreciosComponent } from './lista-lista-precios/lista-lista-precios.component';
import { ListaPrecioCardComponent } from './lista-precio-card/lista-precio-card.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ProductosComponent,
    ClientesComponent,
    MetricasComponent,
    PedidosComponent,
    RegistrarComponent,
    ListaBotComponent,
    BotsCardComponent,
    ChatBotComponent,
    DialogConfirmComponent,
    BotConfigComponent,
    PreciosComponent,
    PedidoCartaComponent,
    ListaListaPreciosComponent,
    ListaPrecioCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    MatListModule,
    MatCardModule,
    NgbModule,
    MatSelectModule,
    NbChatModule,
    NgxChartsModule, 
    MatCheckboxModule,
    MatExpansionModule,
    PrettyJsonModule, 
    CountUpModule, NbLayoutModule, NbEvaIconsModule, 
    Ng2SearchPipeModule,
    MatDialogModule,
    
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: NbChatCustomMessageService, useClass: NbChatCustomMessageService}
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
