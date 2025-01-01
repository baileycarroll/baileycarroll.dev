'use client';

import { useEffect, useState } from 'react';
import anime from 'animejs';
import Heading from '../typography/Headings';
import Image from 'next/image';
import logo from '@/app/assets/EnchantedRoseLogo.svg';

const SplashScreen = ({ setIsSplashComplete }: { setIsSplashComplete: (value: boolean) => void }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure the splash screen only renders on the client
    setIsMounted(true);

    if (isMounted) {
      anime({
        targets: '.splash-screen .eriLogo .brand',
        translateY: [-100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 2000,
        delay: 500,
      });

      anime({
        targets: '.splash-screen',
        opacity: [1, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 3000,
        complete: () => {
          const splashScreen = document.querySelector('.splash-screen');
          if (splashScreen) {
            splashScreen.classList.add('hidden');
          }

          // Notify that the splash screen is done
          setIsSplashComplete(true);  // This triggers the fade-in for the main content
        },
      });
    }
  }, [isMounted, setIsSplashComplete]);

  if (!isMounted) {
    return null; // Don't render the splash screen on the server
  }

  return (
    <div
      id="splash-screen"
      className="h-screen bg-slate-900 splash-screen flex flex-col items-center justify-center"
    >
      <Image src={logo} alt='Rose & Shield Logo splash-screen' className='w-[35dvw]' />
      <Heading Level={1} className='.brand splash-screen'>Bailey Rose Carroll</Heading>
    </div>
  );
};

export default SplashScreen;
