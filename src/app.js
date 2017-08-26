const {Button, NavigationView,ScrollView, ui, Page,device} = require('tabris');
const CameraPage = require('./CameraPage');

let navigationView = new  NavigationView({
  left:0, top:0, right:0, bottom:0
}).appendTo(ui.contentView);

let mainPage = new Page({
  title: 'Robs super awesome fun app'
}).appendTo(navigationView);

let contentContainer = new ScrollView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(mainPage);

let button = new Button({
  centerX: 0, top: 100,
  text: 'Missys Cooooool'
}).appendTo(contentContainer);

/*let takePicture = new Button({
  left: 16, top: 200, right: 16,
  text: 'Take Picture'
}).appendTo(contentContainer);

takePicture.on('select', () => {
  CameraPage.appendTo(navigationView);
});*/
//.appendTo(contentContainer);

button.on('select', () => {
  button.enabled = false;
  button.animate({
    opacity: 0.25,
    transform: {
      rotation: 0.75 * Math.PI,
      scaleX: 2.0,
      scaleY: 2.0,
      translationX: 100,
      translationY: 200
    }
  }, {
    delay: 0,
    duration: 1000,
    repeat: 1,
    reverse: true,
    easing: 'ease-out'
  }).then(() => button.enabled = true);
}).appendTo(contentContainer);
//.appendTo(ui.contentView);

(
  device.platform === 'windows' ? [
  ] : [
    CameraPage,
  ]
).forEach(Page => {
  let page = new Page();
  addPageSelector(page);
});

function addPageSelector(page) {
  new Button({
    left: 16, top: 'prev() 8', right: 16,
    text: page.title
  }).on('select', () => page.appendTo(navigationView))
    .appendTo(contentContainer);
}
