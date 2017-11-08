class StateApi {
  constructor(rawData) {
    this.data = {
      articles: this.mapIntoObject(rawData.articles),
      authors: this.mapIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date()
    };
    this.subscriptions = {};
    this.lastsubscriptionId = 0;
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
    this.lastsubscriptionId += 1;
    this.subscriptions[this.lastsubscriptionId] = cb;
    return this.lastsubscriptionId;
  }

  unsubscribe = (subId) => {
    delete this.subscriptions[subId];
  }

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb)=>cb());
  }

  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange
    };
    this.notifySubscribers();
  }

  setSearchTerm = (searchTerm) => {
    this.mergeWithState({
      searchTerm
    });
  }
  startClock = () => {
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date()
      });
    }, 1000);
  }
}

export default StateApi;