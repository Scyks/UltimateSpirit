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
	 * object stores current selection in spirit sheet
	 * @var object
	 */
	points: {
		rules: 0,
		fouls: 0,
		fair: 0,
		attitude: 0,
		spirit: 0
	},

	/**
	 * display template
	 * @var string
	 */
	template: '\
		<a class="button mBottom10 mRight20" data-controller="Tournament/back">&laquo; {{_back}}</a>\
		<a class="button mBottom10" data-controller="Tournament/addTeam">{{_addTeam}}</a>\
		\
		<div class="matches">\
			<div class="box">\
				<h2 data-controller="Tournament/changeTitle" title="{{_changeTournamentName}}">{{name}}</h2>\
				<input class="tournament hidden" name="title" value="{{name}}" data-controller="Tournament/changeTitle" />\
				\
				<div class="teams">\
					<ul>\
						<li class="headline">\
							<span class="matches average">{{_matches}}</span>\
							<span class="rules average">{{_rules}}</span>\
							<span class="fouls average">{{_fouls}}</span>\
							<span class="fair average">{{_fair}}</span>\
							<span class="attitude average">{{_attitude}}</span>\
							<span class="spirit average">{{_spirit}}</span>\
							<span class="complete average">{{_average}}</span>\
						</li>\
						<li class="add hidden">\
							<input name="name" value="" data-controller="Tournament/save" />\
						</li>\
						{{#noResult}}\
						<li class="noResult">\
							{{_noResult}}\
						</li>\
						{{/noResult}}\
						{{#teams}}\
						<li class="teams">\
							<span class="team">\
								<span data-id="{{id}}" data-controller="Tournament/addSpirit">{{nr}}. {{name}}</span>\
								<input class="hidden" name="name" data-controller="Tournament/save" data-id="{{id}}" value="{{name}}" />\
								<a data-id="{{id}}" data-controller="Tournament/deleteTeam" class="button smal delete greyFont">{{_delete}}</a>\
								<a data-id="{{id}}" data-controller="Tournament/editTeam" class="button edit smal greyFont mRight10">{{_edit}}</a>\
							</span>\
							<span class="matches mRight15 average">{{matches}}</span>\
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
				<a class="button close" data-controller="Overlay/close">X</a>\
				<svg id="sotg" height="850" width="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >\
					<svg viewBox="0 0 744 1052">\
						<image x="0" y="0" height="1052" width="744" xlink:href="Resources/images/SOTG_v2010_{{_lang}}.svg" />\
					</svg>\
					\
					<circle data-category="rules" data-points="0" data-controller="Tournament/setPoints" class="rules" cx="320" cy="318" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="rules" data-points="1" data-controller="Tournament/setPoints" class="rules" cx="374" cy="318" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="rules" data-points="2" data-controller="Tournament/setPoints" class="rules" cx="428" cy="318" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="rules" data-points="3" data-controller="Tournament/setPoints" class="rules" cx="482" cy="318" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="rules" data-points="4" data-controller="Tournament/setPoints" class="rules" cx="536" cy="318" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<g class="rules">\
						<line class="1" x1="308" x2="333" y1="300" y2="334" style="stroke:#000000; stroke-width: 4" />\
						<line class="2" x1="333" x2="308" y1="300" y2="334" style="stroke:#000000; stroke-width: 4" />\
					</g>\
					\
					<circle data-category="fouls" data-points="0" data-controller="Tournament/setPoints" class="fouls" cx="320" cy="394" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="fouls" data-points="1" data-controller="Tournament/setPoints" class="fouls" cx="374" cy="394" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="fouls" data-points="2" data-controller="Tournament/setPoints" class="fouls" cx="428" cy="394" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="fouls" data-points="3" data-controller="Tournament/setPoints" class="fouls" cx="482" cy="394" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="fouls" data-points="4" data-controller="Tournament/setPoints" class="fouls" cx="536" cy="394" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<g class="fouls">\
						<line class="1" x1="308" x2="333" y1="376" y2="410" style="stroke:#000000; stroke-width: 4" />\
						<line class="2" x1="333" x2="308" y1="376" y2="410" style="stroke:#000000; stroke-width: 4" />\
					</g>\
					\
					<circle	data-category="fair" data-points="0" data-controller="Tournament/setPoints" class="fair" cx="320" cy="470" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle	data-category="fair" data-points="1" data-controller="Tournament/setPoints" class="fair" cx="374" cy="470" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle	data-category="fair" data-points="2" data-controller="Tournament/setPoints" class="fair" cx="428" cy="470" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle	data-category="fair" data-points="3" data-controller="Tournament/setPoints" class="fair" cx="482" cy="470" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle	data-category="fair" data-points="4" data-controller="Tournament/setPoints" class="fair" cx="536" cy="470" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<g class="fair">\
						<line class="1" x1="308" x2="333" y1="452" y2="486" style="stroke:#000000; stroke-width: 4" />\
						<line class="2" x1="333" x2="308" y1="452" y2="485" style="stroke:#000000; stroke-width: 4" />\
					</g>\
					\
					<circle data-category="attitude" data-points="0" data-controller="Tournament/setPoints" class="attitude" cx="320" cy="546" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="attitude" data-points="1" data-controller="Tournament/setPoints" class="attitude" cx="374" cy="546" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="attitude" data-points="2" data-controller="Tournament/setPoints" class="attitude" cx="428" cy="546" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="attitude" data-points="3" data-controller="Tournament/setPoints" class="attitude" cx="482" cy="546" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="attitude" data-points="4" data-controller="Tournament/setPoints" class="attitude" cx="536" cy="546" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<g class="attitude">\
						<line class="1" x1="308" x2="333" y1="528" y2="562" style="stroke:#000000; stroke-width: 4" />\
						<line class="2" x1="333" x2="308" y1="528" y2="562" style="stroke:#000000; stroke-width: 4" />\
					</g>\
					\
					<circle data-category="spirit" data-points="0" data-controller="Tournament/setPoints" class="spirit" cx="320" cy="622" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="spirit" data-points="1" data-controller="Tournament/setPoints" class="spirit" cx="374" cy="622" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="spirit" data-points="2" data-controller="Tournament/setPoints" class="spirit" cx="428" cy="622" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="spirit" data-points="3" data-controller="Tournament/setPoints" class="spirit" cx="482" cy="622" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<circle data-category="spirit" data-points="4" data-controller="Tournament/setPoints" class="spirit" cx="536" cy="622" r="25" stroke="rgba(125, 125, 125, 1)" stroke-width="1" fill="transparent"/>\
					<g class="spirit">\
						<line class="1" x1="308" x2="333" y1="604" y2="638" style="stroke:#000000; stroke-width: 4" />\
						<line class="2" x1="333" x2="308" y1="604" y2="638" style="stroke:#000000; stroke-width: 4" />\
					</g>\
					\
					<text class="1p" x="363" y="718" fill="black">0</text>\
					<text class="2p" x="417" y="718" fill="black">0</text>\
					<text class="3p" x="472" y="718" fill="black">0</text>\
					<text class="4p" x="526" y="718" fill="black">0</text>\
					\
					<text class="sum" x="95" y="718" fill="black">0</text>\
				</svg>\
				<div class="element fromTeam">\
					<select name="fromTeam" class="fromTeam error" data-controller="Tournament/selectTeam">\
						<option value="">{{_pleaseChoose}}</option>\
						{{#teams}}\
							<option value="{{id}}">{{name}}</option>\
						{{/teams}}	\
					</select>\
				</div>\
				<div class="element toTeam">{{toTeam}}</div>\
				<div class="element day">\
					<select name="day">\
						<option value="1">Day 1</option>\
						<option value="1">Day 2</option>\
					</select>\
				</div>\
				\
				<a class="button element save orange" data-id="{{toTeamId}}" data-controller="Tournament/saveSpirit">{{_save}}</a>\
				<a class="button element cancel" data-controller="Overlay/close">{{_cancel}}</a>\
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
			_edit: Locale.get('default.edit'),
			_delete: Locale.get('default.delete'),
			_back: Locale.get('default.back'),
			_addTeam: Locale.get('Tournament.addTeam'),
			_changeTournamentName: Locale.get('Tournament.changeTournamentName'),
			_matches: Locale.get('Tournament.matches'),
			_rules: Locale.get('Tournament.rules'),
			_fouls: Locale.get('Tournament.fouls'),
			_fair: Locale.get('Tournament.fair'),
			_attitude: Locale.get('Tournament.attitude'),
			_spirit: Locale.get('Tournament.spirit'),
			_average: Locale.get('Tournament.average'),
			_noResult: Locale.get('Tournament.noResult'),

			name: this.tournament.name,
			teams: this.tournament.teams.toArray(),
			noResult: false
		};

		if (0 < obj.teams.length) {
			// sort teams by name
			obj.teams.sort(function(a, b) {
				if (a.average > b.average) {
					return -1;
				} else if (a.average < b.average) {
					return 1;
				}

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
			if (true === confirm(Locale.get('Tournament.deleteConfirm'))) {

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

			// reset selected points
			this.points =  {
				rules: 0,
				fouls: 0,
				fair: 0,
				attitude: 0,
				spirit: 0,
				sum: 0
			};

			// get teams for select, but exclude current
			aTeams = [];
			this.tournament.teams.toArray().each(function(el) {
				if (el.id != id) {
					aTeams.push(el);
				}
			});


			var oCurrentTeam = this.tournament.teams.getById(id);
			// template vars
			var obj = {
				_pleaseChoose: Locale.get('default.pleaseChoose'),
				_cancel: Locale.get('default.save'),
				_save: Locale.get('default.cancel'),
				_lang: (('de-de' == Locale.getCurrent().name) ? 'DE' : 'EN'),

				toTeam: oCurrentTeam.name,
				toTeamId: oCurrentTeam.id,
				teams: aTeams
			};

			// render HTML
			var HTML = Mustache.render(this.overlay, obj);
			document.body.getElement('.overlayContent').empty();
			document.body.getElement('.overlayContent').set('html', HTML);

			// Template parse
			Template.parse(document.body.getElement('.overlayContent'));

		}.bind(this));
	},

	/**
	 * event to controll selection from team
	 * @param DomObject oElement
	 */
	selectTeamAction: function(oElement) {
		oElement.addEvent('change', function() {
			if ('' == oElement.get('value')) {
				oElement.addClass('error');
			} else {
				oElement.removeClass('error');
			}
		});
	},

	/**
	 * action to mark points in Spirit sheet
	 *
	 * @param oElement
	 */
	setPointsAction: function(oElement) {
		// add event
		oElement.addEvent('click', function() {

			// get category
			var sCategory = oElement.get('data-category');

			// get points
			var iPoints = parseInt(oElement.get('data-points'));

			// get Group for mark flag
			var oGroup = oElement.getParent().getElement('g.' + sCategory);

			// get both lines
			var oLine1 = oGroup.getElement('line.1');
			var oLine2 = oGroup.getElement('line.2');

			// get x and y coordinates
			var iCx = parseInt(oElement.get('cx'));
			var iCy = parseInt(oElement.get('cy'));

			// set new coordinates
			oLine1.set('x1', iCx - 12);
			oLine1.set('x2', iCx + 13);
			oLine1.set('y1', iCy - 18);
			oLine1.set('y2', iCy + 16);
			oLine2.set('x1', iCx + 13);
			oLine2.set('x2', iCx - 12);
			oLine2.set('y1', iCy - 18);
			oLine2.set('y2', iCy + 16);

			if (0 < iPoints) {

				// set points action
				var setPoints = function(iPoints, bAdd) {
					if (0 < iPoints) {

						// get point sum element
						var oPoint = oElement.getParent().getElement('text.' + iPoints + 'p');

						// get all sum element
						var oSum = oElement.getParent().getElement('text.sum');

						// get current points
						var iCurrentPoints = parseInt(oPoint.textContent);
						var iSumPoints = parseInt(oSum.textContent);

						// ad or remove points
						if (true == bAdd) {
							oPoint.textContent = iCurrentPoints + iPoints;
							oSum.textContent = iSumPoints + iPoints;
							this.points['sum'] = iSumPoints + iPoints;
						} else {
							oPoint.textContent = iCurrentPoints - iPoints;
							oSum.textContent = iSumPoints - iPoints;
							this.points['sum'] = iSumPoints - iPoints;
						}
					}
				}.bind(this);

				// get current selected points and remove these
				var oldPoints = parseInt(this.points[sCategory]);
				setPoints(oldPoints, false);

				// store new points
				this.points[sCategory] = iPoints;

				// set to view
				setPoints(iPoints, true);
			}

		}.bind(this));
	},

	saveSpiritAction: function(oElement) {
		oElement.addEvent('click', function() {

			var iId = oElement.get('data-id');

			// first check if team was selected
			var oContent = oElement.getParent('div.content');
			var oTeamSelect = oContent.getElement('select.fromTeam');
			var iFromTeam = parseInt(oTeamSelect.get('value'));

			if (isNaN(iFromTeam)) {
				oTeamSelect.addClass('error');

				// scroll to Error Element
				new Fx.Scroll(window).toElement(oTeamSelect, 'y');

				return false;
			}

			var oTeam = this.tournament.teams.getById(iId);

			// create Model
			var oResult = new Models_Result();

			// teams
			oResult.fromTeam = iFromTeam;
			oResult.toTeam = iId;

			// points
			oResult.average = this.points['sum'];
			oResult.rules = this.points['rules'];
			oResult.fouls = this.points['fouls'];
			oResult.fair = this.points['fair'];
			oResult.attitude = this.points['attitude'];
			oResult.spirit = this.points['spirit'];

			// store Results
			oTeam.results.add(oResult);

			// recalculate avegares
			oTeam.calculateAverages();

			// save
			this.tournaments.save();

			// remove Overlay
			document.getElement('div.overlayContent').empty();

			// refresh List
			this.refreshList();

		}.bind(this));
	}
});
