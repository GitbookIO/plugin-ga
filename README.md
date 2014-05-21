Google Analytics tracking for GitBook
==============

You can use install it via **NPM**:

```
$ npm install gitbook-plugin-ga
```

And use it for your book with in the book.json:

```
{
    "plugins": ["ga"]
}
```

You can set the Google Analytics tracking ID using the plugins configuration in the book.json:

```
{
    "plugins": ["ga"],
    "pluginsConfig": {
        "ga": {
            "token": "UA-XXXX-Y"
        }
    }
}
```
