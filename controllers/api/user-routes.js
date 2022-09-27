const router = require("express").Router();
const { User, Event, Vote } = require('../../models');

// all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] } 
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// one user based on id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
              model: Event,
              attributes: ['id', 'title', 'days', 'invite_emails','created_at']
            }
        ]
    })
    .then(dbUserData => {
        // if user doesnt exist or has been deleted
        if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
        }
        // send the json of that user from the table as an object
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        // this password gets hashed for security before getting
        // saved in the database. see User.js
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;
        
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// login an existing user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        // login iser by starting user session
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logout a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        // We can then use the destroy() method to clear the session
        req.session.destroy(() => {
          // we send back a 204 status code after the session has 
          // successfully been destroyed.
          res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
