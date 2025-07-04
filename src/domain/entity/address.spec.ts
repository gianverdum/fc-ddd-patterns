import Address from "./address";

describe("Address unit tests", () => {

    it("should return correct string in toString method", () => {
        const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
        expect(address.toString()).toBe("Street 1, 123, Zipcode 1, City 1");
    });

    it("should throw an error when street is empty", () => {
        expect(() => new Address("", 123, "Zipcode 1", "City 1")).toThrow("Street is required");
    });

    it("should throw an error when number is less than zero", () => {
        expect(() => new Address("Street 1", -1, "Zipcode 1", "City 1")).toThrow("Number must be greater than zero.");
    });

    it("should throw an error when zip is empty", () => {
        expect(() => new Address("Street 1", 123, "", "City 1")).toThrow("Zip is required.");
    });

    it("should throw an error when city is empty", () => {
        expect(() => new Address("Street 1", 123, "Zipcode 1", "")).toThrow("City is required.");
    });
});