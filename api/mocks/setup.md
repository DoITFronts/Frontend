import worker from '@/api/mocks/browser.md';

async function startMockWorker() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    await worker?.start({
      quiet: true,
      onUnhandledRequest: 'bypass',
    });
  }
}
export default startMockWorker;
