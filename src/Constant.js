const prod = {
    url: {
     API_URL: "https://193.141.64.9"
    },
    name: {
        title: "Billig"
    }
}

const dev = {
    url: {
     API_URL: "http://127.0.0.1:8000"
    },
    name: {
        title: "Billig-test"
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod ;