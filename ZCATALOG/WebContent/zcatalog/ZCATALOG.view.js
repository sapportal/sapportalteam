sap.ui.jsview("zcatalog.ZCATALOG", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf zcatalog.ZCATALOG
	 */
	getControllerName : function() {
		return "zcatalog.ZCATALOG";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf zcatalog.ZCATALOG
	 */
	createContent : function(oController) {

		var oLayout = new sap.ui.layout.form.SimpleForm("formId", {

			title : "Product Maintainance",
			content : [

			new sap.ui.commons.Label({
				text : "ID"
			}), new sap.ui.commons.TextField("id", {
				width : '200px',
				editable : false
			}),

			new sap.ui.commons.Label({
				text : "Name"
			}), new sap.ui.commons.TextField("name", {
				width : '200px'
			}),

			new sap.ui.commons.Label({
				text : "Description"
			}), new sap.ui.commons.TextField("description", {
				width : '200px'
			}),

			new sap.ui.commons.Label({
				text : "Price"
			}), new sap.ui.commons.TextField("price", {
				width : '200px'
			}),

			new sap.ui.commons.Label({
				text : "Rating"
			}), new sap.ui.commons.TextField("rating", {
				width : '200px'
			}),

			new sap.ui.commons.Label({
				text : "ReleaseDate"
			}), new sap.ui.commons.TextField("date", {
				width : '200px',
				value : "2014-12-28T22:22:22"
			}),

			new sap.ui.commons.Label({
				text : ""
			}), new sap.ui.commons.Button({
				text : "Save",
				width : '100px',
				press : function() {
					oController.save()
				}
			})

			]

		});

		var oMatrix = sap.ui.commons.layout.MatrixLayout({

			layoutFixed : true,
			width : '300px',
			columns : 3

		});

		oMatrix.createRow(

		new sap.ui.commons.Button({
			text : "Create",
			width : '100px',
			press : function() {
				oController.create();
			}
		}), new sap.ui.commons.Button({
			text : "Edit",
			width : '100px',
			press : function() {
				oController.edit();
			}
		}), new sap.ui.commons.Button({
			text : "Delete",
			width : '100px',
			press : function() {
				oController.remove();
			}
		})

		);

		// table

		var oTable = new sap.ui.table.Table("tableId", {
			visibleRowCount : 5,
			editable : false
		});

		oTable.addColumn(new sap.ui.table.Column({

			label : new sap.ui.commons.Label({
				text : "ID"
			}),
			visible : true,
			template : new sap.ui.commons.TextView({
				text : "{products>ID}"
			})

		}));

		oTable.addColumn(new sap.ui.table.Column({

			label : new sap.ui.commons.Label({
				text : "Name"
			}),
			visible : true,
			template : new sap.ui.commons.TextView({
				text : "{products>Name}"
			})

		}));

		oTable.addColumn(new sap.ui.table.Column({

			label : new sap.ui.commons.Label({
				text : "Description"
			}),
			visible : true,
			template : new sap.ui.commons.TextView({
				text : "{products>Description}"
			})

		}));

		var oSorter = new sap.ui.model.Sorter("products>Name", true); // sort
																		// descending

		oSorter.fnCompare = function(value1, value2) {
			console.log(value1 + ' - ' + value2);
			var val1Mapped = get(value1);
			var val2Mapped = get(value2);
			console.log(val1Mapped + ' - ' + val2Mapped);
			if (val1Mapped < val2Mapped)
				return -1;
			if (val1Mapped == val2Mapped)
				return 0;
			if (val1Mapped > val2Mapped)
				return 1;
		};

		oTable.bindRows("products>/Products").sort(oSorter);

		var bindEle = [ oTable, oLayout, oMatrix ];

		return bindEle;

	}

});