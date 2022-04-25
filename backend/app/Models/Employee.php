<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //use HasFactory;

    protected $table = "employee";
    protected $primary_key = 'emp_no'; //se agregar cuando la llave primaria es distinta a id
    protected $fillable = [
      'emp_no',
      'first_name',
      'last_name',
      'hire_date',
      'gender',
      'birth_date'
    ];
    //se agregar cuando la llave primaria es distinta a id
    public function getKeyName(){
      return "emp_no";
  }
}
