import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 1000 },
  ],
};

export default function () {
  const p = Math.floor(Math.random() * 10000) + 1;
  const res = http.get(`http://localhost:3000/products?page=${p}&count=100`);

  check(res, { 'success login': (r) => r.status === 200 });

  sleep(1);
}
