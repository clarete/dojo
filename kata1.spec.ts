import { BaseParser, ParsingError } from "./kata1";

describe("#1 Kata - parsing: input and cursor", () => {
  // The first Kata will teach you the basics about the flow of the
  // parser through the input being parsed.
  describe("Move the cursor forward on matching", () => {
    it("should start with the cursor pointing to the position 0 in the input", () => {
      const parser = new BaseParser();
      expect(parser.cursor).toBe(0);
    });

    it("should provide accessor to the character of the input under cursor", () => {
      // Given a new base parser
      const parser = new BaseParser();
      // When some input is set
      parser.setInput("1234");
      // Then there should be access to the character under the cursor
      expect(parser.getCurrent()).toBe("1");
    });

    it("should move to the next character of the input under cursor", () => {
      // Given a new base parser with some input
      const parser = new BaseParser();
      parser.setInput("abcd");
      // When the cursor is moved one character
      parser.next();
      // Then it should point at the second character of the input string
      expect(parser.getCurrent()).toBe("b");
    });

    it("should error if next goes beyound the size of input", () => {
      // Given a new parser with some input
      const parser = new BaseParser();
      parser.setInput("");
      // When cursor overflows the size of input
      // Then it should error
      expect(() => parser.next())
        .toThrow(new ParsingError('End of input'));
    });

    it("should expect successfuly that a character is at the cursor", () => {
      // Given a base parser with some input and a cursor
      const parser = new BaseParser();
      parser.setInput("1234");
      expect(parser.cursor).toBe(0);
      // When an expected character is under the cursor
      expect(parser.expect("1")).toBe("1");
      // Then it should move the cursor forward
      expect(parser.cursor).toBe(1);
      expect(parser.getCurrent()).toBe("2");
    });

    it("should raise an error if expected character is not under the cursor", () => {
      // Given a base parser with some input and a cursor
      const parser = new BaseParser();
      parser.setInput("1234");
      expect(parser.cursor).toBe(0);
      // When an expected character is NOT under the cursor
      // Then it should throw an error
      expect(() => parser.expect("2"))
        .toThrow(new ParsingError("Expected '2', got '1'"));
    });

    it("should provide a lil helper to expect an entire string", () => {
      // Given a base parser with some input and a cursor
      const parser = new BaseParser();
      parser.setInput("sweeeet");
      // When a string is expected
      const output = parser.expectString("sweeee");
      // Then it will return the expected string
      expect(output).toBe("sweeee");
      // And then it will move the cursor to right after the string just consumed
      expect(parser.cursor).toBe(6);
      expect(parser.getCurrent()).toBe("t");
    });
  });

  describe("Matching Expressions", () => {
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
          // Stop the loop at 
          parser.error('Not Int');
        };
        // When a function that will 
        const output = parser.zeroOrMore(integers);
        // Then it should consume all the input since it matches
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
  });
});
