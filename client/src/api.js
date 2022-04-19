export const sender = async (url, method = 'GET', data = null) => {
    console.log(`${location.protocol + '//' + location.host} ${method} ${url}`);
    const res = await fetch(url, {
        method: method,
        mode: 'cors',
        body: data && JSON.stringify(data),
        headers: {
            'Content-Type': 'text/plain'
        },
    });
    return await res.json();
}