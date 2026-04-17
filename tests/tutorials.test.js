import { describe, expect, it, vi } from 'vitest';

const toggleSettings = vi.fn();

vi.mock('@enso-ui/ui/src/pinia/layout', () => ({
    layout: () => ({
        toggleSettings,
    }),
}));

import Tutorial from '../src/core/components/settings/Tutorial.vue';

describe('Tutorial', () => {
    it('toggles settings through layout store directly', () => {
        const driver = {
            defineSteps: vi.fn(),
            start: vi.fn(),
        };

        Tutorial.methods.start.call({
            driver,
            localise: value => value,
        }, [{ element: '#id', popover: { title: 'Title', description: 'Body' } }]);

        expect(toggleSettings).toHaveBeenCalled();
        expect(driver.start).toHaveBeenCalled();
    });
});
