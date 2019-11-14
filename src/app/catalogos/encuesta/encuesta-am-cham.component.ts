import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EncuestaService } from '../servicios/encuesta.service';
import { EncuestaBusinessDB } from './../modelos/encuesta-businessdb.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './encuesta-am-cham.component.html',
  styleUrls: ['./encuesta-am-cham.component.css']
})
export class EncuestaAmChamComponent implements OnInit {
  encuestaGroup: FormGroup;

  form_message: string;
  show_form_message = false;
  show_error_message = false;

  constructor(
    private service: EncuestaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.encuestaGroup = this.formBuilder.group({
      pregunta_1: ['', Validators.required],
      pregunta_2: ['', Validators.required],
      pregunta_3: ['', Validators.required],
      pregunta_4: ['', Validators.required],
      pregunta_4_no: [''],
      pregunta_5: ['', Validators.required],
      pregunta_6: ['', Validators.required],
      pregunta_7: ['', Validators.required],
      pregunta_8: ['', Validators.required],
      pregunta_9: ['', Validators.required],
      pregunta_10: ['', Validators.required],
      pregunta_10_si: [''],
      pregunta_10_no: [''],
      pregunta_11: ['', Validators.required]
    });
  }

  get form_p1() { return this.encuestaGroup.get('pregunta_1'); }
  get form_p2() { return this.encuestaGroup.get('pregunta_2'); }
  get form_p3() { return this.encuestaGroup.get('pregunta_3'); }
  get form_p4() { return this.encuestaGroup.get('pregunta_4'); }
  get form_p5() { return this.encuestaGroup.get('pregunta_5'); }
  get form_p6() { return this.encuestaGroup.get('pregunta_6'); }
  get form_p7() { return this.encuestaGroup.get('pregunta_7'); }
  get form_p8() { return this.encuestaGroup.get('pregunta_8'); }
  get form_p9() { return this.encuestaGroup.get('pregunta_9'); }
  get form_p10() { return this.encuestaGroup.get('pregunta_10'); }
  get form_p11() { return this.encuestaGroup.get('pregunta_11'); }

  value(e) {
    this.form_p8.setValue(e.newValue);

    // switch (index) {
    //   case 1:
    //     this.form_p1.setValue(e.newValue);
    //     break;
    //   case 2:
    //     this.form_p2.setValue(e.newValue);
    //     break;
    //   case 3:
    //     this.form_p3.setValue(e.newValue);
    //     break;
    //   case 4:
    //     this.form_p4.setValue(e.newValue);
    //     break;
    //   case 5:
    //     this.form_p5.setValue(e.newValue);
    //     break;
    // }
  }

  crear() {
    if (this.encuestaGroup.valid) {
      const _encuesta = this.encuestaGroup.value;

      this.show_form_message = true;
      this.form_message = 'Enviando...';

      const encuesta_business = new EncuestaBusinessDB();

      const pregunta_4 = [];
      const pregunta_10 = [];

      encuesta_business.pregunta_1 = _encuesta['pregunta_1'];
      encuesta_business.pregunta_2 = _encuesta['pregunta_2'];
      encuesta_business.pregunta_3 = _encuesta['pregunta_3'];
      if (_encuesta['pregunta_4'] === '1') {
        pregunta_4.push(_encuesta['pregunta_4']);
      }
      if (_encuesta['pregunta_4'] === '0') {
        pregunta_4.push(_encuesta['pregunta_4']);
        pregunta_4.push(_encuesta['pregunta_4_no']);
      }
      encuesta_business.pregunta_4 = pregunta_4.join('. ');
      encuesta_business.pregunta_5 = _encuesta['pregunta_5'];
      encuesta_business.pregunta_6 = _encuesta['pregunta_6'];
      encuesta_business.pregunta_7 = _encuesta['pregunta_7'];
      encuesta_business.pregunta_8 = _encuesta['pregunta_8'];
      encuesta_business.pregunta_9 = _encuesta['pregunta_9'];
      if (_encuesta['pregunta_10'] === '1') {
        pregunta_10.push(_encuesta['pregunta_10']);
        pregunta_10.push(_encuesta['pregunta_10_si']);
      }
      if (_encuesta['pregunta_10'] === '0') {
        pregunta_10.push(_encuesta['pregunta_10']);
        pregunta_10.push(_encuesta['pregunta_10_no']);
      }
      encuesta_business.pregunta_10 = pregunta_10.join('. ');
      encuesta_business.pregunta_11 = _encuesta['pregunta_11'];
      encuesta_business.fecha = new Date();

      this.service.registrar(encuesta_business).then(() => {
        this.form_message = '¡Enviado!';
        this.router.navigate(['./done'], {relativeTo: this.route});
      });
    } else {
      this.form_message = 'Por favor corregir los errores mostrados en el formulario';
      this.show_error_message = true;
    }
  }


}
