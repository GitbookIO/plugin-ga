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


You can set the Google Analytics token using the plugins configuration (command line option: `--pluginsConfig`) with the following content:

```
{
    "ga": {
        "token": "UA-XXXX-Y"
    }
}
```

