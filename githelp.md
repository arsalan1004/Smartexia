## Our main Branch is MAIN not MASTER
- Check branch name first before pushing by: git branch -a.
- add files to git: git add . OR git add <file-name>
- commit files: git commit -m "message"
- push: git push origin main
- show origin: git show origin
- pull: git pull origin main
- status: git status

## WHAT PRACTICES TO FOLLOW WHILE DEVELOPING THE PROJECT
- Never work or push directly in MAIN 
- while adding a new feature, create a new branch (name it according to the naming conventions given below) and
  take a pull from the MAIN in that branch. for example: create branch "feature-learningUnit" and pull content from MAIN in it.
- now 2 more branches (for eg; learningUnit-frontend, learningUnit-backend) will be created from the branch which was created, 
  one will contain the frontend, the other will contain the backend.
- the frontend developer will work in the frontend sub-branch, and the backend in the backend sub-branch.
- both will do regular commits while completing the tasks to maintain a proper developing history.
  
- #### BEFORE MERGING, PULL FROM PARENT BRANCH
- USE PULL REQUESTS (PRs) ON GITHUB BEFORE THE MERGING PROCESS, SINCE IT TELLS US WHETHER THE BRANCH IS SAFE TO MERGE OR NOT.
  IT ALSO TELLS THE CHANGES THAT WILL BE MADE AFTER MERGING. INSHORT, USE GITHUB FOR MERGING, NOT GIT TERMINAL IN VSCODE.
  
- when the frontend or backend is completed, the developer will pull from parent feature branch and then merge the sub-branch    with it.
- after the frontend is merged, and the backend is also complete, the backend dev will pull from parent feature branch
  and then merge the backend branch in the parent feature branch.
- then integration of frontend and backend will take place in the feature branch.
- when its finalized, it will be finally merged into the MAIN branch.
- OPTIONAL: you may delete the branch after merging.


### COMMIT NAMING CONVENTIONS
Format: type: subject

Example:
feat: add navigation on home

#### types:
- feat: (new feature for the user, not a new feature for build script)
- fix: (bug fix for the user, not a fix to a build script)
- docs: (changes to the documentation)
- style: (formatting, missing semi colons, etc; no production code change)
- refactor: (refactoring production code, eg. renaming a variable)
- test: (adding missing tests, refactoring tests; no production code change)
- chore: (updating grunt tasks etc; no production code change)

### BRANCH NAMING CONVENTIONS
Use a clear and consistent naming convention for your branches helps team members quickly identify the purpose of each branch. Popular naming conventions often include prefixes like “feature/”, “bugfix/”, or “release/” to indicate the branch’s purpose, followed by a descriptive name or issue number.

Examples:
- git checkout -b feature/login-ui
- git checkout -b bugfix/issue-123
- git checkout -b release/v1.2.0
