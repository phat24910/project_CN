import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  submit() {
    if (this.productForm.valid) {
      console.log('Thêm sản phẩm:', this.productForm.value);
      alert('Thêm sản phẩm thành công');
      this.productForm.reset();
    }
  }
}

