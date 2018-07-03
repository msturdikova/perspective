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
        console.log( "initializing FilterSubGrid", datasaur, options);
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
        return this.filters[x] != undefined ? this.filters[x][2] + '' : '';
    },
    setValue: function(x,y,value){
        const column = this.grid.behavior.getActiveColumn(x);

        if (!value){
            delete this.filters[x];
            return;
        }

        let type = column.type;
        let op = perspective.FILTER_DEFAULTS[type];
        let val = undefined;
        switch (type) {
            case "float":
                val = parseFloat(value);
                break;
            case "integer":
                val = parseInt(value);
                break;
            case "boolean":
                val = value.toLowerCase().indexOf('true') > -1;
                break;
            case "string":
            default:
                val = value;
        }
        const filter = [ column.header, op, val ];
        this.filters[x] = filter;
    },
    getRow: function(y){
        return this.filters;
    },
    // Return the cell renderer
    getCell: function(config, rendererName) {
        
        return config.grid.cellRenderers.get(rendererName);
    },

    // Return the cell editor for a given (x,y) cell coordinate
    getCellEditorAt: function(x, y, declaredEditorName, cellEvent) {
        cellEvent.format = "";
        return cellEvent.grid.cellEditors.create( 'Filter', cellEvent );
    }

});
