import http from "k6/http"
import { check, sleep } from "k6"

const BASE_URL = "https://httpbun.com"

export const options ={ 
    scenarios: {
        stress: {
            executor: 'ramping-vus',
            stages: [
                {duration: "10s", target: 25},
                {duration: "30s", target: 50},
                {duration: "40s", target: 100},
                {duration: "30s", target: 100},
                {duration: "10s", target: 0},
            ]
        }
    },
    thresholds: {
        http_req_failed: ["rate<0.05"],
        http_req_duration: ["p(95)<1000"]
    }
}

export default function () {
    const res = http.get(`${BASE_URL}/get`)

    check(res, {
        "status is 200": (r) => r.status === 200
    })

    sleep(1)
}
