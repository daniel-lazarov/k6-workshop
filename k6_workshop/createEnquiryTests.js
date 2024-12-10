import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 10 }
    ],
};

export default function () {
    const payload = JSON.stringify({
        name: 'Demo user',
        email: 'demouser@gmail.com',
        mobile: '+1234567890',
        comment: 'very interesting comment',
        status: 'In Progress'
    });

    const headers = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const response = http.post('http://localhost:5050/api/enquiry', payload, headers);

    //Assert

    check(response, {
        'status is 200': (r) => r.status === 200,
        'check for id and status fields exist': (r) => {
            const body = JSON.parse(r.body);
            return body.hasOwnProperty('_id') && body.hasOwnProperty('status');
        }
    });
    sleep(1);
}