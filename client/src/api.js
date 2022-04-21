const SERVER_HOST = 'http://127.0.0.1:8000';

export const sender = async (url, method = 'GET', data = null) => {
    console.log(`${location.protocol + '//' + location.host} ${method} ${SERVER_HOST + url}`);
    const res = await fetch(SERVER_HOST + url, {
        method: method,
        mode: 'cors',
        body: data && JSON.stringify(data),
        headers: {
            'Content-Type': 'text/plain'
        },
    });
    return await res.json();
}