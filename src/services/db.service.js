const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'records.csv',
  header: [
    {id: 'from', title: 'From'},
    {id: 'to', title: 'To'},
    {id: 'amount', title: 'Amount'},
    {id: 'fee', title: 'Fee'},
  ]
});

const dbService = {
  transaction: {
    add: async (transactions) => {
      if (!Array.isArray(transactions)) return { error: true, message: 'Invalid parameter type!' };

      await csvWriter.writeRecords(transactions)

      return { error: false, message: 'Saved successfully!' };
    }
  }
}

module.exports = dbService;