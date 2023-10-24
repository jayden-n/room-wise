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

    const removeFields = ['location', 'page'];
    removeFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);

    return this;
  }

  pagination(resPerPage: number): APIFilters {
    const currentPage = Number(this.queryStr?.page) || 1;
    // 10 * (2-1) equals 10 so you will be able to skip
    const skip = resPerPage * (currentPage - 1);

    // NOTE: limit - helps in controlling the number of results shown per page
    // NOTE: skip - helps navigating to different pages by skipping a certain number of results
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
