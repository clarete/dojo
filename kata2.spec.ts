import { ParsingError } from "./kata1";
import { PrimitiveParser } from "./kata2";


describe("#2 Kata - Use Expressions to implement primitives", () => {
  describe("Numbers", () => {
    it("should parse a digit", () => {
      // Given a parser with some input containing integers
      const parser = new PrimitiveParser();
      parser.setInput("1234");
      // When the parser tries to consume a single digit
      const output = parser.parseDigit();
      // Then it should have consumed the first digit
      expect(output).toBe("1");
      expect(parser.getCurrent()).toBe("2");
    });

    it("should parse decimals", () => {
      // Given a parser with some input containing integers
      const parser = new PrimitiveParser();
      parser.setInput("1234");
      // When the parser tries to consume a decimal number with
      // multiple digits
      const output = parser.parseDecimal();
      // Then it should have parsed the whole input
      expect(output).toEqual(1234);
    });

    it("should parse hex-decimals", () => {
      // Given a parser with some input containing integers
      const parser = new PrimitiveParser();
      parser.setInput("0xFF");
      // When the parser tries to consume a decimal number with
      // multiple digits
      const output = parser.parseHexDecimal();
      // Then it should have parsed the whole input
      expect(output).toEqual(255);
    });
  });
});
