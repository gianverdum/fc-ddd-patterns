export default class Address {

    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }

    validate() {
        if (this.street.length === 0) {
            throw new Error("Street is required.");
        }
        if (this.number <= 0) {
            throw new Error("Number must be greater than zero.");
        }
        if (this.zip.length === 0) {
            throw new Error("Zip is required.");
        }
        if (this.city.length === 0) {
            throw new Error("City is required.");
        }
    }

    toString(): string {
        return `${this.street}, ${this.number}, ${this.zip}, ${this.city}`;
    }
}