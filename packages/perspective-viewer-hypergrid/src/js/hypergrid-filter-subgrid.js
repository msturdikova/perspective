/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import perspective from "@jpmorganchase/perspective";

export const FilterSubGrid =  require('datasaur-local').extend('FilterSubGrid',{
    initialize: function(datasaur, options){
        this.grid = options.grid;
        this.filters = {};
        this.showFilterRow = true;

    },
    type: 'filter',
    format: 'string',
    name: 'filter',
    getRowCount: function(){
        return this.showFilterRow ? 1:0;
    },
    getValue: function(x,y){
        return this.filters[x] != undefined ? this.filters[x][1] + ' ' + this.filters[x][2] : '';
    },
    setValue: function(x,y,value){
        const column = this.grid.behavior.getActiveColumn(x);
        const operator = value[0];
        const operand = value[1];

        if (!value || !operand){
            delete this.filters[x];
            return;
        }

        let type = column.type;
        let val = undefined;
        switch (type) {
            case "float":
                val = parseFloat(operand);
                break;
            case "integer":
                val = parseInt(operand);
                break;
            case "boolean":
                val = operand.toLowerCase().indexOf('true') > -1;
                break;
            case "string":
            default:
                val = operand;
        }
        const filter = [ column.header, operator, val ];
        this.filters[x] = filter;
    },
    getRow: function(y){
        return this.filters;
    },
    // Return the cell renderer
    getCell: function(config, rendererName) {
        
        return config.grid.cellRenderers.get("Filter");
    },

    // Return the cell editor for a given (x,y) cell coordinate
    getCellEditorAt: function(x, y, declaredEditorName, cellEvent) {
        cellEvent.format = "";
        cellEvent.filter = this.filters[x];
        return cellEvent.grid.cellEditors.create( 'Filter', cellEvent );
    }

});
