/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Dashboard.js
 *
 * @copyright     Copyright (c) 2012 Ronald Marske, All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in
 *       the documentation and/or other materials provided with the
 *       distribution.
 *
 *     * Neither the name of Ronald Marske nor the names of his
 *       contributors may be used to endorse or promote products derived
 *       from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var Dashboard = new Class({

	Extends: Controller,
	template: '\
	<div class="dashboard">\
		<div class="box">\
			<h2>{{_title}}</h2>\
			\
			{{#noResult}}\
			<div class="noResult">\
				{{_noResult}}\
			</div>\
			{{/noResult}}\
			\
			<div class="tournament new hidden">\
				<input name="name" value="" data-controller="Dashboard/save" />\
			</div>\
			\
			{{#tournaments}}\
			<div class="tournament">\
				<h3  data-id="{{id}}" data-controller="Dashboard/open">{{name}}</h3>\
				<input name="name" data-id="{{id}}" value="{{name}}" class="hidden" data-controller="Dashboard/save" />\
				<a class="button delete smal greyFont" data-id="{{id}}" data-controller="Dashboard/delete">{{_delete}}</a>\
				<a class="button edit smal greyFont mRight10" data-controller="Dashboard/edit">{{_edit}}</a>\
			</div>\
			{{/tournaments}}\
		</div>\
		\
		<div class="buttons">\
			<a class="button" data-controller="Dashboard/addTournament">{{_addTournament}}</a>\
		</div>\
	</div>',

	/**
	 * initialization of dashboard
	 */
	init: function() {

		// empty .content object
		document.body.getElement('.content').empty();

		// show loading
		document.body.addClass('loading');

		this.loadTournaments();

		// render Template
		this.refreshList();

		// remove loading
		document.body.removeClass('loading');

	},

	/**
	 * refresh template
	 */
	refreshList: function() {

		// mustache object
		var obj = {
			tournaments: this.tournaments.toArray(),
			noResult: false,
			_title: Locale.get('Dashboard.title'),
			_noResult: Locale.get('Dashboard.noResult'),
			_addTournament: Locale.get('Dashboard.addTournament'),
			_edit: Locale.get('default.edit'),
			_delete: Locale.get('default.delete')
		};

		// if no tournament in list
		if (0 == obj.tournaments.length) {
			obj.noResult = true;
		}

		// get HTML via Mustache
		var HTML = Mustache.render(this.template, obj);

		// add html
		document.body.getElement('.content').set('html', HTML);

		// parse template for data.controler
		Template.parse(document.body.getElement('.content'));

	},

	/**
	 * action for add tournament, show an input element to add
	 * a tournament
	 * @param Object oElement
	 */
	addTournamentAction: function(oElement) {
		// add click event to button
		oElement.addEvent('click', function() {
			// get content
			var oContent = document.getElement('.content');

			// remove "no result" elemnt
			if (oContent.getElement('.dashboard .noResult')) {
				oContent.getElement('.dashboard .noResult').addClass('hidden');
			}

			// show input element
			oContent.getElement('.dashboard .new').removeClass('hidden');
			oContent.getElement('.dashboard .new input').focus();
		});
	},

	/**
	 * edit action, hide H§ and show input element to modify tournament name
	 * @param Object oElement
	 */
	editAction: function(oElement) {

		// add click event
		oElement.addEvent('click', function(oEvent) {

			// get h3
			var oName = oElement.getParent('.tournament').getElement('h3');

			// get input element;
			var oInput = oElement.getParent('.tournament').getElement('input');


			oName.addClass('hidden');
			oInput.removeClass('hidden');
			oInput.focus();

		});
	},

	/**
	 * save action to handle new or updates
	 *
	 * @param oElement
	 */
	saveAction: function(oElement) {
		oElement.addEvent('keyup', function(oEvent) {

			// on Enter key
			if (13 == oEvent.code) {

				// on edit
				if (null != oElement.get('data-id')) {

					// get tournament
					var oTournament = this.tournaments.getById(oElement.get('data-id'));

					if (oTournament) {
						oTournament.name = oElement.get('value');
					}


				// create new
				} else {
					// add tournament on top
					this.tournaments.add(new Models_Tournament(oElement.get('value')), true);
				}

				// save tournaments
				this.tournaments.save();

				// refresh list
				this.refreshList();

			// on escape
			} else if(27 == oEvent.code) {

				// if in endit mode
				if (null != oElement.get('data-id')) {
					// hide input
					oElement.addClass('hidden');

					// get h3
					var oH3 = oElement.getParent('.tournament').getElement('h3');

					// restore input valu to h3 value
					oElement.set('value', oH3.get('html'));

					// show h3
					oH3.removeClass('hidden');

				// add mode
				} else {
					// get content
					var oContent = document.getElement('.content');

					// show no result
					if (oContent.getElement('.dashboard .noResult')) {
						oContent.getElement('.dashboard .noResult').removeClass('hidden');
					}

					// remove new
					oContent.getElement('.dashboard .new').addClass('hidden');
				}
			}
		}.bind(this));
	},

	/**
	 * delete action, to remove a tournament
	 * @param oElement
	 */
	deleteAction: function(oElement) {

		// get id
		var id = oElement.get('data-id');

		// add click event
		oElement.addEvent('click', function(oEvent) {
			oEvent.stop();

			// ask user
			if (true === confirm(Locale.get('Dashboard.deleteConfirm'))) {

				// delete and save
				this.tournaments.deleteById(id);
				this.tournaments.save();

				// refresh html
				this.refreshList();
			}
		}.bind(this));
	},

	/**
	 * open a tournament
	 * @param oElement
	 */
	openAction: function(oElement) {
		// add event
		oElement.addEvent('click', function() {

			// get Application controller
			var oApplication = this.getController('Application');

			// open tournament controller
			oApplication.open('Tournament', {id: oElement.get('data-id')});
		}.bind(this));
	}
});
