import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public products: Array<Product> = [];
  selectedDesignation: any = {};
  designations = `[
    {
      designationName: "PC Strand-7 Wire ordinary-9.3-1720-Relax 2-Left",
      mass: { exec: this.between, param1: 96.6, param2: 100.9 },
      straigh: { exec: this.lessThanOrEq, param1: 30 },
      general: { exec: this.isPass },
      cross: { exec: this.between, param1: 12.6, param2: 12.6999 },

    },
    {
      designationName: "PC Strand-8 Wire ordinary-9.3-1720-Relax 2-Left",
      mass: { exec: this.between, param1: 40.6, param2: 50.9 },
      straigh: { exec: this.lessThanOrEq, param1: 10 },
      general: { exec: this.isPass },
      cross: { exec: this.between, param1: 5.6, param2: 9.6999 },

    }
  ]`;

  designationsEvaled: any = [];
  changedDesignation: any = {};
  designationForm: NgForm;
  ngOnInit() {
    this.designationsEvaled = eval(this.designations);
    this.selectedDesignation = this.designationsEvaled.find((designations) => {
      return designations.designationName === "PC Strand-8 Wire ordinary-9.3-1720-Relax 2-Left";
    });
    this.products = [];
    let p1 = new Product();
    p1.mass = 97.8032;
    p1.straigh = 12.12;
    p1.general = true;
    p1.cross = 12.672;


    this.products.push(p1);

    let p2 = new Product();
    p2.mass = 97.8032;
    p2.straigh = 12.12;
    p2.general = false;
    p2.cross = 12.6661;
    this.products.push(p2);

    this.setWornning();
  }

  exec(validate: any, product: Product, key: string) {
    let result = validate.exec(validate.param1, validate.param2, product[key]);
    product.validate[key] = result;
    return result;
  }

  isPass(param1: any, param2: any, compareValue): boolean {
    if (compareValue + "" === "true") {
      return true;
    }
    return false;
  }

  between(param1: any, param2: any, compareValue: number): boolean {
    if (compareValue >= param1 && compareValue <= param2) {
      return true;
    }
    return false;
  }

  lessThanOrEq(param1: any, param2: any, compareValue: number): boolean {
    if (compareValue <= param1) {
      return true;

    }
    return false;
  }

  onChangeDesignation() {

    this.setWornning();
  }

  setWornning() {
    Object.keys(this.selectedDesignation).map((key: any) => {
      if (key !== "designationName") {
        for (let product of this.products) {
          let result = this.selectedDesignation[key].exec(this.selectedDesignation[key].param1, this.selectedDesignation[key].param2, product[key]);
          product.validate[key] = result;
        }
      }
    });
  }


}
