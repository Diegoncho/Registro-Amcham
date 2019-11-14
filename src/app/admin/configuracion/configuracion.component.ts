import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfigDB } from '../modelos/configdb.model';
import { ConfigService } from '../servicios/config.service';

@Component({
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  configGroup: FormGroup;

  form_message: string;
  show_error_message = false;
  show_form_message = false;

  constructor(
    private fb: FormBuilder,
    private service: ConfigService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.configGroup = this.fb.group({
// tslint:disable-next-line: max-line-length
      ip:  ['',  [Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), Validators.required]],
      mac: ['',  [Validators.pattern('^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$'), Validators.required]],
      wifi: []
    });
  }

  get form_ip() { return this.configGroup.get('ip'); }
  get form_mac() { return this.configGroup.get('mac'); }
  get form_wifi() { return this.configGroup.get('wifi'); }

  crear() {
    if (this.configGroup.valid) {
      const _config = this.configGroup.value;

      // Traer variable form_message
      this.show_form_message = true;
      this.form_message = 'Guardando...';

      const config = new ConfigDB();

      config.ip = _config['ip'];
      config.mac = _config['mac'];
      config.wifi = _config['wifi'];

      this.service.registrar(config).then(() => {
        this.form_message = '¡Guardado!';
      });
    } else {
      this.form_message = 'Por favor corregir los errores mostrados en el formulario';
      this.show_error_message = true;
    }
  }

}

