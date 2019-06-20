const assert = require('chai').assert
const should = require('chai').should()
const expect = require('chai').expect

const NodeTable = require('../index')


const fakeColumns = [
    {
        'dt': 0,
        'db': 'name'
    },
    {
        'dt': 1,
        'db': 'email'
    },
    {
        'dt': 2,
        'db': 'username'
    },
    {
        'dt': 3,
        'db': 'address'
    },
    {
        'dt': 4,
        'db': 'active'
    },
]

const fakeRequestBody = {
    draw: '1',
    columns:
        [{
            data: '0',
            name: '',
            searchable: 'true',
            orderable: 'true',
            search: [Object]
        },
        {
            data: '1',
            name: '',
            searchable: 'true',
            orderable: 'true',
            search: [Object]
        },
        {
            data: '2',
            name: '',
            searchable: 'true',
            orderable: 'true',
            search: [Object]
        },
        {
            data: '3',
            name: '',
            searchable: 'true',
            orderable: 'true',
            search: [Object]
        },
        {
            data: '4',
            name: '',
            searchable: 'true',
            orderable: 'true',
            search: [Object]
        },
        ],
    order: [{ column: '0', dir: 'asc' }],
    start: '0',
    length: '10',
    search: { value: 'ropali', regex: 'false' },
    _: '1559552531843'
}


const sql = "SELECT * FROM any_table_name"
const tableName = "users";


const nodeTable = new NodeTable(fakeRequestBody, null, tableName, 'id', fakeColumns)

describe('NodeTable Test Cases', () => {
    describe('#isValidSQL Method', () => {
        it('should return false when table name is provided', () => {
            assert.strictEqual(false, NodeTable.isValidSQL(tableName))
        })

        it('should return true when custom SQL query passed as parameter', () => {
            assert.strictEqual(true, NodeTable.isValidSQL(sql))
        })
    })


    describe('#pluck Method', () => {

        it('should return an array of containing all the dt keys', () => {

            const dtArray = NodeTable.pluck(fakeColumns, 'dt');
            const expecteArray = [0, 1, 2, 3, 4]
            expect(dtArray).to.be.a('array')
            expect(dtArray).to.have.lengthOf(fakeColumns.length)
            assert.sameMembers(expecteArray, dtArray)
        })

        it('should return an array of containing all the db keys', () => {
            const dbArray = NodeTable.pluck(fakeColumns, 'db');
            const expectedArray = ['name', 'email', 'username', 'address', 'active']
            expect(dbArray).to.be.a('array')
            expect(dbArray).to.have.lengthOf(fakeColumns.length)
            assert.sameMembers(expectedArray, dbArray)
        })
    })


    describe('#limit Method', () => {
        it('should return the constructed LIMIT clause', () => {
            const limitQuery = nodeTable.limit()

            expect(limitQuery).to.be.a('string')
            assert.strictEqual(" LIMIT 0, 10", limitQuery);
        })
    })


    describe('#order Method', () => {
        it('should return the constructed ORDER BY clause', () => {
            const orderClause = nodeTable.order()

            expect(orderClause).to.be.a('string')
            assert.strictEqual(" ORDER BY name ASC", orderClause);
        })
    })

    describe('#filter Method', () => {
        it('should return the constructed WHERE clause', () => {
            const whereClause = nodeTable.filter()
            console.log( nodeTable.buildQuery() )
            expect(whereClause).to.be.a('string')
            assert.equal(" WHERE (name LIKE \'%ropali%\' OR email LIKE \'%ropali%\' OR username LIKE \'%ropali%\' OR address LIKE \'%ropali%\' OR active LIKE \'%ropali%\')", whereClause);
        })
    })


    describe('#buildQury Method', () => {
        it('should return the constructed SQL query', () => {
            const SQLQuery = nodeTable.buildQuery()
            
            expect(SQLQuery).to.be.a('string')
            assert.equal("SELECT name, email, username, address, active FROM users  WHERE (name LIKE '%ropali%' OR email LIKE '%ropali%' OR username LIKE '%ropali%' OR address LIKE '%ropali%' OR active LIKE '%ropali%')  ORDER BY name ASC  LIMIT 0, 10", SQLQuery);
        })
    })

    
})