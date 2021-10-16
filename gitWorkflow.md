## **GIT WORKFLOWS**  
### To start working on a *new* feature:  
1. create a new issue with an appropriate name,  add it to current project, and assign it to yourself (or appropriate person)  
2. create a local feature branch with corresponding name, set its upstream to a branch with the same name in github  

### **To merge dev branch into your local branch**  
*Do this whenever there has been an update to dev* **and BEFORE** *pushing your local changes on your feature branch to the remote branch...*:  
1. make sure you're on your feature branch (confirm with `git branch`)
2. `git commit` your recent changes (**but don't push yet!**)
3. `git checkout dev` to switch to dev branch
4. `git pull origin dev` to pull down most recent changes to your local dev branch
5. `git checkout <featurebranchname>` to switch back to your local feature branch
6. `git merge dev` to merge newest changes from dev into your local branch
7. `git push origin <featurebranchname>` to update the remote feature branch to include your local changes and dev's changes

### **To merge a feature branch into dev**  
*Double check you have merged most current version of dev into your local feature branch *AND* you've pushed your local feature branch changes to the remote feature branch*
1. Go to the GitHub repo
2. If you recently `pushed` to your feature branch, there will be an alert at the top of the page that says: `"<featurebranchname> had recent pushes x minutes ago"` with a button that says `Compare & pull request`. Click the button.
3. Make sure `base: dev` and `compare: featurebranchname`
4. Add succinct commentary about what changes are included.
5. Click `Create Pull Request`
6. Let Scrum Master know that you submitted a PR that needs review.  
