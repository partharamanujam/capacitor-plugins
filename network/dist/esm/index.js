import { registerPlugin } from '@capacitor/core';
const Network = registerPlugin('Network', {
    web: () => import('./web').then(m => new m.NetworkWeb()),
});
export * from './definitions';
export { Network };
//# sourceMappingURL=index.js.map