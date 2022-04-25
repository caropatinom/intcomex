import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  employee: Employee[] = [];

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((data: Employee[])=>{
      this.employee=data;
      console.log(this.employee);
    })
  }

  deleteEmployee(id:any){
    this.employeeService.delete(id).subscribe(res => {
         this.employee = this.employee.filter(item => item.emp_no !== id);
         console.log('Empleado eliminado correctamente');
    })
  }

}
