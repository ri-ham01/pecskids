# Git Commands for GitHub Deployment

## 📋 Table of Contents
1. [Initial Setup](#initial-setup)
2. [First Time Deployment](#first-time-deployment)
3. [Ongoing Development](#ongoing-development)
4. [Branching Strategy](#branching-strategy)
5. [Tag & Release](#tag--release)
6. [Emergency Rollback](#emergency-rollback)

---

## Initial Setup

Before running any git commands, verify your setup:

### Check Git Installation
```bash
git --version
```

### Configure Git (One-time)
```bash
# Set your name (shows in commits)
git config --global user.name "Your Full Name"

# Set your email (must match GitHub account)
git config --global user.email "your.email@github.com"

# Verify settings
git config --list
```

---

## First Time Deployment

### Step 1: Navigate to Project
```bash
cd c:\Users\DELL\Desktop\pictoweb
```

### Step 2: Check Current Status
```bash
git status
```

Expected output should show all files untracked or modified.

### Step 3: Add All Files to Staging
```bash
git add .
```

Verify what's being added:
```bash
git status
```

You should see all files listed as "Changes to be committed"

### Step 4: Create Initial Commit
```bash
git commit -m "Initial commit: PECS Kids Arabic - Production ready deployment"
```

### Step 5: Verify Commit
```bash
git log --oneline
```

You should see your commit at the top.

### Step 6: Ensure Main Branch
```bash
git branch -M main
```

This ensures you're on the `main` branch (standard naming).

### Step 7: Add Remote Repository

First, create a new repository on GitHub:
1. Go to https://github.com/new
2. Repository name: `pictoweb` (or your choice)
3. Description: `PECS Kids Arabic - AAC platform for Arabic-speaking children`
4. Choose Public or Private
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

Then run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/pictoweb.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 8: Push to GitHub
```bash
git push -u origin main
```

This uploads your code to GitHub. The `-u` flag sets `main` as the default branch for future pushes.

### Step 9: Verify on GitHub
- Go to https://github.com/YOUR_USERNAME/pictoweb
- Verify all files are there
- Verify commit history appears

---

## Ongoing Development

### Daily Workflow

#### Check Status
```bash
git status
```

#### View Changes
```bash
git diff
```

To see changes in a specific file:
```bash
git diff src/components/ui/button.tsx
```

#### Stage Changes (Option 1: All files)
```bash
git add .
```

#### Stage Specific File
```bash
git add src/components/ui/button.tsx
```

#### Commit Changes
```bash
git commit -m "Add feature: descriptive message"
```

**Commit Message Convention**:
```
# Format: <type>: <description>

# Types:
# feat:     New feature
# fix:      Bug fix
# refactor: Code restructuring (no functional change)
# style:    Code formatting/styling only
# docs:     Documentation updates
# test:     Test changes
# chore:    Build/tooling/dependencies
# perf:     Performance improvements
# ci:       CI/CD configuration

# Good examples:
# feat: Add pictogram search functionality
# fix: Resolve broken image links in library
# docs: Update deployment instructions
# chore: Update Next.js to v15.3
```

#### Push to GitHub
```bash
git push origin main
```

Or push and set as default:
```bash
git push -u origin main
```

### View Commit History
```bash
# Last 5 commits with stats
git log --oneline -5

# Full commit details
git log -1

# Graphical view with branches
git log --graph --oneline --all
```

### View Specific Commit
```bash
git show <commit-hash>
```

Example:
```bash
git show abc1234
```

---

## Branching Strategy

### Create Feature Branch
```bash
git branch feature/new-feature-name
git checkout feature/new-feature-name
```

Or create and switch in one command:
```bash
git checkout -b feature/new-feature-name
```

### Switch Branches
```bash
git checkout main
```

### List All Branches
```bash
git branch
# Local branches only

git branch -a
# All branches (including remote)
```

### Delete Branch Locally
```bash
git branch -d feature/old-feature
```

Force delete (if not fully merged):
```bash
git branch -D feature/old-feature
```

### Delete Branch on GitHub
```bash
git push origin --delete feature/old-feature
```

### Merge Feature into Main
```bash
# Switch to main
git checkout main

# Merge feature branch
git merge feature/new-feature-name

# Push to GitHub
git push origin main
```

### Rebase Instead of Merge (Cleaner History)
```bash
git checkout main
git pull origin main
git checkout feature/new-feature-name
git rebase main
git push -f origin feature/new-feature-name  # Force push after rebase
```

---

## Tag & Release

### Create Annotated Tag
```bash
git tag -a v1.0.0 -m "Release version 1.0.0 - Initial production release"
```

### Push Tags to GitHub
```bash
# Push single tag
git push origin v1.0.0

# Push all tags
git push origin --tags
```

### List Tags
```bash
git tag

# With details
git tag -l -n1
```

### View Tag Details
```bash
git show v1.0.0
```

### Delete Tag Locally
```bash
git tag -d v1.0.0
```

### Delete Tag on GitHub
```bash
git push origin --delete v1.0.0
```

### Create Release on GitHub
After pushing a tag:
1. Go to https://github.com/YOUR_USERNAME/pictoweb/releases
2. Click "Draft a new release"
3. Select tag `v1.0.0`
4. Add release title and notes
5. Publish release

---

## Emergency Rollback

### Undo Last Commit (Not Pushed)
```bash
git reset HEAD~1
```

This unstages the commit but keeps your changes.

### Undo Last Commit (Discard Changes)
```bash
git reset --hard HEAD~1
```

### Undo Last Pushed Commit
```bash
# Create a new commit that reverts the changes
git revert HEAD
git push origin main
```

This is safer than force push because it preserves history.

### Force Push to GitHub (Use with Caution!)
```bash
git push -f origin main
```

⚠️ **Only use if absolutely necessary!** This can lose other people's commits.

### Restore File to Previous Version
```bash
# Restore from staging area
git restore <file>

# Restore from specific commit
git restore --source=<commit-hash> <file>
```

### See Deleted Files
```bash
git reflog
```

### Recover Deleted Commit
```bash
# Find the commit hash in reflog
git reflog

# Check out to that commit
git checkout <commit-hash>

# Create a new branch from it
git checkout -b recovery-branch
```

---

## Useful One-Liners

### Check Remote URL
```bash
git remote -v
```

### Change Remote URL
```bash
git remote set-url origin https://github.com/NEWUSER/pictoweb.git
```

### Clone Repository (For Others)
```bash
git clone https://github.com/YOUR_USERNAME/pictoweb.git
cd pictoweb
npm install
npm run dev
```

### Pull Latest Changes
```bash
git pull origin main
```

### Fetch Without Merging
```bash
git fetch origin
```

### Check Current Branch
```bash
git branch
```

### Stash Work (Temporarily Save)
```bash
# Save work without committing
git stash

# List stashes
git stash list

# Apply stash
git stash apply

# Apply and delete stash
git stash pop
```

### Sync Fork with Upstream
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/pictoweb.git
git fetch upstream
git merge upstream/main
git push origin main
```

---

## Common Scenarios

### Scenario: Accidentally Committed to Wrong Branch
```bash
# Get commit hash
git log --oneline -1

# Switch to correct branch
git checkout correct-branch

# Cherry-pick the commit
git cherry-pick <commit-hash>

# Go back to wrong branch and undo
git checkout wrong-branch
git reset --hard HEAD~1
```

### Scenario: Need to Update Feature Branch with Latest Main
```bash
git checkout main
git pull origin main
git checkout feature/your-feature
git merge main
# Or use rebase for cleaner history:
git rebase main
```

### Scenario: Accidentally Modified Files Locally (Not Committed)
```bash
# See what changed
git diff

# Discard all changes
git checkout -- .

# Discard changes in one file
git checkout -- src/components/ui/button.tsx
```

### Scenario: Pushed Wrong Code to Main
```bash
# Option 1: Revert (Safer)
git revert HEAD
git push origin main

# Option 2: Reset (Use if nobody pulled yet)
git reset --hard HEAD~1
git push -f origin main
```

---

## First-Time Checklist

- [ ] Configured git username: `git config --global user.name "Your Name"`
- [ ] Configured git email: `git config --global user.email "your@email.com"`
- [ ] Created GitHub account at https://github.com
- [ ] Created new repository on GitHub
- [ ] Navigated to project: `cd c:\Users\DELL\Desktop\pictoweb`
- [ ] Verified git initialized: `git status`
- [ ] Staged all files: `git add .`
- [ ] Created commit: `git commit -m "Initial commit: ..."`
- [ ] Added remote: `git remote add origin https://...`
- [ ] Pushed to GitHub: `git push -u origin main`
- [ ] Verified files on GitHub: https://github.com/YOUR_USERNAME/pictoweb

---

## Helpful Resources

- **GitHub Help**: https://docs.github.com/en
- **Git Docs**: https://git-scm.com/doc
- **Commit Message Guide**: https://www.conventionalcommits.org/
- **Git Branching Model**: https://nvie.com/posts/a-successful-git-branching-model/
- **GitHub Flow**: https://guides.github.com/introduction/flow/

---

## Troubleshooting

### "fatal: not a git repository"
```bash
# You're not in a git repo. Navigate to project root:
cd c:\Users\DELL\Desktop\pictoweb

# If git not initialized:
git init
```

### "error: src refspec main does not match any"
```bash
# Make sure you committed something first:
git status

# Commit changes:
git add .
git commit -m "Initial commit"
```

### "authentication failed"
```bash
# Use SSH instead of HTTPS (recommended):
# 1. Generate SSH key:
ssh-keygen -t ed25519 -C "your@email.com"

# 2. Add to GitHub: https://github.com/settings/ssh/new

# 3. Update remote:
git remote set-url origin git@github.com:YOUR_USERNAME/pictoweb.git
```

### "Everything up-to-date"
```bash
# Make sure you have changes to push:
git status

# Verify remote:
git remote -v
```

---

## Summary

**For First-Time GitHub Deployment**, run these commands in order:

```bash
# 1. Navigate to project
cd c:\Users\DELL\Desktop\pictoweb

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: PECS Kids Arabic - Production ready deployment"

# 4. Set main branch
git branch -M main

# 5. Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/pictoweb.git

# 6. Push to GitHub
git push -u origin main

# 7. Verify (open in browser)
# https://github.com/YOUR_USERNAME/pictoweb
```

**That's it!** Your code is now on GitHub and ready for deployment to Vercel.

---

*Git Command Guide — PECS Kids Arabic Project*
