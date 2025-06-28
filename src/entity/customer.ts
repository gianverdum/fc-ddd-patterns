class Customer {

    _id: string;
    _name: string;
    _address: string = "";
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (!this._id || !this._name) {
            throw new Error("ID and name are required.");
        }
    }

    changeName(newName: string): void {
        this._name = newName;
        this.validate();
    }

    activate(): void {
        if (this._address.length === 0) {
            throw new Error("Cannot activate customer without an address.");
        }
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }
}