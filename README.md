TalkSpace History Analyzer
==========================

So this is kinda hacky at the moment. Hopefully I'll teach it how to
download your actual history at some point and not depend on you being
super technical.

What this does
--------------

This tool will analyze your talkspace history and produce two things for you.

### output.csv

This file contains a per-message level resolution detail of the following:

| Name | Purpose |
| ----- | ----- |
| date | Date the message was sent |
| time | Time the message was sent |
| words_per | Number of words in the message |
| score | Feeling analysis score of the overall message |
| text | The original text of the message |

### output.json

This file contains a per-message level resolution detail of the following:

| Name | Purpose |
| ----- | ----- |
| date | Date the message was sent |
| time | Time the message was sent |
| words_per | Number of words in the message |
| score | Feeling analysis score of the overall message |
| text | The original text of the message |

Installation
------------

Check out the repository, and run `yarn install`

Manual History download
-----------------------

You'll need to open the developer tools on your browser and grab the latest POST
action and copy it as a CURL command.

Change `limit` to something absurd like `4000000`
Change `max_id` to `0`

Save the output to `talkspace.json` in this directory.

Execution
---------

Then run `decompose.js` once you have downloaded your TalkSpace history.
