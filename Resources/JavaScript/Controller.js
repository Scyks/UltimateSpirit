/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Controller.js
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

var Controller = new Class({

	/**
	 * collection of tournaments
	 * @var Collection
	 */
	tournaments: null,

	/**
	 * initialization method - load tournaments
	 */
	initialize: function() {

		this.loadTournaments();
	},

	/**
	 * will return a controller, if there is an instance of a controller
	 * this instance will be returned, otherwise a new instance will
	 * be created and returned
	 * @param string sController
	 * @return Controller
	 */
	getController: function(sController) {
		if ('class' == typeOf(window[sController])) {
			window[sController] = new window[sController]();
		}

		return window[sController];
	},

	/**
	 * load all tournaments from local storage
	 *
	 * @return Collection
	 */
	loadTournaments: function() {
		this.tournaments = new Collection('tournaments', true);

		return this.tournaments;

	}


});
