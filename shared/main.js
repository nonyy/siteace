WebsitesIndex = new EasySearch.Index({
  collection: Websites,
  fields: ['title', 'description'],
  engine: new EasySearch.Minimongo()
});
