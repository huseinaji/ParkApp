const request = require("supertest");
const app = require("../index");

describe('ParkApp Unit Test', function () {
  it('GET /', async function () {
    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual('Helloworld');
  });
  // pencatatan
  it('POST /insert other type', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "pesawat",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-17T10:00:59+00:00"
      })
    expect(response.status).toEqual(400);
    expect(response.body.msg).toEqual('tipe kendaraan tidak terdefinisi!');
  })
  it('POST /insert motor 1hari 3jam 0menit 0detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "motor",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-18T12:00:00+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(46000);
  })
  it('POST /insert mobil 1hari 3jam 0menit 0detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "mobil",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-18T12:00:00+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(95000);
  })
  it('POST /insert motor 1jam 0menit 0detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "motor",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-17T10:00:00+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(2000);
  })
  it('POST /insert mobil 1jam 0menit 0detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "mobil",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-17T10:00:00+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(5000);
  })
  it('POST /insert motor 1jam 0menit 56detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "motor",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-17T10:00:56+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(2000);
  })
  it('POST /insert mobil 1jam 0menit 56detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "mobil",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-17T10:00:56+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(5000);
  })
  it('POST /insert motor 1jam 1menit 2detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "motor",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-17T10:01:02+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(4000);
  })
  it('POST /insert mobil 1jam 1menit 2detik', async function () {
    const response = await request(app)
      .post('/insert')
      .set('Accept', 'application/json')
      .send({
        "type": "mobil",
        "timeIn": "2022-11-17T09:00:00+00:00",
        "timeOut": "2022-11-17T10:01:02+00:00"
      })
    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual(10000);
  })

  // data
  it('POST /parklist No filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({})
    expect(response.status).toEqual(200);
  });
  it('POST /parklist type=mobil filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "type": "mobil"
      })
    expect(response.status).toEqual(200);
    response.body.forEach(element => {
      expect(element.type).toEqual('mobil');
    });
  });
  it('POST /parklist type=motor filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "type": "motor"
      })
    expect(response.status).toEqual(200);
    response.body.forEach(element => {
      expect(element.type).toEqual('motor');
    });
  });
  it('POST /parklist timeMin-timeMax filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "timeMin": "2022-11-15T15:26:00.000Z",
        "timeMax": "2022-11-16T15:26:00.000Z"
      })
    expect(response.status).toEqual(200);
    const timeMin = new Date("2022-11-15T15:26:00.000Z");
    const timeMax = new Date("2022-11-15T15:26:00.000Z");
    response.body.forEach(element => {
      timeIn = new Date(element.timeIn);
      timeOut = new Date(element.timeOut);
      expect(+timeIn).toBeGreaterThanOrEqual(+timeMin);
    });
  });
  it('POST /parklist timeMin filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "timeMin": "2022-11-15T15:26:00.000Z"
      })
    expect(response.status).toEqual(200);
    const timeMin = new Date("2022-11-15T15:26:00.000Z");
    response.body.forEach(element => {
      timeIn = new Date(element.timeIn);
      expect(+timeIn).toBeGreaterThanOrEqual(+timeMin);
    });
  });
  it('POST /parklist timeMax filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "timeMax": "2022-11-15T15:26:00.000Z"
      })
    expect(response.status).toEqual(200);
    const timeMax = new Date("2022-11-15T15:26:00.000Z");
    response.body.forEach(element => {
      timeOut = new Date(element.timeOut);
      expect(+timeOut).toBeGreaterThanOrEqual(+timeMax);
    });
  });
  it('POST /parklist priceMin-priceMax filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "priceMin": 0,
        "priceMax": 100000
      })
    expect(response.status).toEqual(200);
    const priceMin = 0;
    const priceMax = 100000;
    response.body.forEach(element => {
      expect(element.price).toBeGreaterThanOrEqual(priceMin);
      expect(element.price).toBeLessThanOrEqual(priceMax);
    });
  });
  it('POST /parklist priceMin filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "priceMin": 0,
      })
    expect(response.status).toEqual(200);
    const priceMin = 0;
    response.body.forEach(element => {
      expect(element.price).toBeGreaterThanOrEqual(priceMin);
    });
  });
  it('POST /parklist priceMax filter', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "priceMax": 100000,
      })
    expect(response.status).toEqual(200);
    const priceMax = 100000;
    response.body.forEach(element => {
      expect(element.price).toBeLessThanOrEqual(priceMax);
    });
  });
  it('POST /parklist filter-mixed', async function () {
    const response = await request(app)
      .post('/parklist')
      .set('Accept', 'application/json')
      .send({
        "type": "mobil",
        "priceMin": 50000,
        "priceMax": 100000,
        "timeMin": "2022-11-15T00:00:00.000Z",
        "timeMax": "2022-11-19T00:00:00.000Z"
      })
    expect(response.status).toEqual(200);
    const timeMin = new Date("2022-11-15T00:00:00.000Z");
    const timeMax = new Date("2022-11-19T00:00:00.000Z");
    const priceMin = 50000;
    const priceMax = 100000;
    response.body.forEach(element => {
      const timeIn = new Date(element.timeIn);
      const timeOut = new Date(element.timeOut);
      expect(element.type).toEqual('mobil');
      expect(+timeIn).toBeGreaterThanOrEqual(+timeMin);
      expect(+timeOut).toBeLessThanOrEqual(+timeMax);
      expect(element.price).toBeGreaterThanOrEqual(priceMin);
      expect(element.price).toBeLessThanOrEqual(priceMax);
    });
  });
});