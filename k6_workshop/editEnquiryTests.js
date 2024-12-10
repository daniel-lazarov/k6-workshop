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

    const enquiryToEditId = '6756bf541772515bbee432db';

    const payload = JSON.stringify({
        name: 'Updated John Doe',
        email: 'updated-demouser@gmail.com',
        mobile: '+1234567890',
        comment: 'updated comment',
        status: 'Submitted'
    });

    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTZiZjUzMTc3MjUxNWJiZWU0MzIxZiIsImlhdCI6MTczMzgzMjQzNywiZXhwIjoxNzMzOTE4ODM3fQ.b-hsWNkTyxo7VxnChXVMfkB9oKBlJTzeGs-gOlGu-LI';

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`,
        }
    }

    //Act
    const response = http.put(`http://localhost:5050/api/enquiry/${enquiryToEditId}`, payload, headers);

    //Assert
    check(response, {
        'status is 200': (r) => r.status === 200,
        'Name and Status have correct values': (r) => {
            const body = JSON.parse(r.body);
            return body.name === 'Updated John Doe' && body.status === 'Submitted';
        }
    });
    sleep(1);
}