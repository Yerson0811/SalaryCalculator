import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SalaryCalculationResponse } from '../../models/salary-calculation-response.model';
import { SalaryCalculationService } from '../../services/salary-calculator.service';

@Component({
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class SalaryCalculatorComponent {
  salaryForm: FormGroup;
  salaryResult: SalaryCalculationResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryCalculationService) {
    this.salaryForm = this.fb.group({
      name: ['', Validators.required],
      hourlyWage: [0, [Validators.required, Validators.min(1)]],
      hoursWorked: [0, [Validators.required, Validators.min(1)]],
      overtimeHours: [0, [Validators.required, Validators.min(1)]],
    });
  }

  calculateSalary() {
    if (this.salaryForm.valid) {
      this.salaryResult = this.salaryService.calculateSalary(this.salaryForm.value);
    }
  }

  controlHasError(control: string, error: string) {
    return this.salaryForm.controls[control].hasError(error);
  }

}
