import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 10 }
    ],
};

export default function () {
    //Arrange
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTZiZjUzMTc3MjUxNWJiZWU0MzIxZiIsImlhdCI6MTczMzgzMjQzNywiZXhwIjoxNzMzOTE4ODM3fQ.b-hsWNkTyxo7VxnChXVMfkB9oKBlJTzeGs-gOlGu-LI';

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`,
        }
    }

    const responseGet = http.get('http://localhost:5050/api/enquiry');

    const enquiries = JSON.parse(responseGet.body);
    enquiries.forEach((enquiry) => {
        if (enquiry.name === 'Demo user') {
            const deleteResponse = http.del(`http://localhost:5050/api/enquiry/${enquiry._id}`, null, headers);

            check(deleteResponse, {
                'Delete response has correct status code': (r) => r.status === 200,
            });
        }
    });
    sleep(1);
}