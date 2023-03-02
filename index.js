
function convertUnixPath(path) {
  // Remove any leading or trailing slashes
  path = path.replace(/^\/+|\/+$/g, '');

  // Split the path into its components
  const components = path.split('/');

  // Remove a leading '.' if present
  if (components[0] === '.') {
    components.shift();
  }

  // Filter out any empty components
  const filteredComponents = components.filter(component => component !== '');

  // Join the components with slashes and add a leading slash
  const formattedPath = `/${filteredComponents.join('/')}`;

  return formattedPath;
}


class VirtualFileSystem {
  constructor() {
    this.files = {};
  }

  writeFile(path, content) {
    this.files[path] = content;
  }

  readFile(path) {
    console.log(convertUnixPath(path));

    const encodedContent = this.files[convertUnixPath(path)];
    console.log(encodedContent);

    const decodedContent = atob(encodedContent);
    console.log(decodedContent);
    return decodedContent;
  }
}

const vfs = new VirtualFileSystem();

function readFromVFS(path) {
  return vfs.readFile(path);
}

const oldXMLHttpRequest = window.XMLHttpRequest;

// Replace XMLHttpRequest with our custom function
XMLHttpRequest = class {
  constructor() {
    this.listeners = {
      loadstart: [],
      load: [],
      error: [],
      abort: [],
    };
    this.readyState = 0;
  }

  open(method, url) {
    this.method = method;
    this.url = url;
    this.readyState = 1;
    this.dispatchEvent(new Event('loadstart'));
  }

  addEventListener(event, callback) {
    console.log(event);
    if (event !== "progress") {
      this.listeners[event].push(callback);
    }
  }

  removeEventListener(event, callback) {
    const index = this.listeners[event].indexOf(callback);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  dispatchEvent(event) {
    this.listeners[event.type].forEach(callback => {
      callback.call(this, event);
    });
  }

  set onload(callback) {
    this.addEventListener('load', callback);
  }

  send() {
    const responseText = readFromVFS(this.url);
    this.responseText = responseText;
    this.readyState = 4;
    this.status = 200;
    this.dispatchEvent(new Event('load'));
  }
};

vfs.writeFile('/index.html', 'PCFET0NUWVBFIGh0bWw+CjxodG1sPgogIDxoZWFkPgogICAgCiAgPC9oZWFkPgogIDxib2R5PgogICAgPHNjcmlwdCBzcmMgPSAiaW5kZXguanMiPjwvc2NyaXB0PgogIDwvYm9keT4K');vfs.writeFile('/index.js', 'Ly8gYmxhbmsgZm9yIG5vdyBiYyByZWFzb25zCg==');vfs.writeFile('/walrus.txt', 'SSBsb3ZlIGVhdGluZyB3YWxydXNlcy4KWXVtIHl1bSEhIQoKCgoKCndvd3cKCndvCm93Cgphb3cKb2QKLT0xMjkwMgo=');vfs.writeFile('/stupid.py', 'aW1wb3J0IG9zCmltcG9ydCBiYXNlNjQKCiMgRGVmaW5lIHRoZSBwYXRoIHRvIHRoZSBmb2xkZXIgY29udGFpbmluZyB0aGUgZmlsZXMKZm9sZGVyX3BhdGggPSAiLi8iCgpvdXRwdXQgPSBvcGVuKCJzdHVwaWRGaWxlLmpzIiwgInciKQoKIyBMb29wIHRocm91Z2ggYWxsIGZpbGVzIGFuZCBmb2xkZXJzIGluIHRoZSBmb2xkZXIKcHJpbnQoImR1bSIpCmZvciByb290LCBkaXJzLCBmaWxlcyBpbiBvcy53YWxrKGZvbGRlcl9wYXRoKToKCSMgTG9vcCB0aHJvdWdoIGFsbCBmaWxlcyBpbiB0aGUgY3VycmVudCBmb2xkZXIKCXByaW50KCIxIikKCWZvciBmaWxlbmFtZSBpbiBmaWxlczoKCQlwcmludCgiMiIpCgkJIyBSZWFkIHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZQoJCXdpdGggb3Blbihvcy5wYXRoLmpvaW4ocm9vdCwgZmlsZW5hbWUpLCAicmIiKSBhcyBmOgoJCQljb250ZW50ID0gZi5yZWFkKCkKCgkJIyBFbmNvZGUgdGhlIGNvbnRlbnRzIG9mIHRoZSBmaWxlIGFzIGJhc2U2NAoJCWVuY29kZWRfY29udGVudCA9IGJhc2U2NC5iNjRlbmNvZGUoY29udGVudCkuZGVjb2RlKCd1dGYtOCcpCgoJCSMgR2V0IHRoZSByZWxhdGl2ZSBwYXRoIHRvIHRoZSBmaWxlCgkJcmVsYXRpdmVfcGF0aCA9IG9zLnBhdGgucmVscGF0aChvcy5wYXRoLmpvaW4ocm9vdCwgZmlsZW5hbWUpLCBmb2xkZXJfcGF0aCkKCgkJIyBPdXRwdXQgdGhlIEpTIGNvbW1hbmQgdG8gYWRkIHRoZSBmaWxlIHRvIHRoZSB2aXJ0dWFsIGZpbGVzeXN0ZW0KCQlwcmludChmInZmcy53cml0ZUZpbGUoJy97cmVsYXRpdmVfcGF0aH0nLCAne2VuY29kZWRfY29udGVudH0nKTsiKQoJCW91dHB1dC53cml0ZShmInZmcy53cml0ZUZpbGUoJy97cmVsYXRpdmVfcGF0aH0nLCAne2VuY29kZWRfY29udGVudH0nKTsiKQoKb3V0cHV0LmNsb3NlKCkK');vfs.writeFile('/stupidFile.js', '');

// original
function testXHRs(path) {
  const xhr = new oldXMLHttpRequest();
  xhr.open('GET', 'path');
  xhr.onload = function() {
    console.log(xhr.responseText);
    var a = xhr.responseText;
  };
  xhr.send();

  // ours with vfs
  const xhr1 = new XMLHttpRequest();
  xhr1.open('GET', 'path');
  xhr1.onload = function() {
    console.log(xhr1.responseText);
    var b = xhr1.responseText;
  };
  xhr1.send();

  console.log(a === b);
}

testXHRs("walrus.txt");
testXHRs("/walrus.txt");
testXHRs("./walrus.txt");
testXHRs("/walrus.txt/");
testXHRs("walrus.txt/");
testXHRs("./walrus.txt/");
testXHRs("walrus.txt");




