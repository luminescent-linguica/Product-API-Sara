import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 1 },
    { duration: '30s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 1000 },
  ],
};

export default function () {
  const id = Math.floor(Math.random() * (1000011)) + 1;
  const res = http.get(`http://localhost:3000/products/${id}/related`);

  check(res, { 'success login': (r) => r.status === 200 });

  sleep(1);
}
