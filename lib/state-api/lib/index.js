class StateApi {
  constructor(rawData) {
    this.data = {
      articles: this.mapIntoObject(rawData.articles),
      authors: this.mapIntoObject(rawData.authors),
      searchTerm: ''
    };
    this.subscriptions = {};
    this.lastSubcriptionId = 0;
  }
  mapIntoObject(arr){
    return arr.reduce((acc, curr) => {
      acc[curr.id]= curr;
      return acc;
    },{});
  }
  lookupAuthor = (authorId) => {
    return this.data.authors[authorId];
  }
  getState = () => {
    return this.data;
  }

  subscribe = (cb) => {
    this.lastSubcriptionId += 1;
    this.subscriptions[this.lastSubcriptionId] = cb;
    return this.lastSubcriptionId;
  }

  unsubscribe = (subId) => {
    delete this.subscriptions[subId];
  }

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb)=>cb());
  }

  setSearchTerm = (searchTerm) => {
    this.data.searchTerm = searchTerm;
    this.notifySubscribers();
  }
}

export default StateApi;