module.exports = {
    env: {
        jest: true
    },
    extends: [
        "airbnb-typescript-prettier",
        "plugin:jest/recommended"
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js" ,".ts", ".tsx"],
                paths: ["src"]
            }
        }
    },
    rules: {
        "jsx-a11y/no-static-element-interactions": [
            "error",
            {
                handlers: [
                    "onClick",
                    "onMouseDown",
                    "onMouseUp",
                    "onKeyPress",
                    "onKeyDown",
                    "onKeyUp",
                ],
            },
        ],
        "jsx-a11y/label-has-associated-control": [
            "error",
            {
                "labelComponents": ["label"],
                "labelAttributes": ["htmlFor"],
                "controlComponents": ["input"],
                "assert": "either",
                "depth": 25
            }
        ],
        "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"],
        "no-param-reassign": 0,
    }
};
