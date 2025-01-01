// React Imports
import React from 'react';
// Import Base Properties
import BaseProps from '@/app/components/Base';
// Import CLSX for conditional classes
import clsx from 'clsx';
// WorkSans Font
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'] });

const ListDisc: React.FC<BaseProps> = ({ children, className, style }) => {
    return React.createElement('ul', {
        className: clsx('list-disc pl-4 ' + workSans.className, className),
        style,
    }, children);
}
const ListDiscHorizontal: React.FC<BaseProps> = ({ children, className, style }) => {
    return React.createElement('ul', {
        className: clsx('list-disc pl-4 flex flex-row items-center' + workSans.className, className),
        style,
    }, children);
}
const ListNone: React.FC<BaseProps> = ({ children, className, style }) => {
    return React.createElement('ul', {
        className: clsx('list-none ' + workSans.className, className),
        style,
    }, children);
}
const ListNoneHorizontal: React.FC<BaseProps> = ({ children, className, style }) => {
    return React.createElement('ul', {
        className: clsx('list-none flex flex-row items-center' + workSans.className, className),
        style,
    }, children);
}

export { ListDisc, ListDiscHorizontal, ListNone, ListNoneHorizontal };
