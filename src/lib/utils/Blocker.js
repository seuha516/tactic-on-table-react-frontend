import { useContext, useEffect, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block(tx => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message, when = true) {
  const blocker = useCallback(
    tx => {
      if (window.confirm(message)) tx.retry();
    },
    [message],
  );

  useBlocker(blocker, when);
}
