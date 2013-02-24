/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Settings.js
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

var Settings = new Class({

	/**
	 * extends base Controller
	 */
	Extends: Controller,

	/**
	 * overlay - add spirit template
	 * @var string
	 */
	overlay: '\
		<div class="overlayBg transparent" data-controller="Overlay/background"></div>\
		<div class="overlay settings" data-controller="Overlay/content">\
			<div class="content">\
				<a class="button close" data-controller="Overlay/close">X</a>\
				<h1>{{_title}} (does currently not work)</h1>\
				<section>\
					<header>{{_globalHeader}}</header>\
					<dl>\
						<dt>{{_language}}</dt>\
						<dd>\
							<select name="language" class="languages">\
							{{#languages}}\
								<option value="{{name}}">{{translation}}</option>\
							{{/languages}}\
							</select>\
						</dd>\
						<dt>{{_update}}</dt>\
						<dd>\
							<input type="checkbox" name="update" class="update"> {{_yes}}\
						</dd>\
					</dl>\
				</section>\
			</div>\
		</div>\
	',

	/**
	 * init method
	 * @param params
	 */
	init: function(params) {


		document.body.removeClass('loading');

		this.open();

	},

	open: function() {


		var aLanguages = [];
		Application.availLanguages.each(function(lang) {
			aLanguages.push({
				name: lang,
				translation: Locale.get('Setting.' + lang)
			});

		});
		var obj = {
			_title: Locale.get('Setting.title'),
			_globalHeader: Locale.get('Setting.globalHeader'),
			_update: Locale.get('Setting.update'),
			_language: Locale.get('Setting.language'),
			_yes: Locale.get('default.yes'),
			languages: aLanguages
		};

		// render HTML
		var HTML = Mustache.render(this.overlay, obj);

		var oOverlayContent = document.body.getElement('.overlayContent');
		oOverlayContent.empty();
		oOverlayContent.set('html', HTML);

		// Template parse
		Template.parse(oOverlayContent);


	}

});
