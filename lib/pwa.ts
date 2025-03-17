'use client';

import { useEffect, useState } from 'react';

interface PWAState {
  isInstallable: boolean;
  isAppleDevice: boolean;
  handleInstall: () => Promise<boolean>;
}

function usePWA(): PWAState {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isAppleDevice, setIsAppleDevice] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    setIsAppleDevice(isIOS);
    const beforeInstallPromptHandler = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);
  const handleInstall = async (): Promise<boolean> => {
    if (!deferredPrompt) return false;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    return outcome === 'accepted';
  };

  return { isInstallable, isAppleDevice, handleInstall };
}

export default usePWA;
