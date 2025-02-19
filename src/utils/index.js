export async function connect() {
    console.log('Connecting to server...');
}

export async function getInfo(cid, data = {}, lang) {
    const BUNDLE_ID = await DeviceInfo.getBundleId()
    const response = await fetch(`https://api.litedev.com/v1/member`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cid,
        'sales-channel': 'ios',
        'bundle-id': "com.example.demo",
        'Accept-Language': lang || 'en'
      },
      body: JSON.stringify(data)
    });
    return response.json();
}