module.exports = {
    'extends': 'airbnb-base',
    'root': true,
    'env': {
        'browser': false,
        'es6': true,
    },
    'overrides': [
        {
            'files': [
                '__tests__/**/*.js'
            ],
            'env': {
                'browser': true,
                'jest': true
            },
            'rules': {
                'func-names': ['error', 'as-needed'],
            }
        }
    ]
}
