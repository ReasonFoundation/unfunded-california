# Local development:

- `npm i && npm start`

# Deploy to netlify:

1. Login to netlify account
2. Create new Git project
3. Select your repo from bitbucket/gitlab/github
4. set the build comand as `npm run build`
5. set the target directory as `public/`
6. done.

Each time you push your commit to the master, it will automatically try to build your project on netlify. If there is no error while building, it will automatically re-deploy after build is finished.
