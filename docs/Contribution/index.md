# Contribution Guidelines

This document details how you can contribute to this project in simple steps.

## Steps to Contribute

1. **Setup the Environment (Do Once).**  
   Ensure you have setup your environment correctly. Click [here](/docs/Contribution/EnvSetup.md) if
   you haven't.

2. **Create a new branch from the assigned issue:**  
   You will create a new branch for the specific task you are to perform.
   - Go to the Issues page and Open the issue you are to work on.
   - On the side section, look for `Development`. Click on `create a branch`. This will give you a
     pop-up.
   - Give the branch name. We prefer you start it with your name and followed by a short name for
     the branch that represents the work you are doing. e.g. `abdullah/hooks/useColor`,
     `hasan/comp/Button`, etc.
   - Ensure that the branch source is `main` and you select `checkout locally`. Then click on
     `Create branch`.
   - Run the displayed code within the terminal on your local repository. Usually, the code should
     be:
     ```
     git fetch origin
     git checkout <your-branch-name>
     ```
     For example, if you want to work on the branch: `hasan/comp/Button`.
     ```
     git fetch origin
     git checkout hasan/comp/Button
     ```
   - You can always use the code below to see the list of the branches on your workspace and to know
     the active branch:
     ```
     git branch
     ```
3. Stage your work  
   Perform the tasks assigned to you.
   - Check the state of your work
     ```
     git status
     ```
   - Once you are done with a chunk of work, you should add the changes that you wish to commit
     using:
     ```
     git add <file-name>
     ```
     For example, if I wish to add changes in `src/shared/components/Button.tsx` file, I will use:
     ```
     git add src/shared/components/Button.tsx
     ```
     Or if you wish to add all the files, you will use:
     ```
     git add .
     ```
     Take note of the fullstop.
   - This only adds the changes to the staging area.
4. Commit and push your work: Once you are done with your work and you have added it to the staging
   environment, you should commit and push your work.
   - To commit
     ```
     git commit -m <message>
     ```
     For example:
     ```
     git commit -m "[EDIT]: Adding new button variant."
     ```
   - To push: `     git push     ` This only makes your work available on the repository. But it has
     not merged it into the main branch.
5. Create a pull request to the main branch  
   The active development of the entire team is maintained on the main branch. Once your task is
   done, you need to create a pull request.
   - Go to the `Pull Request` section on the GitHub page.
   - Click on `New Pull Request`.
   - Click on the branch you wish to create pull request for. This will then show you all your
     changes.
   - Then click on `Create new pull request`.
   - Thereafter, you await the reviews and approval. If there is any request for reviews, you just
     need to perform steps 3 and 4 again to make necessary corrections.
   - Note: You are not required to open a new pull request if the previous pull request has not been
     merged yet. However, if it has been merged already, you will need to create a new pull request
     for the new changes.
