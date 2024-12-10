import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '10s', target: 0 }
    ],
};

export default function () {
    const res = http.get('http://localhost:5050/api/enquiry');
    check(res, {
        'status is 200': (r) => r.status === 200
    });
    sleep(1);
}