requirejs.config({
    'shim': {
        'jquery': {
            'exports': '$'
        }
    },
    'paths': {
        'text': '../../../bower_components/requirejs-text/text',
        'jquery': '../../../bower_components/jquery/dist/jquery',
        'babelPolyfill' : '../../../bower_components/babelPolyfill/_build/babelPolyfill',
        'mathjs' : '../../../bower_components/mathjs/dist/math.min',

        'templates': '../templates'
    }
});