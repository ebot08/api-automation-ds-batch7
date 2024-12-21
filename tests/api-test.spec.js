const { test, expect } = require("@playwright/test");
const { log } = require("console");
const { Ajv } = require("ajv");

test.describe("Reqresin API Test",() => {
    const ajv = new Ajv();

    test('Test Case1 GET',async({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=2');
        const responseJson = await response.json();    
        // expect(response.status()).toBe(200);
    
        const valid = ajv.validate(require("./jsonschema/get-object-schema.json"), responseJson);
        // const Dataa = await response.json();
        if(!valid){
            console.error("AJV Errors:",ajv.errorsText);
        }
        
        expect(valid).toBe(true);

        // console.log(Dataa.data.body);
        // expect(Dataa.id).toBeDefined();
        // expect(Dataa.per_page).toBe(6);
        // expect(Dataa.data.id).toBe(7);
    });

    test('Test Case2 POST', async ({ request }) => {
        const data = {
          name: 'Elliana Hendry',
          job: 'CEO',
        };
      
        const response = await fetch('https://reqres.in/api/users/2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        if (!response.ok) {
          const errorBody = await response.text();
          console.log(`Error: ${response.status} - ${response.statusText}`);
          console.log('Error response body:', errorBody);
          throw new Error('Failed to fetch the API');
        }
      
        const responseText = await response.text();
        console.log('Response Text:', responseText); 
      
        try {
          const responseJson = JSON.parse(responseText);  
          console.log('Response JSON:', responseJson);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      });

    test('Test Case3 PUT',async({ request }) => {
        const data = {
            name: 'Elliana Hendry',
            job: 'CEO',
        };
        
        const response = await fetch('https://reqres.in/api/users/2', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        // expect(response.status).toBe(200);
        
        const responseJson = await response.json();    
        // expect(response.status()).toBe(200);
    
        const valid = ajv.validate(require("./jsonschema/get-object-schema.json"), responseJson);
        // const Dataa = await response.json();
        if(!valid){
            console.error("AJV Errors:",ajv.errorsText);
        }
        
    });

    test('Test Case4 Delete', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=2');
        // expect(response.status).toBe(204);  
      });

});



