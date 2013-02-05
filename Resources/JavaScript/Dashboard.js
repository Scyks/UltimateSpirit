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
	template: null,

	init: function() {

		document.body.getElement('.content').empty();
		document.body.addClass('loading');

		//this.storage.remove('tournaments');

		this.loadTemplate('dashboard', function(response) {

			this.template = response;
			this.refreshList();
			document.body.removeClass('loading');
		}.bind(this));


	},

	refreshList: function() {

		var obj = {
			tournaments: this.loadTournaments(),
			noResult: false
		};

		if (0 == obj.tournaments.length) {
			obj.noResult = true;
		}

		var HTML = Mustache.render(this.template, obj);
		document.body.getElement('.content').set('html', HTML);
		Template.parse(document.body.getElement('.content'));

	},

	loadTournaments: function() {
		var tournaments = this.storage.get('tournaments');
		if (null == tournaments) {
			tournaments = [];
		}

		return tournaments;
	},

	addTournamentAction: function(oElement) {
		oElement.addEvent('click', function() {
			var oContent = document.getElement('.content');
			if (oContent.getElement('.tournaments .noResult'))
				oContent.getElement('.tournaments .noResult').addClass('hidden');
			oContent.getElement('.tournaments .new').removeClass('hidden');
			oContent.getElement('.tournaments .new input').focus();
		});
	},

	saveAction: function(oElement) {
		oElement.addEvent('keyup', function(oEvent) {

			if (13 == oEvent.code) {
				var tournaments = this.loadTournaments();
				var id = tournaments.length + 1;
				tournaments.unshift({id: id, name: oElement.get('value')});
				this.storage.set('tournaments', tournaments);

				this.refreshList();

			} else if(27 == oEvent.code) {
				var oContent = document.getElement('.content');
				if (oContent.getElement('.tournaments .noResult'))
					oContent.getElement('.tournaments .noResult').removeClass('hidden');
				oContent.getElement('.tournaments .new').addClass('hidden');
			}
		}.bind(this));
	},

	deleteAction: function(oElement) {

		var id = oElement.get('data-id');

		oElement.addEvent('click', function(oEvent) {
			if (true === confirm('do you really want to delete this tournament including all analysis?')) {
				var id = oElement.get('data-id');

				var tournaments = this.loadTournaments();

				for(var i = 0; i < tournaments.length; i++) {
					if (tournaments[i].id == id) {
						tournaments.erase(tournaments[i]);
					}
				}

				this.storage.set('tournaments', tournaments);
				this.refreshList();
			}
		}.bind(this));
	},

	openAction: function(oElement) {
		oElement.addEvent('click', function() {
			var oContent = document.getElement('.content');
			oContent.empty();
			document.body.addClass('loading');
		});
	}
});
