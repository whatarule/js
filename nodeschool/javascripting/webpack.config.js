module.exports = {
    entry: {
        run: './js/entry/run.js',
    },
    output: {
        path: __dirname + "/webpack",
        filename: "run.js",
//        filename: &quot;[name].js",
    },
    externals:{
        "lodash": "_",
        "immutable": "_i",
        "ramda": "_r",
    },
};



