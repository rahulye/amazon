import formatCurrency from "../scripts/utils/money.js";

// describe("A suite", function() {
//     it("contains a spec with an expectation", function() {
//         expect(true).toBe(true);
//     });
// });

describe( "Test suite : formatCurrency" , () => {
  it( "converts cents into dollars" , () => {
    expect( formatCurrency(2095) ).toEqual('20.95');
  });
  
  it( "works with 0" , () => {
    expect( formatCurrency(0) ).toEqual('0.00');
  });

  it( "rounds up to the nearest cent" , () => {
    expect( formatCurrency(2000.5) ).toEqual('20.01');
  });
});