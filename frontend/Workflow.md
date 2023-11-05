# Folder Structure Explanation

/ -> Home Page or Landing Page
/login -> Login page only if no user info exists
/logout
/forgot_password

## Dashboard [`/admin` : only for the admin user pages]

/admin
/admin/elections -> All election with an edit option
/admin/conduct_election -> Create new elections from here
/admin/users -> Manage all the users

## Dashboard [`/` : all users are allowed here]

/ : Homepage or dashboard
/elections -> All elections presented to user to vote

- Include two subsection for `ongoing` and `upcoming` elections.

/profile -> User profile here
/help -> Display all the FAQs

# Upcoming commit Changes

- changed Folder Structure
- Changed Router Structure
- Fixed Bugs
