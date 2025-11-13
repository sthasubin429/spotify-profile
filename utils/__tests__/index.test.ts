import { describe, it, expect } from 'vitest';
import { encodeParams } from '../index';

describe('encodeParams', () => {
  it('should encode simple parameters', () => {
    const params = { key: 'value' };
    const encoded = encodeParams(params);
    expect(encoded).toBe(encodeURIComponent(JSON.stringify(params)));
  });

  it('should encode object with multiple properties', () => {
    const params = { key1: 'value1', key2: 123 };
    const encoded = encodeParams(params);
    expect(encoded).toBe(encodeURIComponent(JSON.stringify(params)));
  });

  it('should encode empty object', () => {
    const params = {};
    const encoded = encodeParams(params);
    expect(encoded).toBe(encodeURIComponent(JSON.stringify(params)));
  });

  it('should handle string values correctly', () => {
    const params = { name: 'John Doe' };
    const encoded = encodeParams(params);
    expect(encoded).toBe(encodeURIComponent(JSON.stringify(params)));
  });

  it('should handle numeric values', () => {
    const params = { age: 30 };
    const encoded = encodeParams(params);
    expect(encoded).toBe(encodeURIComponent(JSON.stringify(params)));
  });

  it('should be decodable back to original object', () => {
    const params = { a: 1, b: 'test', c: { d: true } };
    const encoded = encodeParams(params);
    const decoded = JSON.parse(decodeURIComponent(encoded));
    expect(decoded).toEqual(params);
  });
});
