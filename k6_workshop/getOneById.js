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
    const res = http.get('http://localhost:5050/api/enquiry/6756bf541772515bbee432dc');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'check for id and status fields exist': (r) => {
            const body = JSON.parse(r.body);
            return body.hasOwnProperty('_id') && body.hasOwnProperty('status');
        }
    });
    sleep(1);
}