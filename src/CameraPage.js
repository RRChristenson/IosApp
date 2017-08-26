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
      destinationType: window.Camera.DestinationType.FILE_URI
    });

    //File Processing
    let file =  this.find('#image').first().image;
    let fileName = 'file';
    let mimeType = 'image';
    let target = 'http://192.168.1.5:8080/';
    const xhr = new XMLHttpRequest();
    xhr.onload = function() { if (xhr.status === 200) {
      // File(s) uploaded.
      console.log('File sent');
    } else {
      console.log('file not sent');
    } };
    xhr.onerror = function() { /* Not called */ };
    xhr.onabort = function() { /* Not called */ };
    xhr.ontimeout = function() { /* Not called */ };
    xhr.open('POST', target, true);
    xhr.setRequestHeader('Content-Type', mimeType);
    xhr.setRequestHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');
    xhr.send(file);
    console.log('file sent');
  }

  applyLayout() {
    super.applyLayout();
    this.content.apply({
      '#pictureButton': {left: 16, top: 8, right: 16},
      '#image': {top: '#pictureButton 16', left: 16, right: 16, bottom: 16}
    });
  }

};
