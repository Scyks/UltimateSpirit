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
				<div class="edit hidden">\
					<input class="tournament" name="title" value="{{name}}" data-controller="Tournament/changeTitle" />\
					<a class="button cancelEdit delete" data-controller="Tournament/cancelChangeTitle">X</a>\
				</div>\
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
							<a class="button cancelEdit delete" data-controller="Tournament/cancelEdit">X</a>\
						</li>\
						{{#noResult}}\
						<li class="noResult">\
							{{_noResult}}\
						</li>\
						{{/noResult}}\
						{{#teams}}\
							<li class="teams">\
								<span class="team {{#missing}}red{{/missing}}">\
									<span class="actionHover" data-id="{{id}}" data-controller="Tournament/showMatches">{{nr}}. {{name}}</span>\
									<div class="edit hidden">\
										<input name="name" data-controller="Tournament/save" data-id="{{id}}" value="{{name}}" />\
										<a class="button cancelEdit delete" data-controller="Tournament/cancelEdit">X</a>\
									</div>\
									<div class="buttons">\
										<a data-id="{{id}}" data-controller="Tournament/deleteTeam" class="button smal delete greyFont">{{_delete}}</a>\
										<a data-id="{{id}}" data-controller="Tournament/editTeam" class="button edit smal greyFont mRight10">{{_edit}}</a>\
										<a title="{{_addSpiritDescription}}" data-day="{{missDay}}" data-team="{{missTeam}}" data-id="{{id}}" data-controller="Tournament/addSpirit" class="button edit smal greyFont mRight10">{{_createResult}}</a>\
									</div>\
								</span>\
								<span class="matches mRight15 average" title="{{_showMatchesDesc}}">{{matches}}</span>\
								<span class="rules average">{{#format}}{{rules}}{{/format}}</span>\
								<span class="fouls average">{{#format}}{{fouls}}{{/format}}</span>\
								<span class="fair average">{{#format}}{{fair}}{{/format}}</span>\
								<span class="attitude average">{{#format}}{{attitude}}{{/format}}</span>\
								<span class="spirit average">{{#format}}{{spirit}}{{/format}}</span>\
								<span class="complete average">{{#format}}{{average}}{{/format}}</span>\
							</li>\
							\
							{{#results}}\
							<li class="teams team{{toTeam}} sub hidden">\
								<span class="team {{#missing}}red{{/missing}}">\
									<span class="">D{{day}} {{fromTeamObj.name}}</span>\
									\
									{{^missing}}\
										<div class="buttons">\
											<a data-id="{{id}}" data-team="{{toTeam}}" data-controller="Tournament/deleteResult" class="button smal delete greyFont">{{_delete}}</a>\
											<a data-id="{{id}}" data-team="{{toTeam}}" data-controller="Tournament/editResult" class="button edit smal greyFont mRight10">{{_edit}}</a>\
										</div>\
									{{/missing}}\
									{{#missing}}\
										<div class="buttons">\
											<a data-day="{{day}}" data-team="{{fromTeam}}" data-id="{{toTeam}}" data-controller="Tournament/addSpirit" class="button edit smal greyFont mRight10">{{_createResult}}</a>\
										</div>\
									{{/missing}}\
								</span>\
								<span  class=" matches mRight15 average" title=""></span>\
								<span class="rules average">{{rules}}</span>\
								<span class="fouls average">{{fouls}}</span>\
								<span class="fair average">{{fair}}</span>\
								<span class="attitude average">{{attitude}}</span>\
								<span class="spirit average">{{spirit}}</span>\
								<span class="complete average">{{average}}</span>\
							</li>\
							{{/results}}\
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
				<h1>{{_title}}</h1>\
				\
				<section class="description">\
					<div class="left">{{_spiritDescription}}</div>\
					<div class="right">{{_fillOutInstructions}}</div>\
				</section>\
				<section class="gameInfo">\
					<div class="fromTeam">\
						<select name="fromTeam" class="fromTeam error" data-controller="Tournament/selectTeam">\
							<option value="">{{_pleaseChoose}}</option>\
							{{#teams}}\
								<option value="{{id}}">{{name}}</option>\
							{{/teams}}	\
						</select>\
						<span class="desc">{{_fromTeam}}</span>\
					</div>\
					\
					<div class="toTeam">\
						<h2>{{toTeam}}</h2>\
						<span class="desc">{{_toTeam}}</span>\
					</div>\
					\
					<div class="day">\
						<select name="day" class="day">\
							<option value="1">Day 1</option>\
							<option value="2">Day 2</option>\
						</select>\
						<span class="desc">{{_day}}</span>\
					</div>\
				</section>\
				\
				<section class="scores">\
					<table>\
						<tr class="headline">\
							<td class="desc" colspan="2">&nbsp;</td>\
							{{#points}}\
								<td class="points">{{desc}}</td>\
							{{/points}}\
							<td class="spacer10">&nbsp;</td>\
						</tr>\
						{{#categories}}\
							<tr class="category">\
								<td class="desc">\
									<strong>{{title}}</strong>\
									<span class="desc">{{desc}}</span>\
								</td>\
								<td class="spacer">&nbsp;</td>\
								{{#points}}\
									<td class="score">\
										<a data-category="{{category}}" data-points="{{points}}" data-controller="Tournament/setPoints"  class="button p{{points}} {{category}}">{{points}}</a>\
									</td>\
								{{/points}}\
								<td class="spacer10">&nbsp;</td>\
							</tr>\
						{{/categories}}\
						\
						<tr>\
							<td class="sum"><div>0</div></td>\
							<td class="spacer">&nbsp;</td>\
							{{#points}}\
								<td class="sum point p{{points}}"><div>0</div></td>\
							{{/points}}\
							<td class="spacer10">&nbsp;</td>\
						</tr>\
					</table>\
				</section>\
				<section class="buttonBar">\
					<a class="button element save orange" data-id="{{toTeamId}}" data-result="{{resultId}}" data-controller="Tournament/saveSpirit">{{_save}}</a>\
					<a class="button element cancel mRight10" data-controller="Overlay/close">{{_cancel}}</a>\
				</section>\
			</div>\
		</div>\
	',

	/**
	 * tournament id
	 * @var integer
	 */
	id: null,

	/**
	 * float format method, to return every number in float with
	 * 2 decimal integers
	 * - 1,00
	 * - 1,60,
	 * - 1,56
	 *
	 * @return {Function}
	 */
	format: function() {
		return function(text, render) {
			var sNumber = render(text).toString();
			var aSplit = sNumber.split('.');
			if (!aSplit[1]) {
				aSplit[1] = '00';
			}
			if (1 == aSplit[1].length) {
				aSplit[1] += '0';
			}


			return aSplit.join(',');
		};
	},

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

		this.loadTournaments();

		this.tournament = this.tournaments.getById(this.id);

		// render template and remove loading
		this.refreshList();
		document.body.removeClass('loading');

		//Locale.removeEvents('change');
		Locale.addEvent('change', this.refreshList.bind(this));

	},

	/**
	 * refresh team list and show spirit results
	 */
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
			_addSpiritDescription: Locale.get('Tournament.addSpiritDescription'),
			_showMatchesDesc: Locale.get('Tournament.showMatchesDesc'),
			_createResult: Locale.get('Tournament.createResult'),
			_deleteResultConfirm: Locale.get('Tournament.deleteResultConfirm'),

			format: this.format,

			name: this.tournament.name,
			teams: this.tournament.teams.toArray(),
			noResult: false
		};

		/*
		 * save teams in temp array for adding matches and store all
		 * matches to find out if a match is missing
		 */
		var aTeams = [];
		var aMatches = [];
		var aMatchesClean = [];
		obj.teams.each(function(team) {
			aTeams[team.id] = team;
			team.results.toArray().each(function(res) {
				aMatches.push({from: parseInt(res.fromTeam), to: parseInt(res.toTeam), day: res.day});
				aMatchesClean.push(parseInt(res.day) + '_' + parseInt(res.fromTeam) + '_' + parseInt(res.toTeam));
			});
		});

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
				el.missing = false;
				idx++;

				// iterate results
				el.results = el.results.toArray();
				el.results.each(function(res) {
					res.fromTeamObj = aTeams[res.fromTeam];
					res.missing = false;

				});

				aMatches.each(function(match) {
					// check if this team get and don't add result for this team
					if (parseInt(match.from) == parseInt(el.id) && !aMatchesClean.contains(match.day + '_' + match.to + '_' + el.id)) {

						// create temp match result to show that there is a match missing
						el.matches += 1;
						el.missing = true;
						el.missTeam = match.to;
						el.missDay = match.day;
						el.results.push({
							fromTeamObj: aTeams[match.to],
							fromTeam: parseInt(match.to),
							toTeam: parseInt(el.id),
							missing: true,
							day: match.day,
							average: '',
							rules: '',
							fouls: '',
							fair: '',
							attitude: '',
							spirit: ''
						});

					}
				});


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

	cancelChangeTitleAction: function(oElement) {
		var oParent = oElement.getParent('.box');
		var oEdit = oElement.getParent('div.edit');

		oElement.addEvent('click', function() {
			// restore input value
			oEdit.set('value', oParent.getElement('h2').get('html'));

			// hide input, show h2
			oEdit.addClass('hidden');
			oParent.getElement('h2').removeClass('hidden');
		});
	},
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
				oParent.getElement('div.edit').removeClass('hidden');
				oParent.getElement('div.edit input').focus();

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

	cancelEditAction: function(oElement) {

		var oEdit = oElement.getParent('div');

		oElement.addEvent('click', function() {
			// on edit
			if (null != oEdit.getElement('input').get('data-id')) {


				var oTeam = this.tournament.teams.getById(oEdit.getElement('input').get('data-id'));
				if (oTeam) {
					// restore input value
					oEdit.getElement('input').set('value', oTeam.name);
				}
				// hide input
				oEdit.addClass('hidden');
				oEdit.removeClass('active');

				// get span
				var oSpan = oEdit.getParent('span.team').getElement('span');

				// show span
				oSpan.removeClass('hidden');
			} else {
				oEdit.getElement('input').set('value', null);

				var oContent = document.getElement('.content');
				if (oContent.getElement('.teams .noResult'))
					oContent.getElement('.teams .noResult').removeClass('hidden');
				oContent.getElement('.teams .add').addClass('hidden');
			}
		}.bind(this));
	},

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
					oElement.set('value', null);
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
			var oParent = oElement.getParent('span.team');

			// show input hide span
			oParent.getElement('span').addClass('hidden');
			oParent.getElement('div.edit').removeClass('hidden');
			oParent.getElement('div.edit').addClass('active');
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
		var iDay = oElement.get('data-day');
		var iTeamId = oElement.get('data-team');

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
				_cancel: Locale.get('default.cancel'),
				_save: Locale.get('default.save'),
				_title: Locale.get('Spirit.title'),
				_spiritDescription: Locale.get('Spirit.spiritDescription'),
				_fillOutInstructions: Locale.get('Spirit.fillOutInstructions'),
				_fromTeam: Locale.get('Spirit.fromTeam'),
				_toTeam: Locale.get('Spirit.toTeam'),
				_day: Locale.get('Spirit.day'),
				points: Locale.get('Spirit.points'),
				categories: Locale.get('Spirit.categories'),

				toTeam: oCurrentTeam.name,
				toTeamId: oCurrentTeam.id,
				teams: aTeams
			};

			// render HTML
			var HTML = Mustache.render(this.overlay, obj);

			var oOverlayContent = document.body.getElement('.overlayContent');
			oOverlayContent.empty();
			oOverlayContent.set('html', HTML);

			// Template parse
			Template.parse(oOverlayContent);

			// set values
			if (iDay && iTeamId) {

				oOverlayContent.getElement('select.fromTeam').set('value', iTeamId);
				oOverlayContent.getElement('select.fromTeam').fireEvent('change');
				oOverlayContent.getElement('select.day').set('value', iDay);
				oOverlayContent.getElement('select.day').fireEvent('change');
			}


		}.bind(this));

		//oElement.fireEvent('click');
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

			if (oElement.getParent('tr').getElement('a.active')) {
				oElement.getParent('tr').getElement('a.active').removeClass('active');
			}

			// set points action
			var setPoints = function(iPoints, bAdd) {
				if (0 < iPoints) {

					// get point sum element
					var oPoint = oElement.getParent('table').getElement('td.sum.p' + iPoints + ' div');

					// get all sum element
					var oSum = oElement.getParent('table').getElement('td.sum div');

					// get current points
					var iCurrentPoints = parseInt(oPoint.get('html'));
					var iSumPoints = parseInt(oSum.get('html'));

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

			oElement.addClass('active');

		}.bind(this));
	},

	/**
	 * this method will save the result on open spirit
	 * @param Object oElement
	 */
	saveSpiritAction: function(oElement) {
		oElement.addEvent('click', function() {

			var iId = oElement.get('data-id');
			var oTeam = this.tournament.teams.getById(iId);

			var oCurrentResult = false;
			if (oElement.get('data-result')) {
				oCurrentResult = oTeam.results.getById(oElement.get('data-result'));
			}

			// first check if team was selected
			var oContent = oElement.getParent('div.content');
			var oTeamSelect = oContent.getElement('select.fromTeam');
			var oDaySelect = oContent.getElement('select.day');

			var iFromTeam = parseInt(oTeamSelect.get('value'));
			var iDay = parseInt(oDaySelect.get('value'));

			if (isNaN(iFromTeam)) {
				oTeamSelect.addClass('error');

				// scroll to Error Element
				new Fx.Scroll(window).toElement(oTeamSelect, 'y');

				return false;
			}


			// create Model
			if (false == oCurrentResult) {
				var oResult = new Models_Result();
			} else {
				var oResult = oCurrentResult;
			}


			// teams
			oResult.fromTeam = iFromTeam;
			oResult.toTeam = iId;
			oResult.day = iDay;

			// points
			oResult.average = this.points['sum'];
			oResult.rules = this.points['rules'];
			oResult.fouls = this.points['fouls'];
			oResult.fair = this.points['fair'];
			oResult.attitude = this.points['attitude'];
			oResult.spirit = this.points['spirit'];

			if (false == oCurrentResult) {
				// store Results
				oTeam.results.add(oResult);
			}

			// recalculate avegares
			oTeam.calculateAverages();

			// save
			this.tournaments.save();

			// remove Overlay
			document.getElement('div.overlayContent').empty();

			// refresh List
			this.refreshList();

			return true;

		}.bind(this));
	},

//pragma mark - match and result modifications

	showMatchesAction: function(oElement) {
		oElement.addEvent('click', function() {
			var iId = oElement.get('data-id');

			// get all sub Elemens
			document.getElements('li.sub.team' + iId).each(function(oLi) {
				// if open - hide matches
				if (oElement.hasClass('open')) {
					oLi.addClass('hidden');
				} else {
					oLi.removeClass('hidden');
				}
			});

			// add or remove class open from/to toggle element to stora toggle state
			if (oElement.hasClass('open')) {
				oElement.removeClass('open');
			} else {
				oElement.addClass('open');
			}
		});
	},

	/**
	 * This method opens overlay for editing the spirit result
	 * @param oElement
	 */
	editResultAction: function(oElement) {

		// get id
		var id = oElement.get('data-id');
		var iTeamId = oElement.get('data-team');

		// add click event
		oElement.addEvent('click', function() {

			// get current objects
			var oCurrentTeam = this.tournament.teams.getById(iTeamId);
			var oCurrentResult =  oCurrentTeam.results.getById(id);

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
				if (el.id != iTeamId) {
					aTeams.push(el);
				}
			});



			// template vars
			var obj = {
				_pleaseChoose: Locale.get('default.pleaseChoose'),
				_cancel: Locale.get('default.cancel'),
				_save: Locale.get('default.save'),
				_title: Locale.get('Spirit.title'),
				_spiritDescription: Locale.get('Spirit.spiritDescription'),
				_fillOutInstructions: Locale.get('Spirit.fillOutInstructions'),
				_fromTeam: Locale.get('Spirit.fromTeam'),
				_toTeam: Locale.get('Spirit.toTeam'),
				_day: Locale.get('Spirit.day'),
				points: Locale.get('Spirit.points'),
				categories: Locale.get('Spirit.categories'),

				toTeam: oCurrentTeam.name,
				toTeamId: oCurrentTeam.id,
				resultId: oCurrentResult.id,
				teams: aTeams
			};

			// render HTML
			var HTML = Mustache.render(this.overlay, obj);
			var oOverlayContent = document.body.getElement('.overlayContent');

			oOverlayContent.empty();
			oOverlayContent.set('html', HTML);

			// Template parse
			Template.parse(oOverlayContent);

			// set values
			oOverlayContent.getElement('select.fromTeam').set('value', oCurrentResult.fromTeam);
			oOverlayContent.getElement('select.fromTeam').fireEvent('change');
			oOverlayContent.getElement('select.day').set('value', oCurrentResult.day);
			oOverlayContent.getElement('select.day').fireEvent('change');

			['rules', 'fouls', 'fair', 'attitude', 'spirit'].each(function(sSection) {
				var oPoint = oOverlayContent.getElement('a.' + sSection + '[data-points=' + oCurrentResult[sSection] + ']');
				oPoint.fireEvent('click');
			});

		}.bind(this));
	},

	/**
	 * this method deletes a result
	 * @param oElement
	 */
	deleteResultAction: function(oElement) {

		// get id
		var id = oElement.get('data-id');
		var iTeamId = oElement.get('data-team');

		// add click event
		oElement.addEvent('click', function(oEvent) {
			oEvent.stop();

			// ask user
			if (true === confirm(Locale.get('Tournament.deleteResultConfirm'))) {

				// delete and save
				var oTeam = this.tournament.teams.getById(iTeamId);
				oTeam.results.deleteById(id);

				oTeam.calculateAverages();

				this.tournaments.save();

				// refresh html
				this.refreshList();
			}
		}.bind(this));
	}

});
