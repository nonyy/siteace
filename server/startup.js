// start up function that creates entries in the Websites databases.
Meteor.startup(function() {
    // code to run on server at startup
    if (!Websites.findOne()) {
        console.log("No websites yet. Creating starter data.");
        Websites.insert({
            title: "Goldsmiths Computing Department",
            url: "http://www.gold.ac.uk/computing/",
            description: "This is where this course was developed.",
            votes: 0,
            createdOn: new Date()
        });
        Websites.insert({
            title: "University of London",
            url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
            description: "University of London International Programme.",
            votes: 0,
            createdOn: new Date()
        });
        Websites.insert({
            title: "Coursera",
            url: "http://www.coursera.org",
            description: "Universal access to the world’s best education.",
            votes: 0,
            createdOn: new Date()
        });
        Websites.insert({
            title: "The University of Texas at Austin",
            url: "http://www.utexas.edu/",
            description: "Like the state it calls home, The University of Texas " +
            "at Austin is a bold, ambitious leader, home to more than " +
            "51,000 students and 3,000 teaching faculty.",
            votes: 0,
            createdOn: new Date()
        });
        Websites.insert({
            title: "The University of Texas at Dallas",
            url: "http://www.utdallas.edu/",
            description: "Since its founding in 1969, The University of Texas " +
            "at Dallas has grown rapidly to become a cutting-edge educational " +
            "institution on the path to achieving Tier One national " +
            "research status.",
            votes: 0,
            createdOn: new Date()
        });
        Websites.insert({
            title: "The University of Texas at San Antonio",
            url: "http://www.utsa.edu/",
            description: "Texas university",
            votes: 0,
            createdOn: new Date()
        });
        Websites.insert({
            title: "Google",
            url: "http://www.google.com",
            description: "Popular search engine.",
            votes: 0,
            createdOn: new Date()
        });


    }
});
