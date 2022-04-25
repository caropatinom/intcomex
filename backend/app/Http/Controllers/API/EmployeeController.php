<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\Employee;
Use Log;

class EmployeeController extends Controller
{
  public function getAll(){
    $data = Employee::get();
    return response()->json($data, 200);
  }
  public function getOne(Request $request){
    $id=$request['emp_no'];
    /*$res = Employee::find($id);
    return response()->json($data, 200);*/
    console.log($id); 
  }

  public function create(Request $request){
    $data['first_name'] = $request['first_name'];
    $data['last_name'] = $request['last_name'];
    $data['gender'] = $request['gender'];
    $data['birth_date'] = $request['birth_date'];
    $data['hire_date'] = $request['hire_date'];
    Employee::create($data);
    return response()->json([
        'message' => "Successfully created",
        'success' => true
    ], 200);
  }
  public function delete($id){
    $res = Employee::find($id)->delete();
    return response()->json([
        'message' => "Successfully deleted",
        'success' => true
    ], 200);
  }

  public function get($id){
    $data = Employee::find($id);
    return response()->json($data, 200);
  }

  public function update(Request $request,$id){
    $data['first_name'] = $request['first_name'];
    $data['last_name'] = $request['last_name'];
    $data['gender'] = $request['gender'];
    $data['hire_date'] = $request['hire_date'];
    $data['birth_date'] = $request['birth_date'];
    Employee::find($id)->update($data);
    return response()->json([
        'message' => "Successfully updated",
        'success' => true
    ], 200);
  }
}
