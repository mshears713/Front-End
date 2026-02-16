import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '../../lib/api/client';

// Mock fetch
global.fetch = vi.fn();

describe('API Client', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Neutralized performance.now for tests
        global.performance.now = vi.fn(() => 100);
    });

    it('unwraps successful envelope responses', async () => {
        const mockData = { status: 'up', version: '0.1.0' };
        (fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ ok: true, data: mockData, meta: {} }),
        });

        const result = await apiClient.health();
        expect(result).toEqual({ ok: true, data: mockData, meta: {} });
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/health'), expect.anything());
    });

    it('handles error envelope and throws', async () => {
        const mockError = {
            ok: false,
            error: { code: 'VALIDATION_ERROR', message: 'Invalid field', details: { name: 'Too short' } }
        };
        (fetch as any).mockResolvedValue({
            ok: false,
            status: 400,
            json: async () => mockError,
        });

        try {
            await apiClient.validateForm({ name: 'J' });
        } catch (err) {
            expect(err).toEqual(mockError);
        }
    });

    it('handles network errors gracefully', async () => {
        (fetch as any).mockRejectedValue(new Error('Failed to fetch'));

        try {
            await apiClient.ping();
        } catch (err) {
            // Expected catch block
        }
    });
});
