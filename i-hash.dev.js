;JHE = (function() {

    /**
     * @page        http://github.com/Shushik/i-hash/
     * @author      Shushik <silkleopard@yandex.ru>
     * @version     1.0
     * @description Simple static lib for url hash
     *
     * @constructor
     *
     * @this   {Hash}
     * @param  {window}
     * @param  {string}
     * @param  {string}
     * @return {string|Hash}
     */
    function
        Hash(win, alias, value) {
            return this.init(win, alias, value);
        }; Hash.prototype = {
            /**
             * 
             *
             * @this   {Hash}
             * @param  {window}
             * @param  {string}
             * @param  {string}
             * @return {string|Hash}
             */
            init : function(win, alias, value) {
                win   = win   || window;
                alias = alias || '';
                value = value || '';

                /**
                 * 
                 *
                 * @value {window}
                 */
                this.window = win;

                /**
                 * 
                 *
                 * @value {object}
                 */
                this.params = null;

                // Try to parse a hash
                this._explode(win);

                //
                if (alias) {
                    if (value) {
                        this.set(alias, value);
                    } else {
                        return this.get(alias);
                    }
                }

                return this;
            },
            /**
             * Set a param
             *
             * @this   {Hash}
             * @param  {string}
             * @param  {string}
             * @return {Hash}
             */
            set : function(alias, value) {
                var
                    check = typeof alias,
                    vcheck = typeof value;

                // Check the alias type
                if (check == 'number' || check == 'string') {
                    // Check and save the value
                    value = this._value2string(value);

                    if (value) {
                        this.params[alias] = value;
                    }

                    // Save the new hash
                    this._implode();
                }

                return this;
            },
            /**
             * Remove a param
             *
             * @this   {Hash}
             * @param  {string}
             * @return {Hash}
             */
            del : function(alias) {
                if (this.params[alias]) {
                    delete this.params[alias];
                }

                this._implode();

                return this;
            },
            /**
             * Read a param value by alias
             *
             * @this   {Hash}
             * @param  {string}
             * @return {string}
             */
            get : function(alias) {
                if (this.params[alias]) {
                    if (decodeURIComponent) {
                        return decodeURIComponent(this.params[alias]);
                    } else {
                        return this.params[alias];
                    }
                }

                return '';
            },
            /**
             * Read a param alias by value
             *
             * @this   {Hash}
             * @param  {string}
             * @return {boolean|string}
             */
            id : function(value) {
                var
                    alias = '';

                for (alias in this.params) {
                    if (this.params[alias] == value) {
                        return alias;
                    }
                }

                return false;
            },
            /**
             * Clear the params
             *
             * @this   {Hash}
             * @return {Hash}
             */
            clear : function() {
                this.params = {};

                this._implode();

                return this;
            },
            /**
             * Parse the hash part of the url
             *
             * @private
             *
             * @this   {Hash}
             * @return {undefined}
             */
            _explode : function(win) {
                var
                    pos   = 0,
                    end   = 0,
                    item  = [],
                    items = this.window.location.hash.
                            replace(/^#/, '').
                            replace(/&amp;/ig, '&').
                            split(/&/g);

                end = items.length;

                // Clear the params
                this.params = {};

                for (pos = 0; pos < end; pos++) {
                    item = items[pos].split('=');

                    this.params[item[0]] = item[1] ? item[1] : '';
                }
            },
            /**
             * Join the params into a hash string
             *
             * @private
             *
             * @this   {Hash}
             * @return {undefined}
             */
            _implode : function() {
                var
                    pos   = 0,
                    hash  = '',
                    alias = '',
                    value = '';

                for (alias in this.params) {
                    value = this._value2string(this.params[alias]);

                    if (alias) {
                        if (pos > 0) {
                            hash += '&';
                        }

                        hash += alias + (value ? '=' + value : '');

                        pos++;
                    }
                }

                this.window.location.hash = hash.length ? '#' + hash : '';
            },
            /**
             * 
             *
             * @private
             *
             * @this   {Hash}
             * @param  {undefined|boolean|number|string|object}
             * @return {boolean|string}
             */
            _value2string : function(value) {
                var
                    check = typeof value;

                // Check the value type
                switch (check) {

                    // For the empty value
                    case 'undefined':
                        value = '';
                    break;

                    // For the boolean values
                    case 'boolean':
                        if (value) {
                            value = 1;
                        } else {
                            value = 0;
                        }
                    break;

                    // For the regular values
                    case 'number':
                    case 'string':
                        if (encodeURIComponent) {
                            value = encodeURIComponent(value);
                        }
                    break;

                    default:
                        value = false;
                    break;

                }

                return value;
            }
        };


        /**
         * Set a param
         *
         * @static
         *
         * @this   {Hash}
         * @param  {string}
         * @param  {string}
         * @return {Hash}
         */
        Hash.set = function(alias, value) {
            return new Hash(window).set(alias, value);
        }

        /**
         * Remove a param
         *
         * @static
         *
         * @this   {Hash}
         * @param  {string}
         * @return {Hash}
         */
        Hash.del = function(alias) {
            return new Hash(window).del(alias);
        }

        /**
         * Read a param value by alias
         *
         * @static
         *
         * @this   {Hash}
         * @param  {string}
         * @return {string}
         */
        Hash.get = function(alias) {
            return new Hash(window).get(alias);
        }


        /**
         * Read a param alias by value
         *
         * @static
         *
         * @this   {Hash}
         * @param  {string}
         * @return {string}
         */
        Hash.id = function(value) {
            return new Hash(window).id(value);
        }

        /**
         * Clear the params
         *
         * @static
         *
         * @this   {Hash}
         * @param  {string}
         * @return {Hash}
         */
        Hash.clear = function(alias) {
            return new Hash(window).clear();
        }


    return Hash;

})();