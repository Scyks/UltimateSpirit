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

	Extends: Controller,
	template: '\
	<a class="button mBottom10 mRight20" data-controller="Tournament/back">&laquo; back</a>\
	<a class="button mBottom10" data-controller="Tournament/addTeam">add Team</a>\
	\
	<div class="matches">\
		<div class="box">\
			<h2 title="To change this tournament name use double click.">{{name}}</h2>\
			\
			<div class="teams">\
				<ul>\
					<li class="headline">\
						<span class="average">Average</span>\
						<span class="rules average">Rules Knowledge</span>\
						<span class="fouls average">Fouls and Contact</span>\
						<span class="fair average">Fair-Mindedness</span>\
						<span class="attitude average">Positive Attitude</span>\
						<span class="spirit average">Our Spirit</span>\
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
					<li>\
						<span class="team">{{nr}}. {{name}}</span>\
						<span class="complete average">{{average}}</span>\
						<span class="rules average">{{rules}}</span>\
						<span class="fouls average">{{fouls}}</span>\
						<span class="fair average">{{fair}}</span>\
						<span class="attitude average">{{attitude}}</span>\
						<span class="spirit average">{{spirit}}</span>\
					</li>\
					{{/teams}}\
				</ul>\
			</div>\
		</div>\
	</div>',
	id: null,

	init: function(params) {

		this.id = params.id;

		document.body.getElement('.content').empty();
		document.body.addClass('loading');

		//this.storage.remove('teams');

		this.refreshList();
		document.body.removeClass('loading');



	},

	refreshList: function() {

		var aTournaments = this.loadTournaments();

		for(var i = 0; i < aTournaments.length; i++) {
			if (aTournaments[i].id == this.id) {
				this.tournament = aTournaments[i];
				break;
			}
		}

		var obj = {
			name: this.tournament.name

		};

		var aTeams = this.loadTeams();

		if (undefined == aTeams[this.id] || 0 == aTeams[this.id].length) {
			obj.noResult = true;
		} else {
			obj.teams = aTeams[this.id];
		}

		obj.teams.sort(function(a, b) {
			return a.name.localeCompare(b.name)
		});

		var idx = 1;
		obj.teams.each(function(el) {
			el.nr = idx;
			idx++;
		});

		var HTML = Mustache.render(this.template, obj);
		document.body.getElement('.content').set('html', HTML);
		Template.parse(document.body.getElement('.content'));

	},

	backAction: function(oElement) {
		oElement.addEvent('click', function() {
			this.getController('Application').open('Dashboard');
		}.bind(this));
	},

	addTeamAction: function(oElement) {
		oElement.addEvent('click', function() {
			var oContent = document.getElement('.content');
			if (oContent.getElement('.teams .noResult'))
				oContent.getElement('.teams .noResult').addClass('hidden');
			oContent.getElement('.teams .add').removeClass('hidden');
			oContent.getElement('.teams .add input').focus();
		});
	},
	saveAction: function(oElement) {
		oElement.addEvent('keyup', function(oEvent) {

			if (13 == oEvent.code) {
				var teams = this.loadTeams();
				if (!teams[this.id]) {
					teams[this.id] = [];
				}
				teams[this.id].unshift({name: oElement.get('value'), nr: 0, average: 0, rules: 0, fouls: 0, fair: 0, attitude: 0, spirit: 0, results: []});
				this.storage.set('teams', teams);

				this.refreshList();

			} else if(27 == oEvent.code) {
				var oContent = document.getElement('.content');
				if (oContent.getElement('.teams .noResult'))
					oContent.getElement('.teams .noResult').removeClass('hidden');
				oContent.getElement('.teams .add').addClass('hidden');
			}
		}.bind(this));
	},

	loadTeams: function() {
		var teams = this.storage.get('teams');
		if (null == teams) {
			teams = {};
		}

		return teams;
	}

});
