const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const appsData = require('../appData.js')

describe('GET /apps', () => {
    it('no queries should return all apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200, appsData);
    });
    it('show ratings over 5', () => {
        return supertest(app)
            .get('/apps')
            .query({genres:"Action"})
            .expect(200)
            .then(res => {
                console.log(res.body)
                res.body.map(obj=>{
                    expect(obj.Genres).to.include("Action")
                })
            })
    });
  });