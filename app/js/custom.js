// Popper https://popper.js.org/
var ref = $('#button-a');
var popup = $('#popup');
popup.hide();
ref.click(function () {
 popup.show();
 var popper = new Popper(ref, popup, {
  placement: 'top',
  onCreate: function (data) {
   console.log(data);
  },
  modifiers: {
   flip: {
    behavior: ['left', 'right', 'top', 'bottom']
   },
   offset: {
    enabled: true,
    offset: '0,10'
   }
  }
 });
});   