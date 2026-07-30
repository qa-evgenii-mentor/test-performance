import http from "k6/http"
import { check, sleep } from "k6"

const BASE_URL = "https://httpbun.com"

export const options ={ 
    scenarios: {
        soak: {
            executor: 'ramping-vus',
            stages: [
                {duration: "1m", target: 50},
                {duration: "3m", target: 50},
                {duration: "1m", target: 0},
            ]
        }
    },
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<800"]
    }
}

export default function () {
    const res = http.get(`${BASE_URL}/ip`)

    check(res, {
        "status is 200": (r) => r.status === 200
    })

    sleep(1)
}
