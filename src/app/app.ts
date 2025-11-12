import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ng_crud_localstorage');
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  isEditMode = false;

  ngOnInit() {
    const data = localStorage.getItem("EmpData");
    this.employeeList = data ? JSON.parse(data) : [];
  }

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required),
      city: new FormControl(''),

      state: new FormControl(''),
      emailId: new FormControl('', Validators.email),
      contactNo: new FormControl('', Validators.maxLength(10)),
      address: new FormControl(''),
      pinCode: new FormControl(''),
    })

  }

  reset() {
    this.employeeForm.reset();
  }

  onSave() {

    const oldData = localStorage.getItem("EmpData");
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['employeeId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    alert("Employee saved successfully!");
    this.onAddNew();



  }
  onAddNew() {
    this.isEditMode = false;
    this.employeeForm.reset();
  }


  onEdit(item: EmployeeModel) {
    this.isEditMode = true;
    this.employeeForm.patchValue(item);

  }

  onUpdate() {
    const record = this.employeeList.find(m =>
      m.employeeId == this.employeeForm.controls['employeeId'].value);
    if (record != undefined) {
      record.address = this.employeeForm.controls['address'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.employeeId = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
      record.state = this.employeeForm.controls['state'].value;

    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset();

  }

  onDelete(id: number) {
    console.log("hello");
    const isDelete = confirm("Are you sure you want to delete");
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.employeeId === Number(id));
      if (index !== -1) {
        this.employeeList.splice(index, 1);
        this.onAddNew();
        localStorage.setItem("EmpData", JSON.stringify(this.employeeList));

        this.employeeList = JSON.parse(localStorage.getItem("EmpData") || "[]");

      } else {
        alert("Employee not found!");
      }

    }
  }


}
