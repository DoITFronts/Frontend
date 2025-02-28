// 브라우저 환경 브라우저 환경에서만 실행되는 MSW Worker 설정 파일
// worker.start()가 실행되면 브라우저에서 API 요청을 가로챔
import { setupWorker } from 'msw';

import handler from '@/api/mocks/handlers';

const worker = typeof window !== 'undefined' ? setupWorker(...handler) : undefined;
export default worker;
