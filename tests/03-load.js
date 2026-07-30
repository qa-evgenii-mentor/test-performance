import http from "k6/http"
import { check, sleep } from "k6"

const BASE_URL = "https://httpbun.com"

export const options ={ 
    scenarios: {
        load: {
            executor: 'ramping-vus',
            stages: [
                {duration: "30s", target: 5},
                {duration: "1m", target: 15},
                {duration: "2m", target: 25},
                {duration: "20s", target: 0},
            ]
        }
    },
    threasholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<500"]
    }
}

export default function () {
    const res = http.get(`${BASE_URL}/ip`)

    check(res, {
        "status is 200": (r) => r.status === 200
    })

    sleep(1)
}
