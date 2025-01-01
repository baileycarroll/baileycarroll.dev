// React Imports
import React from 'react';
// Import Base Properties
import BaseProps from '@/app/components/Base';
// Import CLSX for conditional classes
import clsx from 'clsx';
// WorkSans Font
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'] });

const Paragraph: React.FC<BaseProps> = ({ children, className, style }) => {
    return React.createElement('p', {
        className: clsx('text-lg leading-relaxed ' + workSans.className, className),
        style,
    }, children);
}

export default Paragraph;