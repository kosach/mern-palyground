db.createUser(
    {
        user: "test",
        pwd: "321123",
        roles: [
            {
                role: "readWrite",
                db: "mern-test"
            }
        ]
    }
);
