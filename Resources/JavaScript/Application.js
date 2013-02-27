/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Application.js
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

var Application = new Class({

	Extends: Controller,
	page: 'Dashboard',
	params: {},
	root: null,

	availLanguages: [
		'en-US',
		'de-DE'
	],

	/**
	 * overlay - new Software Versoin found
	 * @var string
	 */
	overlay: '\
		<div class="overlayBg transparent" data-controller="Overlay/background"></div>\
		<div class="overlay update" data-controller="Overlay/content">\
			<div class="content">\
				<a class="button close" data-controller="Overlay/close">X</a>\
				<h1>{{_title}}</h1>\
				{{_desc}}\
				\
				<section class="buttonBar">\
					<a data-controller="Application/skipUpdate" data-version="{{version}}" class="button cancel mRight10">{{_skip}}</a>\
					<a data-controller="Application/remindMeLater" class="button cancel mRight10">{{_remindMeLater}}</a>\
					<a data-controller="Application/openUpdate" class="button save orange" href="http://www.ultimatespirit.de/download" target="_blank">{{_download}}</a>\
				</section>\
			</div>\
		</div>\
	',

	/**

	/**
	 * Init Application
	 */
	initAction: function() {


		var oSettings = new Models_Setting().load();

		if (null == oSettings.id) {

			// detect System Language
			if (this.availLanguages.contains(navigator.language)) {
				oSettings.language = navigator.language;
				oSettings.save();
			}
		}


		// add Change event, for language
		Locale.addEvent('change', this.translateMain);

		// set current locale
		Locale.use(oSettings.language);


		if (true == oSettings.update) {
			// check for Update
			this.checkForUpdates(oSettings);
		}

		// get current controller
		var aPages = document.location.href.split('#');
		this.root = aPages[0];

		if (2 == aPages.length) {

			if (-1 !== aPages[1].indexOf('?')) {
				var Params = aPages[1].split('?');
				this.page = Params[0];
				var aParams = Params[1].split('&');
				aParams.each(function(param) {
					var keyValue = param.split('=');
					this.params[keyValue[0]] = keyValue[1];
				}.bind(this));

			} else {
				this.page = aPages[1];
			}

		} else {
			aPages[1] = this.page;
			document.location.href = aPages.join('#');
		}

		var oController = this.getController(this.page);

		// if no controller found - show dashboard
		if (!oController) {
			aPages[1] = 'Dashboard';
			this.page = 'Dashboard';
			document.location.href = aPages.join('#');
			var oController = this.getController(this.page);
		}
		oController.init(this.params);

	},

	translateMain: function() {
		// set title by language
		document.getElement('title').set('html', Locale.get('default.title'));
		document.getElement('h1').set('html', Locale.get('default.title'));
		document.getElement('a.settings').set('html', Locale.get('Setting.title'));
	},

	/**
	 * this method opens a controller page
	 * @param string controller
	 * @param object params
	 */
	open: function(controller, params) {
		var sUrl = this.root;
		sUrl += '#' + controller;

		aParams = [];
		Object.each(params, function(el, key) {
			aParams.push(key+'='+el);
		});

		if (0 < aParams.length) {
			sUrl += '?' + aParams.join('&');
		}

		document.location.href = sUrl;

	},

	/**
	 * store history to use back and forward buttons of browser
	 */
	historyAction: function() {
		window.onpopstate = function() {
			this.initAction();
		}.bind(this);

	},

	/**
	 * Open Settings Controller
	 * @param Object oElement
	 */
	settingsAction: function(oElement) {
		oElement.addEvent('click', function() {
			this.getController('Settings').init();
		}.bind(this));
	},

	checkForUpdates: function(oSettings) {

		var o7DaysBefore = new Date().decrement('day', 7);

		if (null == oSettings.lastUpdate || oSettings.lastUpdate < o7DaysBefore) {

			var oJsonP = new Request.JSONP({
				url: 'http://update.ultimatespirit.de',
				data: {
					app: 'USOA',
					format: 'json'
				},
				callbackKey: 'jsonp',

				onSuccess: function(oUpdate) {
					if (false != oUpdate.version && 'false' != oUpdate.version) {

						if ((false == AppVersion || AppVersion < oUpdate.version) && !oSettings.skipVersions.contains(oUpdate.version.toString())) {

							// detect new Version
							this.showUpdateOverlay(oUpdate.version);
						}
					}

					oSettings.lastUpdate = new Date();
					oSettings.save();
					
				}.bind(this)
			});

			oJsonP.send();

		}
	},

	showUpdateOverlay: function(newVersion) {
		var obj = {
			_title: Locale.get('Update.title'),
			_desc: Locale.get('Update.desc').replace('%version%', newVersion).replace('%oldVersion%', AppVersion),
			_download: Locale.get('Update.download'),
			_skip: Locale.get('Update.skip'),
			_remindMeLater: Locale.get('Update.remindMeLater'),
			version: newVersion
		};

		// render HTML
		var HTML = Mustache.render(this.overlay, obj);

		var oOverlayContent = document.body.getElement('.overlayContent');
		oOverlayContent.empty();
		oOverlayContent.set('html', HTML);

		// Template parse
		Template.parse(oOverlayContent);
	},

	skipUpdateAction: function(oElement) {
		oElement.addEvent('click', function() {

			var version = oElement.get('data-version');

			var oSettings = new Models_Setting().load();
			if (!oSettings.skipVersions.contains(version)) {
				oSettings.skipVersions.push(version);
			}
			oSettings.save();

			document.body.getElement('.overlayContent').empty();
		});
	},

	remindMeLaterAction: function(oElement) {
		oElement.addEvent('click', function() {
			var oSettings = new Models_Setting().load();
			oSettings.lastUpdate = new Date();
			oSettings.save();

			document.body.getElement('.overlayContent').empty();
		});
	},

	openUpdateAction: function(oElement) {
		oElement.addEvent('click', function() {
			document.body.getElement('.overlayContent').empty();
		});
	}


});
