'use strict';

const astUtils = require('../util/ast');

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallow global tests'
        }
    },
    create(context) {
        function isGlobalScope(scope) {
            return scope.type === 'global' || scope.type === 'module';
        }

        return {
            CallExpression(node) {
                const callee = node.callee;
                const scope = context.getScope();

                if (astUtils.isTestCase(node) && isGlobalScope(scope)) {
                    context.report(callee, 'Unexpected global mocha test.');
                }
            }
        };
    }
};
