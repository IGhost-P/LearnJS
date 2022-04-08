// 프로젝트 전체에서 사용될수 있는 함수
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     // Gruad Cluase
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (err) {
//     throw err; // err가 getJSON을 호출한 비동기 함수까지가지 않기때문에 throw err를 통해 보낸준다
//   }
// };
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
