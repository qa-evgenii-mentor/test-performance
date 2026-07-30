import http from "k6/http"
import { check, sleep } from "k6"

const BASE_URL = "https://httpbun.com"

export const options ={ 
    vus: 10,
    duration: "1m",
    threasholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<500"]
    }
}

export default function () {
    const res = http.get(`${BASE_URL}/ip`)

    check(res, {
        "status is 200": (r) => r.status === 204
    })

    sleep(1)
}
