const WEB_GL_1_0 = 'webgl';
const WEB_GL_2_0 = 'webgl2';

class Canvas {

  constructor(domId) {
    // Get the canvas DOM element
    const canvas = document.querySelector(`#${domId}`);

    // Set WebGL version
    const glVersion = WEB_GL_2_0;

    // Initialize the GL context
    this.gl = canvas ? canvas.getContext(glVersion) : null;

    if (!this.gl) {
      alert(`Unable to initialize WebGL (${glVersion}). Your browser or machine may not support it.`);
    }

    // const extensions = this.gl.getSupportedExtensions();
    // console.log('Supported Extensions:', extensions);
  }

}

export default Canvas;
