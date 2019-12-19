import { BaseParser, ParsingError } from "./api";


describe("#1 Kata - Move the cursor forward on matching", () => {
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
