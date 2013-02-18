/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Tournament.js
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

var Tournament = new Class({

	/**
	 * extends base Controller
	 */
	Extends: Controller,

	/**
	 * display template
	 * @var string
	 */
	template: '\
		<a class="button mBottom10 mRight20" data-controller="Tournament/back">&laquo; back</a>\
		<a class="button mBottom10" data-controller="Tournament/addTeam">add Team</a>\
		\
		<div class="matches">\
			<div class="box">\
				<h2 data-controller="Tournament/changeTitle" title="To change this tournament name use double click.">{{name}}</h2>\
				<input class="tournament hidden" name="title" value="{{name}}" data-controller="Tournament/changeTitle" />\
				\
				<div class="teams">\
					<ul>\
						<li class="headline">\
							<span class="rules average">Rules Knowledge</span>\
							<span class="fouls average">Fouls and Contact</span>\
							<span class="fair average">Fair-Mindedness</span>\
							<span class="attitude average">Positive Attitude</span>\
							<span class="spirit average">Our Spirit</span>\
							<span class="complete average">Average</span>\
						</li>\
						<li class="add hidden">\
							<input name="name" value="" data-controller="Tournament/save" />\
						</li>\
						{{#noResult}}\
						<li class="noResult">\
							There is no Team created yet. Please add a Team.\
						</li>\
						{{/noResult}}\
						{{#teams}}\
						<li class="teams">\
							<span class="team">\
								<span data-id="{{id}}" data-controller="Tournament/addSpirit">{{nr}}. {{name}}</span>\
								<input class="hidden" name="name" data-controller="Tournament/save" data-id="{{id}}" value="{{name}}" />\
								<a data-id="{{id}}" data-controller="Tournament/deleteTeam" class="button smal delete greyFont">delete</a>\
								<a data-id="{{id}}" data-controller="Tournament/editTeam" class="button edit smal greyFont mRight10">edit</a>\
							</span>\
							<span class="rules average">{{rules}}</span>\
							<span class="fouls average">{{fouls}}</span>\
							<span class="fair average">{{fair}}</span>\
							<span class="attitude average">{{attitude}}</span>\
							<span class="spirit average">{{spirit}}</span>\
							<span class="complete average">{{average}}</span>\
						</li>\
						{{/teams}}\
					</ul>\
				</div>\
			</div>\
		</div>',


	/**
	 * overlay - add spirit template
	 * @var string
	 */
	overlay: '\
		<div class="overlayBg transparent" data-controller="Overlay/background"></div>\
		<div class="overlay spirit" data-controller="Overlay/content">\
			<div class="content">\
				<h2>{{Title}}</h2>\
				<svg id="sotg" height="550" width="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >\
					<svg viewBox="0 0 744 1052">\
						<image x="0" y="0" height="1052" width="744" xlink:href="Resources/images/SOTG_v2010_EN.svg" />\
					</svg>\
				</svg>\
			</div>\
		</div>\
		',
	/**
	 * tournament id
	 * @var integer
	 */
	id: null,

	/**
	 * init method
	 * @param params
	 */
	init: function(params) {

		// set tournament id
		this.id = params.id;

		// empty content and add class loading
		document.body.getElement('.content').empty();
		document.body.addClass('loading');

		this.tournament = this.tournaments.getById(this.id);

		// render template and remove loading
		this.refreshList();
		document.body.removeClass('loading');



	},

	refreshList: function() {

		var obj = {
			name: this.tournament.name,
			teams: this.tournament.teams.toArray(),
			noResult: false
		};

		if (0 < obj.teams.length) {
			// sort teams by name
			obj.teams.sort(function(a, b) {
				return a.name.localeCompare(b.name)
			});

			// add number to team
			var idx = 1;
			obj.teams.each(function(el) {
				el.nr = idx;
				idx++;
			});
		} else {
			obj.noResult = true;
		}
		// render HTML
		var HTML = Mustache.render(this.template, obj);
		document.body.getElement('.content').set('html', HTML);

		// Template parse
		Template.parse(document.body.getElement('.content'));

	},

	/**
	 * go back to dashboard
	 * @param Object oElement
	 */
	backAction: function(oElement) {

		// click event
		oElement.addEvent('click', function() {
			// loadDashboard Controller
			this.getController('Application').open('Dashboard');

		}.bind(this));
	},

//pragma mark - tournament modification

	/**
	 * edit tournament name
	 * @param Object oElement h2 or input element
	 */
	changeTitleAction: function(oElement) {

		// parent element
		var oParent = oElement.getParent();

		// if element is h2 - add dblclick event
		if ('h2' == oElement.get('tag')) {

			oElement.addEvent('dblclick', function() {

				// hide h2 and show input element
				oParent.getElement('input').removeClass('hidden');
				oParent.getElement('input').focus();

				oElement.addClass('hidden');
			});

		// add save and cancel event to input element
		} else if ('input' == oElement.get('tag')) {

			// on keyup
			oElement.addEvent('keyup', function(oEvent) {

				// on enter
				if (13 == oEvent.code) {

					// save tournament
					this.tournament.name = oElement.get('value');
					this.tournaments.save();

					// refresh list
					this.refreshList();

				// on escape
				} else if (27 == oEvent.code) {

					// restore input value
					oElement.set('value', oParent.getElement('h2').get('html'));

					// hide input, show h2
					oElement.addClass('hidden');
					oParent.getElement('h2').removeClass('hidden');
				}
			}.bind(this));
		}
	},

//pragma mark - team modification

	/**
	 * save action
	 * @param oElement
	 */
	saveAction: function(oElement) {
		oElement.addEvent('keyup', function(oEvent) {

			if (13 == oEvent.code) {

				// on edit
				if (null != oElement.get('data-id')) {
					var oTeam = this.tournament.teams.getById(oElement.get('data-id'));
					if (oTeam) {
						oTeam.name = oElement.get('value');
					}
				} else {
					this.tournament.teams.add(new Models_Team(oElement.get('value')));
				}


				this.tournaments.save();
				this.refreshList();

			} else if(27 == oEvent.code) {

				// on edit
				if (null != oElement.get('data-id')) {

					var oTeam = this.tournament.teams.getById(oElement.get('data-id'));
					if (oTeam) {
						// restore input value
						oElement.set('value', oTeam.name);
					}
					// hide input
					oElement.addClass('hidden');

					// get span
					var oSpan = oElement.getParent().getElement('span');

					// show span
					oSpan.removeClass('hidden');
				} else {
					var oContent = document.getElement('.content');
					if (oContent.getElement('.teams .noResult'))
						oContent.getElement('.teams .noResult').removeClass('hidden');
					oContent.getElement('.teams .add').addClass('hidden');
				}
			}
		}.bind(this));
	},


	// add Team Event
	addTeamAction: function(oElement) {

		// click event
		oElement.addEvent('click', function() {
			var oContent = document.getElement('.content');

			// remove no Result view
			if (oContent.getElement('.teams .noResult'))
				oContent.getElement('.teams .noResult').addClass('hidden');

			// show input elemnt
			oContent.getElement('.teams .add').removeClass('hidden');
			oContent.getElement('.teams .add input').focus();
		});
	},

	/**
	 * add click event to change team names
	 * @param Object oElement
	 */
	editTeamAction: function(oElement) {

		// add click event
		oElement.addEvent('click', function() {
			// et Parent
			var oParent = oElement.getParent();

			// show input hide span
			oParent.getElement('span').addClass('hidden');
			oParent.getElement('input').removeClass('hidden');
			oParent.getElement('input').focus();
		});
	},

	/**
	 * delete action, to remove a team
	 *
	 * @param Object oElement
	 */
	deleteTeamAction: function(oElement) {

		// get id
		var id = oElement.get('data-id');

		// add click event
		oElement.addEvent('click', function(oEvent) {
			oEvent.stop();

			// ask user
			if (true === confirm('Do you really want to delete this team including all analysis?')) {

				// delete and save
				this.tournament.teams.deleteById(id);
				this.tournaments.save();

				// refresh html
				this.refreshList();
			}
		}.bind(this));

	},

	/**
	 * add Spirit scores to team
	 * @param Object oElement
	 */
	addSpiritAction: function(oElement) {

		// get id
		var id = oElement.get('data-id');

		// add click event
		oElement.addEvent('click', function() {

			var obj = {
				Title: 'Add Spirit'
			};

			// render HTML
			var HTML = Mustache.render(this.overlay, obj);
			document.body.getElement('.overlayContent').empty();
			document.body.getElement('.overlayContent').set('html', HTML);

			// Template parse
			Template.parse(document.body.getElement('.overlayContent'));

		}.bind(this));
	}
});
