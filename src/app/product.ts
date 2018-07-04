export class Product {
    mass: number;
    straigh: number;
    general: boolean;
    coilNo: string;
    cross: number;

    validate: {
        mass: boolean;
        straigh: boolean;
        general: boolean;
        coilNo: boolean;
        cross: boolean;
    }
    constructor() {
        this.validate = {
            mass: true,
            straigh: true,
            general: true,
            coilNo: true,
            cross: true,
        };
    }

}