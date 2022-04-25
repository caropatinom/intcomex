import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  employee: Employee;
  form: FormGroup;
  
  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['idEmployee'];
    this.employeeService.find(this.id).subscribe((data: Employee)=>{
      this.employee = data;
    });

   this.form = new FormGroup({
      first_name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
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
    this.employeeService.update(this.id, this.form.value).subscribe(res => {
         console.log('Empleado actualizado correctamente!');
         this.router.navigateByUrl('employee/index');
    })
  }

}
