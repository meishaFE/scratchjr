import JsZip from 'jszip';

async function load(fileBase64) {
  const zip = new JsZip();
  const resZip = await zip.loadAsync(fileBase64.split(',')[1], { base64: true });
  let files = {};
  let json;

  for (let filename in resZip.files) {
    const fullName = filename.split('/').pop();
    const fileType = fullName.split('.').pop();

    if (fileType === 'svg') {
      files[fullName] = 'data:image/svg+xml;base64,' + (await resZip.files[filename].async('base64'));
    }

    if (fileType === 'png') {
      files[fullName] = 'data:image/png;base64,' + (await resZip.files[filename].async('base64'));
    }

    if (fileType === 'wav') {
      files[fullName] = 'data:audio/wav;base64,' + (await resZip.files[filename].async('base64'));
    }

    if (fullName && fileType === 'json') {
      json = await resZip.files[filename].async('text');
    }
  }

  return {
    files,
    json: JSON.parse(json)
  };
}

export default load;
