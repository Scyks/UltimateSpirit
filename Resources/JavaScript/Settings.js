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
	 * current settings
	 * @var Models_Setting
	 */
	settings: null,

	/**
	 * overlay - add spirit template
	 * @var string
	 */
	overlay: '\
		<div class="overlayBg transparent" data-controller="Overlay/background"></div>\
		<div class="overlay settings" data-controller="Overlay/content">\
			<div class="content">\
				<a class="button close" data-controller="Overlay/close">X</a>\
				<h1>{{_title}}</h1>\
				<form name="settings">\
					<section>\
						<header>{{_globalHeader}}</header>\
						<dl>\
							<dt>{{_language}}</dt>\
							<dd>\
								<select name="language" class="languages">\
								{{#languages}}\
									<option value="{{name}}" {{#selected}}selected="selected"{{/selected}}>{{translation}}</option>\
								{{/languages}}\
								</select>\
							</dd>\
							<dt>{{_update}}</dt>\
							<dd>\
								<input type="checkbox" name="update" class="update" {{#settings.update}}checked="checked"{{/settings.update}}> {{_yes}}\
							</dd>\
						</dl>\
					</section>\
					<section class="save">\
						<a data-controller="Overlay/close" class="button cancel">{{_cancel}}</a>\
						<a data-controller="Settings/save" class="button save orange">{{_save}}</a>\
					</section>\
				</form>\
			</div>\
		</div>\
	',

	/**
	 * init method
	 * @param params
	 */
	init: function(params) {

		// remove loading
		document.body.removeClass('loading');

		// open overlay
		this.open();

	},

	/**
	 * load settings from storage
	 */
	loadSettings: function() {
		this.settings = new Models_Setting();
		this.settings.load();
	},


	/**
	 * open overlay and show available settings
	 */
	open: function() {

		// laod settings
		this.loadSettings();

		// define language list for template
		var aLanguages = [];
		Application.availLanguages.each(function(lang) {
			aLanguages.push({
				name: lang,
				translation: Locale.get('Setting.' + lang),

				// mark selected
				selected: ((lang == this.settings.language) ? true : false)
			});

		}.bind(this));

		// template object
		var obj = {
			_title: Locale.get('Setting.title'),
			_globalHeader: Locale.get('Setting.globalHeader'),
			_update: Locale.get('Setting.update'),
			_language: Locale.get('Setting.language'),
			_yes: Locale.get('default.yes'),
			_cancel: Locale.get('default.cancel'),
			_save: Locale.get('default.save'),
			languages: aLanguages,

			settings: this.settings
		};

		// render HTML
		var HTML = Mustache.render(this.overlay, obj);

		var oOverlayContent = document.body.getElement('.overlayContent');
		oOverlayContent.empty();
		oOverlayContent.set('html', HTML);

		// Template parse
		Template.parse(oOverlayContent);


	},

	/**
	 * save defined settings to local storage
	 * @param Object oElement
	 */
	saveAction: function(oElement) {

		// add click event
		oElement.addEvent('click', function() {

			// get Data
			var oForm = oElement.getParent('form');
			var oData = oForm.toQueryString().parseQueryString();

			// store current language to change language
			var lang = this.settings.lang;

			// set update to false, because if its marked as false, its not in data
			this.settings.update = false;
			Object.each(oData, function(value, key) {

				// change on to true
				if ('on' == value && 'update' == key) {
					value = true;
				}

				// store setting
				this.settings[key] = value;

			}.bind(this));

			// change language if needed
			if (this.settings.language !== lang) {
				Locale.use(this.settings.language);
			}

			// save seettings
			this.settings.save();

			// remove Overlay
			var oOverlayContent = document.body.getElement('.overlayContent');
			oOverlayContent.empty();


		}.bind(this));
	}

});
