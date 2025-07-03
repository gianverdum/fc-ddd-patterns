import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("ID is required.");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required.");
        }
    }

    changeName(newName: string): void {
        this._name = newName;
        this.validate();
    }

    isActive(): boolean {
        return this._active;
    }

    activate(): void {
        if (this._address === undefined || this._address === null) {
            throw new Error("Cannot activate customer without an address.");
        }
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }

    set Address(address: Address) {
        this._address = address;
    }
}