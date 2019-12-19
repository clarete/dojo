import { BaseParser, ParsingError } from "./api";


describe("#2 Kata - Matching Expressions", () => {
  describe("zeroOrMore", () => {
    it("should capture as much of the input as possible", () => {
      // Given a base parser with some input
      const parser = new BaseParser();
      parser.setInput("1234abcd");
      // And given a function that
      const integers = () => {
        // Check if the current char is a digit and move
        // the cursor forward if so and move on
        const current = parser.getCurrent();
        if (/\d/.test(current)) {
          parser.next();
          return current;
        }
        // Stop the loop at the end of the sequence of integers
        parser.error('Not Int');
      };
      // When zero or more integers are consumed
      const output = parser.zeroOrMore(integers);
      // Then it should consume all the input since it all matches
      expect(output).toEqual(['1', '2', '3', '4']);
    });
  });

  describe("or", () => {
    it("should choose the first expression that succeeds", () => {
      // Given a new base parser with some input
      const parser = new BaseParser();
      parser.setInput("abacate");
      // When faced with a list of options, where just the last one
      // matches successfuly
      const output = parser.or([
        () => parser.expectString("abelha"),
        () => parser.expectString("abada"),
        () => parser.expectString("abacate"),
      ]);
      // Then it should match the successful one
      expect(output).toBe("abacate");
    });

    it("should fail if no option succeeds", () => {
      // Given a new base parser with some input
      const parser = new BaseParser();
      parser.setInput("abacate");
      // When faced with a list of options
      expect(() => parser.or([() => parser.error("a"), () => parser.error("b")]))
        .toThrow(new ParsingError('No option found'));
    });
  });

  describe("oneOrMore", () => {
  });

  describe("optional", () => {
  });

  describe("not", () => {
  });

  describe("and", () => {
  });

});
