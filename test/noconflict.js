(function() {

  module("Boneless.noConflict");

  test('noConflict', 2, function() {
    var noconflictBoneless = Boneless.noConflict();
    equal(window.Boneless, undefined, 'Returned window.Boneless');
    window.Boneless = noconflictBoneless;
    equal(window.Boneless, noconflictBoneless, 'Boneless is still pointing to the original Boneless');
  });

})();
