import http from "k6/http"
import { check, sleep } from "k6"

const BASE_URL = "https://httpbun.com"
const PAUSE = 1

export const options ={ 
    scenarios: {
        business_flow: {
            executor: 'ramping-vus',
            stages: [
                {duration: "30s", target: 5},
                {duration: "1m", target: 10},
                {duration: "30s", target: 0},
            ]
        }
    },
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<700"]
    }
}

function getStep(path, name, expectedStatus) {
    const res = http.get(`${BASE_URL}${path}`)

    check(res, {
        [`${name} status is ${expectedStatus}`]: (r) => r.status === expectedStatus
    })

    sleep(PAUSE)
}

function postStep(path, name, payload, expectedStatus) {
    const res = http.post(`${BASE_URL}${path}`, JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }
    })

    check(res, {
        [`${name} status is ${expectedStatus}`]: (r) => r.status === expectedStatus
    })

    sleep(PAUSE)
}

export default function () {
    getStep("/get", "get", 200)
    getStep("/ip", "ip", 200)
    getStep("/headers", "headers", 200)
    postStep("/post", "post", {
        product: "performance-course",
        action: "business-flow"
    }, 200)
    getStep("/status/204", "status endpoint", 204)
}
