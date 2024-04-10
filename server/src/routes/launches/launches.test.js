const request = require("supertest");
const app = require("../../app");
const { mongoConnect,
mongoDisConnect } = require('../../services/mongo');

describe('Launches API' , () => {
    beforeAll(async () => {
        await mongoConnect();
    })

    afterAll(async () => {
        await mongoDisConnect();
    })

    describe('Test Get /launches' , () => {
        test("It should respond with 200 success" , async () => {
            const response = await request(app).get('/v1/launches').expect('Content-Type',/json/).expect(200);
           // expect(response.statusCode).toBe(200);
        });
    });

    describe('Test Post /launces', () => {
        const completeRequest = {
            mission:"Test mission",
            rocket:"Test rocket",
            target:"Kepler-62 f",
            launchDate:"August 2024"
        };
    
        const requestWithoutDate = {
            mission:"Test mission",
            rocket:"Test rocket",
            target:"Kepler-62 f"
        };
    
        const requestWithInvalidDate = {
            mission:"Test mission",
            rocket:"Test rocket",
            target:"Kepler-62 f",
            launchDate:"Hello World"
        };
    
        test("It should respond with 201 success", async () => {
            const response = await request(app)
             .post('/v1/launches')
             .send(completeRequest)
             .expect('Content-Type',/json/)
             .expect(201);
    
            const requestDate = new Date(completeRequest.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(requestWithoutDate);
        });
    
        test("It should catch missing required properties", async () => {
            const response = await request(app)
             .post('/v1/launches')
             .send(requestWithoutDate)
             .expect('Content-Type',/json/)
             .expect(400);
    
            expect(response.body).toStrictEqual({
                error : 'Missing Required Details',
            });
        });
    
        test("It should catch invalid Date", async () => {
            const response = await request(app)
             .post('/v1/launches')
             .send(requestWithInvalidDate)
             .expect('Content-Type',/json/)
             .expect(400);
    
            expect(response.body).toStrictEqual({
                error : 'Invalid Launch Date',
            });
        });
    });
});



