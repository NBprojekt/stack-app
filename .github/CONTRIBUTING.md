# Stack App contribution guidelines

PLEASE READ THESE GUIDELINES CAREFULLY BEFORE ANY CONTRIBUTION!


## Issue reporting/feature requests

* Search the [existing issues](https://github.com/nbprojekt/stack-app/issues) first to make sure your issue/feature
hasn't been reported/requested before
* Check whether your issue/feature is already fixed/implemented
* Check if the issue still exists in the latest release/beta version
* If you are an Angular/Ionic developer, you are always welcome to fix/implement an issue/a feature yourself. PRs welcome!
* We use English for development. Issues in other languages will be closed and ignored.
* Please only add *one* issue at a time. Do not put multiple issues into one thread.
* When reporting a bug please give us a context, and a description how to reproduce it.
* Issues that only contain a generated bug report, but no description might be closed.

## Code contribution

* Stick to Stack Apps's style conventions, well, just look the other code and then do it the same way 😊
* Make changes on a separate branch, not on the master branch. This is commonly known as *feature branch workflow*. You
  may then send your changes as a pull request on GitHub. GitHub is the primary platform. 
* When submitting changes, you confirm that your code is licensed under the terms of the MIT License.
* Please test (compile and run) your code before you submit changes! Ideally, provide test feedback in the PR
  description. Untested code will **not** be merged!
* Try to figure out yourself why builds on our CI fail.
* Make sure your PR is up-to-date with the rest of the code. Often, a simple click on "Update branch" will do the job,
  but if not, you are asked to merge the master branch manually and resolve the problems on your own. That will make the
  maintainers' jobs way easier.
* Please show intention to maintain your features and code after you contributed it. Unmaintained code is a hassle for
  the core developers, and just adds work. If you do not intend to maintain features you contributed, please think again
  about submission, or clearly state that in the description of your PR.
* Respond yourselves if someone requests changes or otherwise raises issues about your PRs.
* Send PR that only cover one specific issue/solution/bug. Do not send PRs that are huge and consists of multiple
  independent solutions.
