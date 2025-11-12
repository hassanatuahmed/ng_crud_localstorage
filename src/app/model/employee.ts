export class EmployeeModel{
employeeId: number;
name: string;
city: string;
state: string;
emailId: string;
contactNo: string;
address: string;
pinCode: string;
constructor(){
    this.address = '';
    this.city = '';
    this.contactNo = '';
    this.emailId = '';
    this.name = '';
    this.state = '';
    this.employeeId = 1;
    this.pinCode='';
}
}