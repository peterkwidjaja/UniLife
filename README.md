#README: UniLife Planner
=======================

##Overview
 
UniLife Planner serves as a compact and simple solution for NUS undergraduates in planning their courses throughout the 3 or 4 years. It aims to ensure that undergraduates do not miss out on modules they want and end up extending their term. Its features include many checkers that help to verify your modules. Your plan is stored on the cloud which means that you can access it anywhere. Our web is designed to be responsive to make sure that you can still comfortably navigate using your smartphones.

##Installation

Our app is built on Ruby on Sinatra. Thus the first thing you need is [Ruby](https://www.ruby-lang.org/).

Install Bundler:

`$ gem install bundler`

Install Dependencies:
    
`$ bundle install`

####Development
dm-sqlite-adapter might have problems installing in Windows, so we have to use manual approach.

Uninstall dm-sqlite3-adapter if needed:

`$ gem uninstall dm-sqlite3-adapter`

`$ gem uninstall do_sqlite3`

Install sqlite3 gem:

`$ gem install sqlite3`

You need sqlite source: [SQLite](https://www.sqlite.org/download.html)
Download the autoconf and dll packs

- Extract the file to an installation folder
- Build the source file: Assume sqlite is extracted to C:\Projects\

```bash
C:\Projects\<sqlite directory>> C:\Ruby\DevKit\devkitvars.bat
C:Adding the DevKit to PATH...
C:\Projects\<sqlite directory>>sh
sh-3.1$ ./configure
...
C:\Projects\<sqlite directory>>make
```

- Run the following line

```bash
$ gem install dm-sqlite-adapter --platform=ruby -- --with-sqlite3-lib=c:\Projects\<sqlite directory>\.libs --with-sqlite3-include=c:\Projects\<sqlite directory>
````

- Copy "libsqlite3-0.dll" from .libs folder inside the sqlite directory to the bin folder inside your Ruby folder. To be safe, copy sqlite3.dll from the dll packs as well.
- Test whether the compiler can load correctly

```bash
$ irb
irb(main):001:0> require 'do_sqlite3'
```

It should return "true".

##Reference Used

For learning Ruby and Web Development[HTML, CSS, etc.]:
[Codecademy](http://www.codecademy.com)

For learning Ruby on Sinatra
[http://code.tutsplus.com/](http://code.tutsplus.com/tutorials/singing-with-sinatra--net-18965)
[http://sinatra-book.gittr.com](href="http://sinatra-book.gittr.com/)

For Documentation and Logging:
[Trello](https://trello.com): screenshot of the features are done through Trello.
[Google Docs and Spreadsheet](http://drive.google.com): for logging and discussion


#Project Log


Log Spreadsheet:

[Link Here](https://docs.google.com/spreadsheets/d/1eoXP2_ltbw3ME3CGNZixHv81nk1rYm_KoKvM16MvoHE/edit?usp=sharing)


###Website (still under construction for the time being)
[UniLife](http://unilife.herokuapp.com)