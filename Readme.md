#Assignment Submission portal backend

A backend system for an assignment submission portal where users can upload assignments, and admins can review and accept or reject them.

Features<br>
Common features 

I have created a common endpoint for both user and admin differentiaing them from role type I know its not safe in actual project we need different endpoints for atleast sign up for both the entities. 
Register: Create an account to upload assignments.
Login: Authenticate users with secure JWT-based tokens.

User Features
Upload Assignments: Submit assignments tagged to specific admins.

Admin Features.
View Assignments: See assignments tagged to the admin, including user names and submission details.
Accept or Reject Assignments: Manage assignment statuses.

Technologies Used
Backend Framework: Node.js with Express
Database: MongoDB (Mongoose ORM)
Authentication: JWT (JSON Web Tokens)
Validation: Joi
Language: TypeScript

SETUP <br>
Clone this repo <br>
cd ./folder-name <br>
npm install <br>
npm run dev <br>

Endoints <br>

Common <br>
/api/register [POST]<br> 
/api/login  [POST]<br>

User <br>
/api/upload  [POST]<br>

Admin <br>
/admin/assignments [GET] <br>
/assignments/:id/accept [PUT] <br>
/assignments/:id/reject [PUT] <br>

