#!/bin/bash
mongo <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 0,
            "host": "bookstore_mongo:27017",
            "priority": 2
        },
        {
            "_id": 1,
            "host": "bookstore_mongo_replica:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF