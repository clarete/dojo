import { BaseParser, ParsingError } from "./api";


describe("#2 Kata - Matching Expressions", () => {
  describe("zeroOrMore", () => {
    it("should return nothing when it doesn't match anything", () => {
      // Given a base parser with some input
      const parser = new BaseParser();
      parser.setInput("aaab");
      // When trying to match `c'
      const output = parser.zeroOrMore(() => parser.expect('c'));
      // Then it should parse nothing
      expect(output).toEqual([]);
      // And then expect that the cursor didn't move
      expect(parser.cursor).toBe(0);
    });

    it("should capture as much of the input as possible", () => {
      // Given a base parser with some input
      const parser = new BaseParser();
      parser.setInput("aaab");
      // When trying to parse `a'
      const output = parser.zeroOrMore(() => parser.expect('a'));
      // Then it should parse all the first `a's
      expect(output).toEqual(['a', 'a', 'a']);
      // And then the cursor should be right after the last match
      expect(parser.cursor).toBe(3);
      expect(parser.getCurrent()).toBe('b');
    });

    it("should work with any matching function", () => {
      // Given a base parser with some input
      const parser = new BaseParser();
      parser.setInput("1234abcd");
      // And given a custom matching function that parses a
      // single digit if it's a valid digit or raises a parsing
      // error
      const expectInteger = () => {
        // Check if the current char is a digit and move
        // the cursor forward if so and move on
        const current = parser.getCurrent();
        if (/\d/.test(current)) {
          parser.next();
          return current;
        }
        throw new ParsingError('Not Int');
      };
      // When zero or more integers are consumed
      const output = parser.zeroOrMore(expectInteger);
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
        () => parser.expect("b"),
        () => parser.expect("a"),
      ]);
      // Then it should match the successful one
      expect(output).toBe("a");
    });

    it("should choose properly reset the cursor after a failed attempt", () => {
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
      // When faced with a list of options that contain no successful
      // parsing; Then it should fail with the error `No option found'.
      expect(() => parser.or([
        () => { throw new ParsingError('err1'); },
        () => { throw new ParsingError('err2'); },
      ])).toThrow(new ParsingError('No option found'));
    });
  });

  // the method `oneOrMore` is a syntax sugar for calling the matching
  // function once and then calling it with `zeroOrMore`. It makes things
  describe("oneOrMore", () => {
    it("should raise an error if it doesn't match anything", () => {
      // Given a new base parser with some input
      const parser = new BaseParser();
      parser.setInput("bbbb");
      // When we try to parse the above input; Then it should throw an
      // error
      expect(() => parser.oneOrMore(() => parser.expect("a")))
        .toThrow(new ParsingError("Expected 'a', got 'b'"));
    });

    it("should parse as many item out of the input as possible", () => {
      // Given a new base parser with some input
      const parser = new BaseParser();
      parser.setInput("aaab");
      // When we try to parse the above input
      const output = parser.oneOrMore(() => parser.expect("a"));
      // Then it should consume all the `a's in the input
      expect(output).toEqual(['a', 'a', 'a']);
    });
  });
});
