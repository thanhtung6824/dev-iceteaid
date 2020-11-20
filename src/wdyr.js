import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import * as hooks from './hooks';

if (process.env.NODE_ENV === 'development') {
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackExtraHooks: [['hooks', hooks.useDarkMode as any]],
    });
}
