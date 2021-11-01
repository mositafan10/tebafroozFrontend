const prod = {
    url: {
     API_URL: "http://185.239.104.161"
    },
    name: {
        title: "TAN"
    }
}

const dev = {
    url: {
     API_URL: "http://127.0.0.1:8000"
    },
    name: {
        title: "TAN-test"
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod ;