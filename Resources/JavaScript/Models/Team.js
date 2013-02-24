/**
 * @author        Ronald Marske <ronaldmarske@yaoo.de>
 * @filesource    Resources/JavaScript/Models/Tournament.js
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
var Models_Team = new Class({

	__class: 'Models_Team',
	/**
	 * id
	 * @var integer
	 */
	id: null,

	/**
	 * id
	 * @var integer
	 */
	nr: null,

	/**
	 * name
	 * @var string
	 */
	name: null,

	/**
	 * count of matches
	 * @var integer
	 */
	matches: 0,

	/**
	 * average
	 * @var integer
	 */
	average: 0,

	/**
	 * rules knowledge
	 * @var integer
	 */
	rules: 0,

	/**
	 * fouls and body contact
	 * @var integer
	 */
	fouls: 0,

	/**
	 * fair mindedness
	 * @var integer
	 */
	fair: 0,

	/**
	 * positive attitude
	 * @var integer
	 */
	attitude: 0,

	/**
	 * spirit compare
	 * @var integer
	 */
	spirit: 0,

	/**
	 * results
	 * @var Collection
	 */
	results: null,

	/**
	 * initialize Tournament Model
	 * @param string sName
	 */
	initialize: function(sName) {

		this.__class = 'Models_Team';

		// set name if defined
		if (undefined != sName) {
			this.name = sName;
		}

		this.results = new Collection('results', false);
	},

	/**
	 * this method will calculate all averages by given
	 * results.
	 */
	calculateAverages: function() {

		// reset Team data
		this.matches = 0;
		this.average = 0;
		this.rules = 0;
		this.fouls = 0;
		this.fair = 0;
		this.attitude = 0;
		this.spirit = 0;

		// iterate all result data
		this.results.toArray().each(function(oData) {

			this.matches += 1;
			this.average += oData.average;
			this.rules += oData.rules;
			this.fouls += oData.fouls;
			this.fair += oData.fair;
			this.attitude += oData.attitude;
			this.spirit += oData.spirit;

		}.bind(this));

		// calculate real averages
		this.average  = Math.round((this.average / this.matches) * 100) / 100;
		this.rules    = Math.round((this.rules / this.matches) * 100) / 100;
		this.fouls    = Math.round((this.fouls / this.matches) * 100) / 100;
		this.fair     = Math.round((this.fair / this.matches) * 100) / 100;
		this.attitude = Math.round((this.attitude / this.matches) * 100) / 100;
		this.spirit   = Math.round((this.spirit / this.matches) * 100) / 100;
	},
	
	__fromJson: function(data) {

		var oResults = new Collection('results', false);
		if (data.results) {
			oResults.data = data.results.data;
			oResults.load();
		}
		this.results = oResults;
	}
});