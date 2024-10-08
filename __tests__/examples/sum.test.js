const sum = require("./sum");
import dependencyChecker from "./dependencyChecker"
jest.mock('./dependencyChecker');

describe("Sum Suite", function () {

  beforeEach(() => {
    console.log('✅ Démarrage du test')
  })

  afterEach(() => {
    console.log('✅ Test completed')
  })

  test.only("should call dependencyChecker", () => {

    dependencyChecker.mockReturnValue(true) 
    
    const result = sum(2, 3)
    expect(result).toBe(5)

    // Correction de toHaveBeenCalled(2)
    expect(dependencyChecker).toHaveBeenCalledTimes(2)
    expect(dependencyChecker).toHaveBeenCalledWith(2, "number")
    expect(dependencyChecker).toHaveBeenCalledWith(3, "number")
  })

  test.skip("should 1 + 2 be equal to 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test.todo("Il faut faire un test qui vérifie si a * 2 = 2a")
  
  test.skip("should 1 + Mouton throw an Error", () => {
    expect(() => sum(1, "Mouton")).toThrow("Should be a number");
  });
});
