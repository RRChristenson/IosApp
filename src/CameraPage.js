const PluginPage = require('./PluginPage');
const {Button, ImageView, XMLHttpRequest} = require('tabris');

const TITLE = 'Camera';
const PLUGIN_ID = 'cordova-plugin-camera';
const PICTURE_BUTTON_TEXT = 'TAKE A PICTURE DAWG';

module.exports = class CameraPage extends PluginPage {

  constructor(properties) {
    super(Object.assign({pluginId: PLUGIN_ID, title: TITLE}, properties));
  }

  createUI() {
    super.createUI();
    this.content.append(
      new Button({id: 'pictureButton', text: PICTURE_BUTTON_TEXT})
        .on('select', () => this._takePicture()),
      new ImageView({id: 'image'})
    );
  }

  _takePicture() {
    let onSuccess = image => this.find('#image').first().image = image;
    let onFail = message => console.log('Camera failed because: ' + message);
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      targetWidth: 1024,
      targetHeight: 1024,
      destinationType: window.Camera.DestinationType.DATA_URL
    });
    console.log('before fetch');
    fetch('http://192.168.1.3:5000/', { // Your POST endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: 'image data'
    }).then(response => response.json())
      .then(success => console.log(success))
      .catch((err) => {
        console.log(err);
      });
    console.log('after fetch');
  }

  applyLayout() {
    super.applyLayout();
    this.content.apply({
      '#pictureButton': {left: 16, top: 8, right: 16},
      '#image': {top: '#pictureButton 16', left: 16, right: 16, bottom: 16}
    });
  }
};
