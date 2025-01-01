// React Imports
import React from 'react';
// Import Base Properties
import BaseProps from '@/app/components/Base';
// Import CLSX for conditional classes
import clsx from 'clsx';
// WorkSans Font
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'] });

const ListDecimal: React.FC<BaseProps> = ({ children, className, style }) => {
    return React.createElement('ul', {
        className: clsx('list-decimal pl-4 ' + workSans.className, className),
        style,
    }, children);
}
const ListDecimalHorizontal: React.FC<BaseProps> = ({ children, className, style }) => {
    return React.createElement('ul', {
        className: clsx('list-decimal pl-4 flex flex-row items-center' + workSans.className, className),
        style,
    }, children);
}

export { ListDecimal, ListDecimalHorizontal };