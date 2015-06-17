Google Sheets to JSON (for translations)
============

![Image of menu]
(https://github.com/clarenceng/google_spreadsheet_tojson/blob/master/json.png)

### What it does?

Takes selected columns and turns it into a json file
I made it, because my translations are managed by Google Sheets
 
| KEY           | ENGLISH       | FRENCH   |
| ------------- |:-------------:| --------:|
| GLOBAL.1      | one           | une      |
| GLOBAL.TWO.1  | two one       | duex une |
| GLOBAL.TWO.2  | one two       | une duex |

OUTPUT when choosing KEY and FRENCH

{
    "GLOBAL" : {
      "1" : "une",

      "TWO" : {
        "1" : "duex une",
        "2" : "une duex"
    }
  }
}


### How to use it

1. In a spreadsheet, open tools -> script editor

2. Go to file -> new -> html file

3. create two html files

4. name them json.html and output.html

5. add my markup to the corresponding files.

6. In code.gs, add the contents of to_json.js to the bottom. 

**You're done!**

In your spreadsheet, there should now be a menu to open the app. 


### Notes

It only accepts 2 columns.

You can change getColumnData() if you need more.

It will remove the entry if there is no string

