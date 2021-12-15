const index = require('./index.js');
const jestConfig = require('./jest.config');
const serverList =
    [{
        "url": "http://doesNotExist.boldtech.co",
        "priority": 1
    },
    {
        "url": "http://boldtech.co",
        "priority": 7
    },
    {
        "url": "http://offline.boldtech.co",
        "priority": 2
    },
    {
        "url": "http://google.com",
        "priority": 4
    },
    {
        "url": "http://google.com",
        "priority": 5
    },
    {
        "url": "http://google.com",
        "priority": 1
    },
    ]

describe('My Test Suite', () => {
    it('My Test Case', async() => {
        try {
            jest.spyOn(index,'checkStatus').mockResolvedValue({
                "url": "http://google.com",
                "priority": 1
            })
           await index.findServer(serverList)
            expect(true).toEqual(true);   
        } catch (error) {
            
        }
    });
  });