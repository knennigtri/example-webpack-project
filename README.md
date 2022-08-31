- [Setup](#setup)
  - [Generate your HTML](#generate-your-html)
    - [Using merge-markdown](#using-merge-markdown)
  - [Update webpack.config.js](#update-webpackconfigjs)
- [Run Webpack](#run-webpack)
- [Development](#development)
- [Make Final CSS file](#make-final-css-file)

## Setup
### Generate your HTML
Whether you are getting your HTML from a webpage, a local project, or building it on your own, you need static html to style. 

See [src/main/webpack/static/index.html](src/main/webpack/static/index.html) as an example.

If you are using any assets in your HTML and you would like to develop with them, they also need to be added to `src/main/webpack/static`.

#### Using merge-markdown
If you are coming to this project from [merge-markdown](https://www.npmjs.com/package/@knennigtri/merge-markdown), you can quickly generate html by using:
```bach
merge-markdown -m mandifest.yml --html
```
Once you have generated your html, copy the html into `src/main/webpack/static`
The steps below are only needed if this project is portable since merge-markdown uses absolute links for assets.
  1. Copy all assets into `src/main/webpack/static` in the same relative folder structure
  2. Do a find and replace to update asset paths to be relative

### Update webpack.config.js
You need update `webpack.config.js` plugin section with the html file and folders you'd like to use in your webpack project. 
```javascript
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html')
        }),
        new CopyWebpackPlugin([
        { from: path.resolve(__dirname, SOURCE_ROOT + '/static/assets'), to: 'assets' },
        ])
    ]
```

## Run Webpack
Install dependencies:
``` bash
npm install
```
> **Mac users**: If you recieve
> ```
> gyp: No Xcode or CLT version detected!
> gyp ERR! configure error
> ```
> You might need to reset Xcode. Run:
> ```
> sudo xcode-select --reset
> ```
> If that doesn't work, view this [article](https://allanphilipbarku.medium.com/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d)

Once dependencies are installed. Build the webpack project:
```bash
npm run build
```
Start your web server
```
npm run start
```
You can now develop in realtime with the `src/main/webpack` folder on localhost:8080.

## Development
Development occurs in `src/main/webpack`. This project supports css and scss stylesheets. You can build your own design structure and webpack will automatically merge and update in realtime to show you the result. Build errors are output to the console.

## Make Final CSS file
Run
```bash
  FILE=myFinalCss.css npm run package-css
```