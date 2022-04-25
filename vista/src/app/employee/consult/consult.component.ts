import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Employee } from '../employee';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {


  emp_no: string;
  employee: Employee[]=[];
  form: FormGroup;
  empresa: string="";
  constructor(public employeeService: EmployeeService,private router: Router) {
    this.employeeService.getDeptos().subscribe(resp => {console.log(resp)
    });
   }

  ngOnInit(): void {    
    this.employeeService.getOne(this.emp_no).subscribe((data: Employee[])=>{
      this.employee=data;
    })
    this.form = new FormGroup({     
      emp_no: new FormControl('') 
    });
  }
  
  onSubmit(){
    //console.log(this.form.value);
    this.employeeService.getOne(this.emp_no).subscribe(res => {
         console.log(this.employee);
         console.log('Empleado consultado correctamente!');         
    })
  }
  
  
 

}
