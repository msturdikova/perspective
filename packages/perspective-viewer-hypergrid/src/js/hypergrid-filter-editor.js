
const CellEditor = require('fin-hypergrid/src/cellEditors/CellEditor');

/**
 * @constructor
 * @extends CellEditor
 */
export const FilterEditor = CellEditor.extend('FilterEditor', {
    name: "Filter",
    template: '<div class="hypergrid-textfield">' +
                '<div style="display:flex;flex-direction:row;overflow:hidden">' +
                    '<span id="filter_operator" style="padding-right:5px;"></span>' +
                    '<input id="filter_operand" placeholder="Value" lang="{{locale}}" style="border-bottom: 1px solid gray; {{style}}"></input>'+
                '</div>' +
            '</div>',
    
    initialize: function() {
        this.initialValue = '';
        this.operator = this.el.querySelector('#filter_operator');
        this.operator.textContent = '==';
        this.operand = this.el.querySelector('#filter_operand');
        this.input = this.operand;
        this.errors = 0;
        this.el.onclick = function() {
            this.operand.textContent = "==";
        }.bind(this);
        this.input.onclick = function(e) {
            console.log( 'clicked operator'); 
            e.stopPropagation(); // ignore clicks in the text FIELD
        };
        this.input.onfocus = (e) => {
            var target = e.target;
            this.el.style.outline = this.outline = this.outline || window.getComputedStyle(target).outline;
            target.style.outline = 0;
        };
        this.input.onblur = (e) => {
            this.el.style.outline = 0;
        };
        
    },

    

});
