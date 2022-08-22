# DALIChat

## Description

DALIChat is a social media platform for users to learn about DALI Lab members and talk about the DALI Lab. You can view member profiles, post, comment on posts, react to posts, and view your own posts on DaliChat.

## Explanation

DALIChat uses React Router and client-side routing to provide users with access to the Members, Feed, and Account pages. It uses Firebase Firestore and Storage to allow for storage and retrieval of user data (profile pictures, posts, etc.). It uses Bootstrap, React-Bootstrap, and Bootstrap Icons for styling. The Members page reads from a JSON file and uses the Profile component to render each member of DALI Lab and their respective biographical information. The same component approach is used to render posts, reactions, comments, and account information, although the data is retrieved from Firebase rather than a JSON file.

## Getting Started

### Dependencies

* Dependencies included in repository

### Installing

* Download dalichat and dependencies from this repository

### Executing program

```
npm start
```
* to run DALIChat on localhost
* view DALIChat at https://dalisocial.netlify.app

## Help

* Cannot post too much in a day due to Firebase daily usage limits

## Authors

Contributor's name and contact info

* Thomas Fenaroli
* thomas.s.fenaroli.24@dartmouth.edu
* (203)-832-5002
