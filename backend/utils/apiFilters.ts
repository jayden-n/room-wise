class APIFilters {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): APIFilters {
    const location = this.queryStr?.location
      ? {
          // find that location in "address"
          address: {
            // $regex: performing partial matches
            $regex: this.queryStr.location,
            // case-insensitive
            $options: 'i',
          },
        }
      : {};

    // modifies the query to include the filter created based on the 'location' property
    this.query = this.query.find({ ...location });
    return this;
  }
}

export default APIFilters;
