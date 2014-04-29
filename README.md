Google Analytics tracking for GitBook
==============

You can use install it via **NPM**:

```
$ npm install gitbook-plugin-ga
```

And use it for your book with:

```
$ gitbook build ./ --plugins=ga
```

You can set the Disqus shortname using the plugins configuration in the book.json:

```
{
    pluginsConfig: {
        "ga": {
            "token": "UA-XXXX-Y"
        }
    }
}
```
