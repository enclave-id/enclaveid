'use client';

import { useContext } from 'react';
import { handleConsent } from './consentHandlers';
import './page.module.css';
import Image from 'next/image';
import { WebSocketContext } from '../providers/WebSocketProvider';

/* eslint-disable-next-line */
export interface ConsentProps {}

export function Consent(props: ConsentProps) {
  const ws = useContext(WebSocketContext);
  const customerName = '$PLACEHOLDER$';

  return (
    <div className="bg-gray-100 h-screen flex  justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center items-center p-8">
          <Image
            alt="header text"
            src="/user-lock-solid.svg"
            className="sm:w-10 sm:h-10 w-9 h-9"
            width={24}
            height={24}
          />
          <h1 className="sm:text-3xl text-xl font-bold ml-2 tracking-tight">
            EnclaveID
          </h1>
        </div>

        <p className="mb-4">
          {customerName} will be matching your profile to their products catalog
          using the following data from Google Takeout:
        </p>
        <ul className="list-disc pl-5 mb-6">
          <li>
            Location History (Purpose:{' '}
            <span className="text-gray-600">purpose</span>)
          </li>
          <li>
            Search History (Purpose:{' '}
            <span className="text-gray-600">purpose</span>)
          </li>
          <li>
            Email History (Purpose:{' '}
            <span className="text-gray-600">purpose</span>)
          </li>
        </ul>
        <p className="mb-4">
          None of your information will be revealed to {customerName} because
          EnclaveID employs{' '}
          <span
            className="underline cursor-help"
            data-tooltip="Private matching works by comparing data without either side revealing their raw data. It's a secure process that ensures privacy."
          >
            private matching technology
          </span>
          .
        </p>
        <div className="flex justify-between ">
          {ws ? (
            <>
              <button
                className="bg-red-500 text-white rounded px-12 py-2"
                onClick={handleConsent(ws, false)}
              >
                Deny
              </button>

              <button
                className="bg-green-500 text-white rounded px-12 py-2"
                onClick={handleConsent(ws, true)}
              >
                Allow
              </button>
            </>
          ) : (
            <div className="flex w-full justify-center">
              <div className=" w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Consent;
