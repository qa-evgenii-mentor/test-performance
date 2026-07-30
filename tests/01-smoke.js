import http from "k6/http"
import { check, sleep } from "k6"

const BASE_URL = "https://httpbun.com"

export const options ={ 
    vus: 1,
    duration: "30s"
}

export default function () {
    const res = http.get(`${BASE_URL}/get`)

    check(res, {
        "status is 200": (r) => r.status === 200
    })

    sleep(1)
}
