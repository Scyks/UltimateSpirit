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
	<a class="button mBottom5" data-controller="Tournament/back">&laquo; back</a>\
	\
	<div class="matches">\
		<div class="box">\
			<h2>{{name}}</h2>\
			\
			<div class="teams">\
				<ul>\
					<li>Teamname</li>\
					<li>Teamname</li>\
					<li>Teamname</li>\
				</ul>\
			</div>\
		</div>\
	</div>',
	id: null,

	init: function(params) {

		this.id = params.id;

		document.body.getElement('.content').empty();
		document.body.addClass('loading');

		//this.storage.remove('tournaments');

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

		var HTML = Mustache.render(this.template, obj);
		document.body.getElement('.content').set('html', HTML);
		Template.parse(document.body.getElement('.content'));

	},

	backAction: function(oElement) {
		oElement.addEvent('click', function() {
			this.getController('Application').open('Dashboard');
		}.bind(this));
	}

});
