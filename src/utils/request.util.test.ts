import requestUtil from './request.util';

jest.mock('axios');
import axios from 'axios';

describe('requestUtil Tests', () => {
  test('should call the onSuccess callback when promise resolved', () => {
    axios.mockResolvedValue({ data: 'test' })
    requestUtil({ url: 'test' })(
      res => expect(res.data).toEqual('test'),
      res => null
    )
  });

  test('should call the onFailure callback when promise rejected', () => {
    const failure = { status: 400, message: 'BadRequest' }
    axios.mockRejectedValue({ data: failure })
    requestUtil({ url: 'test' })(
      res => null,
      res => expect(res.data.message).toEqual('BadRequest')
    )
  });
});