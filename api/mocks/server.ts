// 테스트 환경에서 사용할 서버를 설정하는 파일
// Jest 또는 Cypress에서 server.listen()이 실행되면, API 요청을 가로챔
import { setupServer } from 'msw/node';

import handler from '@/api/mocks/handlers';

const server = setupServer(...handler);
export default server;
