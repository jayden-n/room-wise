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

  filter(): APIFilters {
    // ----just a copy ----
    const queryCopy = { ...this.queryStr };

    const removeFields = ['location'];
    removeFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);

    return this;
  }
}

export default APIFilters;
