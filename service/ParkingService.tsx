import api from './instance';

export default class ParkingService {

  static async EntryOne(body: object) {
    let result = ''
    await api.post('', body)
    .then(res => result = res.data)
    .catch(err => result = err.response)
    return result;
  }

  static async PayOne(body: object) {
    const id = body.plate
    let result = ''
    await api.post(`${id}/pay`, body)
    .then(res => result = res.data)
    .catch(err => result = err.response)
    return result;
  }

  static async OutOne(body: object) {
    const id = body.plate
    let result = ''
    await api.post(`${id}/out`, body)
    .then(res => result = res.data)
    .catch(err => result = err.response)
    return result;
  }

  static async HistoryOne(id: string) {
    let result = ''
    await api.get(id)
    .then(res => result = res.data)
    .catch(err => result = err.response)
    return result;
  }
}