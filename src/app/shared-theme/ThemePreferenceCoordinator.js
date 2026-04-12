'use client';

import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';

/** Matches MUI Material InitColorSchemeScript / CssVarsProvider default. */
const MODE_STORAGE_KEY = 'mui-mode';
const VALID_MODES = new Set(['light', 'dark', 'system']);

/**
 * Normalizes color-scheme mode so the menu stays on "System" unless the user
 * has a persisted preference in localStorage.
 *
 * MUI's initializer returns `undefined` for mode during SSR; after hydration that
 * can leave context out of sync. In private / strict modes, storage may throw or
 * stay empty while React still ends up in an explicit light/dark state — on the
 * first client layout we snap to `system` when there is no valid stored mode.
 * After that, session-only Light/Dark choices are left alone even if writes fail.
 */
export default function ThemePreferenceCoordinator() {
  const { mode, setMode } = useColorScheme();
  const hasSyncedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (mode == null) {
      setMode('system');
      return;
    }

    // One-time reconcile of React mode vs persisted preference (private/incognito, SSR).
    if (hasSyncedRef.current) {
      return;
    }

    let stored;
    try {
      stored = localStorage.getItem(MODE_STORAGE_KEY);
    } catch {
      if (mode !== 'system') {
        setMode('system');
      }
      hasSyncedRef.current = true;
      return;
    }

    if (stored != null && VALID_MODES.has(stored)) {
      hasSyncedRef.current = true;
      return;
    }

    if (mode !== 'system') {
      setMode('system');
    }
    hasSyncedRef.current = true;
  }, [mode, setMode]);

  return null;
}
