import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '번개의 시작, 번개팅',
    short_name: '번개팅',
    description: '번개팅을 통해서 다양한 번개 모임을 가져보세요!',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    categories: ['social', 'productivity', 'networking'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/screenshot1.png',
        sizes: '1080x1920',
        type: 'image/png',
      },
      {
        src: '/screenshots/screenshot2.png',
        sizes: '1080x1920',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: '내 모임 보기',
        short_name: '모임',
        description: '내가 참여한 번개 모임을 확인하세요!',
        url: '/myprofile',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: '번개 찾기',
        short_name: '번개 찾기',
        description: '새로운 번개 모임을 찾아보세요!',
        url: '/meeting/list',
        icons: [{ src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
      },
    ],
  };
}
