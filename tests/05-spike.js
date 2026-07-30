import http from "k6/http"
import { check, sleep } from "k6"

const BASE_URL = "https://httpbun.com"

export const options ={ 
    scenarios: {
        spike: {
            executor: 'ramping-vus',
            stages: [
                {duration: "2s", target: 1000},
                {duration: "15s", target: 0},
                {duration: "5s", target: 1000},
                {duration: "10s", target: 10},
            ]
        }
    },
    thresholds: {
        http_req_failed: ["rate<0.05"],
        http_req_duration: ["p(95)<1500"]
    }
}

export default function () {
    const res = http.get(`${BASE_URL}/get`)

    check(res, {
        "status is 200": (r) => r.status === 200
    })

    sleep(1)
}
