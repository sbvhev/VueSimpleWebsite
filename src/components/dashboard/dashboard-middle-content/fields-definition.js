export default {
  tableFields: [
    {
      name: 'row',
      title: 'row',
      sortField: 'row'
    },
    {
      name: 'name',
      title: 'name',
      sortField: 'name'
    },
  ],
  sortFunctions: {
    'name': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
