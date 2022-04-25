import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
 
  form : FormGroup;
  constructor(public employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name:  new FormControl( '', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      last_name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      birth_date: new FormControl(''),
      hire_date: new FormControl(''),
      gender: new FormControl('')
      
    });
  }
  get f(){
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
    this.employeeService.create(this.form.value).subscribe(res => {
         console.log('Empleado insertado correctamente!');
         this.router.navigateByUrl('employee/index');
    })
  }

}
